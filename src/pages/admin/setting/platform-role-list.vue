<template>
  <div class='setting-role-list'>
    <el-button @click="addFormShow=true">添加</el-button>
    <sc-min-table stripe
                  ref="table"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :editConfig="editConfig"
                  :table-config="tableConfig"
                  @pagination-onSlotClick="onSlotClick"
                  @emitTableHandlerClick="onTableHandlerClick">
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

const columns: ScTable.SetColumns = [
  ['角色名称', 'login_name'],
  ['权限管理', 'nickname'],
  ['创建时间', 'phone'],
];

@Component
export default class SettingRoleList extends Vue {
  addFormShow = false;

  columns = this.$utils._SetTableColumns(columns);

  columnsHandler = ['edit', 'del'];

  tableConfig = {
    api: this.$api.role,
  };

  formAddConfig = {
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
    return this.$api.role.create;
  }

  onTableHandlerClick() {}

  onSlotClick() {
    console.log('1', 1);
  }
}
</script>
