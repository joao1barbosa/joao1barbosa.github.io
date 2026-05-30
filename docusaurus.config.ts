import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'João Barbosa',
  tagline: 'Fullstack Software Engineer — Next.js, Supabase & TypeScript.',
  favicon: 'img/favicon.ico',

  // Site servido na raiz do GitHub Pages (user page).
  url: 'https://joao1barbosa.github.io',
  baseUrl: '/',

  future: {
    v4: true,
  },
  organizationName: 'joao1barbosa',
  projectName: 'joao1barbosa.github.io',
  onBrokenLinks: 'throw',
  // Os links do dock (/#work, /#projects…) apontam para ids de <section> na
  // landing, que o checker estático do Docusaurus não registra (só anchors de
  // headings). Os anchors existem e funcionam em runtime, então ignoramos.
  onBrokenAnchors: 'ignore',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        // Docs viram o "Notebook" (rota /notebook).
        docs: {
          sidebarPath: './sidebars.ts',
          path: 'notebook',
          routeBasePath: 'notebook',
        },
        // Blog mantém a rota padrão /blog.
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [
      {
        name: 'description',
        content:
          "João Barbosa — Fullstack Software Engineer na Payevo (Fintech). Stack Next.js, Supabase e TypeScript.",
      },
      {name: 'keywords', content: 'software engineer, fullstack, next.js, supabase, typescript, react'},
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'João Barbosa',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'notebookSidebar',
          position: 'right',
          label: 'Notebook',
        },
        {
          to: '/blog',
          label: 'Blog',
          position: 'right',
        },
        {
          href: 'https://github.com/joao1barbosa',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      // Sem style:'dark' → usa --ifm-footer-background-color (mapeado p/ --lp-bg-2),
      // ficando suave e integrado ao tema em vez do cinza padrão.
      copyright: `Copyright © ${new Date().getFullYear()} João Pedro Ribeiro Barbosa.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
