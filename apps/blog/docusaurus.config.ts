import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';


const config: Config = {
  title: 'Blog: joao1barbosa',
  tagline: 'Here you find what I\'m studying and what\'s on my mind.',
  favicon: 'img/favicon.ico',
  url: 'https://joao1barbosa.github.io',
  baseUrl: '/blog/',
  
  future: {
    v4: true,
  },
  organizationName: 'joao1barbosa', 
  projectName: 'joao1barbosa.github.io',
  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          path: 'notebook',
          routeBasePath: 'notebook',
        },
        blog: {
          showReadingTime: true,
          path: 'thoughts',
          routeBasePath: 'thoughts',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Joao Barbosa',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'notebookSidebar',
          position: 'right',
          label: 'Notebook',
        },
        {
          to: '/thoughts', 
          label: 'Thoughts',
          position: 'right'},
        {
          href: 'https://joao1barbosa.github.io/',
          label: 'Portfolio',
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
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} João Pedro Ribeiro Barbosa.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
