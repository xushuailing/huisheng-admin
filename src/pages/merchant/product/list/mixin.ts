import { Vue, Component, Ref } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { obj } from '@/lib/@types/sc-param.d';
import { _Shopid } from '../../config';

interface Shelves {
  gid: string;
  status: string;
}

@Component
export default class ListMixin extends Vue {
  @Ref('table') $table!: ScTable;

  currentTab!: string;

  onTableHandlerClick({ row, type }: { row: obj<string>; type: string }) {
    if (type === 'detail') {
      this.$router.push({ path: 'add', query: { id: row.id } });
    } else if (type === 'unshelve') {
      this.handleShelves([{ gid: row.id, status: row.status }]);
    } else if (type === 'shelves') {
      this.handleShelves([{ gid: row.id, status: row.status }]);
    }
  }

  handleShelves(list: Shelves[]) {
    const api = this.$api.merchant.product.shelves;
    const params = { shopid: _Shopid, list };
    const loading = this.$utils._Loading.show();
    this.$http
      .post(api, params)
      .then(() => {
        this.$table.setDataTable({});
      })
      .finally(() => {
        loading.close();
      });
  }

  handleAdd() {
    this.$router.push('add');
  }

  onSlotClick() {
    const data = this.$table.selectTableData;
    // 0 已上架 1 已下架
    const list: Shelves[] = data
      // eslint-disable-next-line max-len
      .filter((v) => (this.$utils._DataIsEmpty(this.currentTab, [0]) ? this.currentTab == v.status : !v.status))
      .map((v) => ({ gid: v.id, status: v.status }));
    this.handleShelves(list);
  }
}
