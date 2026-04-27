# BangNiCMS 官方宣传站 + 文档站 + 扩展市场 — 实施方案 v1

> **版本**：v1（2026-04-27 立项）
> **范围**：本项目 `bangnicms-website` 的完整实施蓝本
> **状态**：方案设计中（未开始编码）

---

## 0. 阅读须知

本文档面向**项目所有者 + 未来执行的 Cascade（AI 编码助手）会话**，是后续所有开发决策的唯一可信源。

读完本文档后，你应该能回答这三个问题：
1. 这个项目要做什么、不做什么？
2. 怎么不动 BangNiCMS 主仓代码就实现宣传站？
3. 8-10 周分期路线每周做什么？

---

## 1. 项目目标与定位

### 1.1 三大功能板块

| 板块 | URL | 目标 |
|---|---|---|
| **宣传站（首页）** | `/` | 让访客 30 秒内理解 BangNiCMS 是什么、能解决什么问题、为什么选它 |
| **文档站** | `/docs/*` | **非技术用户**完全照做就能完成部署、配置、运营 |
| **扩展市场** | `/market/*` | 公开浏览/下载官方主题/插件/模型，并为所有 BangNiCMS 实例提供 Registry API |

### 1.2 不做的事

- ❌ 不做用户注册 / 登录（全部免费、无认证）
- ❌ 不做收费 / 订阅 / 支付
- ❌ 不做第三方扩展开发者平台（**只允许官方上架扩展**）
- ❌ 不做扩展评价 / 评论 / 评分系统
- ❌ 不做 BangNiCMS 主体功能（这部分是 BangNiCMS 主仓的事）

### 1.3 目标用户

| 用户类型 | 来源 | 需求 |
|---|---|---|
| **潜在使用者** | 通过搜索 / 推荐进入 | 看首页判断要不要用 → 看文档判断能不能用 → 试用 |
| **正在使用者** | BangNiCMS 后台跳转 / 主动访问 | 查文档解决具体问题 → 装新扩展 |
| **国内站长** | 主要用户群 | 中文文档、国内服务器、备案合规 |
| **外贸独立站经营者** | 次要用户群 | 多语言、海外部署、SEO |

---

## 2. 核心约束（不可违反）

### 2.1 项目隔离约束（最重要）

> **本项目目录 `bangnicms-website` 绝不修改 BangNiCMS 主仓 `BangNiCMS` 任何源代码**。

含义：
- ❌ 不 fork BangNiCMS 主仓
- ❌ 不在主仓加宣传站专用代码
- ❌ 不让宣传站需求干扰主仓的版本节奏
- ✅ 只把 BangNiCMS 当作"基础平台"使用（拉 GHCR 镜像）
- ✅ 一切宣传站特性都通过**主题、插件、内容**实现

**唯一例外**：BangNiCMS 主仓 `MarketService` 需要增加一个配置项 `REGISTRY_URL` 让客户端能消费远程 Registry。这是个对所有用户都有益的通用改动，不是宣传站专用代码。

**违反后果**：BangNiCMS 主仓变成"私货分支"，无法继续作为通用 CMS 提供给其他用户。

### 2.2 dogfooding 约束

> **本站必须用 BangNiCMS 自己搭建**。

含义：
- ✅ 访客打开 `cms.bangni.com` 看到的就是 BangNiCMS 的产品力
- ✅ 文档站本身是个"用 BangNiCMS 搭文档站"的最佳示例
- ✅ 扩展市场本身展示了 BangNiCMS 的扩展能力
- ✅ BangNiCMS 升级时本站立即吃到（自动验证主仓 quality）

**违反后果**：失去最强营销价值，访客会问"你自己都不用，凭啥让我用？"

### 2.3 文档质量约束

> **文档必须能让非技术用户照做完成部署**。

含义：
- 每一步有截图、有命令、有预期结果
- 命令行支持一键复制
- 出错处理（"如果你看到 X，请做 Y"）
- 移动端可读（用户可能边看手机边敲电脑）

**违反后果**：用户卡在部署阶段流失，挫败感传播负面口碑。

### 2.4 节奏约束

> **不赶时间，质量第一**。

允许 8-10 周节奏，每个里程碑做完才进下一个，宁可延后不发半成品。

---

## 3. 整体架构

### 3.1 系统拓扑

