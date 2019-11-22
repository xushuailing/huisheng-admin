<template>
  <sc-min-table stripe
                ref="table"
                :columns-handler="columnsHandler"
                :columns-props="{align:'center'}"
                :columns="columns"
                :editConfig="editConfig"
                :table-config="tableConfig">
  </sc-min-table>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { ScForm } from '@/lib/@types/sc-form.d';

const columns: ScTable.SetColumns = [['代运营名称', 'name'], ['合同', 'contract']];

@Component
export default class TpContract extends Vue {
  columns = this.$utils._SetTableColumns(columns);

  columnsHandler = ['edit'];

  tableConfig: ScTable.TableConfig = {
    api: this.$api.platform,
    breadcrumbButtons: [],
  };

  editConfig: ScTable.Eidt = {
    type: 'plain',
    header: { title: '' },
    rules: [],
    data: [
      [
        {
          label: '代运营名称：',
          prop: 'name',
          tag: {
            tagType: 'component',
            components: Vue.extend({
              props: ['value'],
              render(h) {
                return h('span', {}, this.value);
              },
            }),
          },
        },
        {
          label: '合同：',
          prop: 'contract',
          tag: {
            tagType: 'upload-file',
            attr: {
              placeholder: '请上传合同',
            },
          },
        },
      ],
    ],
  };
}
</script>
