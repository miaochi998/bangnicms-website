import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://cms.bonnei.com',
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
          label: '即将上线',
          collapsed: true,
          items: [
            { label: '内容管理（9 篇）', link: '#', badge: { text: 'WIP', variant: 'caution' } },
            { label: '多语言（6 篇）', link: '#', badge: { text: 'WIP', variant: 'caution' } },
            { label: '站点配置（5 篇）', link: '#', badge: { text: 'WIP', variant: 'caution' } },
            { label: '主题（5 篇）', link: '#', badge: { text: 'WIP', variant: 'caution' } },
            { label: '插件（5 篇）', link: '#', badge: { text: 'WIP', variant: 'caution' } },
            { label: '模型包（5 篇）', link: '#', badge: { text: 'WIP', variant: 'caution' } },
            { label: 'AI 助手（4 篇）', link: '#', badge: { text: 'WIP', variant: 'caution' } },
            { label: '询盘与转化（5 篇）', link: '#', badge: { text: 'WIP', variant: 'caution' } },
            { label: '数据统计（4 篇）', link: '#', badge: { text: 'WIP', variant: 'caution' } },
            { label: '用户与权限（3 篇）', link: '#', badge: { text: 'WIP', variant: 'caution' } },
            { label: '备份与升级（5 篇）', link: '#', badge: { text: 'WIP', variant: 'caution' } },
            { label: '开发者（7 篇）', link: '#', badge: { text: 'WIP', variant: 'caution' } },
            { label: '故障排查（5 篇）', link: '#', badge: { text: 'WIP', variant: 'caution' } },
          ],
        },
      ],
    }),
    mdx(),
  ],
});
