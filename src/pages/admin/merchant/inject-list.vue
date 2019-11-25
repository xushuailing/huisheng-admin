<template>
  <div class='merchant-inject-list'>
    <sc-min-table stripe
                  ref="table"
                  :columns-type="['selection']"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :columns-schema="columnsSchema"
                  :table-config="tableConfig"
                  @table-emitTableHandlerClick="onTableHandlerClick">
    </sc-min-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { ScForm } from '../../../lib/@types/sc-form.d';

// const status =
enum status {
  '审核中' = 1,
  '审核通过',
  '审核不通过',
  '完成保证金支付',
}

const columns: ScTable.SetColumns = [
  ['门店名称', 'shopname', 200],
  ['公司名称', 'company', 120],
  ['联系人', 'username', 100],
  ['公司电话', 'com_phone', 100],
  ['门店地址', 'address'],
  ['申请时间', 'createtime', 150],
  ['状态', 'status', 80],
];

@Component
export default class SettingUsernameList extends Vue {
  columns = this.$utils._SetTableColumns(columns);

  columnsHandler = [
    { name: 'pass', title: '通过' },
    { name: 'del', title: '驳回', type: 'danger' },
  ];

  columnsSchema: ScTable.ColumnsSchema = {
    状态: {
      formater: (row, col) => [{ class: 'font-primary' }, status[row[col.prop]]],
    },
  };

  tableConfig: ScTable.TableConfig = {
    api: this.$api.admin.merchant.inject,
    index: {
      status: '1',
    },
  };

  searchConfig = {
    num: 4,
    param: {},
    attr: { 'label-width': '120px' },
    data: [
      {
        label: '商家店铺名称：',
        prop: 'none1',
        default: '',
        tag: {
          attr: {
            placeholder: '请输入商家店铺名称',
          },
        },
      },

      {
        label: '店铺类型：',
        prop: 'none3',
        tag: {
          tagType: 'select',
          options: [
            {
              value: 1,
              label: '启用',
            },
            {
              value: 0,
              label: '不启用',
            },
          ],
          attr: {
            placeholder: '请选择店铺类型',
          },
        },
      },
      {
        label: '审核状态：',
        prop: 'none4',
        tag: {
          tagType: 'select',
          options: [
            {
              value: 1,
              label: '启用',
            },
            {
              value: 0,
              label: '不启用',
            },
          ],
          attr: {
            placeholder: '请选择审核状态',
          },
        },
      },
      {
        label: '提交时间：',
        prop: 'none2',
        tag: {
          tagType: 'date-picker',
          attr: {
            type: 'datetime',
            placeholder: '开始时间',
          },
        },
      },
    ],
  };

  onTableHandlerClick({ row, index, type }: ScTable.Event.TableHandlerClick) {
    console.log('row :', row);
    console.log('index :', index);
    console.log('type :', type);
    // if (type === 'pass') {

    // }
  }
}
</script>
