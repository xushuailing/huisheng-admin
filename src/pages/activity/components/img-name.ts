import { Vue } from 'vue-property-decorator';

export default Vue.extend({
  props: ['url', 'text', '$vm'],
  render(h) {
    if (!this.url) return h('span', {}, this.text);
    const imgAttr = {
      attrs: { width: 40, height: 40, src: this.url, alt: this.text },
      class: 'mr-10 border-radius-100',
      style: { 'object-fit': 'cover' },
    };
    return h('div', { class: 'flex-jc-ac' }, [h('img', imgAttr, ''), h('span', {}, this.text)]);
  },
});
