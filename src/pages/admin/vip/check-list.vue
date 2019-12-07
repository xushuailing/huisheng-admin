<template>
  <div class='setting-role-list'>
    <sc-min-table stripe
                  ref="table"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :search-config="searchConfig"
                  :table-config="tableConfig"
                  @table-emitTableHandlerClick="onTableHandlerClick">
    </sc-min-table>

    <sc-add-form :visible.sync="passForm.visible"
                 :api="passForm.addFormApi"
                 @emitAddComplete="passForm.onAddComplete"
                 :config="passForm.formAddConfig">
    </sc-add-form>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';

const columns: ScTable.SetColumns = [
  ['头像', 'none1', null, null, 'img'],
  ['名称', 'none2'],
  ['会员级别', 'none4'],
  ['创建时间', 'created_at'],
  ['状态', 'none5'],
];

@Component
export default class SettingRoleList extends Vue {
  columns = this.$utils._SetTableColumns(columns);

  columnsHandler = [{ name: 'pass', title: '通过' }, { name: 'reject', title: '驳回' }];

  // TODO: 缺少接口
  tableConfig = {
    api: this.$api.test,
    // breadcrumbButtons: ['add'],
  };

  searchConfig = {
    num: 4,
    param: {},
    // attr: { 'label-width': '120px' },
    data: [
      {
        label: '会员名称：',
        prop: 'none2',
        default: '',
        tag: {
          attr: {
            placeholder: '请输入会员名称',
          },
        },
      },
      {
        label: '会员类型：',
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
            placeholder: '请选择会员类型',
          },
        },
      },
      {
        label: '创建时间：',
        prop: 'created_at',
        tag: {
          tagType: 'date-picker',
          attr: {
            type: 'datetime',
            placeholder: '开始时间',
          },
        },
      },
      {
        label: '创建方式：',
        prop: 'none6',
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
            placeholder: '请选择创建方式',
          },
        },
      },
    ],
  };

  passForm = {
    visible: false,
    api: '123',
    formAddConfig: {},
    onAddComplete() {},
  };

  onTableHandlerClick({ row, type }:ScTable.Event.TableHandlerClick) {
    console.log('type', type);
    if (type === 'pass') {
      this.passForm.visible = true;
      //   this.editConfig.data.forEach((v) => {
      //     v.forEach((e) => {
      //       if (e.prop === 'createdAt') {
      //         e.default = this.$utils._FormatDate(row[e.prop]);
      //         return;
      //       }
      //       e.default = row[e.prop];
      //     });
      //   });
      //   this.editConfig.id = row.id;
    }
  }
}
</script>
