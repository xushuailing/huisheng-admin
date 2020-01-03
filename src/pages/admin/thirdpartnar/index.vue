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
               :header="{title:'请选择运营人员'}">
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

const status = [
  { value: 1, label: '代运营' },
  { value: 2, label: '正在运营' },
  { value: 3, label: '完成' },
];

const platform = ['', '美团', '饿了么', '美团,饿了么'];

@Component
export default class TpIndex extends Vue {
  @Ref('table') table!: ScTable;

  columns: ScTable.Columns = [
    { label: '套餐类型', prop: 'package_name' },
    { label: '店铺名称', prop: 'shop_name' },
    {
      label: '平台选择',
      prop: 'platform',
      width: 100,
      formater: (row, col) => platform[row[col.prop]],
    },
    {
      label: '有效期',
      prop: 'start_time|end_time',
      width: 300,
      formater: (row, col) => {
        const [start, end] = this.$utils._DataTypeChange(col.prop, '|');
        return `${row[start]} - ${row[end]}`;
      },
    },
    { label: '入驻时间', prop: 'time' },
    {
      label: '状态',
      prop: 'status',
      width: 80,
      formater: (row, col) => {
        const value = status.find((v) => v.value == row[col.prop]);
        if (value) {
          return [
            { class: value.label === '正在运营' ? 'font-danger' : 'font-primary' },
            value.label,
          ];
        }
        return '未知';
      },
    },
  ];

  columnsHandler: ScTable.ColumnsHandler = [
    'detail',
    {
      name: 'operate',
      title: '运营',
      handler: ({ row }) => row.status == status[0].value,
    },
    { name: 'upload', title: '上传', handler: ({ row }) => row.status == status[1].value },
  ];

  tableConfig: ScTable.TableConfig = {
    api: this.$api.admin.thirdpartnar.index,
  };

  searchConfig: ScTable.Search = {
    attr: { 'label-width': '150px' },
    data: [
      {
        label: '代运营套餐类型：',
        prop: 'goods_id',
        tag: {
          tagType: 'select',
          options: [],
          attr: { placeholder: '请选择代运营套餐类型' },
        },
      },
      {
        label: '商家店铺名称：',
        prop: 'shop_name',
        tag: {
          attr: { placeholder: '请输入商家店铺名称' },
        },
      },
      {
        label: '状态：',
        prop: 'status',
        tag: {
          tagType: 'select',
          options: status,
          attr: { placeholder: '请选择运营状态' },
        },
      },
      {
        label: '创建时间：',
        prop: 'time',
        tag: {
          tagType: 'date-picker',
          attr: {
            type: 'datetime',
            placeholder: '创建时间',
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

  onSubmit() {
    if (!this.selectedShop) {
      this.$message.warning('请选择运营人员');
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

  getOperateData() {
    this.loading = true;
    this.dislogVisible = true;
    const api = this.$api.admin.thirdpartnar.service.shopIndex;
    this.$http
      .get(api)
      .then(({ data }) => {
        this.shops = data;
      })
      .finally(() => {
        this.loading = false;
      });
  }

  onTableHandlerClick({ row, type }: { row: obj; type: string }) {
    if (type === 'detail') {
      this.$router.push({ path: '/thirdpartnar/detail', query: { id: row.id } });
    } else if (type === 'operate') {
      this.listId = row.id;
      this.getOperateData();
    } else {
      this.$router.push({ path: '/thirdpartnar/detail', query: { id: row.id, name: 'data' } });
    }
  }
}
</script>
