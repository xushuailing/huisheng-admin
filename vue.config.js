const isDev = process.env.NODE_ENV === 'development';
const baseURI = isDev ? '' : './';

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  publicPath: `${baseURI}`, // 根域上下文目录
  configureWebpack: (config) => {
    const externals = {
      vue: 'Vue',
      // vuex: 'Vuex',
      // 'vue-router': 'VueRouter',
      // axios: 'axios',
      // jsencrypt: 'JSEncrypt',
      // echarts: 'echarts',
      // jquery: '$',
    };
    config.output.libraryExport = 'default';
    // if (!isDev) {
    //   externals['element-ui'] = 'ELEMENT';
    // }

    config.externals = externals;

    // // 打包独立模块
    // if (!isDev) {
    //   const key = pages && Object.keys(pages)[0];
    //   const page = key && key.includes('index') ? {} : pages[key];

    //   if (page && Object.keys(page).length) {
    //     return;
    //   }
    // }

    // 加载资源
    // const isMin = isPro ? '.min' : '';
    // const cndPath = isPro
    //   ? 'https://oss.shencom.cn'
    //   : 'https://scplugins.oss-cn-shenzhen.aliyuncs.com';
    // const libPath = isDev ? '../assets' : `${cndPath}/plugins${isPro ? '' : '/test'}/scloud/lib`;
    // const js = [
    //   `${libPath}/js/vue/2.5.17/vue${isMin}.js`,
    //   `${libPath}/js/vuex/3.0.1/vuex${isMin}.js`,
    //   `${libPath}/js/vue-router/3.0.1/vue-router${isMin}.js`,
    //   `${libPath}/js/axios/0.18.0/axios${isMin}.js`,
    //   `${libPath}/js/jquery/3.3.1/jquery${isMin}.js`,
    //   `${libPath}/js/jsencrypt/3.0.0-rc.1/jsencrypt${isMin}.js`,
    //   `${libPath}/js/echarts/4.2.0-rc.2/echarts${isMin}.js`,
    //   `${libPath}/js/v-charts/1.19.0/index${isMin}.js`,
    //   `${isDev ? '' : `${libPath}/js/element-ui/2.13.0/element-ui.min.js`}`,
    // ].filter((v) => v);
    // const css = [
    //   `${libPath}/fonts/index.css`,
    //   `${libPath}/theme/fonts/index.css`,
    //   `${libPath}/css/v-charts/1.19.0/style.min.css`,
    //   `${libPath}/css/animate/3.7.0/animate.min.css`,
    //   {
    //     path: `${libPath}/theme/default/index.css`,
    //     attributes: { id: 'theme' },
    //   },
    // ];

    // const tags = new HtmlWebpackIncludeAssetsPlugin({
    //   assets: [...js, ...css],
    //   append: false,
    // });

    // config.plugins.push(tags);
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/styles/mixin/index.scss";`,
      },
    },
  },
  devServer: {
    disableHostCheck: true,
    publicPath: '/',
    open: true,
    host: '0.0.0.0',
    // port: 8080,
    // https: false,
    // hotOnly: false,
    proxy: {
      '/api': {
        target: 'https://restaurant.isoft.mobi',
        ws: true,
        changOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
    before: (app) => {},
  },
};
