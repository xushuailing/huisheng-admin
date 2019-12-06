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
                     msg="驳回"
                     :api='rejectApi'
                     prop="reject"
                     :id="{shopid:rejectForm.id}"
                     :visible.sync="rejectForm.visible"
                     @onConfirm="onRejectConfirm" />
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop, Ref } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { ScTable } from '@/lib/@types/sc-table.d';
import { ScForm } from '../../../lib/@types/sc-form.d';
import dialogTextarea from '@/components/dialogTextarea.vue';
import { State } from '../../../store/common';

enum status {
  '审核中' = 1,
  '审核通过',
  '审核不通过',
  '完成保证金支付',
}

const columns: ScTable.SetColumns = [
  ['门店名称', 'shopname'],
  ['公司名称', 'company'],
  ['门店分类', 'typeid'],
  ['联系人', 'username'],
  ['联系电话', 'com_phone'],
  ['门店地址', 'address'],
  ['申请时间', 'createtime'],
  ['状态', 'status', 80],
];

@Component({ components: { dialogTextarea } })
export default class SettingUsernameList extends Vue {
  @(namespace('common').Action) getShopTypes!: () => Promise<State['shopTypes']>;

  @Ref('table') $table!: ScTable;

  columns = this.$utils._SetTableColumns(columns);

  columnsHandler = [
    { name: 'pass', title: '通过' },
    { name: 'reject', title: '驳回', type: 'danger' },
  ];

  columnsSchema: ScTable.ColumnsSchema = {
    状态: {
      formater: (row, col) => [{ class: 'font-primary' }, status[row[col.prop]]],
    },
    门店分类: {
      formater: (row, col) => {
        const types = this.getTypeIds();

        const type = (types && types.find((v) => v.value == row[col.prop])) || {};
        return type.label;
      },
    },
  };

  tableConfig: ScTable.TableConfig = {
    api: this.$api.admin.merchant.inject,
    index: {
      status: '1',
    },
    // handleWidth: '100',
  };

  searchConfig = {
    attr: { 'label-width': '120px' },
    data: [
      {
        label: '门店名称：',
        prop: 'shopname',
        tag: {
          attr: {
            placeholder: '请输入门店名称',
          },
        },
      },

      {
        label: '店铺类型：',
        prop: 'typeid',
        tag: {
          tagType: 'select',
          options: [],
          attr: {
            placeholder: '请选择店铺类型',
          },
        },
      },
      {
        label: '提交时间：',
        prop: 'strtime',
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

  typeIds: any[] | null = null;

  get rejectApi() {
    return this.$api.admin.merchant.inject.reject;
  }

  created() {
    this.getTypeid();
  }

  getTypeIds() {
    return this.typeIds;
  }

  async getTypeid() {
    try {
      const api = this.$api.admin.merchant.shop.types;
      const data = await this.getShopTypes();
      this.typeIds = data;

      this.$set(this.searchConfig.data[1].tag, 'options', data);
    } catch (error) {
      console.log('error', error);
    }
  }

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

  onRejectConfirm(flag: boolean) {
    if (flag) this.$table.emitRefresh();
  }
}
</script>
