import { normalize } from 'path';
import shell from 'shelljs';
import { defaultTheme } from 'vuepress-webpack';
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
            text: 'Download',
            link: 'https://github.com/kidthales/dd-framework/releases'
          },
          {
            text: 'Guide',
            link: '/guide/'
          },
          {
            text: 'Plugins',
            link: '/plugins/'
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
    (ctx) => {
      return {
        name: 'dd-plugins-md',
        onInitialized: () =>
          shell
            .cd(normalize(`${__dirname}/../..`))
            .exec(`npm run tools:plugins-md -- --locale en --out ${normalize(ctx.dir.source() + '/plugins')} --clean`)
      };
    },
    typedocPlugin({
      entryPoints: [
        './lib/pgmmv',
        './src/common',
        './src/plugins/core/api',
        './src/plugins/message/api',
        './src/plugins/storage/api'
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
