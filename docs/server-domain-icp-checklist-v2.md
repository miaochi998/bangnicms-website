# 服务器 + 域名 + 部署清单 v2

> **配套**：[`implementation-plan-v2.md`](./implementation-plan-v2.md)
> **域名**：`cms.bonnei.com`（用户已确认**已备案**，无需重新备案）
> **架构**：纯静态站，Caddy 直接 serve `dist/`，无数据库无 BangNiCMS

---

## 1. 服务器选型

### 1.1 推荐配置（纯静态站够用）

| 项 | 配置 | 说明 |
|---|---|---|
| **CPU** | 2 vCPU | 仅跑 Caddy + 偶尔 git pull/build |
| **内存** | 4 GB | Caddy 占用极小，余量给 build 时短暂峰值 |
| **系统盘** | 50 GB SSD | dist 静态资源 + 扩展 zip + 日志 |
| **带宽** | 3 Mbps 起 | 静态资源体积小；后续可加 CDN |
| **公网 IP** | 1 个 | 已绑定备案 |
| **操作系统** | Ubuntu 22.04 LTS | Docker 友好 |

### 1.2 云厂商对比

| 厂商 | 月成本（2C4G） | 推荐度 | 备注 |
|---|---|---|---|
| **腾讯云 CVM 标准型 SA5** | ¥80-110 | ⭐⭐⭐⭐⭐ | 性价比高 |
| **阿里云 ECS 计算型 c7** | ¥100-140 | ⭐⭐⭐⭐ | 备案体系成熟 |
| **腾讯云轻量应用服务器** | ¥40-70 | ⭐⭐⭐⭐ | 流量套餐限制需注意 |
| **阿里云轻量应用服务器** | ¥50-80 | ⭐⭐⭐⭐ | 同上 |

> **建议**：**腾讯云轻量应用服务器 2C4G 4M（¥768/年）**。流量 1200GB/月对静态站完全够用。

### 1.3 待办

- [ ] 注册/登录云厂商账号
- [ ] 购买实例（Ubuntu 22.04 / 2C4G / 50G SSD）
- [ ] 配置安全组：开放 22 / 80 / 443，其余拒绝
- [ ] SSH 登录测试 + 修改默认 SSH 端口（可选，更安全）
- [ ] 配置 ufw 防火墙：`ufw allow 22,80,443/tcp && ufw enable`
- [ ] 安装 Docker + Compose：`curl -fsSL get.docker.com | sh && apt install docker-compose-plugin`
- [ ] 创建部署目录：`mkdir -p /opt/bangnicms-website/{dist,caddy/data,caddy/config,logs}`
- [ ] 生成 SSH deploy key 加到 GitHub（用于 Actions push 部署）

---

## 2. 域名

### 2.1 现状

| 域名 | 状态 |
|---|---|
| `cms.bonnei.com` | ✅ **已备案**，可直接使用 |

### 2.2 DNS 配置

到域名注册商控制台（或 DNSPod / Cloudflare），加 A 记录：

| 主机记录 | 类型 | 值 | TTL |
|---|---|---|---|
| `cms` | A | 服务器公网 IP | 600 |
| `www.cms`（可选） | CNAME | `cms.bonnei.com` | 600 |

### 2.3 待办

- [ ] 确认 `cms.bonnei.com` 备案号在工信部可查
- [ ] 添加 A 记录指向新服务器 IP
- [ ] 等待 DNS 生效（5-10 分钟）
- [ ] `dig cms.bonnei.com` 验证解析正确

---

## 3. 部署架构

### 3.1 服务器目录结构

```
/opt/bangnicms-website/
├── dist/                  # 由 GitHub Actions 推送的构建产物
│   ├── index.html
│   ├── docs/...
│   ├── market/...
│   ├── api/v1/registry/...
│   ├── downloads/...
│   └── _astro/...
├── caddy/
│   ├── data/              # Let's Encrypt 证书
│   ├── config/
│   └── logs/
└── Caddyfile              # 反向代理配置
```

### 3.2 Caddy 职责

- 自动 Let's Encrypt 证书签发与续期（90 天前 30 天自动续）
- HTTP → HTTPS 强制跳转
- 静态文件 serve（`root /dist`）
- gzip / zstd 压缩
- 安全头（X-Content-Type-Options / X-Frame-Options / CSP）
- 访问日志（JSON 格式，roll 100MB / 保留 10 份）
- API JSON 文件加 `Cache-Control: public, max-age=300`（5 分钟新鲜度，让 BangNiCMS 后台拉的数据不会太陈旧）
- HTML 加 `Cache-Control: no-cache`（保证发布即生效）
- 静态资产 `_astro/*` 加 `Cache-Control: public, max-age=31536000, immutable`

