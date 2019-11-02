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
};
