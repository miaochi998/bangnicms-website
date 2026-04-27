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

export interface RegistryEntry {
  /** URL slug，市场访问路径 /extensions/[slug] */
  slug: string;
  /** 类型分组：主题 / 插件 / 模型包 */
  category: RegistryCategory;
  /** 卡片用 emoji 图标（兜底，无需 CDN） */
  iconEmoji: string;
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
  iconEmoji: string;
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
    iconEmoji: entry.iconEmoji,
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
