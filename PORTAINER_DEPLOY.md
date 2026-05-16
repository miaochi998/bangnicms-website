# BangNiCMS 官方站 · Portainer 堆栈部署手册

> **目标**：将本仓库部署到阿里云服务器 `59.110.232.205` · 通过域名 `www.bonnei.com` 访问 · 自动 HTTPS
>
> **预计耗时**：5-10 分钟（首次 build 含 npm install + astro build）

---

## 前置准备 · 必须先完成

### 1. 阿里云安全组放行 3 个端口

登录阿里云控制台 → ECS → 安全组 → 入方向 → 添加规则：

| 协议 | 端口 | 来源 | 说明 |
|---|---|---|---|
| TCP | 80 | 0.0.0.0/0 | HTTP（Caddy 自动跳转 HTTPS）|
| TCP | 443 | 0.0.0.0/0 | HTTPS |
| UDP | 443 | 0.0.0.0/0 | HTTP/3（可选 · 性能优化）|

**验证**：SSH 登录服务器执行 `ss -tlnp | grep -E ':80|:443'` 部署前应无 listener（部署后会有）

### 2. 验证域名解析

本地终端执行：

```bash
ping www.bonnei.com
# 期望看到：PING www.bonnei.com (59.110.232.205): ...
```

若 IP 不对 → 回阿里云 / DNS 服务商修正 A 记录。

### 3. 确认 Portainer 可登录

浏览器打开 `https://59.110.232.205:41943` → 跳过证书警告 → 用 `miaochi / Miaochi198106!@#` 登录 → 进 Dashboard。

---

## 部署步骤（4 步）

### 步骤 1 · Portainer 添加 Stack

1. 左侧菜单 → **Stacks** → 右上角 **+ Add stack**
2. **Name** 填：`bangnicms-website`
3. **Build method** 选 **Repository**

### 步骤 2 · 填仓库信息

| 字段 | 值 |
|---|---|
| **Repository URL** | `https://github.com/miaochi998/bangnicms-website.git` |
| **Repository reference** | `refs/heads/main` |
| **Compose path** | `docker-compose.portainer.yml` |
| Authentication | 关闭（公开仓库无需）|
| Automatic updates | 暂关（首次部署稳定后再开 webhook 自动更新）|

### 步骤 3 · 填环境变量

滚到 **Environment variables** 区域 → 点 **Add environment variable** 2 次：

| Name | Value |
|---|---|
| `DOMAIN` | `www.bonnei.com` |
| `ADMIN_EMAIL` | `你的邮箱`（用于 Let's Encrypt 证书续期通知 · 例如 `admin@bonnei.com`）|

### 步骤 4 · 点 Deploy the stack

按钮变 **Deployment in progress...**：

| 时间段 | 阶段 |
|---|---|
| 0-30 秒 | Portainer git clone 本仓库 |
| 30-180 秒 | Docker build · pull node:22-alpine + caddy:2-alpine 镜像（~250MB） |
| 180-300 秒 | `pnpm install` 装依赖 · `pnpm build` 构建 89 个页面 |
| 300-360 秒 | 启动 caddy 容器 · 申请 Let's Encrypt 证书 |

部署成功后 `bangnicms-website` 显示 **Active** · 1 个容器 `bangnicms-website` 运行中。

---

## 验证

### 1. Portainer 看容器状态

左侧 → **Containers** → 找到 `bangnicms-website` → 状态应是 **healthy ✓**

若状态是 unhealthy → 点容器名 → **Logs** 看报错。

### 2. 浏览器访问

```
https://www.bonnei.com
```

期望看到 **BangNiCMS 宣传首页**。

### 3. 命令行验证 HTTPS

任意机器执行：

```bash
curl -I https://www.bonnei.com
```

期望：
```
HTTP/2 200
content-type: text/html
strict-transport-security: max-age=...
```

### 4. 验证子路径

| URL | 期望 |
|---|---|
| `https://www.bonnei.com/` | 宣传首页 |
| `https://www.bonnei.com/docs/` | 文档站（13 章节）|
| `https://www.bonnei.com/api/v1/registry/themes.json` | JSON 数据（扩展市场 Registry API）|

---

## 后续内容更新流程

1. 本地编辑 markdown / 组件 → `git add + commit + push origin main`
2. Portainer → Stacks → bangnicms-website → 右上角 **Pull and redeploy** → 等 2-5 分钟自动 build + 重启
3. 浏览器强刷验证

