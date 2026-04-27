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
    iconKey: "building",
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
    themeInfo: {
      tagline: "为外贸 / B2B / 工业品官网设计的现代商务主题，5 分钟上线一个专业、可转化的企业站。",
      designTones: ["现代商务", "专业可信", "高转化导向", "多语言友好"],
      palette: {
        name: "商务蓝",
        colors: ["#0EA5E9", "#0284C7", "#F59E0B", "#1E293B", "#F8FAFC"],
      },
      typography: [
        "无衬线现代字体（Inter + 微软雅黑）",
        "标题字距收紧，有设计感",
        "正文行高 1.7，针对中文阅读优化",
      ],
      pages: [
        {
          name: "首页",
          caption: "Hero 展示 + 产品矩阵 + 公司介绍 + 询盘 CTA",
          blocks: ["Hero 区", "产品系列", "优势展示", "客户案例", "CTA 转化块"],
          layout: "marketing-home",
        },
        {
          name: "产品列表",
          caption: "左侧多维度筛选、右侧卡片网格 + 分页",
          blocks: ["分类侧栏", "产品卡片网格", "联动筛选", "分页/加载更多"],
          layout: "product-grid",
        },
        {
          name: "产品详情",
          caption: "大图轮播 + 规格参数 + 询盘表单 + 相关产品",
          blocks: ["产品图集", "规格参数表", "询盘表单", "相关产品"],
          layout: "product-detail",
        },
        {
          name: "关于我们",
          caption: "公司故事 + 团队 + 资质 + 实体展示",
          blocks: ["使命愿景", "发展历程", "团队介绍", "资质荣誉"],
          layout: "about",
        },
        {
          name: "新闻资讯",
          caption: "列表页 + 详情页，带分类与检索",
          blocks: ["分类导航", "文章列表", "检索", "热门推荐"],
          layout: "article-list",
        },
        {
          name: "联系询盘",
          caption: "联系信息 + 地图 + 多字段询盘表单",
          blocks: ["联系方式", "地图嵌入", "询盘表单", "多语言切换"],
          layout: "contact",
        },
      ],
      bestFor: {
        industries: ["机械设备", "电子电气", "化工材料", "汽车配件", "通用工业品"],
        scale: "50 - 500 人的外贸 / B2B / 工业品企业",
        contentVolume: "20 - 200 件产品 · 2-4 语言 · 中量新闻更新",
      },
      setupSteps: [
        {
          title: "安装并启用主题",
          description: "在后台「扩展中心 → 主题」上传 zip 包，点击启用。",
        },
        {
          title: "调色与品牌",
          description: "「站点设置 → 品牌」上传 LOGO，主品牌色默认 #0EA5E9，可随意调为贵司企业色。",
        },
        {
          title: "填充内容与菜单",
          description: "至少录入 6 件产品与 2 篇公司新闻，配置「菜单」上线与页脚导航。",
        },
      ],
      liveDemoUrl: "https://demo.bonnei.com",
    },
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
    iconKey: "file-text",
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
    themeInfo: {
      tagline: "黑白灰极简配色，专注内容与阅读体验。适合独立写作者、技术博客与观点表达。",
      designTones: ["极简主义", "专注阅读", "中文优先", "无打扰"],
      palette: {
        name: "经典灰",
        colors: ["#000000", "#404040", "#737373", "#A3A3A3", "#FFFFFF"],
      },
      typography: [
        "思源黑体 + Inter，针对中文长文阅读优化",
        "正文字号偏大（桌面 18px）以减轻眼肌压力",
        "行高 1.85，段落间距充分",
      ],
      pages: [
        {
          name: "文章列表首页",
          caption: "无侧栏、仅以时间倒序排列、每项含标题/节选/阅读时长",
          blocks: ["文章列表", "阅读时长标记", "年份分组", "分页"],
          layout: "article-list",
        },
        {
          name: "文章详情",
          caption: "单栏居中、最大宽 720px、代码高亮 + 表格 + 引用齐备",
          blocks: ["文章正文", "代码块", "引用 / 表格", "文末作者签名"],
          layout: "article-detail",
        },
        {
          name: "关于页",
          caption: "作者介绍 / 联系方式 / 订阅入口",
          blocks: ["作者简介", "联系信息", "RSS 订阅", "外部社交"],
          layout: "about",
        },
        {
          name: "标签集合",
          caption: "按标签详情进入该主题下的全部文章",
          blocks: ["标签云", "该标签下文章列表", "相关标签"],
          layout: "article-list",
        },
      ],
      bestFor: {
        industries: ["独立开发者", "技术作者", "独立记者", "观点评论"],
        scale: "个人独立运营 / 1-3 人小团队",
        contentVolume: "50+ 篇长文章 · 每周 1-3 篇更新节奏",
      },
      setupSteps: [
        {
          title: "上传并启用",
          description: "后台「扩展中心 → 主题」上传 zip，启用后首页立刻生效。",
        },
        {
          title: "设置作者信息",
          description: "「站点设置 → 作者」填写你的名字、简介与社交链接，会出现在文末与「关于」页。",
        },
        {
          title: "发表第一篇文章",
          description: "「内容 → 文章」新建，主题会自动设置阅读时长与发布时间。",
        },
      ],
      liveDemoUrl: "https://demo-blog.bonnei.com",
    },
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
    iconKey: "search-check",
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
    pluginInfo: {
      tagline: "一站式 SEO 工具：安装后立即生效，不需任何代码调整。让你的站点在谷歌、百度、必应里都能获得更好的呈现。",
      problemStatement: [
        "大多数 CMS 默认不生成 sitemap、不输出结构化数据，使站点在搜索引擎里收录度较低、在谷歌/必应/百度里的展示效果也平淡。",
        "传统做法需要 SEO 专家调优代码、添加各种 meta 标签、人工选择关键词，代价高、质量不齐。",
        "本插件将这些能力打包，启用后自动生效，同时提供实时评分与错误监控，让内容人员也能看懂。",
      ],
      features: [
        {
          icon: "map",
          title: "Sitemap 自动生成",
          summary: "安装后立即提供 /sitemap.xml，含多语言 hreflang。",
          details: [
            "自动收录全部已发布的文章 / 产品 / 下载 / 页面",
            "多语言站点自动添加 hreflang 标签避免重复内容警告",
            "可选添加「最后修改时间」与「优先级」",
          ],
        },
        {
          icon: "target",
          title: "结构化数据 (JSON-LD)",
          summary: "文章 / 产品 / 首页 自动注入合适 schema。",
          details: [
            "文章 → Article · 产品 → Product + Offer · 首页 → Organization",
            "谷歌搜索结果里会自动出现富媒体摘要（评分/价格）",
            "可在后台预览任意页面的结构化数据",
          ],
        },
        {
          icon: "bar-chart",
          title: "实时 SEO 评分",
          summary: "在编辑器侧栏看到 0-100 分与优化建议。",
          details: [
            "标题长度 / 摘要缺失 / 关键词密度 / 内部链接足不足都会量化产出",
            "评分 < 60 分会黄色警告，整体 < 40 分会不允许发布（可配置）",
            "针对中文环境优化，不是简单照搬英文规则",
          ],
        },
        {
          icon: "ban",
          title: "404 监控与跳转",
          summary: "后台面板看到所有 404 访问，一键设置 301 重定向。",
          details: [
            "站点改版后的旧 URL 不会走丢权重",
            "主动发现访客访问不存在的页面（不仅限于谷歌收录）",
            "可按文章/产品/全页 3 个维度查看排名",
          ],
        },
        {
          icon: "link",
          title: "Open Graph + Twitter Card",
          summary: "社交分享时自动呈现高质量预览卡片。",
          details: [
            "自动生成 og:image（可自定义模板）",
            "适配微信 / 微博 / Twitter / LinkedIn / Slack",
            "内置社交分享预览实时测试工具",
          ],
        },
        {
          icon: "search",
          title: "内部搜索优化",
          summary: "重写后台搜索逻辑，支持中文分词与同义词。",
          details: [
            "集成 jieba 分词，中文查询准确率提升明显",
            "同义词字库（如「越野车」↔「SUV」）",
            "搜索词报表（看访客在找什么你还没有的内容）",
          ],
        },
      ],
      valueProps: [
        { metric: "+45%", label: "搜索引擎收录访问" },
        { metric: "-80%", label: "404 错误损失" },
        { metric: "5分钟", label: "安装到生效" },
        { metric: "0 行", label: "需要修改的代码" },
      ],
      setupSteps: [
        {
          title: "安装启用",
          description: "后台上传 zip 包，点击启用。sitemap 与结构化数据默认开启。",
        },
        {
          title: "配置站点信息",
          description: "「站点设置 → SEO」填写默认标题/描述/作者/品牌，生成在 og:image 中。",
        },
        {
          title: "绑定谷歌 Search Console",
          description: "在谷歌后台提交 sitemap.xml 地址，结构化数据 24-48 小时内生效。",
        },
      ],
      faqs: [
        {
          q: "会不会影响现有页面加载速度？",
          a: "不会。插件生成的内容都是服务器侧预生成 + 缓存，对页面加载负担趋于零。",
        },
        {
          q: "多语言站点会怎么处理？",
          a: "插件会自动为每个语言版本生成独立 sitemap 入口，在页面 head 中添加完整 hreflang 标签。",
        },
        {
          q: "卸载插件后会丢失已写的 SEO 文案吗？",
          a: "不会。SEO 文案保存在原生字段，卸载插件后只是不再推送 schema，原始内容完整保留。",
        },
        {
          q: "对中文 SEO 优化有特别考量么？",
          a: "有，meta description 默认限制 80 个中文字（合百度/谷歌中文友好的长度），包含中文同义词字库。",
        },
      ],
    },
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
    iconKey: "message-square",
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
    modelInfo: {
      tagline: "为产品页加上访客评分与精选评论展示能力，服务于以产品为核心的 B2C 与跨境电商场景。",
      appliesTo: "产品（product）",
      fieldGroups: [
        {
          name: "评分聚合",
          description: "该产品的总体评分概况。主题可在产品详情与列表页调用。",
          fields: [
            {
              key: "averageRating",
              label: "平均评分",
              type: "number",
              required: false,
              description: "0–5 之间的十进制，支持一位小数。如 4.6",
              example: "4.6",
            },
            {
              key: "reviewCount",
              label: "评论总数",
              type: "number",
              required: false,
              description: "该产品累计评论数量。主题中一般显示为「123 个评论」。",
              example: "248",
            },
          ],
        },
        {
          name: "精选评论",
          description: "呈现在产品详情页的 3-5 条高质量评论，可手动选择。",
          fields: [
            {
              key: "topReviews",
              label: "精选评论列表",
              type: "json",
              required: false,
              description: "数组结构，每项包含：作者 / 评分 / 内容 / 日期 / 头像 URL。",
              example: '[{"author":"张先生","rating":5,"content":"质量非常好","date":"2026-04-20"}]',
            },
            {
              key: "reviewBadge",
              label: "评论徽章",
              type: "select",
              required: false,
              description: "在产品卡片上额外显示的标签。可选：热销/热评/多评。",
              example: "热评",
            },
          ],
        },
      ],
      sampleEntry: [
        { fieldKey: "averageRating", value: "4.6" },
        { fieldKey: "reviewCount", value: "248" },
        {
          fieldKey: "topReviews",
          value: '[{"author":"张先生","rating":5,"content":"质量非常好，超出预期。","date":"2026-04-20"},{"author":"李女士","rating":4,"content":"性价比不错。","date":"2026-04-15"}]',
        },
        { fieldKey: "reviewBadge", value: "热评" },
      ],
      themeUsageCode: `// 在主题产品详情页模板调用
const { averageRating, reviewCount, topReviews } = product.customFields;

return (
  <section class="reviews">
    <h2>用户评价</h2>
    <div class="score">
      <strong>{averageRating}</strong> / 5
      <span class="count">({reviewCount} 个评论)</span>
    </div>
    {topReviews?.map((r) => (
      <article class="review-item">
        <header>★×{r.rating} · {r.author} · {r.date}</header>
        <p>{r.content}</p>
      </article>
    ))}
  </section>
);`,
      themeUsageNote: "产品表不会加字段。所有值存在 ProductLocale.customFields JSON，主题访问方式与原生字段一致。",
      uninstallSafety: [
        "本模型包不会修改任何数据库 schema，原生 Product / ProductLocale 表不受影响。",
        "卸载可选 archive（默认保留业务数据只卸载字段定义）或 purge（同时清除 customFields）。",
        "默认使用 archive 是为了重新安装后能一键恢复原有业务数据。",
      ],
    },
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
