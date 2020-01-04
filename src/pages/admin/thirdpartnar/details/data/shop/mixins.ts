import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { ScForm } from '@/lib/@types/sc-form.d';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class ThirdpartnarShop extends Vue {
  config!: ScForm.Config;

  @Prop({ type: String, required: true })
  detail!: string;

  @Prop({ type: String, required: true })
  name!: string;

  api = this.$api.admin.thirdpartnar.shops.update;

  get form() {
    if (this.detail) {
      return JSON.parse(this.detail);
    }
    return {};
  }

  get val(): string {
    return this.form[this.name];
  }

  @Watch('val')
  handle(val: string) {
    if (val) {
      const value = this.val.split(`#${this.name}#`);
      this.config.data[0].forEach((item, index) => {
        item.default = value[index] || '';
      });
    }
  }

  handleSubmit(data: any) {
    let value = '';
    Object.keys(data).forEach((item) => {
      if (item === 'id') return;
      value += data[item] || '';
    });
    return { id: this.form.id, [this.name]: value };
  }
}
