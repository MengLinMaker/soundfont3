import { existsSync, readdirSync, statSync } from 'node:fs'
import { join, parse } from 'node:path'
import { type DefaultTheme, defineConfig } from 'vitepress'

const docDir = __dirname.replace('.vitepress', '')
const routesFolder = 'routes'
const routes = join(docDir, routesFolder)

// Auto create document routes
const sidebarWalkDir = (dir) => {
  const paths: DefaultTheme.Sidebar = []
  readdirSync(dir).map((fileName) => {
    const dirPath = join(dir, fileName)
    const isDirectory = statSync(dirPath).isDirectory()
    if (isDirectory) {
      const config: DefaultTheme.SidebarItem = {
        text: fileName.replace(docDir, ''), // Section name
        items: sidebarWalkDir(dirPath), // Relative folder path
        collapsed: false,
      }
      if (existsSync(join(dirPath, 'README.md'))) {
        config.link = join(dirPath, 'README.md').replace(docDir, '')
      }
      paths.push(config)
    } else if (fileName !== 'README.md') {
      const fileInfo = parse(fileName)
      const config: DefaultTheme.SidebarItem = {
        text: fileInfo.name, // Page name
        link: dirPath.replace(docDir, ''), // Relative MD file path
      }
      paths.push(config)
    }
  })
  return paths
}

export default defineConfig({
  title: 'SoundFont3',
  description: 'A SoundFont3 parser for Node.js and web browsers',
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Doc', link: '/routes/1.%20Guide/README.html' },
      { text: 'v0.0.1 (alpha)', link: '' },
    ],

    sidebar: sidebarWalkDir(routes),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/musidi-org/soundfont3' },
    ],

    search: {
      provider: 'local',
      options: {
        detailedView: true,
      },
    },

    footer: {
      message:
        'Released under the <a href="https://github.com/musidi-org/soundfont3/blob/master/LICENSE">MIT License</a>.',
      copyright:
        'Copyright © 2024-present <a href="https://github.com/Mrtenz">Maarten Zuidhoorn</a> & <a href="https://github.com/MengLinMaker">Meng Lin</a>',
    },
  },
})
