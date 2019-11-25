<template>
  <div>
    <sc-min-table stripe
                  ref="table"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :table-config="tableConfig">
    </sc-min-table>
    <!-- <sc-min-table stripe
                  ref="table"
                  :columns-type="['selection']"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :editConfig="editConfig"
                  :search-config="searchConfig"
                  :formAddConfig="formAddConfig"
                  :table-config="tableConfig">
    </sc-min-table> -->
    <!-- @emitTableHandlerClick="onTableHandlerClick" -->
    <!-- @pagination-onSlotClick="onSlotClick" -->
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

  // paginationConfig = {
  //   slotAttr: {
  //     isCheckbox: true,
  //     text: '通过',
  //   },
  // };

  tableConfig = {
    api: this.$api.admin.setting.platform,

  };

  // formAddConfig = {
  //   type: 'senior', // plain senior specialty
  //   width: '70%',
  //   header: {
  //     title: '新增数据',
  //     desc: '文字文字',
  //   },
  //   steps: [
  //     {
  //       title: '步骤 1',
  //       // icon: 'el-icon-edit'
  //     },
  //     {
  //       title: '步骤 2',
  //       // icon: 'el-icon-upload'
  //     },
  //   ],
  //   rules: [
  //     {
  //       displayName: {
  //         value: [
  //           { required: true, message: '请输入展示名', trigger: 'blur' },
  //           {
  //             min: 3,
  //             max: 5,
  //             message: '长度在 3 到 5 个字符',
  //             trigger: 'blur',
  //           },
  //         ],
  //       },
  //       status: {
  //         value: [
  //           {
  //             required: true,
  //             message: '请选择状态',
  //             trigger: 'change',
  //           },
  //         ],
  //       },
  //     },
  //   ],
  //   data: [
  //     [
  //       {
  //         label: '姓名：',
  //         prop: 'name',
  //         tooltip: '帮助',
  //         tag: {
  //           attr: {
  //             placeholder: '请输入姓名',
  //           },
  //         },
  //       },
  //       {
  //         label: '创建日期：',
  //         prop: 'createdAt',
  //         tag: {
  //           tagType: 'date-picker',
  //           attr: {
  //             type: 'datetime',
  //             placeholder: '请选择日期',
  //           },
  //         },
  //       },

  //       {
  //         label: '状态：',
  //         prop: 'status',
  //         tag: {
  //           tagType: 'select',
  //           attr: {
  //             placeholder: '请选择状态',
  //           },
  //           options: [
  //             {
  //               value: 1,
  //               label: '启用',
  //             },
  //             {
  //               value: 0,
  //               label: '不启用',
  //             },
  //           ],
  //         },
  //       },
  //       {
  //         label: '任务名：',
  //         prop: 'displayName',
  //         tag: {
  //           attr: {
  //             placeholder: '请选择状态',
  //           },
  //         },
  //       },
  //       {
  //         label: '备注：',
  //         prop: 'memo',
  //         isFull: true,
  //         tag: {
  //           attr: {
  //             type: 'textarea',
  //             placeholder: '备注',
  //           },
  //         },
  //       },
  //       {
  //         label: '上传图片：',
  //         prop: 'url',
  //         isFull: true,
  //         tag: {
  //           tagType: 'upload-img',
  //           attr: {
  //             fileSize: 1,
  //           },
  //         },
  //       },
  //     ],
  //   ],
  // };


  // onTableHandlerClick() {}

  // onSlotClick() {
  //   console.log('1', 1);
  // }
}
</script>
