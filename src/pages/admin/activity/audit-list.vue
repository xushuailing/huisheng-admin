<template>
  <div>
    <sc-min-table stripe
                  ref="table"
                  :columns-type="['selection']"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :columns-props="{align:'center'}"
                  :columns-schema="columnsSchema"
                  :table-config="tableConfig"
                  :search-config="searchConfig"
                  :paginationConfig="paginationConfig"
                  @pagination-onSlotClick="onSlotClick"
                  @table-emitTableHandlerClick="onTableHandlerClick">
    </sc-min-table>

    <dialog-textarea title="请输入驳回理由"
                     placeholder="请输入驳回理由~"
                     :api='rejectApi'
                     prop="reject"
                     :id="{id:rejectForm.id,type:rejectForm.type}"
                     :visible.sync="rejectForm.visible"
                     @onSuccess="onRejectSuccess" />
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Ref } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { ScForm } from '@/lib/@types/sc-form.d';
import { obj } from '@/lib/@types/sc-param.d';

import dialogTextarea from '@/components/dialogTextarea.vue';

const STATUS: obj<string> = {
  0: '待审核',
  1: '已审核',
  2: '驳回',
};
const columns: ScTable.SetColumns = [
  ['店铺信息', 'shopname'],
  ['推广类型', 'banner_title'],
  ['价格', 'price'],
  ['有效期', 'startime_endtime'],
  ['申请时间', 'createtime'],
  ['状态', 'status'],
];

@Component({ components: { dialogTextarea } })
export default class ActvAdsList extends Vue {
  @Ref('table') table!: ScTable;

  columns = this.$utils._SetTableColumns(columns);

  columnsSchema: ScTable.ColumnsSchema = {
    价格: {
      formater: (row, col) => `￥${row[col.prop]}`,
    },
    有效期: {
      formater: (row, col, column) => {
        const [startime, endtime] = this.$utils._DataTypeChange(col.prop, '_');
        if (!(row[startime] && row[endtime])) return '';
        return `${row[startime].split(' ')[0]} - ${row[endtime].split(' ')[0]}`;
      },
    },
    状态: {
      formater: (row, col) => {
        const value = row[col.prop];
        const style = value == '0' ? 'font-danger' : 'font-primary';
        return [{ class: style }, STATUS[value]];
      },
    },
  };

  columnsHandler: ScTable.ColumnsHandler = [
    { name: 'pass', title: '通过' },
    { name: 'reject', title: '驳回', type: 'danger' },
  ];

  tableConfig: ScTable.TableConfig = {
    api: this.$api.admin.activity.audit,
  };

  searchConfig: ScTable.Search = {
    attr: { 'label-width': '130px' },
    data: [
      {
        label: '商家店铺名称：',
        prop: 'shopname',
        tag: {
          attr: { placeholder: '请输入商家店铺名称' },
        },
      },
      {
        label: '推广类型：',
        prop: 'banner_pid',
        tag: {
          tagType: 'select',
          options: [],
          attr: { placeholder: '请选择推广类型' },
        },
      },
      {
        label: '申请时间：',
        prop: 'strtime',
        tag: {
          tagType: 'date-picker',
          attr: {
            type: 'datetime',
            placeholder: '请选择申请时间',
          },
        },
      },
    ],
  };

  paginationConfig = {
    slotAttr: {
      isCheckbox: true,
      text: '通过',
    },
  };

  rejectForm = {
    visible: false,
    id: '',
    type: '',
  };

  get rejectApi() {
    return this.$api.admin.activity.audit.reject;
  }

  mounted() {
    this.getBannerData();
  }

  async getBannerData() {
    const api = this.$api.admin.activity.adsSorts.index;
    const { data } = await this.$http.get<any[]>(api);

    const item = this.$utils._GetConfigItemData([this.searchConfig.data!], 'banner_pid');

    if (item) item.tag!.options = data.map((v) => ({ value: v.id, label: v.title }));
  }

  onTableHandlerClick({ row, type }: { row: obj; type: string }) {
    if (type === 'pass') {
      this.handlePass(row.id, row.type);
    } else {
      this.handleReject(row.id, row.type);
    }
  }

  // TODO: 全选通过
  onSlotClick() {
    const list = this.table.selectTableData;
    const ids = list.map((v) => ({ id: v.id, type: v.type }));

    console.log('ids', ids);
    // handlePass(ids)
  }

  async handlePass(id: string, type: string) {
    try {
      const flag = await this.$utils._MessageConfirm('是否通过审核?', '提示');

      if (!flag) return;

      const api = this.$api.admin.activity.audit.pass;

      const res = await this.$http.get(api, { id, type });

      if (res.status) {
        this.$message.success('审核通过');
        this.table.setDataTable({});
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  async handleReject(id: string, type: string) {
    this.rejectForm.id = id;
    this.rejectForm.type = type;
    this.rejectForm.visible = true;
  }

  onRejectSuccess() {
    this.table.emitRefresh();
  }
}
</script>
