<template>
  <div>
    <sc-min-table stripe
                  ref="table"
                  :columns-type="['selection']"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :editConfig="editConfig"
                  :search-config="searchConfig"
                  :formAddConfig="formAddConfig"
                  :table-config="tableConfig"
                  :paginationConfig="paginationConfig"
                  @pagination-onSlotClick="onSlotClick"
                  @emitTableHandlerClick="onTableHandlerClick">
    </sc-min-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';

const columns: ScTable.SetColumns = [
  ['头像', 'avatar', null, null, 'img'],
  ['微信昵称', 'nickname', 200],
  ['姓名', 'name', 120],
  ['手机号', 'phone', 150],
  ['身份证', 'idCard', 220],
  ['携带同伴数', 'pnum', 150],
  ['报名时间', 'attendAt'],
];

@Component
export default class MerchantInject extends Vue {
  columns = this.$utils._SetTableColumns(columns);

  columnsHandler = ['删除', '修改'];

  paginationConfig = {
    slotAttr: {
      isCheckbox: true,
      text: '通过',
    },
  };

  tableConfig = {
    api: this.$api.merchant.inject,
    // isSearch: false,

    // disabledRequest: true,
    table: {
      // storageKey: 'myTable',
    },
    isSetting: true,
    isExports: true,
  };

  formAddConfig = {
    type: 'senior', // plain senior specialty
    width: '70%',
    header: {
      title: '新增数据',
      desc: '文字文字',
    },
    steps: [
      {
        title: '步骤 1',
        // icon: 'el-icon-edit'
      },
      {
        title: '步骤 2',
        // icon: 'el-icon-upload'
      },
    ],
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
        {
          label: '上传图片：',
          prop: 'url',
          isFull: true,
          tag: {
            tagType: 'upload-img',
            attr: {
              fileSize: 1,
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

  onTableHandlerClick() {}

  onSlotClick() {
    console.log('1', 1);
  }
}
</script>
