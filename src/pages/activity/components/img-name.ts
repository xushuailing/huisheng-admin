import { Vue } from 'vue-property-decorator';

export default Vue.extend({
  props: ['url', 'text', '$vm'],
  render(h) {
    if (!this.url) return h('span', {}, this.text);
    const imgAttr = {
      width: 25,
      height: 25,
      class: 'mr-10',
      style: { cursor: 'pointer', 'object-fit': 'cover' },
      src: this.url,
      alt: this.text,
      on: {
        click: () => {
          this.$vm.onImgClick(this.url);
        },
      },
    };
    return h('div', {}, [h('img', imgAttr), h('span', {}, this.text)]);
  },
});