```
┌────────────────────────────────────────────────────────────────┐
│ 国内服务器（备案后的独立云主机，cms.bangni.com）                  │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Caddy（反向代理 + 自动 HTTPS）                            │ │
│  └─────────────────┬────────────────┬──────────────────────┘ │
│                    │                │                         │
│            ┌───────▼──────┐  ┌──────▼───────┐                │
│            │ web (6532)   │  │ admin (6534)  │                │
│            │ 前台主题渲染  │  │ 后台管理      │                │
│            │ official-site│  │ （仅团队访问）│                │
│            └──────┬───────┘  └──────┬───────┘                │
│                   │                 │                         │
│            ┌──────▼─────────────────▼──────┐                │
│            │ server (6530) — BangNiCMS 后端 │                │
│            │ + 安装的插件：                  │                │
│            │   - registry-api（暴露 /reg…）│                │
│            │   - docs-enhanced（文档辅助） │                │
│            └──────┬─────────────────────────┘                │
│                   │                                          │
│            ┌──────▼──────────┐    ┌────────────────────┐    │
│            │ postgres + redis │    │ 持久化卷             │    │
│            └─────────────────┘    │ /data/storage      │    │
│                                   │ /data/extensions   │    │
│                                   └────────────────────┘    │
└────────────────────────────────────────────────────────────────┘
                          ▲
                          │ /registry/* 公开 API（无鉴权）
                          │
┌─────────────────────────┴──────────────────────────────────┐
│ 全球各处用户部署的 BangNiCMS 实例                            │
│ 通过 REGISTRY_URL=https://cms.bangni.com 拉远程扩展列表      │
└────────────────────────────────────────────────────────────┘
```

### 3.2 部署形态

完全沿用 BangNiCMS 现有的 docker-compose 部署（v0.2.4 已稳定）：

```yaml
# bangnicms-website/docker-compose.yml（示意）
services:
  postgres: { image: postgres:17-alpine }
  redis:    { image: redis:7-alpine }
  server:
    image: ghcr.io/miaochi998/bangnicms-server:latest
    volumes:
      # 把本仓库的主题/插件/扩展源码挂进容器
      - ./themes:/data/storage/themes
      - ./plugins:/data/storage/plugins
      - ./extensions-source:/data/storage/extensions-uploads
  web:    { image: ghcr.io/miaochi998/bangnicms-web:latest }
  admin:  { image: ghcr.io/miaochi998/bangnicms-admin:latest }
  caddy:  { image: caddy:2-alpine }
```

**关键差异 vs 普通用户部署**：本项目额外挂载 `themes/` 和 `plugins/` 目录，这样我们开发的主题/插件可以直接被 BangNiCMS 加载（不必每次打 zip 安装）。开发期开发友好，发布后这些产物会通过正常上传打包发出去。

---

## 4. BangNiCMS 现状能力盘点

### 4.1 已具备的能力（无需任何修改）

| 能力 | 来源模块 | 用于本项目的什么场景 |
|---|---|---|
| **主题系统** | `themes/` + 主题加载器 | 官网主题、文档主题 |
| **插件系统** | `extensions/` + 插件绑定 | Registry 插件、文档增强插件 |
| **文章 + 分类** | `articles/` + `categories/` | 文档系统的内容载体 |
| **媒体管理** | `media/` + 上传策略 | 截图、视频、扩展包 |
| **扩展安装/卸载** | `extensions/` (1694 行) | 客户端装我们发布的扩展 |
| **模型包系统** | `model-packages/` | 客户端装我们发布的模型 |
| **MarketBrowser 组件** | admin 内嵌 | 客户端浏览市场 |
| **下载模块** | `downloads/` | 扩展 zip 文件分发 |
| **多语言** | `i18n/` + `languages/` | 中英双语首页 / 文档 |
| **SEO** | sitemap + meta + 结构化数据 | 搜索引擎收录 |

### 4.2 已具备但只是"占位"的能力

| 能力 | 现状 | 本项目要做什么 |
|---|---|---|
| **市场聚合 API**（`MarketService`） | 只读本地 DB、注释中标 `source: 'local'` | 让本站这一侧成为远程 Registry 数据源 |
| **客户端市场对接远程** | `MarketService` 注释明确预留 | 在主仓微调（增加 `REGISTRY_URL` 配置项） |

### 4.3 现有设计文档（已就绪，可复用）

| 文档（位于 BangNiCMS 主仓） | 行数 | 价值 |
|---|---|---|
| `docs/sketches/extension-registry-system-design-v1.md` | 464 | Registry 系统设计（架构 / API / 上架流程） |
| `docs/sketches/phase-eight-model-marketplace-development-spec-v1.md` | 777 | 模型市场详细规格（含客户端实现） |
| `docs/sketches/builtin-theme-and-frontend-rendering-architecture-v1.md` | 1050 | 主题系统架构 |

> **行动项**：本项目实施前必须重读上述 3 篇文档，标出与最新想法不一致的地方，必要时在本文档第 11 章「已知差异」中记录调整。

