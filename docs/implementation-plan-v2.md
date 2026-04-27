# BangNiCMS 官方站 — 实施方案 v2（简化版）

> **版本**：v2（2026-04-27 重定）
> **取代**：[`implementation-plan-v1-archived.md`](./implementation-plan-v1-archived.md)
> **状态**：方向已敲定，可进入编码

---

## 1. 真实需求三条

用户原话：

1. **宣传首页**：讲清楚 BangNiCMS 的优秀功能、为用户创造的价值，吸引用户使用。**静态页面即可**
2. **文档系统**：极简三栏布局（左目录 / 中正文 / 右页内锚点），让用户能找到所有问题的可实操解决方法
3. **扩展市场**：能发布主题/插件/模型的安装包；与 BangNiCMS 后台扩展中心互通（用户从他们自己的 CMS 后台能看到我们发的扩展并安装）

---

## 2. 核心架构（一图说清）

```
┌──────────────────────────────────────────────────────────────┐
│  本仓库 = 单一 Astro 应用 + Starlight 文档主题                │
│  部署：cms.bonnei.com（已备案）                               │
│                                                              │
│  路由分布：                                                   │
│    /                          ← 宣传首页（自定义 Astro 组件）  │
│    /docs/...                  ← 文档站（Starlight 三栏）       │
│    /market                    ← 扩展浏览页（静态生成卡片）     │
│    /api/v1/registry/*.json    ← Registry API（静态 JSON 文件） │
│    /downloads/*.zip           ← 扩展安装包（静态文件）         │
│                                                              │
│  内容来源：                                                   │
│    - 首页文案 → src/pages/index.astro 内联                    │
│    - 文档 MD  → docs-content/zh-CN/**/*.md                   │
│    - 扩展元数据 → packages/index.json                         │
│    - 扩展 zip → packages/<key>/<version>.zip                  │
└──────────────────────────────────────────────────────────────┘
                                ▲ HTTPS
                                │
              ┌─────────────────┴─────────────────┐
              │                                   │
   ┌──────────┴──────────┐         ┌──────────────┴──────────────┐
   │  访客（看官网/文档）  │         │  最终用户的 BangNiCMS 后台    │
   │  → 浏览器 GET 请求    │         │  → 扩展中心拉 /api/v1/...    │
   └─────────────────────┘         └─────────────────────────────┘
```

**就这一个静态站。没有数据库、没有 BangNiCMS 实例、没有 Node.js 进程**。

---

## 3. 技术栈

