import { defineConfig } from 'vitepress'

// GitHub Pages serves a project site from /<repository>/. For a custom domain or a user site, build with DOCS_BASE=/.
const base = process.env.DOCS_BASE ?? '/UnstripLog/'

export default defineConfig({
  title: 'Unstrip Log',
  description: 'Stripping a log drops its bark, and the bark puts it back. Wiki for the Minecraft mod Unstrip Log.',
  base,
  cleanUrls: true,
  srcExclude: ['README.md', 'scripts/**'],
  // `head` entries are not rewritten for the base path, unlike links, images and the theme logo.
  head: [['link', { rel: 'icon', type: 'image/png', href: `${base}items/oak_bark.png` }]],
  themeConfig: {
    logo: { src: '/items/oak_bark.png', alt: '' },
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Bark', link: '/guide/bark' },
      { text: 'Configuration', link: '/config/' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting started', link: '/guide/getting-started' },
          { text: 'Stripping & unstripping', link: '/guide/stripping' },
          { text: 'Bark', link: '/guide/bark' },
          { text: 'JEI & multiplayer', link: '/guide/compat' },
        ],
      },
      {
        text: 'Configuration',
        items: [
          { text: 'Overview', link: '/config/' },
          { text: 'Common config', link: '/config/common' },
          { text: 'Unstrip detailed config', link: '/config/unstrip-detailed' },
          { text: 'Bark type config', link: '/config/bark-types' },
          { text: 'Example: a modded wood', link: '/config/modded-wood' },
        ],
      },
      { text: 'FAQ', link: '/faq' },
    ],
    socialLinks: [
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M4 19v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-3q-.425 0-.712-.288T14 20v-5q0-.425-.288-.712T13 14h-2q-.425 0-.712.288T10 15v5q0 .425-.288.713T9 21H6q-.825 0-1.412-.587T4 19"/></svg>',
        },
        link: 'https://coolerpromc.com/',
        ariaLabel: 'CoolerProMC website',
      },
      { icon: 'github', link: 'https://github.com/CoolerProYT/UnstripLog' },
      { icon: 'discord', link: 'http://discord.gg/hvFfqsqQm8' },
    ],
    search: { provider: 'local' },
    outline: { level: [2, 3] },
    footer: { message: 'Released under the MIT License.' },
  },
})
