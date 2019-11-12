<template>
  <div class='setting-role-list'>
    <sc-min-table stripe
                  ref="table"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :editConfig="editConfig"
                  :table-config="tableConfig"
                  :formAddConfig="formAddConfig">
    </sc-min-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';

const columns: ScTable.SetColumns = [
  ['角色名称', 'role_name'],
  ['权限管理', 'remark'],
  ['创建时间', 'created_at'],
];

@Component
export default class SettingRoleList extends Vue {
  columns = this.$utils._SetTableColumns(columns);

  columnsHandler = ['edit', 'del'];

  tableConfig = {
    api: this.$api.role,
    breadcrumbButtons: ['add'],
  };

  // TODO: 角色添加报错
  formAddConfig = this.formConfig();

  editConfig = this.formConfig(false);

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

  formConfig(isAdd = true) {
    return {
      header: {
        title: '角色管理',
        desc: `${isAdd ? '添加' : '修改'}角色管理`,
      },
      buttons: [
        {
          mode: 'submit',
          text: `确认${isAdd ? '添加' : '修改'}`,
        },
      ],
      rules: [
        {
          role_name: {
            value: [{ required: true, message: '请输入角色', trigger: 'blur' }],
          },
          remark: {
            value: [{ required: true, message: '请输入权限', trigger: 'blur' }],
          },
        },
      ],

      data: [
        [
          {
            label: '角色',
            prop: 'role_name',
            tag: {
              attr: { placeholder: '请输入角色' },
            },
          },
          {
            label: '权限',
            prop: 'remark',
            tag: {
              attr: { placeholder: '请输入权限' },
            },
          },
        ],
      ],
    };
  }
}
</script>