---

## 5. 需要新增的核心物件（3 件）

本项目需要新做的只有 3 件东西，全部位于本仓库内、不污染主仓：

### 5.1 官网主题 `official-site`

**职责**：提供首页营销 + 整体品牌一致的页头/页脚 + 文档站外壳 + 市场页面外壳。

**目录结构**（参考 BangNiCMS 主题约定）：
```
themes/official-site/
├── manifest.json                    # 主题元信息
├── README.md
├── pages/
│   ├── home.tsx                     # 首页（营销）
│   ├── docs.tsx                     # 文档列表 / 文章
│   ├── market.tsx                   # 扩展市场列表
│   └── market-detail.tsx            # 扩展详情页
├── components/
│   ├── HeroSection.tsx              # 首页大图区
│   ├── FeatureGrid.tsx              # 功能卡片
│   ├── UseCaseSection.tsx           # 使用场景
│   ├── DocSidebar.tsx               # 文档侧边栏（带 TOC）
│   ├── DocPager.tsx                 # 上一页 / 下一页
│   ├── CodeBlock.tsx                # 代码块（高亮 + 一键复制）
│   ├── ExtensionCard.tsx            # 扩展卡片
│   └── SearchBox.tsx                # 全文搜索框
├── styles/                          # Tailwind / CSS Modules
└── locales/                         # 中英文案
    ├── zh-CN.json
    └── en-US.json
```

**复用现有能力**：内容来自 `articles` + `categories` + `extensions` + `model-packages`，主题只负责"渲染"。

### 5.2 Registry API 插件 `registry-api`

**职责**：在本站的 BangNiCMS 实例上额外暴露 `/registry/*` 公开 API，让全球的 BangNiCMS 客户端都能 fetch 我们的扩展列表。

**新增端点**（无鉴权、可 CDN 缓存 30 分钟）：

```
GET  /registry/extensions
     ?type=theme|plugin&search=&page=&size=
     → 返回扩展列表（脱敏后的公开元信息）

GET  /registry/extensions/:id
     → 扩展详情（含截图、changelog、版本列表）

GET  /registry/extensions/:id/versions/:ver/download
     → 返回 zip 流（或 302 到 OSS / CDN）

GET  /registry/model-packages
GET  /registry/model-packages/:packageKey
GET  /registry/model-packages/:packageKey/download

GET  /registry/manifest
     → 全部扩展元数据（用于客户端 list 缓存）
```

**目录结构**：
```
plugins/registry-api/
├── manifest.json
├── README.md
├── src/
│   ├── controllers/
│   │   └── registry.controller.ts   # 路由
│   ├── services/
│   │   └── registry.service.ts      # 数据查询 + 缓存
│   └── index.ts                     # 插件入口
└── tests/
    └── registry.spec.ts
```

**关键设计**：
- 完全只读，不接受任何写操作
- 速率限制（用 nestjs-throttler，per IP 100/min）
- Redis 缓存 list 30 分钟
- 文件下载从 BangNiCMS 自带 storage（`/data/storage/extensions-uploads/`）取
- ETag + Cache-Control 友好

### 5.3 文档增强插件 `docs-enhanced`

**职责**：为文档站提供搜索索引、版本管理、反馈机制。

**功能**：
1. **全文搜索**：构建 Pagefind 静态索引（每次 articles 更新后异步重建）
2. **版本切换**：通过 categories 的 slug 约定（如 `docs/v0.2/`、`docs/v1.0/`）实现版本归档
3. **反馈按钮**：每篇文档底部"找到错误？"按钮，跳转到 GitHub Issues 模板

**目录结构**：
```
plugins/docs-enhanced/
├── manifest.json
├── src/
│   ├── search/
│   │   ├── pagefind-builder.ts      # 监听 article 变更触发索引重建
│   │   └── search.controller.ts     # 提供 /api/search 端点
│   └── feedback/
│       └── feedback-link.ts         # 渲染反馈按钮的辅助函数
└── README.md
```

---

## 6. 扩展包标准（manifest 规范，已对齐主仓现状）

> **2026-04-27 更新**：本章已根据 BangNiCMS 主仓 `extensions.service.ts::installFromUpload` 和 `model-packages.service.ts::installFromUpload` 的实际校验逻辑重写，可直接执行。

### 6.1 扩展包（主题 / 插件）

#### 6.1.1 文件名与必填字段

- **元信息文件**：`manifest.json`（位于 zip 根目录）
- **必填**：`extensionKey` `name` `extensionType` `version`
- **校验规则**：
  - `extensionKey` 必须匹配 `^[a-z][a-z0-9\-_]*$`（小写字母开头，仅含字母数字 `-` `_`）
  - `extensionType` ∈ `theme | plugin`
  - 仅支持 `.zip` 包格式
  - 上传的扩展永远不能伪造为 `isBuiltin: true`

