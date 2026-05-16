/**
 * BangNiCMS 扩展市场 — Registry 真实数据
 *
 * 本文件是 Registry 的"单一可信源"：
 *   - /api/v1/registry/index.json 由 toRegistrySummary 衍生（前台 UI 用 · 富展示字段）
 *   - /api/v1/registry/extensions.json 由 toMarketRegistryItem 衍生（主仓 MarketService 拉取 · 简精 schema）
 *   - /api/v1/registry/extensions/[slug].json 直接输出本文件单条
 *   - 市场前台页 /extensions 与 /extensions/[slug] 也读这里
 *
 * 添加新扩展：
 *   1. 把 zip 拷贝到 public/downloads/<extensionKey>-<version>.zip
 *   2. 计算 sha256：shasum -a 256 public/downloads/<file>.zip
 *   3. 在下方 entries 数组追加一条 RegistryEntry · 填好 manifest + downloadUrl + sha256
 *   4. type-check 通过 → push → Portainer redeploy → 主仓后台扩展中心 30 秒内可见
 */

import type { RegistryEntry } from "../lib/registry-types";

export const registryEntries: RegistryEntry[] = [
  // ───────────────────────────────────────────────────────────────────────
  // 1. FTTP · 外贸通用主题 01 PRO（v1.0.3 · 2026-05-15 发布）
  //    BangNiCMS 第一个真正可独立分发的第三方主题
  // ───────────────────────────────────────────────────────────────────────
  {
    slug: "theme-foreign-trade-pro",
    category: "theme",
    iconKey: "globe",
    iconEmoji: "🌐",
    coverGradient: "from-blue-600 to-cyan-500",
    screenshots: [
      { url: "previews/home.png", caption: "首页 Hero + 信任徽章 + 精选产品", type: "frontend" },
      { url: "previews/products.png", caption: "产品列表与多语言筛选", type: "frontend" },
      { url: "previews/product-detail.png", caption: "产品详情页 OEM/ODM 询盘表单", type: "frontend" },
      { url: "previews/contact.png", caption: "联系页 inquiry 表单 + 推荐产品", type: "frontend" },
    ],
    manifest: {
      extensionKey: "theme-foreign-trade-pro",
      name: "外贸通用主题 01 PRO",
      extensionType: "theme",
      version: "1.0.3",
      description:
        "BangNiCMS 第一个真正可独立分发的第三方主题，面向外贸独立站场景。沿用 preview-export 富视觉布局，支持 OEM/ODM 询盘、产品贸易信息、定制选项等外贸专属特性。",
      author: "BangNiCMS",
      changelog:
        "## 1.0.3 (2026-05-15)\n" +
        "- 节点 E7：iframe 浮动预览架构 · 新增 renderPreviewPanel 入口 + src/preview-route-map.tsx 覆盖全 29 panel.route 映射\n" +
        "- 新增 src/types.ts · PreviewPanelInput/PreviewPanelOutput 类型与主仓 web 端对齐\n" +
        "- iframe 内 SSR 与前台 React 路径同链路 · 视觉天然一致\n" +
        "- package.json 修正历史版本 1.0.0 → 1.0.3 与 manifest 对齐\n\n" +
        "## 1.0.0 (2026-04-30)\n" +
        "- 阶段 2.0：脚手架贯通 + 探针路由\n" +
        "- 阶段 2.1：视觉骨架接管首页 / 产品列表 / 产品详情 / 联系页\n" +
        "- 阶段 2.2：首页接真实 API\n" +
        "- 阶段 2.3：产品页接真实 API\n" +
        "- 阶段 2.4：联系页接真实 inquiry\n" +
        "- 阶段 2.5：i18n + configPanels + 完整 e2e",
      tags: ["外贸", "独立站", "OEM", "ODM", "B2B", "首发"],
      marketingMeta: {
        targetIndustries: ["外贸独立站", "OEM 制造", "ODM 设计", "出口贸易", "工业品出口"],
        comingSoon: false,
        highlights: [
          "BangNiCMS 首个第三方独立分发主题",
          "原生支持 OEM / ODM 询盘流程",
          "产品贸易信息 + 定制选项内嵌字段",
          "多语言开箱即用（zh-CN / en / ja）",
          "iframe 浮动预览架构 · 后台编辑实时见效",
        ],
      },
      previews: [
        { url: "previews/home.png", caption: "首页", type: "frontend" },
        { url: "previews/product-detail.png", caption: "产品详情", type: "frontend" },
      ],
      config: {
        // 主题在主仓 SiteConfig.themeConfig 中可调的字段（仅展示 · 真实默认由主仓 ThemeService 加载）
        primaryColor: "#2563EB",
        languageOrder: ["zh-CN", "en", "ja"],
        showInquiryCart: true,
      },
    },
    // ⚠️ tarballUrl: 主仓 MarketService 拉的就是这个 URL
    //    caddy 已配 /downloads/* 长缓存 · 中国访问快
    downloadUrl: "https://www.bonnei.com/downloads/theme-foreign-trade-pro-1.0.3.zip",
    sha256: "d32133ec3f5951e95fc43cd3d612572fd96547d58f76b30321c0d134f079424b",
    documentationUrl: "/docs/themes/install-switch",
    repositoryUrl: "https://github.com/miaochi998/bangnicms-theme-foreign-trade-pro",
    stats: { installs: 0, stars: 0 },
    releasedAt: "2026-04-30",
    updatedAt: "2026-05-15",
    status: "stable",
    themeInfo: {
      tagline: "为外贸独立站量身定制的第一个第三方主题 · 内置 OEM/ODM 询盘漏斗、产品贸易信息、多语言切换 · 5 分钟从样板站到可交付的商务官网。",
      designTones: ["国际化商务", "信任导向", "高转化询盘", "OEM 行业友好"],
      palette: {
        name: "国际蓝",
        colors: ["#2563EB", "#1E40AF", "#F59E0B", "#0F172A", "#F8FAFC"],
      },
      typography: [
        "无衬线现代字体（Inter + 思源黑体）",
        "标题字重 700 · 转化文案突出",
        "正文行高 1.65 · 多语言阅读优化",
      ],
      pages: [
        {
          name: "首页",
          caption: "8 个 section · Hero 主标 + 信任徽章 + 精选产品 + WhyChooseUs + Inquiry CTA",
          blocks: ["Hero 区", "TrustStrip 信任徽章", "FeaturedProducts 精选产品", "WhyChooseUs 优势矩阵", "InquiryCta 询盘行动召唤"],
          layout: "marketing-home",
        },
        {
          name: "产品列表",
          caption: "卡片网格 + 多语言筛选 + 加载更多",
          blocks: ["分类导航", "产品卡片网格", "多语言切换", "加载更多/分页"],
          layout: "product-grid",
        },
        {
          name: "产品详情",
          caption: "图集 + 贸易信息表 + OEM/ODM 询盘表单 + 推荐产品",
          blocks: ["产品图集轮播", "贸易信息表（HS Code / MOQ / 起订量）", "OEM/ODM 询盘表单", "相关产品推荐"],
          layout: "product-detail",
        },
        {
          name: "分类页",
          caption: "SEO 友好独立 URL · 单分类产品列表",
          blocks: ["分类 Hero", "产品筛选", "产品网格"],
          layout: "product-grid",
        },
        {
          name: "联系页",
          caption: "多字段 inquiry 表单 + 推荐产品 + 快捷联系（WhatsApp / 电话 / 邮箱）",
          blocks: ["联系方式（电话/WhatsApp/邮箱）", "Inquiry 表单 · 5 字段", "推荐产品", "服务承诺（NDA 可签）"],
          layout: "contact",
        },
        {
          name: "隐私政策",
          caption: "独立主题路由 · 长文多语言可编辑",
          blocks: ["合规说明", "Cookie 政策", "GDPR 适配条款"],
          layout: "about",
        },
      ],
      bestFor: {
        industries: ["机械设备出口", "电子产品贸易", "服装鞋帽 OEM", "汽车配件出口", "家居用品 ODM"],
        scale: "30 - 300 人的外贸 / OEM / ODM 企业",
        contentVolume: "30 - 500 件产品 · 2-3 语言 · 月度新闻更新",
      },
      setupSteps: [
        {
          title: "在线安装（推荐）",
          description: "后台「扩展中心 → 主题市场」找到「外贸通用主题 01 PRO」· 点「安装」· 系统自动下载 zip · 校验 sha256 · 解压启用。",
        },
        {
          title: "离线安装（备用）",
          description: "在本页右上方点「下载 zip」· 后台「扩展中心 → 离线安装」上传刚才的 zip · 启用。",
        },
        {
          title: "调色 + 多语言",
          description: "「站点设置 → 品牌」上传 LOGO + 主色 · 默认 #2563EB 国际蓝。「i18n 设置」启用至少 zh-CN + en。",
        },
        {
          title: "录入产品 + 配置询盘",
          description: "「内容 → 产品」至少录入 6-12 件产品（带 HS Code / MOQ 等贸易字段）。「询盘」配置接收邮箱与自动回复模板。",
        },
        {
          title: "首页 8 section 配置",
          description: "「外观 → 主题设置」依次配置 Hero / TrustStrip / FeaturedProducts / WhyChooseUs / InquiryCta 等 section 内容。",
        },
      ],
      liveDemoUrl: "https://www.bonnei.com",
    },
    readme: `# 外贸通用主题 01 PRO（fttp v1.0.3）

> BangNiCMS **第一个**真正可独立分发的第三方主题 · 面向**外贸独立站 / OEM / ODM** 场景

## 设计目标

外贸独立站不同于一般企业官网：
- 询盘表单字段多（HS Code · MOQ · 包装规格 · OEM/ODM 意向）
- 多语言是底盘需求（zh-CN / en / ja 起步）
- 产品需要"贸易信息"专有字段（不止"价格"）
- 信任徽章前置（产能 · 资质 · NDA · 出口经验）

本主题把这些**原生支持**·开箱即用。

## 核心特性

- **8 个首页 section**：Hero / TrustStrip / FeaturedProducts / WhyChooseUs / InquiryCta · 全部可后台配置
- **24 条主题路由**：首页 / 产品列表 / 产品详情 / 分类页 / 联系 / 隐私 等全覆盖
- **OEM / ODM 询盘漏斗**：产品详情 → 加入询盘车 → 联系页提交一站式
- **i18n 三语开箱**：zh-CN / en / ja 翻译完整 · UI key 可后台改
- **内嵌模型包**：fttp-product-detail v1.0.0（贸易信息字段集）· 安装主题自动可用

## 安装

### 方式一：在线（推荐）

主仓 CMS 后台 → 扩展中心 → 主题市场 → 找到 fttp → 点「安装」

主仓 MarketService 会从 \`https://www.bonnei.com/downloads/theme-foreign-trade-pro-1.0.3.zip\` 拉取 · sha256 校验后自动解压启用。

### 方式二：离线

1. 在本页面下载 zip
2. 主仓后台 → 扩展中心 → 离线安装 → 上传 zip
3. 启用

## 配置项

| 字段 | 说明 | 默认值 |
|---|---|---|
| \`primaryColor\` | 主品牌色 | \`#2563EB\` |
| \`languageOrder\` | 多语言显示顺序 | \`["zh-CN", "en", "ja"]\` |
| \`showInquiryCart\` | 是否显示询盘车 | \`true\` |

具体可调字段见主仓「外观 → 主题设置」面板。

## 版本说明

v1.0.3 已通过：
- 主仓 BangNiCMS 端到端 E2E 314/314 通过
- 6 panel × 3 mode 全真渲染 0 fallback
- typecheck 三端零错误

## 仓库

[github.com/miaochi998/bangnicms-theme-foreign-trade-pro](https://github.com/miaochi998/bangnicms-theme-foreign-trade-pro)
`,
  },
];
