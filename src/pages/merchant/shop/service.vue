<template>
  <div class='shop-service'>
    <sc-min-table stripe
                  ref="table"
                  :columns-handler="['del']"
                  :columns="columns"
                  :table-config="tableConfig"
                  :formAddConfig="addConfig">
    </sc-min-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { ScForm } from '@/lib/@types/sc-form.d';
import { _Shopid } from '../config';

const columns: ScTable.SetColumns = [
  ['头像', 'default_img', 100, null, 'img'],
  ['昵称', 'name'],
  ['电话', 'phone'],
  ['工作时间', 'work_time'],
  ['创建时间', 'createtime'],
];

@Component
export default class ShopService extends Vue {
  userInfo = this.$utils._Storage.get('user_info');

  columns = this.$utils._SetTableColumns(columns);

  tableConfig = {
    api: this.$api.merchant.shop.service,
    index: { shopid: _Shopid },
    breadcrumbButtons: ['add'],
  };

  addConfig: ScForm.Add = {
    header: { title: '添加客服' },
    'label-width': '110px',
    buttons: [{ mode: 'submit', text: '添加' }],
    params: { shopid: _Shopid },
    rules: [
      {
        // image: {
        //   value: [{ required: true, message: '请添加头像', trigger: 'change' }],
        // },
        name: {
          value: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        },
        phone: {
          value: [
            { required: true, message: '请输入电话号码', trigger: 'blur' },
            {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (this.$utils._ValidatePhone(value)) {
                  return callback();
                }
                return callback(new Error('电话号码不正确'));
              },
            },
          ],
        },
        work_time: {
          value: [{ required: true, message: '请输入工作时间', trigger: 'blur' }],
        },
      },
    ],
    data: [
      [
        {
          label: '添加头像：',
          prop: 'image',
          tooltip: '只支持 jpg 格式',
          tag: {
            tagType: 'upload-img',
            attr: { limit: 1, fileType: ['image/jpeg'] },
          },
        },
        {
          label: '昵称：',
          prop: 'name',
          tag: { attr: { placeholder: '请输入昵称' } },
        },
        {
          label: '电话号码：',
          prop: 'phone',
          tag: {
            attr: { placeholder: '请输入电话号码' },
          },
        },
        {
          label: '工作时间：',
          prop: 'work_time',
          tag: {
            attr: { placeholder: '请输入工作时间' },
          },
        },
      ],
    ],
  };
}
</script>
