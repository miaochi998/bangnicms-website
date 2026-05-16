/**
 * BangNiCMS 扩展市场 — 主仓 MarketService 兼容端点
 * ─────────────────────────────────────────────────────────────────────────
 * URL: GET /api/v1/registry/extensions.json
 *
 * 此端点输出主仓 MarketService.fetchRemoteRegistry() 期望的简精 schema：
 *
 *   {
 *     "extensions": [
 *       { "id": "<extensionKey>", "name": "...", "latestVersion": "1.0.3",
 *         "tarballUrl": "https://...zip", "sha256": "..." }
 *     ]
 *   }
 *
 * 与 /api/v1/registry/index.json（前台 UI 富展示用）的区别：
 *   - 此端点只输出主仓校验必需字段
 *   - 只包含 category=theme|plugin（不含 model · 主仓 MarketService 不识别）
 *   - 字段命名严格对齐主仓 isValidRegistry() 校验（不能改）
 *
 * 主仓使用方式：
 *   后台 → 站点设置 → 扩展市场 → SiteConfig.registryUrl
 *   填入：https://www.bonnei.com/api/v1/registry/extensions.json
 */
import type { APIRoute } from "astro";
import { registryEntries } from "../../../../registry/entries";

export const prerender = true;

interface MarketRegistryItem {
  id: string;
  name: string;
  latestVersion: string;
  tarballUrl: string;
  sha256?: string;
  description?: string;
  author?: string;
}

interface MarketRegistry {
  extensions: MarketRegistryItem[];
}

export const GET: APIRoute = () => {
  const items: MarketRegistryItem[] = registryEntries
    // 主仓 MarketService 当前只识别 theme + plugin · 模型包不走这里
    .filter((e) => e.category === "theme" || e.category === "plugin")
    .map((e) => {
      const m = e.manifest;
      // manifest 此时是 ExtensionManifest（theme/plugin）· 不是 ModelPackageManifest
      const ext = m as { extensionKey: string; name: string; version: string; description?: string; author?: string };
      return {
        id: ext.extensionKey,
        name: ext.name,
        latestVersion: ext.version,
        tarballUrl: e.downloadUrl,
        ...(e.sha256 ? { sha256: e.sha256 } : {}),
        ...(ext.description ? { description: ext.description } : {}),
        ...(ext.author ? { author: ext.author } : {}),
      };
    });

  const payload: MarketRegistry = { extensions: items };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      // 5 分钟 CDN/浏览器缓存 · 后台拉到的数据有限新鲜度
      "cache-control": "public, max-age=300, s-maxage=86400",
    },
  });
};
