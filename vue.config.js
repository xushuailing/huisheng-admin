const isDev = process.env.NODE_ENV === 'development';
const baseURI = isDev ? '' : './';
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  publicPath: `${baseURI}`, // 根域上下文目录
  configureWebpack: (config) => {
    const externals = {
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      axios: 'axios',
      echarts: 'echarts',
      jquery: '$',
      'element-ui': 'ELEMENT',
    };
    config.output.libraryExport = 'default';
    config.externals = externals;

    const libPath = '../assets';
    const js = [
      `${libPath}/js/vue/2.6.11/vue.js`,
      `${libPath}/js/vuex/3.0.1/vuex.min.js`,
      `${libPath}/js/vue-router/3.0.1/vue-router.min.js`,
      `${libPath}/js/axios/0.18.0/axios.min.js`,
      `${libPath}/js/jquery/3.3.1/jquery.min.js`,
      `${libPath}/js/echarts/4.2.0-rc.2/echarts.min.js`,
      //   `${libPath}/js/v-charts/1.19.0/index.min.js`,
      `${libPath}/js/element-ui/2.13.0/element-ui.min.js`,
    ].filter((v) => v);
    const css = [];

    const tags = new HtmlWebpackIncludeAssetsPlugin({
      assets: [...js, ...css],
      append: false,
    });

    config.plugins.push(tags);
  },
  css: {
    extract: false,
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
