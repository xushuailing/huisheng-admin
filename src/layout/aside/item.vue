
<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  render(h, context) {
    const { icon, title } = context.props;
    return [h('i', { class: icon }), h('span', { slot: 'title' }, title)];
  },
});
</script>
<style lang="scss" scoped>
.iconfont {
  vertical-align: middle;
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
}
</style>
