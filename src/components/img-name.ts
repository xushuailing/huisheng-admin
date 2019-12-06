import { Vue } from 'vue-property-decorator';

export default Vue.extend({
  functional: true,
  props: ['url', 'text'],
  render(h, data) {
    const { url, text } = data.props;
    if (!url) return h('span', {}, text);

    const containerAttr = { class: 'flex-jc-ac' };
    const imgAttr = {
      attrs: { width: 40, height: 40, src: url, alt: text },
      class: 'mr-10 border-radius-100',
      style: { 'object-fit': 'cover' },
    };
    return h('div', containerAttr, [h('img', imgAttr, ''), h('span', {}, text)]);
  },
});
