<template>
  <div class='setting-username-list'>
    <el-button @click="addFormShow=true">添加</el-button>
    <sc-min-table stripe
                  ref="table"
                  :columns-type="['selection']"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :editConfig="editConfig"
                  :table-config="tableConfig">
    </sc-min-table>

    <sc-add-form :visible.sync="addFormShow"
                 :api="addApi"
                 :config="formAddConfig"
                 @emitAddComplete="onAddComplete">

    </sc-add-form>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { ScForm } from '../../../lib/@types/sc-form.d';

const columns: ScTable.SetColumns = [
  // ['头像', 'avatar', null, null, 'img'],
  ['登录账号', 'login_name'],
  ['昵称', 'nickname'],
  ['手机号', 'phone'],
  ['角色', 'role'],
];

@Component
export default class SettingUsernameList extends Vue {
  addFormShow = false;

  columns = this.$utils._SetTableColumns(columns);

  columnsHandler = ['edit', 'del'];

  // paginationConfig = {
  //   slotAttr: {
  //     isCheckbox: true,
  //     text: '通过',
  //   },
  // };

  tableConfig = {
    api: this.$api.platform,
  };

  formAddConfig: ScForm.Config = {
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
        role_id: {
          value: [{ required: true, message: '请选择一个角色', trigger: 'change' }],
        },
        login_name: { value: [{ required: true, message: '账号不能为空', trigger: 'blur' }] },
        login_pass: { value: [{ required: true, message: '密码不能为空', trigger: 'blur' }] },
      },
    ],
    buttons: [
      {
        mode: 'submit',
        text: '确认添加',
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
          prop: 'role_id',
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
          label: '密码',
          prop: 'login_pass',
          tag: {
            attr: { placeholder: '请输入密码', 'show-password': true },
          },
        },
      ],
    ],
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

  editConfig = {
    type: 'senior', // plain senior specialty
    width: '70%',
    header: {
      title: '新增数据',
      desc: '文字文字',
    },
    rules: [
      {
        displayName: {
          value: [
            { required: true, message: '请输入展示名', trigger: 'blur' },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur',
            },
          ],
        },
        status: {
          value: [
            {
              required: true,
              message: '请选择状态',
              trigger: 'change',
            },
          ],
        },
      },
    ],
    data: [
      [
        {
          label: '姓名：',
          prop: 'name',
          tooltip: '帮助',
          tag: {
            attr: {
              placeholder: '请输入姓名',
            },
          },
        },
        {
          label: '创建日期：',
          prop: 'createdAt',
          tag: {
            tagType: 'date-picker',
            attr: {
              type: 'datetime',
              placeholder: '请选择日期',
            },
          },
        },

        {
          label: '状态：',
          prop: 'status',
          tag: {
            tagType: 'select',
            attr: {
              placeholder: '请选择状态',
            },
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
          },
        },
        {
          label: '任务名：',
          prop: 'displayName',
          tag: {
            attr: {
              placeholder: '请选择状态',
            },
          },
        },
        {
          label: '备注：',
          prop: 'memo',
          isFull: true,
          tag: {
            attr: {
              type: 'textarea',
              placeholder: '备注',
            },
          },
        },
        // {
        //   label: '上传图片：',
        //   prop: 'url',
        //   isFull: true,
        //   tag: {
        //     tagType: 'upload-img',
        //     attr: {
        //       fileSize: 1
        //     }
        //   }
        // }
      ],
      // ,
      // [
      //   {
      //     label: '上传图片：',
      //     prop: 'url',
      //     isFull: true,
      //     tag: {
      //       tagType: 'upload-img',
      //       attr: {
      //         fileSize: 1
      //       }
      //     }
      //   }
      // ]
    ],
  };

  get addApi() {
    return this.$api.platform.create;
  }

  mounted() {
    this.getRole();
  }

  onAddComplete() {
    console.log('成功');
  }

  getRole() {
    this.$http
      .get<any[]>(this.$api.role.index, { limit: 1e5 })
      .then((res) => {
        const options = res.data.map((v) => ({ ...v, label: v.role_name, value: v.id }));
        const item = this.$utils._GetConfigItemData(this.formAddConfig.data, 'role_id');
        if (item) item.tag!.options = options;
        console.log('item', item);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }
}
</script>
