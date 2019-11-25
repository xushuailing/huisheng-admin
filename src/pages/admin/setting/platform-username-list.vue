<template>
  <div class='setting-username-list'>
    <sc-min-table stripe
                  ref="table"
                  :columns-type="['selection']"
                  :columns-handler="columnsHandler"
                  :columns-schema="columnsSchema"
                  :columns="columns"
                  :editConfig="editConfig"
                  :formAddConfig="formAddConfig"
                  :table-config="tableConfig">
    </sc-min-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { ScForm } from '../../../lib/@types/sc-form.d';
import { RoleData } from './types';

const columns: ScTable.SetColumns = [
  ['ID', 'id', 80],
  ['登录账号', 'login_name'],
  ['昵称', 'nickname'],
  ['手机号', 'phone'],
  ['角色', 'role'],
];

@Component
export default class SettingUsernameList extends Vue {
  columns = this.$utils._SetTableColumns(columns);

  columnsHandler = ['edit', 'del'];

  columnsSchema: ScTable.ColumnsSchema = {
    角色: {
      formater: (row, col) => {
        const item = this.roles.find((v) => row[col.prop] == v.id);
        return item && item.label;
      },
    },
  };

  tableConfig = {
    api: this.$api.admin.setting.platform,
    breadcrumbButtons: ['add'],
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

  formAddConfig = this.setFormConfig();

  editConfig = this.setFormConfig(false);

  get roles() {
    const item = this.$utils._GetConfigItemData(this.formAddConfig.data, 'role');
    if (item) {
      return item.tag!.options as RoleData[];
    }
    return [];
  }

  setFormConfig(isAdd = true): ScForm.Config {
    const text = isAdd ? '添加' : '修改';
    return {
      header: {
        title: `${text}账号`,
        desc: `${text}平台管理员账号`,
      },
      rules: [
        {
          nickname: { value: [{ required: true, message: '昵称不能为空', trigger: 'blur' }] },
          phone: {
            value: [
              { required: true, message: '手机号不能为空', trigger: 'blur' },
              {
                trigger: 'blur',
                validator: (rule, value: string, callback) => {
                  if (!this.$utils._ValidatePhone(value)) {
                    return callback(new Error('手机号格式错误'));
                  }
                  return callback();
                },
              },
            ],
          },
          role: {
            value: [{ required: true, message: '请选择一个角色', trigger: 'change' }],
          },
          login_name: { value: [{ required: true, message: '账号不能为空', trigger: 'blur' }] },
          login_pass: { value: [{ required: true, message: '密码不能为空', trigger: 'blur' }] },
        },
      ],
      buttons: [
        {
          mode: 'submit',
          text: `确认${text}`,
        },
      ],
      data: [
        [
          {
            label: '昵称',
            prop: 'nickname',
            tag: {
              attr: { placeholder: '请输入昵称' },
            },
          },
          {
            label: '手机号',
            prop: 'phone',
            tag: {
              attr: { placeholder: '请输入手机号' },
            },
          },
          {
            label: '角色',
            prop: 'role',
            handleEdit: (data, prop) => {
              const item = this.roles.find((v) => v.id == data);
              if (item) return item.label;
              return '';
            },
            tag: {
              tagType: 'select',
              attr: { placeholder: '请选择角色' },
              options: [],
            },
          },
          {
            label: '账号',
            prop: 'login_name',
            tag: {
              attr: { placeholder: '请输入账号', max: 6 },
            },
          },
          {
            label: '设置密码',
            prop: 'login_pass',
            tag: {
              attr: { placeholder: '请输入密码', 'show-password': true },
            },
          },
        ],
      ],
    };
  }

  mounted() {
    this.getRole();
  }

  getRole() {
    this.$http.get<RoleData[]>(this.$api.admin.setting.role.index, { limit: 1e5 }).then((res) => {
      const options = res.data.map((v) => ({ ...v, label: v.role_name, value: v.id }));
      const addItem = this.$utils._GetConfigItemData(this.formAddConfig.data, 'role');
      const editItem = this.$utils._GetConfigItemData(this.editConfig.data, 'role');
      if (addItem) addItem.tag!.options = options;
      if (editItem) editItem.tag!.options = options;
    });
  }
}
</script>
