/**
 * BangNiCMS 扩展市场 Registry 类型定义
 *
 * 设计原则：
 *   - manifest 字段严格对齐 BangNiCMS 主仓 extensions.service.ts / model-packages.service.ts
 *     的实际校验逻辑（详见 docs/implementation-plan-v1-archived.md §6）
 *   - registry 在 manifest 之外加一层"市场展示元信息"（slug / 截图 / 统计 / 状态等）
 *   - 主仓拉取时只需要 manifest，市场前台用全部字段
 */

// ─── 主仓 manifest（与主仓校验逻辑严格对齐） ────────────────────────────────

/** 预览图条目 */
export interface PreviewImage {
  url: string;
  caption: string;
  type: "frontend" | "editor" | "admin";
}

/** 营销/市场展示元信息（manifest.marketingMeta） */
export interface MarketingMeta {
  targetIndustries?: string[];
  comingSoon?: boolean;
  highlights?: string[];
}

/** 主题 / 插件 manifest */
export interface ExtensionManifest {
  extensionKey: string;
  name: string;
  extensionType: "theme" | "plugin";
  version: string;
  description?: string;
  author?: string;
  changelog?: string;
  tags?: string[];
  marketingMeta?: MarketingMeta;
  previews?: PreviewImage[];
  config?: Record<string, unknown>;
  configSchema?: Record<string, unknown>;
}

/** 模型包 package.json */
export interface ModelPackageManifest {
  packageKey: string;
  name: string;
  version: string;
  targetEntity: "article" | "product" | "download" | "page";
  fieldGroups: unknown[];
  description?: string;
  longDescription?: string;
  changelog?: string;
  author?: string;
  modelType?: "content_type" | "page_type" | "component_type";
  tags?: string[];
  previews?: PreviewImage[];
  marketingMeta?: MarketingMeta;
  sampleData?: Record<string, unknown>;
}

// ─── Registry 层：市场展示用的额外元信息 ──────────────────────────────────────

export type RegistryCategory = "theme" | "plugin" | "model";

export type RegistryStatus =
  | "stable"
  | "beta"
  | "deprecated"
  | "coming-soon";

export interface RegistryStats {
  /** 累计安装次数（mock 阶段为静态值） */
  installs: number;
  /** GitHub stars（mock 阶段为静态值） */
  stars: number;
}

// ─── 主题详情页专属富信息 ─────────────────────────────────────────────────────

/** 配色方案：5 个色块 */
export interface ColorPalette {
  /** 调性名称，如「商务蓝」「工业灰」 */
  name: string;
  /** 5 个十六进制色（主/辅/强调/中性/底） */
  colors: string[];
}

/** 主题包含的一个页面/模块 */
export interface ThemePageMockup {
  /** 名称：首页 / 产品列表 / 产品详情 等 */
  name: string;
  /** 简短说明 */
  caption: string;
  /** 包含的模块（用于在 mockup 上标注） */
  blocks: string[];
  /** mockup 风格预设：影响插画式占位的布局 */
  layout:
    | "marketing-home"
    | "product-grid"
    | "product-detail"
    | "article-list"
    | "article-detail"
    | "about"
    | "contact"
    | "dashboard";
}

/** 适合的企业画像 */
export interface BestForProfile {
  /** 适合行业 */
  industries: string[];
  /** 适合规模描述 */
  scale: string;
  /** 适合的内容体量描述 */
  contentVolume: string;
}

/** 主题详情富信息 */
export interface ThemeRichInfo {
  /** 一句话价值主张（Hero 副标题） */
  tagline: string;
  /** 设计调性，3-5 个标签 */
  designTones: string[];
  /** 配色方案 */
  palette: ColorPalette;
  /** 字体定位（如「无衬线 / 中文优先 / 标题字距收紧」） */
  typography: string[];
  /** 包含的页面与模块 */
  pages: ThemePageMockup[];
  /** 适合什么样的企业 */
  bestFor: BestForProfile;
  /** 安装后建议步骤 */
  setupSteps: { title: string; description: string }[];
  /** 在线预览 URL（可选） */
  liveDemoUrl?: string;
}

// ─── 插件详情页专属富信息 ─────────────────────────────────────────────────────

/** 插件功能项 */
export interface PluginFeature {
  /** emoji 图标 */
  icon: string;
  /** 功能名 */
  title: string;
  /** 一句话说明 */
  summary: string;
  /** 详细描述（可含多段） */
  details: string[];
}

/** 插件价值数据 */
export interface PluginValueProp {
  /** 数字/百分比 */
  metric: string;
  /** 标签 */
  label: string;
}

/** 设置步骤 */
export interface PluginSetupStep {
  title: string;
  description: string;
}

/** 插件 FAQ */
export interface PluginFaq {
  q: string;
  a: string;
}

