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
      // 当前阶段只引用已完成的示范文档；其余目录占位放在右侧"即将上线"展示，
      // 待用户敲定示范质量后逐篇补全
      sidebar: [
        {
          label: '快速开始',
          items: [
            { label: '安装部署', slug: 'docs/getting-started/installation' },
          ],
        },
        {
          label: '即将上线',
          collapsed: true,
          items: [
            { label: '系统介绍', link: '#', badge: { text: 'WIP', variant: 'caution' } },
            { label: '功能总览', link: '#', badge: { text: 'WIP', variant: 'caution' } },
            { label: '初始化向导', link: '#', badge: { text: 'WIP', variant: 'caution' } },
            { label: '常见安装问题', link: '#', badge: { text: 'WIP', variant: 'caution' } },
            { label: '内容管理（4 篇）', link: '#', badge: { text: 'WIP', variant: 'caution' } },
            { label: '多语言（3 篇）', link: '#', badge: { text: 'WIP', variant: 'caution' } },
            { label: '主题与插件（4 篇）', link: '#', badge: { text: 'WIP', variant: 'caution' } },
            { label: '备份与升级（3 篇）', link: '#', badge: { text: 'WIP', variant: 'caution' } },
            { label: 'FAQ', link: '#', badge: { text: 'WIP', variant: 'caution' } },
          ],
        },
      ],
    }),
    mdx(),
  ],
});