**自动更新（可选）**：Portainer stack 配置 → 开启 **Automatic updates** → 复制 webhook URL → GitHub repo Settings → Webhooks → 粘贴 URL · 后续 push 自动触发 redeploy。

---

## 故障排查

### 部署失败：`pnpm install` 超时

国内服务器拉 npm 包慢 · 改用国内镜像：

进 Portainer → 容器 `bangnicms-website` 失败 → 直接 SSH 服务器执行：

```bash
# 1) 进入 Portainer 拉取的仓库目录（通常在 /data/compose/<stack-id>/）
cd /data/compose/
ls   # 找到 bangnicms-website 对应目录

# 2) 编辑 Dockerfile · 在 pnpm install 前加 registry
# RUN pnpm config set registry https://registry.npmmirror.com && pnpm install --frozen-lockfile
```

或在 Portainer stack 配置 → 环境变量加 `NPM_CONFIG_REGISTRY=https://registry.npmmirror.com`（需 Dockerfile 配合 · 暂未配 · 优先用上方手改）。

### Caddy 证书申请失败 `obtain certificate failed`

最常见原因：
1. 80 / 443 端口未开放（回到「前置准备 1」检查阿里云安全组）
2. DNS 还没生效（执行 `dig www.bonnei.com` 看 A 记录）

确认无误后：

```bash
docker logs bangnicms-website --tail 60
```

看到 `obtained certificate` → 成功。
看到 `connection refused` / `timeout` → 80 / 443 阻塞。

### 改了内容 · `Pull and redeploy` 后没生效

Docker 镜像可能用了旧 layer 缓存。在 Portainer redeploy 时：
- 勾选 **Re-pull image and redeploy**
- 勾选 **Prune services**（可选）

或 SSH 强制重建：

```bash
cd /data/compose/<stack-id>
docker compose -f docker-compose.portainer.yml build --no-cache
docker compose -f docker-compose.portainer.yml up -d
```

### 想完全重新部署（清空证书与日志）

```bash
# 1) Portainer 删 stack
#    Stacks → bangnicms-website → Delete

# 2) 删 named volume（含 Let's Encrypt 证书 · 一周限流 5 次 · 谨慎）
docker volume rm bangnicms-website-caddy-data
docker volume rm bangnicms-website-caddy-config
docker volume rm bangnicms-website-caddy-logs

# 3) 回 Portainer 重新走步骤 1-4
```

⚠️ Let's Encrypt 同域名一周限 5 次证书申请 · 避免反复删 caddy_data。

---

## 部署完成后的文件位置

| 内容 | 位置 |
|---|---|
| 仓库代码（Portainer git clone）| `/data/compose/<stack-id>/`（具体路径见 Portainer stack 详情）|
| Caddy 证书 + ACME 账户 | Docker volume `bangnicms-website-caddy-data` |
| Caddy 运行时配置 | Docker volume `bangnicms-website-caddy-config` |
| 访问日志（JSON · 100MB 滚动）| Docker volume `bangnicms-website-caddy-logs` |
| 容器 stdout/stderr | `docker logs bangnicms-website` |

---

## 检查清单（部署前最后核对）

- [ ] 阿里云安全组 80 / 443 TCP + 443 UDP 已放行
- [ ] `ping www.bonnei.com` 返回 59.110.232.205
- [ ] Portainer 能登录 https://59.110.232.205:41943
- [ ] 已准备好 `ADMIN_EMAIL`（接收证书续期通知的邮箱）
- [ ] 已在 Portainer Stack Repository 表单内填好仓库 URL + main 分支 + `docker-compose.portainer.yml` compose path

✅ 全部核对完毕 → 点 **Deploy the stack** 开干。

---

## 仓库内对应文件

| 文件 | 作用 |
|---|---|
| `Dockerfile` | Multi-stage build（Node 22 → Caddy 2-alpine）|
| `docker-compose.portainer.yml` | Portainer Repository 模式专用 compose |
| `docker-compose.yml` | 本地手动 / SSH 直接部署用（挂载本地 dist · 非 Portainer 路径）|
| `.dockerignore` | 排除 node_modules / dist / .git 加速 build |
| `Caddyfile` | 静态托管 + HTTPS + CORS + 缓存策略 |
| `astro.config.mjs` | site URL `https://www.bonnei.com` |
| `.env.example` | 环境变量模板（DOMAIN / ADMIN_EMAIL）|

仓库 commit `f82bd0f` 已 push 到 `origin/main` · Portainer 拉的就是这个版本。

---

**版本**：v1.0
**创建日期**：2026-05-16
**作者**：BangNiCMS 主线开发协作（Cascade）
