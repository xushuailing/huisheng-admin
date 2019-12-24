<template>
  <sc-min-table stripe
                ref="table"
                :columns-handler="columnsHandler"
                :columns="columns"
                :editConfig="editConfig"
                :table-config="tableConfig">
  </sc-min-table>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { ScForm } from '@/lib/@types/sc-form.d';

const columns: ScTable.SetColumns = [['运营名称', 'title'], ['限时时间', 'day']];

@Component
export default class TpDays extends Vue {
  columns = this.$utils._SetTableColumns(columns);

  columnsHandler = ['edit'];

  tableConfig: ScTable.TableConfig = {
    api: this.$api.admin.thirdpartnar.setting,
    isPagination: false,
  };

  editConfig: ScTable.Eidt = {
    type: 'plain',
    requestMethod: 'get',
    header: { title: '修改代运营' },
    rules: [],
    data: [
      [
        {
          label: '代运营名称：',
          prop: 'title',
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
          label: '限时天数：',
          prop: 'day',
          tag: {
            attr: {
              type: 'number',
              slot: {
                attr: { slot: 'append' },
                component: Vue.extend({
                  render(h) {
                    return h('span', {}, '天');
                  },
                }),
              },
              placeholder: '请输入限时天数',
            },
          },
        },
      ],
    ],
  };
}
</script>
