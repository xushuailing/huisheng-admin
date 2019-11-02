const plugins = [];
if (process.env.VUE_APP_IS_PRO) {
  plugins.push('transform-remove-console');
}

module.exports = {
  presets: ['@vue/app'],
  plugins,
};
