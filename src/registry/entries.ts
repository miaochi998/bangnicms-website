/**
 * BangNiCMS 扩展市场 — Mock Registry 数据
 *
 * 本文件是 Registry 的"单一可信源"：
 *   - /api/v1/registry/index.json 由 toRegistrySummary 衍生
 *   - /api/v1/registry/extensions/[slug].json 由本文件直接输出
 *   - 市场前台页 /extensions 与 /extensions/[slug] 也读这里
 *
 * 添加新扩展：
 *   1. 在 entries 数组追加一条 RegistryEntry
 *   2. type-check 通过即可（CI 会自动重部署本站，主仓拉到的 JSON 即时更新）
 */

import type { RegistryEntry } from "../lib/registry-types";

export const registryEntries: RegistryEntry[] = [
  // ───────────────────────────────────────────────────────────────────────
  // 1. 商务级官网主题
  // ───────────────────────────────────────────────────────────────────────
  {
    slug: "theme-business-pro",
    category: "theme",
    iconEmoji: "🏢",
    coverGradient: "from-sky-500 to-indigo-600",
    screenshots: [
      { url: "previews/home.png", caption: "首页 Hero + 产品矩阵", type: "frontend" },
      { url: "previews/products.png", caption: "产品列表与筛选", type: "frontend" },
      { url: "previews/contact.png", caption: "联系询盘表单", type: "frontend" },
    ],
    manifest: {
      extensionKey: "theme-business-pro",
      name: "Business Pro 商务主题",
      extensionType: "theme",
      version: "1.2.0",
      description:
        "为外贸 / B2B / 工业品官网设计的现代商务主题，内置 6 类常用页面与询盘转化路径",
      author: "BangNiCMS Official",
      changelog:
        "## 1.2.0\n- 新增产品对比组件\n- 优化移动端 Hero 加载性能\n\n## 1.1.0\n- 增加询盘表单字段自定义\n\n## 1.0.0\n- 初始发布",
      tags: ["商务", "外贸", "B2B", "工业品", "官方"],
      marketingMeta: {
        targetIndustries: ["机械", "电子", "化工", "汽配"],
        comingSoon: false,
        highlights: [
          "6 套预置页面布局",
          "完整询盘转化漏斗",
          "适配多语言切换",
          "Lighthouse 95+ 性能",
        ],
      },
      previews: [
        { url: "previews/home.png", caption: "首页", type: "frontend" },
        { url: "previews/products.png", caption: "产品页", type: "frontend" },
      ],
      config: {
        primaryColor: "#0EA5E9",
        heroLayout: "split",
        showInquiryFloating: true,
      },
    },
    downloadUrl: "#",
    documentationUrl: "/docs/getting-started/installation",
    repositoryUrl: "https://github.com/miaochi998/BangNiCMS",
    stats: { installs: 1240, stars: 86 },
    releasedAt: "2026-02-15",
    updatedAt: "2026-04-20",
    status: "stable",
    readme: `# Business Pro 商务主题

为**外贸 / B2B / 工业品**官网量身设计的现代商务主题。

## 主要特性

- **6 套预置页面**：首页 / 产品列表 / 产品详情 / 关于我们 / 新闻 / 联系询盘
- **完整询盘漏斗**：从产品页到询盘提交的转化路径全埋点
- **多语言友好**：与 BangNiCMS 多语言能力深度集成，无需配置
- **性能优秀**：Lighthouse 桌面 95+ / 移动端 90+

## 适用行业

机械设备 · 电子电气 · 化工材料 · 汽车配件 · 通用工业品

## 配置项

| 字段 | 说明 | 默认值 |
|---|---|---|
| \`primaryColor\` | 主品牌色 | \`#0EA5E9\` |
| \`heroLayout\` | 首页 Hero 布局 (\`split\` / \`center\` / \`fullscreen\`) | \`split\` |
| \`showInquiryFloating\` | 是否显示询盘悬浮按钮 | \`true\` |

## 安装后该做什么

1. 在「站点设置 → 品牌色」调整为你的主色
2. 在「内容 → 产品」录入至少 6 件产品
3. 在「菜单」配置 header / footer 导航
`,
  },

  // ───────────────────────────────────────────────────────────────────────
  // 2. 极简博客主题
  // ───────────────────────────────────────────────────────────────────────
  {
    slug: "theme-blog-minimal",
    category: "theme",
    iconEmoji: "📝",
    coverGradient: "from-slate-700 to-slate-900",
    screenshots: [
      { url: "previews/list.png", caption: "文章列表", type: "frontend" },
      { url: "previews/detail.png", caption: "文章详情", type: "frontend" },
    ],
    manifest: {
      extensionKey: "theme-blog-minimal",
      name: "极简博客主题",
      extensionType: "theme",
      version: "1.0.1",
      description:
        "黑白灰极简配色，专注阅读体验。适合个人博客、技术写作、独立观点站",
      author: "BangNiCMS Official",
      changelog: "## 1.0.1\n- 修复中文字距问题\n\n## 1.0.0\n- 初始发布",
      tags: ["博客", "极简", "个人站", "官方"],
      marketingMeta: {
        targetIndustries: ["个人", "媒体", "知识分享"],
        comingSoon: false,
        highlights: [
          "黑白极简配色",
          "字号字距针对中文优化",
          "无打扰阅读模式",
          "RSS / Atom 订阅",
        ],
      },
      previews: [
        { url: "previews/list.png", caption: "列表", type: "frontend" },
      ],
      config: {
        accentColor: "#000000",
        showAuthor: true,
        showReadTime: true,
      },
    },
    downloadUrl: "#",
    documentationUrl: "/docs/getting-started/installation",
    repositoryUrl: "https://github.com/miaochi998/BangNiCMS",
    stats: { installs: 562, stars: 41 },
    releasedAt: "2026-03-08",
    updatedAt: "2026-04-12",
    status: "stable",
    readme: `# 极简博客主题

**黑白灰**极简配色，专注阅读体验。

## 设计取舍

- 不用任何彩色装饰，只在链接处使用一抹下划线
- 字距、行高针对中文长篇阅读优化
- 移除社交分享、相关文章等"附加噪声"

## 谁适合用

- 写技术博客的独立开发者
- 写观点 / 评论的媒体作者
- 不想折腾、追求专注阅读的写作者

## 注意事项

- 本主题**不包含**评论系统，建议接入 Giscus / Disqus 等独立服务
- 不预置任何分析脚本，请按需自行接入
`,
  },

  // ───────────────────────────────────────────────────────────────────────
  // 3. SEO 工具集插件
  // ───────────────────────────────────────────────────────────────────────
  {
    slug: "plugin-seo-toolkit",
    category: "plugin",
    iconEmoji: "🔍",
    coverGradient: "from-emerald-500 to-teal-600",
    screenshots: [
      { url: "previews/dashboard.png", caption: "SEO 评分面板", type: "admin" },
      { url: "previews/sitemap.png", caption: "Sitemap 自动生成", type: "admin" },
    ],
    manifest: {
      extensionKey: "plugin-seo-toolkit",
      name: "SEO 工具集",
      extensionType: "plugin",
      version: "2.1.3",
      description:
        "一站式 SEO 工具：sitemap 自动生成、结构化数据、内容评分、404 监控",
      author: "BangNiCMS Official",
      changelog:
        "## 2.1.3\n- 修复 sitemap 多语言 hreflang 缺失\n\n## 2.1.0\n- 增加 Open Graph 自动生成\n\n## 2.0.0\n- 重构内容评分算法",
      tags: ["SEO", "搜索引擎", "结构化数据", "官方"],
      marketingMeta: {
        targetIndustries: ["通用"],
        comingSoon: false,
        highlights: [
          "sitemap.xml 自动生成 + 多语言 hreflang",
          "JSON-LD 结构化数据自动注入",
          "文章 SEO 评分（标题 / 摘要 / 链接 / 关键词）",
          "404 页面访问监控与建议跳转",
        ],
      },
      previews: [
        { url: "previews/dashboard.png", caption: "面板", type: "admin" },
      ],
      configSchema: {
        type: "object",
        properties: {
          sitemapEnabled: { type: "boolean", default: true },
          structuredDataEnabled: { type: "boolean", default: true },
          minTitleLength: { type: "number", default: 10 },
        },
      },
    },
    downloadUrl: "#",
    documentationUrl: "/docs/getting-started/installation",
    repositoryUrl: "https://github.com/miaochi998/BangNiCMS",
    stats: { installs: 3580, stars: 215 },
    releasedAt: "2026-01-20",
    updatedAt: "2026-04-25",
    status: "stable",
    readme: `# SEO 工具集

一站式 SEO 工具，安装后立即生效。

## 提供的能力

### 1. Sitemap 自动生成
- 路径：\`/sitemap.xml\`
- 自动包含所有已发布的文章 / 产品 / 下载 / 自定义页面
- 多语言站点自动注入 \`hreflang\` 标签

### 2. JSON-LD 结构化数据
- 文章 → \`Article\` schema
- 产品 → \`Product\` + \`Offer\` schema
- 首页 → \`Organization\` + \`WebSite\` schema

### 3. 内容 SEO 评分
- 在编辑器侧栏实时显示当前文章 / 产品的 SEO 评分（0-100）
- 给出具体优化建议（标题长度 / 摘要缺失 / 关键词密度等）

### 4. 404 监控
- 后台「数据统计 → 404 监控」可见所有 404 来源
- 支持配置跳转规则将旧 URL 301 到新 URL

## 与主题的关系

本插件**与主题完全解耦**，任何主题都可受益。
`,
  },

  // ───────────────────────────────────────────────────────────────────────
  // 4. 产品评论模型包
  // ───────────────────────────────────────────────────────────────────────
  {
    slug: "model-product-reviews",
    category: "model",
    iconEmoji: "⭐",
    coverGradient: "from-amber-500 to-orange-600",
    screenshots: [
      { url: "previews/editor.png", caption: "后台评论字段", type: "editor" },
      { url: "previews/frontend.png", caption: "前台评论展示", type: "frontend" },
    ],
    manifest: {
      packageKey: "product-reviews",
      name: "产品评论模型",
      version: "1.0.0",
      targetEntity: "product",
      fieldGroups: [
        {
          key: "reviews",
          label: "用户评论",
          fields: [
            { key: "averageRating", label: "平均评分", type: "number" },
            { key: "reviewCount", label: "评论数", type: "number" },
            { key: "topReviews", label: "精选评论列表", type: "json" },
          ],
        },
      ],
      description: "为产品页加上访客评分与精选评论展示能力",
      longDescription:
        "提供产品维度的评分聚合与精选评论字段。适用于希望在产品详情页展示真实用户反馈的官网。",
      author: "BangNiCMS Official",
      modelType: "content_type",
      tags: ["电商", "评论", "互动", "官方"],
      marketingMeta: {
        targetIndustries: ["电商", "B2C"],
        comingSoon: false,
        highlights: [
          "产品评分聚合字段",
          "精选评论列表（JSON 字段）",
          "前台主题可一键调用",
          "卸载安全（不影响业务数据）",
        ],
      },
      previews: [
        { url: "previews/editor.png", caption: "编辑界面", type: "editor" },
      ],
    },
    downloadUrl: "#",
    documentationUrl: "/docs/getting-started/installation",
    repositoryUrl: "https://github.com/miaochi998/BangNiCMS",
    stats: { installs: 412, stars: 28 },
    releasedAt: "2026-03-25",
    updatedAt: "2026-04-15",
    status: "beta",
    readme: `# 产品评论模型

为产品页加上访客评分与精选评论展示能力。

## 提供的字段

安装后，产品编辑页会出现「用户评论」字段组：

| 字段 | 类型 | 说明 |
|---|---|---|
| \`averageRating\` | 数字 | 平均评分（0-5） |
| \`reviewCount\` | 数字 | 评论总数 |
| \`topReviews\` | JSON | 精选评论列表（结构示例见下） |

### topReviews 字段结构示例

\`\`\`json
[
  {
    "author": "张先生",
    "rating": 5,
    "content": "质量非常好，下次还会买。",
    "date": "2026-04-20"
  }
]
\`\`\`

## 前台调用

主题模板里可以直接读取：

\`\`\`tsx
const { averageRating, reviewCount, topReviews } = product.customFields;
\`\`\`

## 卸载安全说明

本模型包**不修改数据库 schema**，所有字段值存储在 \`ProductLocale.customFields\` JSON。

卸载时可选：
- \`archive\`（默认）— 保留业务数据，仅卸载字段定义
- \`purge\` — 同时清除 customFields 中相关字段
`,
  },
];
