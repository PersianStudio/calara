import { defineConfig } from 'vitepress';

const SITE = 'https://persianstudio.github.io/calara';
const DOCS = `${SITE}/docs`;
const SHOWCASE = `${SITE}/showcase/`;

const KEYWORDS = [
  'calara',
  'react calendar',
  'react date picker',
  'zero dependency calendar',
  'day week month calendar',
  'react scheduler',
  'mini calendar',
  'time scrubber',
  'typescript calendar',
  'persian studio',
  'open source react calendar',
  'MIT calendar',
].join(', ');

/**
 * Hosted at https://persianstudio.github.io/calara/docs/
 * Showcase: https://persianstudio.github.io/calara/showcase/
 */
export default defineConfig({
  title: 'calara',
  titleTemplate: ':title · React calendar',
  description:
    'calara is a zero-dependency React calendar & date picker: day/week/month boards, scrubber, mini calendar, drawers, and a local date core. MIT. React peers only.',
  lang: 'en-US',
  base: '/calara/docs/',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,
  outDir: '../docs-dist',
  cacheDir: '../node_modules/.vitepress-cache',

  sitemap: {
    hostname: DOCS,
  },

  head: [
    ['link', { rel: 'icon', href: '/calara/docs/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'canonical', href: `${DOCS}/` }],
    ['meta', { name: 'theme-color', content: '#0b1220' }],
    ['meta', { name: 'color-scheme', content: 'dark light' }],
    ['meta', { name: 'author', content: 'Persian Studio' }],
    ['meta', { name: 'keywords', content: KEYWORDS }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large' }],

    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'calara' }],
    ['meta', { property: 'og:title', content: 'calara docs — React calendar & date picker' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'Zero-dependency React calendar: day/week/month boards, date picker, scrubber, local date core. MIT.',
      },
    ],
    ['meta', { property: 'og:url', content: `${DOCS}/` }],
    ['meta', { property: 'og:image', content: `${DOCS}/logo.png` }],
    ['meta', { property: 'og:image:alt', content: 'calara logo' }],
    ['meta', { name: 'twitter:image', content: `${DOCS}/logo.png` }],

    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: 'calara — React calendar documentation' }],
    [
      'meta',
      {
        name: 'twitter:description',
        content: 'Open-source React calendar & date picker. Zero runtime deps. Full docs + live showcase.',
      },
    ],
  ],

  themeConfig: {
    logo: { src: '/logo.svg', alt: 'calara' },
    siteTitle: 'calara',
    outline: [2, 3],
    search: {
      provider: 'local',
      options: {
        detailedView: true,
      },
    },

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/overview' },
      { text: 'Internals', link: '/internals/architecture' },
      { text: 'Showcase', link: SHOWCASE },
      { text: 'npm', link: 'https://www.npmjs.com/package/@persianstudio/calara' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/PersianStudio/calara' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/@persianstudio/calara' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Start here',
          items: [
            { text: 'Getting started', link: '/guide/getting-started' },
            { text: 'Core concepts', link: '/guide/concepts' },
          ],
        },
        {
          text: 'Building calendars',
          items: [
            { text: 'Calendar shell', link: '/guide/calendar' },
            { text: 'Day / week / month', link: '/guide/views' },
            { text: 'Events & mappers', link: '/guide/events' },
            { text: 'Drawers', link: '/guide/drawers' },
          ],
        },
        {
          text: 'Date picker & style',
          items: [
            { text: 'Date picker', link: '/guide/date-picker' },
            { text: 'Styling', link: '/guide/styling' },
          ],
        },
        {
          text: 'Local date core',
          items: [
            { text: 'Date helpers', link: '/guide/core-date' },
            { text: 'Time & grid math', link: '/guide/core-time' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API reference',
          items: [
            { text: 'Overview & exports', link: '/api/overview' },
            { text: 'Components', link: '/api/components' },
            { text: 'Types', link: '/api/types' },
            { text: 'Date & time core', link: '/api/core' },
          ],
        },
      ],
      '/internals/': [
        {
          text: 'Maintainers',
          items: [
            { text: 'Architecture', link: '/internals/architecture' },
            { text: 'Contributing', link: '/internals/contributing' },
            { text: 'Publishing to npm', link: '/internals/publishing' },
            { text: 'GitHub Pages', link: '/internals/github-pages' },
          ],
        },
      ],
    },

    editLink: {
      pattern: 'https://github.com/PersianStudio/calara/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    footer: {
      message:
        'Released under the MIT License · <a href="https://persianstudio.github.io/calara/showcase/">Live showcase</a>',
      copyright: 'Copyright © Persian Studio',
    },
  },
});
