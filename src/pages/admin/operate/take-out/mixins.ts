import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';

@Component
export default class TakeOutMixins extends Vue {
  @Prop({ required: true }) type!: number;

  @Prop({ required: true }) name!: string;

  columns = this.$utils._SetTableColumns(this.setColumns());

  columnsHandler = ['del'];

  columnsProps = {
    'show-overflow-tooltip': false,
  };

  tableConfig: ScTable.TableConfig = {
    api: this.$api.admin.operate.takeOut,
    index: {
      type: this.type,
    },
  };

  setColumns(): ScTable.SetColumns {
    return [
      ['问题', 'title'],
      [this.type === 2 ? '视频' : '回答', 'content'],
      ['创建时间', 'time', 200],
    ];
  }
}
