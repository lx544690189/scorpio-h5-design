import { defineConfig } from 'umi';
import path from 'path';
//@ts-expect-error
import pxToViewPort from 'postcss-px-to-viewport-fixed';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';


export default defineConfig({
  history: {
    type: 'hash',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/', redirect:'/manage/page' },
        { path: '/design', component: '@/pages/design' },
        { path: '/mobile', component: '@/pages/mobile' },
        {
          path: '/manage', routes: [
            { path: '/manage/category', component: '@/pages/manage/category' },
            { path: '/manage/component', component: '@/pages/manage/component' },
            { path: '/manage/component/detail', component: '@/pages/manage/component/detail' },
            { path: '/manage/page', component: '@/pages/manage/page' },
          ]
        },
      ],
    },
  ],
  dynamicImport: {
    loading: '@/components/DynamicLoading',
  },
  ignoreMomentLocale: true,
  inlineLimit: false,
  title: '搭建',
  alias: {
    '@src': path.resolve(__dirname, 'src'),
  },
  // fastRefresh:{},
  // esbuild: {},
  extraPostCSSPlugins: [
    pxToViewPort({
      viewportWidth: 750, // (Number) The width of the viewport.
      viewportHeight: 1334, // (Number) The height of the viewport.
      unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
      viewportUnit: 'vw', // (String) Expected units.
      selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
      minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
      mediaQuery: false, // (Boolean) Allow px to be converted in media queries.
      include: /h5Lib/i,
      exclude: /node_modules/i,
    }),
  ],
  chainWebpack: (memo) => {
    // 更多配置 https://github.com/Microsoft/monaco-editor-webpack-plugin#options
    memo.plugin('monaco-editor-webpack-plugin').use(MonacoWebpackPlugin, [
      // 按需配置
      { languages: ['json'] }
    ]);
    return memo;
  },
  // 配置 external
  externals: {
    'react': 'window.React',
    'react-dom': 'window.ReactDOM',
  },
  // 引入被 external 库的 scripts
  // 区分 development 和 production，使用不同的产物
  scripts: process.env.NODE_ENV === 'development' ? [
    'https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.development.js',
    'https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.development.js',
  ] : [
    'https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.production.min.js',
    'https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.production.min.js',
  ],
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
});
