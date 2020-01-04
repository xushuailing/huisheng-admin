<template>
  <div class='setting-role-list'>
    <sc-min-table stripe
                  ref="table"
                  :columns-handler="columnsHandler"
                  :columns-schema="columnsSchema"
                  :columns="columns"
                  :search-config="searchConfig"
                  :table-config="tableConfig"
                  @table-emitTableHandlerClick="onTableHandlerClick">
    </sc-min-table>

    <!-- <sc-add-form :visible.sync="passForm.visible"
                 :api="passForm.addFormApi"
                 @emitAddComplete="passForm.onAddComplete"
                 :config="passForm.formAddConfig">
    </sc-add-form> -->
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';

const columns: ScTable.SetColumns = [
  ['头像', 'avatarurl', 100, null, 'img'],
  ['名称', 'nickname'],
  ['会员级别', 'level_name'],
  ['创建时间', 'time'],
  ['状态', 'sh_status'],
];

@Component
export default class SettingRoleList extends Vue {
  columns = this.$utils._SetTableColumns(columns);

  columnsHandler = [
    { name: 'pass', title: '通过' },
    { name: 'reject', title: '驳回', type: 'danger' },
  ];

  columnsSchema: ScTable.ColumnsSchema = {
    头像: {
      propsHandler: (prop) => ({ ...prop, height: 50, width: 50 }),
    },
    状态: {
      formater: (row, col) => (row[col.prop] == 0 ? '待审核' : '未知'),
    },
  };

  tableConfig = {
    api: this.$api.admin.vip.check,
  };

  searchConfig = {
    data: [
      {
        label: '会员名称：',
        prop: 'nickname',
        tag: {
          attr: {
            placeholder: '请输入会员名称',
          },
        },
      },
      {
        label: '会员类型：',
        prop: 'level_id',
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
        prop: 'time',
        tag: {
          tagType: 'date-picker',
          attr: {
            type: 'datetime',
            placeholder: '创建时间',
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

  onTableHandlerClick({ row, type }: ScTable.Event.TableHandlerClick) {
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
