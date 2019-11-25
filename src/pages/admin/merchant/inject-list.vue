<template>
  <div class='merchant-inject-list'>
    <sc-min-table stripe
                  ref="table"
                  :columns-type="['selection']"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :columns-schema="columnsSchema"
                  :table-config="tableConfig"
                  :search-config="searchConfig"
                  @table-emitTableHandlerClick="onTableHandlerClick">
    </sc-min-table>

    <dialog-textarea title="请输入驳回理由"
                     placeholder="请输入驳回理由~"
                     api='123'
                     prop="reject"
                     :id="rejectForm.id"
                     :visible.sync="rejectForm.visible" />
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { ScForm } from '../../../lib/@types/sc-form.d';
import dialogTextarea from '@/components/dialogTextarea.vue';

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

@Component({ components: { dialogTextarea } })
export default class SettingUsernameList extends Vue {
  $refs!: {
    table: ScTable;
  };

  columns = this.$utils._SetTableColumns(columns);

  columnsHandler = [
    { name: 'pass', title: '通过' },
    { name: 'reject', title: '驳回', type: 'danger' },
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

  rejectForm = {
    visible: false,
    id: null,
  };

  onTableHandlerClick({ row, index, type }: ScTable.Event.TableHandlerClick) {
    console.log('row :', { ...row });
    if (type === 'reject') {
      this.rejectForm.id = row.id;
      this.rejectForm.visible = true;
    } else if (type === 'pass') {
      this.$utils._MessageConfirm('确认通过？', '提示').then((flag: boolean) => {
        if (!flag) return;

        // TODO: 未完成通过
        const api = this.$api.admin.merchant.inject.check;
        this.$http
          .get(api, { shopid: row.id, uid: row.uid, status: 2 })
          .then((res) => {
            console.log('res :', res);
          })
          .catch((err) => {
            console.log('err :', err);
          });
        // this.$message.success('通过成功');
        // this.$refs.table.emitRefresh();
      });
    }
  }
}
</script>