/** 插件详情富信息 */
export interface PluginRichInfo {
  /** 一句话价值主张 */
  tagline: string;
  /** 解决什么问题（2-3 段） */
  problemStatement: string[];
  /** 核心功能矩阵 */
  features: PluginFeature[];
  /** 价值数据 */
  valueProps: PluginValueProp[];
  /** 设置流程 */
  setupSteps: PluginSetupStep[];
  /** 常见问答 */
  faqs: PluginFaq[];
}

// ─── 模型包详情页专属富信息 ───────────────────────────────────────────────────

/** 模型字段元信息（用于详情页可视化展示，比 manifest.fieldGroups 更友好） */
export interface ModelField {
  key: string;
  label: string;
  type: "text" | "number" | "boolean" | "json" | "image" | "select" | "date";
  required: boolean;
  description: string;
  /** 示例值，用于展示 */
  example?: string;
}

/** 模型字段分组 */
export interface ModelFieldDisplayGroup {
  /** 分组名 */
  name: string;
  /** 分组说明 */
  description: string;
  /** 字段列表 */
  fields: ModelField[];
}

/** 模型详情富信息 */
export interface ModelRichInfo {
  /** 一句话价值主张 */
  tagline: string;
  /** 适用对象描述（如「为产品页加上访客评分能力」） */
  appliesTo: string;
  /** 字段分组 */
  fieldGroups: ModelFieldDisplayGroup[];
  /** 样例条目（已填好的示例） */
  sampleEntry: { fieldKey: string; value: string }[];
  /** 主题集成代码示例 */
  themeUsageCode: string;
  /** 主题集成说明 */
  themeUsageNote: string;
  /** 卸载安全说明 */
  uninstallSafety: string[];
}

// ─── Registry 主条目 ──────────────────────────────────────────────────────────

export interface RegistryEntry {
  /** URL slug，市场访问路径 /extensions/[slug] */
  slug: string;
  /** 类型分组：主题 / 插件 / 模型包 */
  category: RegistryCategory;
  /** 单色 stroke 图标 key（对应 src/components/Icon.astro 中的 name） */
  iconKey: string;
  /** 卡片用 emoji 图标（已废弃，仅向后兼容；新代码请用 iconKey） */
  iconEmoji?: string;
  /** 详情页 Hero 渐变色（Tailwind from/to 类） */
  coverGradient: string;
  /** 截图组（详情页用） */
  screenshots: PreviewImage[];

  /**
   * 主仓 manifest 内嵌
   *   - 主题/插件：ExtensionManifest
   *   - 模型包：ModelPackageManifest
   *
   * 主仓拉取时只读这块。
   */
  manifest: ExtensionManifest | ModelPackageManifest;

  /** zip 下载地址（mock 阶段为占位 #） */
  downloadUrl: string;
  /** 文档站对应章节链接 */
  documentationUrl?: string;
  /** 仓库地址 */
  repositoryUrl?: string;

  stats: RegistryStats;
  releasedAt: string; // ISO 日期
  updatedAt: string;
  status: RegistryStatus;

  /** README markdown（详情页正文） */
  readme: string;

  /** 详情页富信息（按 category 三选一） */
  themeInfo?: ThemeRichInfo;
  pluginInfo?: PluginRichInfo;
  modelInfo?: ModelRichInfo;
}

/** Registry 索引（/api/v1/registry/index.json 输出） */
export interface RegistryIndex {
  /** 索引生成时间 */
  generatedAt: string;
  /** Registry schema 版本 */
  schemaVersion: 1;
  /** 全部扩展条目（精简字段） */
  entries: RegistrySummary[];
  /** 分组摘要 */
  counts: Record<RegistryCategory, number>;
}

/** 索引中精简后的条目（不含 README、screenshots、fieldGroups 等大字段） */
export interface RegistrySummary {
  slug: string;
  category: RegistryCategory;
  iconKey: string;
  name: string;
  description: string;
  author: string;
  version: string;
  tags: string[];
  highlights: string[];
  status: RegistryStatus;
  stats: RegistryStats;
  updatedAt: string;
}

// ─── 工具函数：从 RegistryEntry 抽取 RegistrySummary ─────────────────────────

export function toRegistrySummary(entry: RegistryEntry): RegistrySummary {
  const m = entry.manifest;
  // 主题/插件用 name/description；模型包同样有 name/description
  const description =
    "description" in m && m.description ? m.description : "";
  const tags = ("tags" in m && m.tags) || [];
  const highlights = m.marketingMeta?.highlights ?? [];
  const author = "author" in m && m.author ? m.author : "BangNiCMS Official";

  return {
    slug: entry.slug,
    category: entry.category,
    iconKey: entry.iconKey,
    name: m.name,
    description,
    author,
    version: m.version,
    tags,
    highlights,
    status: entry.status,
    stats: entry.stats,
    updatedAt: entry.updatedAt,
  };
}