| 层 | 选型 | 理由 |
|---|---|---|
| **应用框架** | [Astro](https://astro.build/) v5 | 默认零 JS、构建产物纯静态、Markdown 一等公民 |
| **文档主题** | [Starlight](https://starlight.astro.build/) | 三栏布局开箱即用、i18n、全文搜索（Pagefind）、暗黑模式都内置 |
| **样式** | Tailwind CSS + Starlight 主题变量 | 生态最大、与 BangNiCMS admin 主题色保持一致 |
| **首页 UI 组件** | shadcn-ui（按需引入） | 仅用于首页 hero/features 区块；Starlight 自管文档区 |
| **图标** | Lucide | 与 BangNiCMS admin 一致 |
| **包管理** | pnpm | 与 BangNiCMS 主仓一致 |
| **构建产物** | 纯静态 HTML/CSS/JS | 输出到 `dist/` |
| **服务器** | 国内 2C4G + Caddy 2 | Caddy 直接 serve 静态文件 + 自动 HTTPS |
| **域名** | `cms.bonnei.com`（已备案） | 备案省下 1-2 周 |
| **CI/CD** | GitHub Actions → SCP 推送 dist 到服务器 | 简单可靠 |

---

## 4. 仓库目录结构

```
bangnicms-website/
├── README.md
├── docs/                              # ★ 项目自身文档（不是文档站内容）
│   ├── implementation-plan-v2.md      # 本文
│   ├── implementation-plan-v1-archived.md
│   ├── server-domain-icp-checklist-v2.md
│   └── figma-homepage-design-brief-v1.md
│
├── docs-content/                      # ★ 文档站正文（markdown）
│   ├── zh-CN/
│   │   ├── 00-overview/
│   │   │   ├── 01-introduction.md     # 系统介绍
│   │   │   └── 02-features.md         # 功能总览
│   │   ├── 10-getting-started/
│   │   │   ├── 01-installation.md     # 安装部署
│   │   │   ├── 02-first-site.md       # 搭建第一个站
│   │   │   └── 03-troubleshooting.md  # 常见问题
│   │   ├── 20-content-management/
│   │   │   ├── 01-articles.md
│   │   │   ├── 02-products.md
│   │   │   ├── 03-pages.md
│   │   │   └── 04-downloads.md
│   │   ├── 30-multilingual/...
│   │   ├── 40-themes-and-plugins/...
│   │   ├── 50-marketplace/...
│   │   ├── 60-backup-upgrade/...
│   │   └── 90-faq/...
│   └── en-US/                          # 英文版（后续翻译）
│
├── packages/                           # ★ 扩展市场仓库
│   ├── index.json                      # 全部扩展元信息（手工维护）
│   ├── index.zh-CN.json                # 中文版数据（可选，用 i18n）
│   ├── theme-modern-blog/
│   │   ├── 1.0.0.zip
│   │   └── manifest.json               # 与 zip 内 manifest 同步
│   └── plugin-comments/
│       └── 1.0.0.zip
│
├── public/                             # Astro 静态资源
│   ├── favicon.svg
│   ├── og-image.png
│   └── api/v1/registry/                # 自动生成（由构建脚本写入）
│       ├── info.json
│       ├── themes.json
│       ├── plugins.json
│       ├── models.json
│       └── packages/
│           └── <packageKey>.json
│
├── src/
│   ├── pages/
│   │   ├── index.astro                 # 宣传首页
│   │   ├── market/
│   │   │   ├── index.astro             # 扩展市场列表页
│   │   │   └── [packageKey].astro      # 扩展详情页（动态生成）
│   │   └── docs/                       # Starlight 自动接管
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── FeatureGrid.astro
│   │   ├── UseCases.astro
│   │   └── ExtensionCard.astro
│   ├── layouts/
│   ├── styles/
│   │   └── tailwind.css
│   └── content/
│       └── config.ts                   # Astro Content Collections 配置
│
├── scripts/
│   ├── build-registry.mjs              # 从 packages/ 生成 public/api/v1/registry/*.json
│   ├── pack-extension.mjs              # 打包某个扩展为 zip 并更新 index.json
│   └── verify-manifest.mjs             # 校验 manifest 字段合法性
│
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── .env.example
├── .gitignore
├── .editorconfig
├── docker-compose.yml                  # 仅 caddy 一个服务
├── Caddyfile
└── .github/
    └── workflows/
        ├── ci.yml                       # 构建+lint
        └── deploy.yml                   # 推送 dist 到服务器
```

---

## 5. 关键流程

### 5.1 编写新文档

```bash
# 在 docs-content/zh-CN/ 下创建 .md 文件
vim docs-content/zh-CN/20-content-management/01-articles.md

# 本地预览
pnpm dev
# 浏览器打开 http://localhost:4321/docs/content-management/articles
```

文件头部 frontmatter 决定显示：

```markdown
---
title: 文章管理
description: 学习如何创建、编辑、发布文章
sidebar:
  order: 1
---

# 文章管理

正文内容...
```

Starlight 自动生成左侧目录、右侧锚点、面包屑、上下篇导航。

### 5.2 发布新扩展（主题/插件/模型）

```bash
# 1. 把扩展源码（已经通过 BangNiCMS 测试）放到本仓库
mkdir -p packages/theme-modern-blog/src
# ... 拷贝源码 ...

# 2. 编写 manifest.json（按 §6 规范）
cat > packages/theme-modern-blog/manifest.json <<EOF
{
  "extensionKey": "theme-modern-blog",
  "name": "现代博客主题",
  "extensionType": "theme",
  "version": "1.0.0",
  "description": "...",
  ...
}
EOF

# 3. 打 zip
pnpm pack-extension theme-modern-blog

# 4. 自动更新 packages/index.json
# 5. 提交 git
git add packages/
git commit -m "feat(market): 发布 theme-modern-blog 1.0.0"
git push

# 6. CI 自动构建 + 部署到服务器
```

### 5.3 用户的 BangNiCMS 后台如何看到

**前提**：BangNiCMS 主仓需要一个 PR（见 §8），让 `MarketService` 支持配置远程 Registry URL 并合并结果。

```
用户后台扩展中心 → MarketService.listExtensions()
                  ├─ 本地 DB 查询（已有逻辑，标 source: 'local'）
                  └─ 远程拉 https://cms.bonnei.com/api/v1/registry/themes.json
                      （新逻辑，标 source: 'market'，3 秒超时静默降级）
                  └─ 合并结果返回前端

前端展示：本地已装的标"已安装"，远程未装的标"可安装"，点击 → 下载 zip → 走现有 installFromUpload 流程
```

---

## 6. 扩展包 manifest 规范

**沿用主仓 [`extensions.service.ts::installFromUpload`](file:///Volumes/zhangchi/Development/project/nodejs/BangNiCMS/apps/server/src/extensions/extensions.service.ts) 与 [`model-packages.service.ts::installFromUpload`](file:///Volumes/zhangchi/Development/project/nodejs/BangNiCMS/apps/server/src/model-packages/model-packages.service.ts) 的现有校验**。完整字段表见已归档 v1 第 6 章（仍准确，未变）。

要点回顾：

- 主题/插件 → zip 内 `manifest.json`，必填 `extensionKey/name/extensionType/version`
- 模型包 → zip 内 `package.json`（不是 manifest.json），必填 `packageKey/name/version/targetEntity/fieldGroups`
- `extensionKey/packageKey` 必须匹配 `^[a-z][a-z0-9\-_]*$`
- `extensionType ∈ {theme, plugin}`；`targetEntity ∈ {article, product, download, page}`

`packages/index.json` 文件聚合所有扩展的元信息（不含 fieldGroups 等大字段），用于市场列表页 + Registry API 列表端点：

```json
{
  "version": "1.0.0",
  "lastUpdated": "2026-04-27T10:00:00Z",
  "themes": [
    {
      "extensionKey": "theme-modern-blog",
      "name": "现代博客主题",
      "version": "1.0.0",
      "description": "...",
      "previews": [{"url": "/downloads/theme-modern-blog/previews/1.png", "type": "frontend"}],
      "tags": ["博客", "极简"],
      "downloadUrl": "/downloads/theme-modern-blog/1.0.0.zip"
    }
  ],
  "plugins": [...],
  "models": [...]
}
```

构建脚本 `scripts/build-registry.mjs` 在 `astro build` 之前运行，从 `packages/index.json` 派生出：

- `public/api/v1/registry/info.json`
- `public/api/v1/registry/themes.json`
- `public/api/v1/registry/plugins.json`
- `public/api/v1/registry/models.json`
- `public/api/v1/registry/packages/<extensionKey>.json`（详情，含 manifest 全部内容）

---

## 7. Registry API 端点（最终形态）

对齐 BangNiCMS 主仓 `extension-registry-system-design-v1.md` 的端点设计：

| 方法 | 路径 | 实现 | 用途 |
|---|---|---|---|
| GET | `/api/v1/registry/info.json` | 静态 JSON | 心跳 + 总数统计 |
| GET | `/api/v1/registry/themes.json` | 静态 JSON | 主题列表 |
| GET | `/api/v1/registry/plugins.json` | 静态 JSON | 插件列表 |
| GET | `/api/v1/registry/models.json` | 静态 JSON | 模型包列表 |
| GET | `/api/v1/registry/packages/:key.json` | 静态 JSON | 单个扩展完整详情 |
| GET | `/downloads/<key>/<version>.zip` | 静态文件 | 安装包下载 |

> ⚠️ **与原设计文档的小差异**：原设计端点是 `/api/v1/registry/themes`（无 `.json` 后缀）。我们用 `.json` 后缀因为是真静态文件，主仓 `MarketService` 对接时拼接 URL 时需注意。如主仓那边坚持无后缀，可在 Caddy 加 rewrite `/api/v1/registry/(\w+)` → `/api/v1/registry/$1.json` 兼容。

**筛选/分页/搜索** 全部由前端（用户后台或我们的 /market 页）拉到完整列表后客户端处理 — 数据量级（百级扩展）完全够用，不需要服务端动态过滤。

---

## 8. 与 BangNiCMS 主仓的协作（唯一一个 PR）

主仓 `MarketService` 现状（已读源码确认）：

- 列表逻辑已有，标记 `source: 'local'`
- 注释明确：「未来接入远程 Registry 时只需在此处合并远程结果并标记 source: 'market'」

**我们要发的 PR 内容**：

1. 在 `SiteConfig` 加字段 `registryUrl?: string`（默认 `https://cms.bonnei.com`）
2. 在 `MarketService` 加方法 `fetchRemoteRegistry(type)`：HTTP GET registryUrl + `/api/v1/registry/<type>.json`，3 秒超时，失败静默返回 []
3. 在 `listExtensions/listModelPackages` 内合并远程结果，标记 `source: 'market'`
4. 在 admin 后台 → 站点设置 → 扩展中心增加「Registry 地址」配置项
5. E2E 测试：mock 远程响应 + 验证合并结果 + 验证降级

**预估工作量**：1-2 天。属于「为对接官方 Registry 服务做的客户端增强」，符合主仓接受度。

---

## 9. 实施路线图

### Week 1：脚手架 + 内容架构

**目标**：本地能跑出空壳站，结构对齐

- [ ] 用 `pnpm create astro@latest --template starlight` 初始化
- [ ] 接入 Tailwind + 主题色变量（与 BangNiCMS admin 一致 `#0EA5E9`）
- [ ] 配置 i18n（zh-CN 默认 + en-US 占位）
- [ ] 写 `astro.config.mjs`（Starlight 配置 + sidebar 自动生成规则）
- [ ] 写 `scripts/build-registry.mjs`（先返回空数据）
- [ ] 写 `Caddyfile` + `docker-compose.yml`
- [ ] 本地 `pnpm dev` 跑通；`pnpm build && docker compose up` 跑通

**交付**：仓库可启动，访问 `localhost` 能看到 Starlight 默认 demo 文档

### Week 2：宣传首页

**目标**：首页按 [Figma brief](./figma-homepage-design-brief-v1.md) 实现

- [ ] 写 `src/components/Hero.astro`（按 brief §3.2）
- [ ] 写 `src/components/TrustStrip.astro`（§3.3）
- [ ] 写 `src/components/FeatureGrid.astro`（§3.4，8 个特性卡片）
- [ ] 写 `src/components/UseCases.astro`（§3.5，4 个场景）
- [ ] 写 `src/components/ComparisonTable.astro`（§3.6）
- [ ] 写 `src/components/QuickStart.astro`（§3.7，含代码块复制）
- [ ] 写 `src/components/FinalCTA.astro`（§3.9）
- [ ] 写 `src/components/Footer.astro`（§3.10，含 ICP 备案号）
- [ ] 整合到 `src/pages/index.astro`
- [ ] 移动端响应式微调
- [ ] Lighthouse 跑分 ≥ 95（性能/SEO/可访问性）

**交付**：完整首页，桌面 + 移动端均可读

### Week 3：文档系统初稿

**目标**：核心文档全部首版完成

- [ ] 设计 sidebar 结构（按 §4 仓库目录里的分组）
- [ ] AI 编写 ~30 篇核心文档：
  - 系统介绍（2 篇）
  - 快速开始（3 篇：安装/初始化/排错）
  - 内容管理（4 篇）
  - 多语言（3 篇）
  - 主题与插件（4 篇）
  - 扩展市场（3 篇）
  - 备份与升级（3 篇）
  - FAQ（5 篇）
- [ ] 每篇文档配实操步骤 + 截图
- [ ] Pagefind 全文搜索索引构建（Starlight 内置）
- [ ] 校对一遍

**交付**：30+ 篇可实操的中文文档，左目录右锚点全部正常

### Week 4：扩展市场前台 + Registry API

**目标**：市场页可用 + 主仓 PR 提交

- [ ] 写 `scripts/pack-extension.mjs`（打包脚本）
- [ ] 写 `scripts/verify-manifest.mjs`（manifest 校验）
- [ ] 写 `src/pages/market/index.astro`（卡片列表 + 筛选 + 搜索）
- [ ] 写 `src/pages/market/[packageKey].astro`（详情页 + 预览图轮播 + 安装命令）
- [ ] 完善 `scripts/build-registry.mjs`，输出全部端点 JSON
- [ ] 准备 1-2 个 demo 扩展（可以先用主仓 `theme-export-basic` 重新打包做样品）
- [ ] **向 BangNiCMS 主仓发 PR**：MarketService 远程合并能力（§8）
- [ ] 在主仓本地启动 BangNiCMS（用主仓的 docker-compose）+ 配置 `registryUrl=http://host.docker.internal:8080` 验证后台能看到我们发的扩展

**交付**：访客可在 `cms.bonnei.com/market` 浏览扩展；主仓 PR 进入 review

### Week 5：上线生产 + CI/CD

**目标**：生产可访问 cms.bonnei.com

- [ ] 服务器初始化（见 [server-domain-icp-checklist-v2.md](./server-domain-icp-checklist-v2.md)）
- [ ] DNS 解析 cms.bonnei.com → 服务器 IP
- [ ] 部署 Caddy + 自动 HTTPS
- [ ] GitHub Actions：push to main → build → SCP 推 dist → 服务器 reload
- [ ] UptimeRobot 监控
- [ ] 日志告警
- [ ] 整体 QA + 修 bug
- [ ] 正式公告上线

**交付**：访问 https://cms.bonnei.com 可以看到首页、文档、市场

---

## 10. 风险清单

| 风险 | 概率 | 影响 | 缓解 |
|---|---|---|---|
| Starlight 默认 UI 与 Figma 设计冲突 | 中 | 文档站和首页风格不统一 | 用 Starlight 主题覆盖机制改 CSS 变量；首页保留独立设计 |
| 主仓 PR 不被接受或合并慢 | 中 | 用户后台暂时拉不到我们的扩展 | 短期：用户可通过文档教程"手动下载 zip + admin UI 上传"安装；长期等合并 |
| 文档量大、AI 编写质量参差 | 高 | 影响用户找解决方案 | 每篇文档建立"实操可重现"验收标准（用户照做能跑通） |
| 备案被吊销（域名过期或主体变更） | 低 | 站点不可访问 | 域名续费提醒 + 备案信息变更时提前 30 天向云厂商申报 |
| 服务器被攻击 | 中 | 站点宕机 | Caddy 限流 + fail2ban；重要数据全部在 git 仓库无丢失风险 |

---

## 11. 长期演进路线（不在 v2 范围）

- **v2.1**：英文版文档全量翻译（约 2 周）
- **v2.2**：博客模块（在 Starlight 基础上加 `src/pages/blog/`，存放更新公告/案例分享）
- **v2.3**：扩展市场加用户评论/评分（需要后端，到时再考虑接 BangNiCMS）
- **v2.4**：AI 文档助手（前端调 LLM API 帮访客回答"怎么做 X"）
- **v3**：如需要后台可视化运营文档，再接 BangNiCMS dogfooding

---

## 12. 当前状态与下一步

| Step | 状态 | 备注 |
|---|---|---|
| 1. 创建项目目录与 README | ✅ | 已完成 |
| 2. 撰写实施方案 v1 | ✅ | 已归档 |
| 3. 调研主仓现状 | ✅ | 6 项差异已记录在 v1 §11.4 |
| 4. 对齐 manifest 标准 | ✅ | v1 §6 仍有效 |
| 5. 服务器/域名/备案 | ⏳ | 域名 cms.bonnei.com 已备案；待买服务器（见 v2 checklist） |
| 6. Figma 首页设计稿 | ⏳ | brief 已交付，待设计师产出稿 |
| 7. **架构方向决策** | ✅ | **简化方案 + 国内服务器，2026-04-27 拍板** |
| 8. Week 1 脚手架编码 | ⏳ | 等服务器就绪 + Figma 稿到位后启动 |

---

## 附录 A：本文档维护规则

- 每个 Week 完成后，更新 §9 路线图状态
- 决策变更追加而非删除（v2 → v2.1 → v2.2...）
- 大版本架构变更升级到 v3（保留 v2 归档）
- 实施期间发现现状与文档不符，必须先更新文档再编码