### 3.3 CI/CD 流程

```
开发者 push to main
       ↓
GitHub Actions (deploy.yml)
  1. checkout
  2. pnpm install
  3. pnpm build → dist/
  4. tar cf dist.tar dist/
  5. scp dist.tar 服务器:/tmp/
  6. ssh 服务器:
     - rm -rf /opt/bangnicms-website/dist.new
     - mkdir /opt/bangnicms-website/dist.new
     - tar xf /tmp/dist.tar -C /opt/bangnicms-website/dist.new
     - mv dist dist.old && mv dist.new dist  # 原子切换
     - rm -rf dist.old
     - docker compose exec caddy caddy reload
       ↓
访客访问 cms.bonnei.com 看到新版本
```

回滚：`mv dist dist.broken && mv dist.old dist && caddy reload`（保留上一个版本）

### 3.4 待办

- [ ] 写 `Caddyfile`（仓库根目录已有，部署时 scp 到服务器）
- [ ] 写 `docker-compose.yml`（仅 caddy 一个服务）
- [ ] 写 `.github/workflows/deploy.yml`
- [ ] 配置 GitHub Secrets：`SSH_PRIVATE_KEY` / `SERVER_HOST` / `SERVER_USER`
- [ ] 服务器上 `docker compose up -d` 启动 Caddy
- [ ] 测试一次完整 push → 部署链路

---

## 4. 监控

### 4.1 可用性监控

UptimeRobot 免费版：

- [ ] 监控 `https://cms.bonnei.com/`（首页）
- [ ] 监控 `https://cms.bonnei.com/api/v1/registry/info.json`（Registry 心跳）
- [ ] 监控 SSL 证书 30 天到期预警
- [ ] 通知到邮箱

### 4.2 日志

- Caddy access log → `/opt/bangnicms-website/caddy/logs/access.log`
- 每周 logrotate 自动滚动（Caddy 内置 roll）
- 异常 4xx/5xx 用 GoAccess 离线分析

### 4.3 待办

- [ ] 注册 UptimeRobot
- [ ] 添加 3 项监控
- [ ] 配置邮箱通知
- [ ] （可选）安装 GoAccess：`apt install goaccess`

---

## 5. 备份

### 5.1 备份策略（极简）

**不需要传统数据库备份**，因为：
- 所有内容都在 git 仓库（首页文案、文档、扩展元数据）
- git 是分布式的，本地 + GitHub 双副本
- 服务器上的 `dist/` 随时可从仓库重建

唯一需要备份的：

| 内容 | 频率 | 方式 |
|---|---|---|
| 扩展安装包 zip 文件 | 每次发布即 git commit | git LFS（如 zip 大于 10MB）或直接进 git |
| Caddy 证书 | 每月 | 服务器 `/opt/bangnicms-website/caddy/data` 打包到 OSS |
| Caddy 访问日志 | 季度 | 归档到 OSS（用于流量分析） |

### 5.2 待办

- [ ] 决定 zip 文件存储策略（git 直存 vs git LFS vs 单独 OSS）
- [ ] 写 Caddy 数据月度备份脚本（cron）

---

## 6. 上线检查清单

正式 go-live 前必过：

- [ ] DNS 解析正确
- [ ] HTTPS 证书有效，无浏览器警告
- [ ] 首页可访问且渲染正常（桌面 + 移动）
- [ ] 文档站三栏布局正常，搜索功能可用
- [ ] `/market` 页面卡片正确显示
- [ ] `/api/v1/registry/info.json` 返回正确 JSON
- [ ] 至少 1 个扩展 zip 可以下载
- [ ] 页脚 ICP 备案号正确链接到工信部
- [ ] Lighthouse 评分 ≥ 95（性能/SEO/可访问性/最佳实践）
- [ ] UptimeRobot 监控全部 UP
- [ ] 一键回滚脚本测试通过
- [ ] BangNiCMS 主仓 PR 合并后，本地起一个 BangNiCMS 实例验证后台扩展中心能拉到我们的扩展

---

## 7. 时间线

```
Day 0  →  Day 1  →  Day 2-3  →  Day 4-5  →  Week 1+
─────────────────────────────────────────────────────
[买服务器]
         [DNS 解析]
                   [初始化系统/Docker/Caddy]
                              [推一次 demo dist 验证链路]
                                          [开始 Week 1 编码]
```

---

**文档版本**：v2
**最后更新**：2026-04-27
