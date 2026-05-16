import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.bonnei.com',
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    starlight({
      title: 'BangNiCMS 文档',
      description: 'BangNiCMS 完整使用文档与故障排查指南',
      defaultLocale: 'root',
      locales: {
        root: { label: '简体中文', lang: 'zh-CN' },
      },
      logo: {
        src: './src/assets/logo.svg',
        replacesTitle: false,
      },
      favicon: '/favicon.svg',
      components: {
        SocialIcons: './src/components/StarlightSocialIcons.astro',
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/miaochi998/BangNiCMS',
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/miaochi998/bangnicms-website/edit/main/',
      },
      lastUpdated: true,
      pagination: true,
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
      customCss: ['./src/styles/starlight.css'],
      sidebar: [
        {
          label: '介绍',
          items: [
            { label: 'BangNiCMS 是什么', slug: 'docs/intro/what-is-bangnicms' },
            { label: '核心概念', slug: 'docs/intro/core-concepts' },
            { label: '5 分钟快速体验', slug: 'docs/intro/quick-start' },
          ],
        },
        {
          label: '部署上线',
          items: [
            { label: '服务器与域名准备', slug: 'docs/deploy/server-and-domain' },
            { label: 'Portainer 一键部署', slug: 'docs/deploy/portainer-deploy' },
            { label: '5 步安装向导', slug: 'docs/deploy/installation-wizard' },
            { label: 'DNS 与 HTTPS', slug: 'docs/deploy/dns-and-https' },
            { label: '首次站点配置', slug: 'docs/deploy/first-site-setup' },
          ],
        },
        {
          label: '内容管理',
          items: [
            { label: '内容管理总览', slug: 'docs/content/overview' },
            { label: '页面管理', slug: 'docs/content/pages' },
            { label: '产品管理', slug: 'docs/content/products' },
            { label: '文章管理', slug: 'docs/content/articles' },
            { label: '下载管理', slug: 'docs/content/downloads' },
            { label: '分类管理', slug: 'docs/content/categories' },
            { label: '菜单管理', slug: 'docs/content/menus' },
            { label: '媒体库', slug: 'docs/content/media' },
            { label: '内容模型扩展', slug: 'docs/content/content-models' },
          ],
        },
        {
          label: '多语言',
          items: [
            { label: '多语言总览', slug: 'docs/i18n/overview' },
            { label: '语言管理', slug: 'docs/i18n/languages' },
            { label: '翻译工作流', slug: 'docs/i18n/translation-workflow' },
            { label: '翻译进度仪表盘', slug: 'docs/i18n/completion-dashboard' },
            { label: 'URL 策略与语言段', slug: 'docs/i18n/url-strategy' },
            { label: 'UI 文案 i18n', slug: 'docs/i18n/ui-i18n' },
          ],
        },
        {
          label: '站点配置',
          items: [
            { label: '站点配置总览', slug: 'docs/site-config/overview' },
            { label: '品牌信息与 SEO', slug: 'docs/site-config/branding-seo' },
            { label: '域名与 URL 策略', slug: 'docs/site-config/domain-url-strategy' },
            { label: '上传与媒体设置', slug: 'docs/site-config/upload-media' },
            { label: '邮件通知与 AI 模型', slug: 'docs/site-config/email-ai' },
          ],
        },
        {
          label: '主题',
          items: [
            { label: '主题总览', slug: 'docs/themes/overview' },
            { label: '安装与切换主题', slug: 'docs/themes/install-switch' },
            { label: '主题设置项', slug: 'docs/themes/settings' },
            { label: '首页模块管理', slug: 'docs/themes/homepage-modules' },
            { label: '主题与插件协作', slug: 'docs/themes/plugin-slots' },
          ],
        },
        {
          label: '插件',
          items: [
            { label: '插件总览', slug: 'docs/plugins/overview' },
            { label: '安装与启用插件', slug: 'docs/plugins/install-enable' },
            { label: '插件配置', slug: 'docs/plugins/configuration' },
            { label: '挂载到主题槽位', slug: 'docs/plugins/mounting' },
            { label: '常见插件类型与用法', slug: 'docs/plugins/common-types' },
          ],
        },
        {
          label: '模型包',
          items: [
            { label: '模型包总览', slug: 'docs/model-packages/overview' },
            { label: '安装与启用模型包', slug: 'docs/model-packages/install-enable' },
            { label: '字段管理与可见性', slug: 'docs/model-packages/field-management' },
            { label: '模型包升级与版本', slug: 'docs/model-packages/upgrade-version' },
            { label: '何时该开发新模型包', slug: 'docs/model-packages/when-to-develop' },
          ],
        },
        {
          label: 'AI 助手',
          items: [
            { label: 'AI 助手总览', slug: 'docs/ai/overview' },
            { label: 'AI 翻译', slug: 'docs/ai/translation' },
            { label: 'AI 图片识别', slug: 'docs/ai/vision' },
            { label: 'AI SEO 写作', slug: 'docs/ai/seo-writing' },
          ],
        },
        {
          label: '询盘与转化',
          items: [
            { label: '询盘与转化总览', slug: 'docs/inquiry/overview' },
            { label: '询盘表单设置', slug: 'docs/inquiry/form-settings' },
            { label: '处理询盘', slug: 'docs/inquiry/processing' },
            { label: '通知与跟进', slug: 'docs/inquiry/notifications' },
            { label: '防垃圾询盘', slug: 'docs/inquiry/anti-spam' },
            { label: '转化分析', slug: 'docs/inquiry/conversion-analytics' },
          ],
        },
        {
          label: '数据统计',
          items: [
            { label: '数据统计总览', slug: 'docs/analytics/overview' },
            { label: '流量与内容表现', slug: 'docs/analytics/traffic-content' },
            { label: 'SEO 数据看板', slug: 'docs/analytics/seo-dashboard' },
            { label: '整合 GA / 百度统计', slug: 'docs/analytics/external-integration' },
          ],
        },
        {
          label: '用户与权限',
          items: [
            { label: '用户与权限总览', slug: 'docs/users/overview' },
            { label: '用户管理', slug: 'docs/users/management' },
            { label: '角色与权限', slug: 'docs/users/roles-permissions' },
            { label: '安全最佳实践', slug: 'docs/users/security-best-practices' },
          ],
        },
        {
          label: '备份与升级',
          items: [
            { label: '备份与升级总览', slug: 'docs/upgrade/overview' },
            { label: '备份策略', slug: 'docs/upgrade/backup' },
            { label: '升级流程', slug: 'docs/upgrade/upgrade-process' },
            { label: '数据迁移', slug: 'docs/upgrade/data-migration' },
            { label: '升级前检查清单', slug: 'docs/upgrade/checklist' },
            { label: '灾难恢复', slug: 'docs/upgrade/disaster-recovery' },
          ],
        },
        {
          label: '故障排查',
          items: [
            { label: '故障排查总览', slug: 'docs/troubleshooting/overview' },
            { label: '前台显示问题', slug: 'docs/troubleshooting/frontend-issues' },
            { label: '后台操作问题', slug: 'docs/troubleshooting/backend-issues' },
            { label: '邮件 / 通知问题', slug: 'docs/troubleshooting/notification-issues' },
            { label: '多语言 / SEO 问题', slug: 'docs/troubleshooting/i18n-seo-issues' },
            { label: '性能问题', slug: 'docs/troubleshooting/performance-issues' },
          ],
        },
        {
          label: '开发者',
          collapsed: true,
          items: [
            { label: '开发者总览', slug: 'docs/developer/overview' },
            { label: 'API 总览', slug: 'docs/developer/api-overview' },
            { label: '主题开发', slug: 'docs/developer/theme-development' },
            { label: '插件开发', slug: 'docs/developer/plugin-development' },
            { label: '模型包开发', slug: 'docs/developer/model-package-development' },
            { label: '本地开发环境', slug: 'docs/developer/local-dev' },
            { label: '打包与发布', slug: 'docs/developer/packaging' },
            { label: '贡献指南', slug: 'docs/developer/contributing' },
          ],
        },
      ],
    }),
    mdx(),
  ],
});
