# BangNiCMS 官方站（bangnicms-website）

> [BangNiCMS](https://github.com/miaochi998/BangNiCMS) 的**官方宣传站 + 文档站 + 扩展市场**
> 生产域名：[https://cms.bonnei.com](https://cms.bonnei.com)（已备案）

---

## 这是什么

一个**单一 Astro + Starlight 静态站**，承担 3 件事：

| 角色 | URL | 内容来源 |
|---|---|---|
| **宣传首页** | `/` | `src/pages/index.astro`（硬编码组件） |
| **文档站** | `/docs/*` | `docs-content/zh-CN/**/*.md` 与 `en-US/`（Markdown） |
| **扩展市场** | `/market/*` 与 `/api/v1/registry/*.json` | `packages/index.json` + 各扩展 zip |

**架构特点**：

- 整站构建为静态文件（无数据库、无后端进程、无 BangNiCMS 实例）
- Caddy 直接 serve `dist/`，自动 HTTPS
- 内容更新 = 改 markdown / json → git push → CI 自动部署
- 用户的 BangNiCMS 后台扩展中心通过 HTTP 拉本站 `/api/v1/registry/*.json` 看到我们发布的扩展

---

## 与 BangNiCMS 主仓的关系

**唯一接触点**：本站对外暴露 `/api/v1/registry/*.json` 静态端点，BangNiCMS 主仓的 `MarketService` 通过 HTTP 拉取并合并到本地扩展列表（需要主仓接受一个 PR，详见 [`implementation-plan-v2.md`](./docs/implementation-plan-v2.md) §8）。

```
┌──────────────────────────┐         ┌──────────────────────────────┐
│  本仓库（这里）            │         │  BangNiCMS 主仓               │
│  bangnicms-website        │         │  miaochi998/BangNiCMS         │
│                          │         │                              │
│  Astro + Starlight       │         │  发镜像到 GHCR                │
│  Caddy 静态托管           │         │  最终用户自己部署              │
│  domain: cms.bonnei.com  │  ◄──────┤  在他们的后台扩展中心          │
│                          │  HTTP    │  拉本站 Registry API           │
└──────────────────────────┘         └──────────────────────────────┘
       (我们维护)                              (我们不部署它)
```

---

## 仓库结构

```
bangnicms-website/
├── docs/                       # 项目自身文档（本目录的 README 也在 docs/）
│   ├── implementation-plan-v2.md          ← 主实施方案
│   ├── server-domain-icp-checklist-v2.md
│   ├── figma-homepage-design-brief-v1.md
│   └── *-archived.md                       ← 历史决策归档
├── docs-content/               # 文档站正文（Markdown）
├── packages/                   # 扩展市场（zip + 元数据）
├── src/                        # Astro 应用源码（Week 1 起加入）
├── public/                     # Astro 静态资源
├── scripts/                    # 构建辅助脚本
├── Caddyfile                   # 生产 Caddy 配置
├── docker-compose.yml          # 仅 caddy 一个服务
├── .env.example
└── package.json                # Week 1 起加入
```

---

## 当前进展

| 阶段 | 状态 | 文档 |
|---|---|---|
| 立项 + 方案设计 | ✅ 已完成 | [`docs/implementation-plan-v2.md`](./docs/implementation-plan-v2.md) |
| 服务器/域名/部署清单 | ✅ 已就绪 | [`docs/server-domain-icp-checklist-v2.md`](./docs/server-domain-icp-checklist-v2.md) |
| 首页设计 brief | ✅ 已就绪 | [`docs/figma-homepage-design-brief-v1.md`](./docs/figma-homepage-design-brief-v1.md) |
| Week 1：脚手架 | ⏳ 待启动 | 等服务器 + Figma 稿 |
| Week 2：宣传首页 | ⏳ | |
| Week 3：文档系统 | ⏳ | |
| Week 4：扩展市场 + 主仓 PR | ⏳ | |
| Week 5：上线 cms.bonnei.com | ⏳ | |

---

## 本地启动（Week 1 启动后才有效）

```bash
# 安装依赖
pnpm install

# 本地开发（http://localhost:4321）
pnpm dev

# 生产构建
pnpm build

# 本地预览生产构建
pnpm preview
```

## 服务器部署（Week 5 启动后才有效）

```bash
# 在服务器上一次性初始化
git clone https://github.com/<user>/bangnicms-website.git /opt/bangnicms-website
cd /opt/bangnicms-website
cp .env.example .env  # 编辑填入 ADMIN_EMAIL
docker compose up -d

# 后续部署由 GitHub Actions 自动完成
```

---

## 历史

- 2026-04-27 立项 + v1 方案（用 BangNiCMS 主题+插件搭整站）→ 经讨论简化
- 2026-04-27 v2 方案敲定：单 Astro 静态站 + Caddy 部署，工程量从 12 周缩到 4-5 周

旧 v1 方案归档在 `docs/*-archived.md`，可作为决策历史参考。