#### 6.1.2 完整字段表

```jsonc
{
  // ── 必填 ──
  "extensionKey":  "theme-official-site",       // 全局唯一，匹配上述正则
  "name":          "BangNiCMS 官网主题",         // 单语言字符串（运营语言）
  "extensionType": "theme",                       // theme | plugin
  "version":       "1.0.0",

  // ── 可选基础元信息 ──
  "description":   "BangNiCMS 官网与文档站使用的内置主题",
  "author":        "BangNiCMS Official",
  "changelog":     "## 1.0.0\n初始发布\n",
  "tags":          ["官方", "内置"],               // string[]，存为 JSON

  // ── 营销/市场展示元信息 ──
  "marketingMeta": {                              // object，存为 JSON
    "targetIndustries": ["通用"],                 // 行业筛选 tag
    "comingSoon":       false,                    // true 时不在市场列出
    "highlights":       ["完整渲染", "中英双语"]
  },

  // ── 预览图组 ──
  "previews": [                                   // BangNiCmsPreviewImage[]
    { "url": "previews/home.png",   "caption": "首页效果", "type": "frontend" },
    { "url": "previews/docs.png",   "caption": "文档页",   "type": "frontend" }
  ],

  // ── 用户可改的运营配置 ──
  "config":       { "primaryColor": "#0EA5E9" },  // 默认配置
  "configSchema": { /* JSON Schema 描述运营可配字段 */ }
}
```

> ⚠️ **与设计文档差异**：现状 `name`/`description` 是单语言字符串，没有 `id` / `type` / `minSystemVersion` / `dependencies` / 嵌套 `theme.{...}` 等字段。多语言显示和版本兼容声明属于**未来扩展点**，未在主仓校验中实现。如本项目实施确需，应**先在主仓加字段**再在此处使用，禁止在 plan 中引用未实现字段。

### 6.2 模型包

#### 6.2.1 文件名与必填字段

- **元信息文件**：`package.json`（**注意：不是 `manifest.json`**），位于 zip 根目录
- **必填**：`packageKey` `name` `version` `targetEntity` `fieldGroups`
- **校验规则**：
  - `packageKey` 匹配 `^[a-z][a-z0-9\-_]*$`
  - `targetEntity` ∈ `article | product | download | page`（**只能是这 4 个**）
  - `fieldGroups` 必须是数组
  - 同名 `isBuiltin: true` 的内置包不允许被上传覆盖

#### 6.2.2 完整字段表

```jsonc
{
  // ── 必填 ──
  "packageKey":   "product-reviews",
  "name":         "产品评论模型",
  "version":      "1.0.0",
  "targetEntity": "product",                     // article | product | download | page
  "fieldGroups":  [ /* ModelFieldGroup[] 结构见 Phase 8 spec §3.3 */ ],

  // ── 可选 ──
  "description":     "为产品页加上访客评论与评分能力",
  "longDescription": "...市场详情页展示的长说明...",
  "changelog":       "## 1.0.0\n初始发布\n",
  "author":          "BangNiCMS Official",
  "modelType":       "content_type",             // 默认 content_type；可选 page_type | component_type
  "tags":            ["电商", "互动"],

  "previews": [
    { "url": "previews/editor.png",   "caption": "编辑界面", "type": "editor" },
    { "url": "previews/frontend.png", "caption": "前台效果", "type": "frontend" }
  ],

  "marketingMeta": { "targetIndustries": ["电商"], "comingSoon": false },

  "sampleData":   { "entries": [ /* 示例条目 */ ] }
}
```

> ⚠️ **关键澄清**：模型包**不修改数据库 schema**，所有自定义字段值统一存到 `*Locale.customFields`（JSON），无 prisma migrate 风险。
>
> ⚠️ **卸载策略**：`uninstallStrategy` **不在 manifest 里声明**，而是调用 `DELETE /model-packages/:key/uninstall?strategy=archive|purge` 时由用户传参（默认 `archive` 保留业务数据）。

### 6.3 扩展包通用目录结构

```
<extensionKey>.zip
├── manifest.json          # 主题/插件用此名；模型包用 package.json
├── README.md
├── CHANGELOG.md
├── previews/              # 预览图，路径要与 manifest.previews[].url 匹配
│   ├── home.png
│   └── docs.png
├── src/                   # 源码（dev 时构建用，运行时不一定加载）
└── dist/                  # 构建产物（如插件需要执行 JS 时由插件加载机制读）
    └── index.js
```

