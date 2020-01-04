<template>
  <div>
    <sc-min-table stripe
                  ref="table"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :table-config="tableConfig"
                  :search-config="searchConfig"
                  @table-emitTableHandlerClick="onTableHandlerClick">
    </sc-min-table>
    <!-- 服务 -->
    <sc-dialog :visible.sync="dislogVisible"
               :header="{title:'请选择运营店铺'}">
      <el-form class="flex-column flex-ac">
        <el-form-item style="width:60%">
          <el-select v-model="selectedShop"
                     :loading="loading"
                     class="w100">
            <el-option v-for="shop in shops"
                       :key="shop.list_id"
                       :label="shop.shop_name"
                       :value="shop.list_id"></el-option>
          </el-select>
        </el-form-item>
        <div class="flex mt-10 mb-10">
          <img v-show="currentShop.url"
               width="80"
               height="80"
               :src="currentShop.url"
               class="border-radius-100 bg-info"
               :alt="currentShop.name">
          <span class="ml-20">{{currentShop.name}}</span>
        </div>
      </el-form>
      <div slot="footer"
           class="flex-jc">
        <el-button type="primary"
                   @click="onSubmit">确认</el-button>
      </div>
    </sc-dialog>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Ref } from 'vue-property-decorator';
import Info from '@/components/img-name';
import { ScTable } from '@/lib/@types/sc-table.d';
import { obj } from '@/lib/@types/sc-param.d';

const service_status = ['等待运营', '在服务'];

@Component
export default class TpIndex extends Vue {
  @Ref('table') table!: ScTable;

  columns: ScTable.Columns = [
    {
      label: '团队人员',
      prop: 'name',
      propsHandler: ({ col, row }: obj) => ({
        url: row.default_img,
        text: row[col.prop],
      }),
      component: Info,
    },
    { label: '运营类型', prop: 'none2' },
    { label: '店铺名称', prop: 'shop_name' },
    {
      label: '开始时间',
      prop: 'start_time',
    },
    {
      label: '结束时间',
      prop: 'end_time',
    },
    {
      label: '店铺状况',
      prop: 'service_status',
      formater: (row, col) => [{ class: 'sc-font-primary' }, service_status[row[col.prop]]],
    },
  ];

  columnsHandler: ScTable.ColumnsHandler = [
    { name: 'detail', title: '查看' },
    {
      name: 'service',
      title: '去服务',
      handler: ({ row }) => row.service_status != 1,
    },
  ];

  tableConfig: ScTable.TableConfig = {
    api: this.$api.admin.thirdpartnar.service,
    breadcrumbButtons: [],
  };

  searchConfig: ScTable.Search = {
    attr: { 'label-width': '110px' },
    data: [
      {
        label: '运营团队：',
        prop: 'none',
        tag: {
          tagType: 'select',
          options: [],
          attr: { placeholder: '请选择运营团队' },
        },
      },
      {
        label: '运营人员姓名：',
        prop: 'name',
        tag: {
          attr: { placeholder: '请输入运营人员姓名' },
        },
      },
      {
        label: '店铺名称：',
        prop: 'shop_name',
        tag: {
          attr: { placeholder: '请输入店铺名称' },
        },
      },
      {
        label: '创建时间：',
        prop: 'start_time',
        tag: {
          tagType: 'date-picker',
          attr: {
            type: 'datetimerange',
            'start-placeholder': '开始时间',
            'end-placeholder': '结束时间',
          },
        },
      },
    ],
  };

  dislogVisible = false;

  loading = false;

  shops: obj[] = [];

  listId = null;

  selectedShop = '';

  get currentShop() {
    const item = this.shops.find((v: obj) => v.list_id === this.selectedShop);
    return { url: item ? item.logo : '', name: item ? item.shop_name : '' };
  }

  mounted() {
  }

  getShops() {
    this.loading = true;
    this.$http
      .get(this.$api.admin.thirdpartnar.service.shopIndex)
      .then((res) => {
        console.log('res: ', res);
        this.shops = res.data;
      })
      .catch((err) => {
        this.$utils._ResponseError(err);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  onTableHandlerClick({ row, type }: { row: obj; type: string }) {
    if (type === 'detail') {
      this.$router.push({ path: 'service-detail', query: { id: row.id } });
    } else {
      this.getShops();
      this.dislogVisible = true;

      this.listId = row.id;
    }
  }

  onSubmit() {
    if (!this.selectedShop) {
      this.$message.warning('请选择店铺名称');
      return;
    }
    const api = this.$api.admin.thirdpartnar.service.update;
    const param = { list_id: this.selectedShop, id: this.listId };
    this.$http
      .post(api, param)
      .then((res) => {
        this.$message.success('设置成功');
        this.dislogVisible = false;

        this.table.emitRefresh();
      })
      .catch((err) => {
        this.$utils._ResponseError(err);
      });
  }
}
</script>
