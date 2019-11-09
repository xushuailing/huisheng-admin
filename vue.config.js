/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
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