### 6.4 manifest 字段未来扩展计划（**非现状**）

以下字段在**主仓尚未实现**，但 Registry / 本项目在打包扩展时建议**预留位置**（多余字段会被 BangNiCMS 当前实现忽略，不会报错）：

| 字段 | 用途 | 何时落地 |
|---|---|---|
| `nameI18n: { "zh-CN": ..., "en-US": ... }` | 多语言显示名 | 主仓加 i18n 显示能力时 |
| `descriptionI18n` | 多语言描述 | 同上 |
| `minSystemVersion` / `maxSystemVersion` | 版本兼容声明 | 升级中心做版本约束时 |
| `dependencies` | 扩展互相依赖 | 后续阶段 |
| `license` / `homepage` | 元信息展示 | 市场详情页需要时 |

---

## 7. 内容运营规划

### 7.1 首页（/）必备模块（按从上到下顺序）

| 模块 | 内容要点 |
|---|---|
| **Hero 区** | 一句话价值主张 + 主 CTA「立即试用」+ 次 CTA「看文档」+ 截图/视频 |
| **核心特性** | 6-8 个特性卡片：内容模型、多语言、主题/插件、AI 翻译、SEO、一键部署、扩展市场、备份升级 |
| **使用场景** | 4 个典型场景：个人博客 / 企业官网 / 产品站 / 外贸独立站，每个一张代表性截图 |
| **价值对比** | 对比 WordPress / Strapi / Ghost：开箱即用、中文友好、官方扩展、免费 |
| **用户证言** | 上线初期可暂缺，后期补 |
| **快速开始** | 3 步：拉镜像 → 装 → 用，每步一行命令 |
| **Final CTA** | 「立即查阅完整文档」+「访问扩展市场」 |

### 7.2 文档站（/docs）目录结构

```
/docs/
├── 入门
│   ├── 快速开始
│   ├── 系统要求
│   └── 一键部署
├── 部署
│   ├── 服务器准备
│   ├── 域名与备案
│   ├── HTTPS 配置
│   └── 备份与恢复
├── 配置
│   ├── 站点设置
│   ├── 多语言配置
│   ├── 媒体上传策略
│   └── 用户权限
├── 内容运营
│   ├── 内容模型
│   ├── 文章管理
│   ├── 产品管理
│   └── 主题切换
├── 扩展生态
│   ├── 安装扩展（在线/离线）
│   ├── 启用/停用插件
│   ├── 配置插件
│   └── 卸载扩展
├── 升级
│   ├── 一键升级
│   ├── 手动升级
│   └── 回滚
├── 故障排查
│   ├── 常见问题（FAQ）
│   ├── 日志查询
│   └── 提交反馈
└── 进阶
    ├── 自定义主题（开发者向）
    └── API 参考
```

### 7.3 文档质量标准（每篇必备）

- ✅ 操作步骤编号清晰（1. 2. 3.）
- ✅ 命令行有 prompt 标识（`$` 普通用户、`#` root 用户）
- ✅ 命令支持「一键复制」按钮
- ✅ 关键步骤配截图，**截图带红框/箭头标注**
- ✅ 预期结果说明（"你应该看到 ✅ XXX"）
- ✅ 错误处理（"如果你看到 ❌ XXX，请做 YYY"）
- ✅ 视频演示（关键流程录屏，1-3 分钟）
- ✅ 上一篇 / 下一篇导航
- ✅ "找到错误？提交反馈"按钮（链 GitHub Issues 模板）

### 7.4 第一批必备文档（10 篇核心，MVP 上线时必须有）

1. 5 分钟快速开始
2. VPS 服务器购买与初始化
3. 域名注册与备案（国内）
4. 一键部署
5. 完成首次安装向导
6. 切换主题
7. 创建第一篇文章
8. 安装第一个扩展
9. 数据备份与恢复
10. 一键升级到新版本

### 7.5 扩展市场内容（MVP 至少 3 个示范扩展）

| 类型 | 名称 | 价值 |
|---|---|---|
| **主题** | `theme-modern-blog`（现代博客主题） | 演示主题机制 + 给博客用户开箱即用 |
| **插件** | `plugin-google-analytics`（GA4 接入） | 演示插件机制 + 通用刚需 |
| **模型** | `model-pkg-product-reviews`（商品评论模型） | 演示模型扩展 + 电商刚需 |

每个扩展都附完整文档（README + CHANGELOG + 使用截图）。

---

## 8. 部署方案

### 8.1 国内服务器选型

