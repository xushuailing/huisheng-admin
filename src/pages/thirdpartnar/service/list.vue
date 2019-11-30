<template>
  <div>
    <sc-min-table stripe
                  ref="table"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :columns-props="{align:'center'}"
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
                       :key="shop.id"
                       :label="shop.name"
                       :value="shop.id"></el-option>
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
import { Component, Vue } from 'vue-property-decorator';
import Info from '../../admin/activity/components/img-name';
import { ScTable } from '../../../lib/@types/sc-table.d';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class TpIndex extends Vue {
  columns: ScTable.Columns = [
    {
      label: '团队人员',
      prop: 'none1',
      propsHandler: ({ col, row }: obj) => ({ url: row.pic, text: row[col.prop], $vm: this }),
      component: Info,
    },
    { label: '运营类型', prop: 'none2' },
    { label: '店铺名称', prop: 'none3' },
    {
      label: '开始时间',
      prop: 'none4',
      formater: (row, col) => this.$utils._FormatDate(row[col.prop]),
    },
    {
      label: '结束时间',
      prop: 'none5',
      formater: (row, col) => this.$utils._FormatDate(row[col.prop]),
    },
    {
      label: '店铺状况',
      prop: 'none6',
      formater: (row, col) => [{ class: 'sc-font-primary' }, row[col.prop]],
    },
  ];

  columnsHandler: ScTable.ColumnsHandler = [
    { name: 'detail', title: '查看' },
    { name: 'service', title: '去服务' },
  ];

  tableConfig: ScTable.TableConfig = {
    api: this.$api.platform,
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
        prop: 'none1',
        tag: {
          attr: { placeholder: '请输入运营人员姓名' },
        },
      },
      {
        label: '店铺名称：',
        prop: 'none3',
        tag: {
          attr: { placeholder: '请输入店铺名称' },
        },
      },
      {
        label: '创建时间：',
        prop: 'none7',
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

  selectedShop = '';

  get currentShop() {
    const item = this.shops.find((v: obj) => v.id === this.selectedShop);
    return { url: item ? item.logo : '', name: item ? item.name : '' };
  }

  // 获取店铺列表
  getShops() {
    this.loading = true;
    this.$http
      .post(this.$api.platform.create)
      .then((res) => {
        console.log('res: ', res);
        this.shops = res.data.data;
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
      this.$router.push({ name: '运营客服详情', query: { id: row.id } });
    } else {
      // this.getShops();
      this.dislogVisible = true;
    }
  }

  onSubmit() {
    if (!this.selectedShop) {
      this.$message.warning('请选择店铺名称');
      return;
    }
    const api = this.$api.platform.create;
    const param = { id: this.selectedShop };
    this.$http
      .post(api, param)
      .then((res) => {
        console.log('res: ', res);
        this.dislogVisible = false;
      })
      .catch((err) => {
        this.$utils._ResponseError(err);
      });
  }
}
</script>
