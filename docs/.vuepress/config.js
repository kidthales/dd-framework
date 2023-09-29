import { defaultTheme } from 'vuepress';
import { typedocPlugin } from 'vuepress-plugin-typedoc/next';

module.exports = {
  locales: {
    '/': {
      lang: 'en-US',
      title: 'dd-framework',
      description: 'A framework for Pixel Game Maker MV.'
    }
  },
  theme: defaultTheme({
    locales: {
      '/': {
        navbar: [
          {
            text: 'Guide',
            link: '/guide/'
          },
          {
            text: 'API',
            link: '/api/'
          }
        ],
        logo: '/img/logo-light.png',
        logoDark: '/img/logo-dark.png',
        repo: 'kidthales/dd-framework',
        selectLanguageName: 'English'
      }
    }
  }),
  dest: './dist/docs',
  plugins: [
    typedocPlugin({
      entryPoints: [
        './lib/pgmmv',
        './src/common',
        './src/plugins/core/api',
        './src/plugins/message/api',
        './src/plugins/static-storage/api'
      ],
      tsconfig: '../tsconfig.json',
      cleanOutputDir: true,
      entryPointStrategy: 'expand',
      includeVersion: true,
      excludeNotDocumented: true,
      excludeNotDocumentedKinds: ['Namespace'],
      name: 'API',
      readme: 'none'
    })
  ]
};