- **配置**：4 vCPU / 8 GB RAM / 100 GB SSD（足够前 1 年）
- **带宽**：5 Mbps 以上
- **推荐云**：阿里云 / 腾讯云 / 华为云（任选）
- **预估成本**：¥150-300/月

### 8.2 域名与备案

- **主域名**：`cms.bangni.com`（待确认）
- **备案**：国内服务器必须 ICP 备案，约 7-15 个工作日
- **备案前**：可先在海外服务器搭测试环境（如 `staging.cms.bangni.dev`）

### 8.3 HTTPS

- caddy 自动 Let's Encrypt（已是 BangNiCMS 默认能力）
- 90 天到期前自动续期，**必须配置告警**（UptimeRobot / 自建监控）

### 8.4 数据备份策略

- **每日**：postgres pg_dump 自动备份到本地
- **每周**：rsync 到异地备份盘（另一家云的 OSS/COS）
- **每月**：完整 docker volumes 打包归档
- **关键**：上线前必须做一次**完整还原演练**

### 8.5 监控

- **可用性**：UptimeRobot 监听 `/health` 端点
- **HTTPS 到期**：UptimeRobot SSL 到期监控
- **错误日志**：上线 3 个月后视情况接 Sentry / Logtail

---

## 9. 8-10 周分期路线图

### 第 1 期：基础打通（3 周）

#### Week 1 — 立项 + 设计
- [ ] 阅读 BangNiCMS 现有 3 篇 sketch 文档
- [ ] 在本文档第 11 章「已知差异」记录调整
- [ ] 初始化 git 仓库 + `docker-compose.yml`
- [ ] 拉 GHCR 镜像本地启动，跑通 BangNiCMS 默认形态
- [ ] 制作 Figma 首页设计稿

#### Week 2 — 官网主题首期
- [ ] `themes/official-site/` 骨架
- [ ] 首页 Hero + 核心特性 + Final CTA
- [ ] 页头 / 页脚（中英切换）
- [ ] 部署到 staging 域名

#### Week 3 — 文档主题 + 文档插件
- [ ] 文档主题（侧边栏 / TOC / 上下页）
- [ ] CodeBlock 组件（代码高亮 + 一键复制）
- [ ] `plugins/docs-enhanced/` 全文搜索骨架
- [ ] 写第一批 10 篇核心文档

### 第 2 期：完整能力（3 周）

#### Week 4 — 扩展市场 UI
- [ ] 市场列表页（卡片网格 + 类型筛选）
- [ ] 扩展详情页（截图轮播 + changelog + 安装说明）
- [ ] 下载按钮 + 在线安装提示

#### Week 5 — Registry API 插件
- [ ] `plugins/registry-api/` 完整实现
- [ ] 单元测试 + 速率限制 + Redis 缓存
- [ ] 端到端测试：从 BangNiCMS 客户端拉本站列表

#### Week 6 — 3 个示范扩展 + 主仓客户端联调
- [ ] `theme-modern-blog` 完整实现
- [ ] `plugin-google-analytics` 完整实现
- [ ] `model-pkg-product-reviews` 完整实现
- [ ] BangNiCMS 主仓 `MarketService` 增加 `REGISTRY_URL` 配置（小 PR）
- [ ] 联调：客户端 → 远程 Registry → 拉列表 → 安装

### 第 3 期：质量打磨（2-4 周）

#### Week 7 — 全部 30+ 篇文档
- [ ] 部署完整 7 大类文档
- [ ] 每篇至少 3 张截图 + 1 个视频
- [ ] 全文搜索索引验证

#### Week 8 — 多语言 + SEO
- [ ] 首页 + 关键文档英文版
- [ ] sitemap.xml + robots.txt + meta
- [ ] 社交媒体卡片图片

#### Week 9 — 监控 + 反馈机制
- [ ] UptimeRobot 接入
- [ ] 「找到错误？」按钮 → GitHub Issues
- [ ] 站点 / Registry API 性能压测

#### Week 10 — 上线与灰度
- [ ] 国内服务器部署
- [ ] 备案完成后切正式域名
- [ ] 收集首批用户反馈
- [ ] 修复反馈中的问题

---

## 10. 风险与应对

| 风险 | 影响 | 应对 |
|---|---|---|
| **国内备案延期** | 主域名上不了 | 备案期间海外 staging 域名先跑 |
| **Registry API 被恶意爬虫** | 服务器压力 / 流量费 | 速率限制 + Redis 缓存 + Cloudflare |
| **扩展包文件大（>50MB）** | 下载慢 | 单独 OSS / CDN 分发，BangNiCMS 只存元信息 |
| **文档过时** | 用户照做失败 | 每次主仓发版触发文档检查工作流 |
| **客户端连不上 Registry** | 用户装不了扩展 | 降级：客户端缓存最近一次 fetch 结果，离线可见 |
| **示范扩展有 bug** | 用户首次体验崩 | 先内部跑 1 周后再公开上架 |
| **本仓库代码与主仓接口失配** | 升级主仓后本站炸 | CI 跑「最新主仓 + 本仓库」端到端测试 |

