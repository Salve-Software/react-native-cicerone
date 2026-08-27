import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
  title: 'react-native-cicerone',
  tagline: 'Guided onboarding tours for React Native',
  favicon: 'img/favicon.ico',

  future: { v4: true, faster: true },

  url: 'https://salve-software.github.io',
  baseUrl: '/react-native-cicerone/',
  organizationName: 'Salve-Software',
  projectName: 'react-native-cicerone',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  markdown: { hooks: { onBrokenMarkdownLinks: 'warn' } },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt-BR'],
    localeConfigs: {
      en: { label: 'English' },
      'pt-BR': { label: 'Português' },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          editUrl:
            'https://github.com/Salve-Software/react-native-cicerone/tree/main/website/',
        },
        blog: false,
        theme: { customCss: './src/css/custom.css' },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/banner.png',
    colorMode: { defaultMode: 'dark', respectPrefersColorScheme: true },
    navbar: {
      title: 'cicerone',
      logo: { alt: 'react-native-cicerone', src: 'img/logo.svg' },
      items: [
        { type: 'docSidebar', sidebarId: 'docs', position: 'left', label: 'Docs' },
        {
          to: '/docs/api',
          label: 'API',
          position: 'left',
        },
        { type: 'localeDropdown', position: 'right' },
        {
          href: 'https://www.npmjs.com/package/@salve-software/react-native-cicerone',
          label: 'npm',
          position: 'right',
        },
        {
          href: 'https://github.com/Salve-Software/react-native-cicerone',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Getting started', to: '/docs/getting-started' },
            { label: 'Theming', to: '/docs/theming' },
            { label: 'API', to: '/docs/api' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'How it works', to: '/docs/how-it-works' },
            { label: 'Recipes', to: '/docs/recipes' },
          ],
        },
        {
          title: 'Salve Software',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Salve-Software/react-native-cicerone',
            },
            {
              label: 'npm',
              href: 'https://www.npmjs.com/package/@salve-software/react-native-cicerone',
            },
          ],
        },
      ],
      copyright: `Made by Salve Software · MIT licensed`,
    },
    prism: {
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['bash', 'json', 'tsx'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