---

## 11. 与 BangNiCMS 主仓的协作模式

### 11.1 本项目对主仓的"零依赖"原则

- 本仓库**只**消费主仓发布的 GHCR 镜像，不引用主仓源码
- 本仓库不向主仓提 PR（除非是改进所有用户都受益的通用能力）

### 11.2 唯一允许的主仓改动

| 改动 | 原因 | 时机 |
|---|---|---|
| `MarketService` 增加 `REGISTRY_URL` 配置项 + 远程 fetch | 让所有 BangNiCMS 用户都能消费官方市场（通用能力） | Week 6 联调时 |

提交方式：在主仓正常走 PR 流程，PR 描述明确说"为对接官方 Registry 服务做的客户端增强"。

### 11.3 升级节奏

- 主仓发新版 → 本站 staging 自动拉 latest 测试 → 通过后切生产
- 用 `release.yml` + `deploy-smoke.yml` 双重 CI（已有）

### 11.4 已知差异记录

**2026-04-27 第一轮调研** — 重读 BangNiCMS 主仓三篇 sketch + 实际服务源码后，识别 6 个差异：

| # | 差异项 | 设计文档说法 | 主仓现状 | 决策 |
|---|---|---|---|---|
| D1 | 扩展 manifest 字段命名 | `id` / `type` / 多语言 `name` 对象 | `extensionKey` / `extensionType` / 单语言字符串 + `marketingMeta` 容器 | **改文档** — 第 6 章已对齐主仓现状（2026-04-27） |
| D2 | 扩展 manifest 子字段 | `minSystemVersion` / `dependencies` / 嵌套 `theme.{...}` `plugin.{...}` | 主仓未实现，会被忽略 | **改文档** — 已挪入第 6.4「未来扩展计划」（2026-04-27） |
| D3 | 模型包元信息文件名 | `manifest.json` + `type: "model"` | **`package.json`**，无 `type` 字段，必填 `packageKey/name/version/targetEntity/fieldGroups` | **改文档** — 第 6.2 章已重写（2026-04-27） |
| D4 | Registry API 路径 | `/registry/extensions` | extension-registry-system-design v1 实为 `/api/v1/registry/{models\|themes\|plugins\|packages/:key\|updates\|info}` | **改文档** — 第 5.2 节 Registry API 端点表需对齐主仓设计文档（待执行） |
| D5 | dev 期把 `themes/` `plugins/` 目录挂进容器实现热加载开发 | docker-compose 示意图把本仓库目录挂到 `/data/storage/themes` `/data/storage/plugins` | **主仓不支持源码挂载加载**：扩展通过 admin UI 上传 zip 安装到 `<STORAGE_ROOT>/uploads/_extensions/<key>/`；模型包同理 | **改 dev 流程** — 后续 Week 2-3 编码时改为：开发期用 `pnpm package:zip` 脚本把 `plugins/registry-api/` 等打 zip → 调 `POST /extensions/install` 上传，省去手动 admin UI 步骤 |
| **D6** | **🚨 官网用第三方主题 `themes/official-site/` 完整渲染（home/docs/market 三类页面）** | **builtin-theme-and-frontend-rendering-architecture v1 §7.1 明确 M1 阶段第三方主题仅支持 config（颜色）生效；完整渲染覆盖（`theme-renderer.js` + `theme-router.json`）属于 M2 未来阶段** | **方向待拍板**（见下方 §11.4.1 三选项） |

#### 11.4.1 D6 处置方案（**需用户决策后才能进入 Week 2 编码**）

问题本质：本项目要建的官网/文档/市场前台**不是**"换皮的电商站"——它需要为文档系统专门写 `DocSidebar` `CodeBlock` `SearchBox`，为市场写 `ExtensionCard`，这些**不可能**靠改 `theme-export-basic` 颜色实现。三个候选方案：

**方案 A：等主仓做完 M2 第三方主题渲染机制**
- 优点：完美符合 §2.1 项目隔离约束；最干净
- 缺点：阻塞本项目 8-10 周，需要先在主仓发起 M2 方案。M2 涉及沙箱加载第三方 JS，工程量约 4-6 周
- 适合：长期最佳；短期不可行

**方案 B：把 `official-site` 当成内置主题，作为新的 `packages/theme-official-site/` 加进 BangNiCMS 主仓**
- 优点：技术上立刻可行（参照现有 `theme-export-basic` 即可）
- 缺点：**严重违反 §2.1 项目隔离约束** — 主仓里塞了一个"宣传站专用主题"，未来主仓发版时会被其他 CMS 用户看到。**不推荐**

**方案 C（推荐）：本仓库做独立 Next.js 应用，直接消费 BangNiCMS 的 REST API，不用 BangNiCMS 主题机制**
- 架构：本仓库 = 一个独立的 Next.js 站点（前台），加上一个 BangNiCMS 实例（管后台 + 文章数据 + 媒体 + Registry API 插件）。前台 Next.js 通过 HTTP 拉 BangNiCMS 的 `/api/2026-04/articles/frontend/list` 等公开端点，自行渲染
- 优点：
  1. 完全保持主仓零改动（除 §11.2 同意的 `REGISTRY_URL` 外）
  2. 前台技术栈自由（Tailwind / shadcn / Pagefind 全部可用）
  3. 数据由 dogfooding 满足 — 内容仍然在 BangNiCMS 后台运营，访客仍然消费 BangNiCMS 的内容能力，营销价值不减
  4. 与「文档站本身是个用 BangNiCMS 搭文档站的最佳示例」一致 — 我们演示的就是"如何用 BangNiCMS 当 headless CMS"
- 代价：
  1. 需要承认"本站不是 100% 用 BangNiCMS 默认前台跑出来的"——文案上可调整为"内容由 BangNiCMS 驱动，前台是定制 Next.js"
  2. 主题切换、插件 hooks 等"后台扩展机制"不会自动作用到前台（但官网本来就不需要切换主题）
- 落地变更：
  - 第 5.1 节 `themes/official-site/` → 改为 `apps/website/`（独立 Next.js）
  - `plugins/registry-api/` 仍然作为 BangNiCMS 插件存在，给 BangNiCMS 后端加 `/registry/*` 端点
  - `plugins/docs-enhanced/` 大部分能力下沉到 `apps/website/`（搜索索引、反馈链接），主仓不增负担
  - docker-compose 增加 `website` 服务

> **建议**：采用方案 C。如同意，将在第二轮文档更新（v1.1）系统性调整第 5 章、第 8 章、第 9 章 Week 2-3 路线图。

#### 11.4.2 后续将随实施新增的差异

| 差异项 | 设计文档说法 | 现状 | 决策 |
|---|---|---|---|
| _（Week 2 起按需追加）_ | | | |

---

## 12. 后续行动项（实施开始前必做）

按顺序执行：

1. ✅ 创建本项目目录与 README（已完成 2026-04-27）
2. ✅ 撰写本实施方案 v1（已完成 2026-04-27）
3. ✅ 重读 BangNiCMS 主仓 3 篇 sketch 文档，记录已知差异（已完成 2026-04-27，见第 11.4 章 D1-D6）
4. ✅ 与 BangNiCMS 现有 `extensions.service.ts` / `model-packages.service.ts` 对照，敲定 manifest 标准（已完成 2026-04-27，第 6 章已对齐主仓现状）
5. ⏳ 国内服务器选型 + 域名注册 + 备案启动 → 见 [`server-domain-icp-checklist-v1.md`](./server-domain-icp-checklist-v1.md)（用户线下推进）
6. ⏳ 制作 Figma 首页设计稿 → 见 [`figma-homepage-design-brief-v1.md`](./figma-homepage-design-brief-v1.md)（设计师参考）
7. ⏳ Week 1 立项启动 → docker-compose / .env.example / .gitignore 已就绪（仓库根目录），用户执行 `docker compose pull && docker compose up -d` 即可

> **🚧 阻塞项**：D6 方向决策必须先拍板，再进入 Week 2 编码。

---

## 附录 A：本文档维护规则

- 每个里程碑完成后，更新对应章节的状态
- 决策变更时**追加而非删除**（保留历史）
- 大版本变更时升级到 v2（保留 v1 归档）
- 实施期间发现的"现状与本文档不符"必须先更新文档再编码

## 附录 B：相关文档索引

### 本仓库
- [`README.md`](../README.md) — 项目入口

### BangNiCMS 主仓（独立维护）
- `docs/sketches/extension-registry-system-design-v1.md`
- `docs/sketches/phase-eight-model-marketplace-development-spec-v1.md`
- `docs/sketches/builtin-theme-and-frontend-rendering-architecture-v1.md`
- `docs/user-guide/zh/getting-started.md`（部署文档样本，文档站可借鉴）

---

**文档版本**：v1
**最后更新**：2026-04-27
**下一次更新触发条件**：Week 1 设计审阅完成后
