<template>
  <div class='new-list'>
    <sc-min-table stripe
                  ref="table"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :columns-props="{align:'center'}"
                  :table-config="tableConfig"
                  :formAddConfig="addConfig"
                  :search-config="searchConfig">
    </sc-min-table>
    <sc-dialog ref="imgDialog"
               :visible.sync="imgDialog.show"
               :isOpenFull="false"
               custom-class="sc-dialog__img">
      <img slot="conter"
           :src="imgDialog.src"
           alt />
    </sc-dialog>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import GoodsInfo from './components/img-name';
import { ScTable, Scope } from '@/lib/@types/sc-table.d';
import { ScForm } from '@/lib/@types/sc-form.d';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class ActvNew extends Vue {
  columns: ScTable.Columns = [
    {
      label: '商品信息',
      prop: 'none',
      propsHandler: ({ col, row }: obj) => ({ url: row.pic, text: row[col.prop], $vm: this }),
      component: GoodsInfo,
    },
    { label: '店铺信息', prop: 'none1' },
    { label: '推广类型', prop: 'none2' },
    { label: '有效期', prop: 'none3' },
    { label: '申请时间', prop: 'createtime' },
  ];

  columnsHandler: ScTable.ColumnsHandler = ['del'];

  // TODO: 缺少 index create delete 接口
  tableConfig: ScTable.TableConfig = {
    api: this.$api.admin.activity.ads,
    breadcrumbButtons: ['add'],
  };

  searchConfig: ScTable.Search = {
    attr: { 'label-width': '150px' },
    data: [
      {
        label: '商家店铺名称：',
        prop: 'none1',
        tag: {
          attr: { placeholder: '请输入商家店铺名称' },
        },
      },
      {
        label: '申请时间：',
        prop: 'createtime',
        tag: {
          tagType: 'date-picker',
          attr: {
            type: 'datetime',
            placeholder: '请选择申请时间',
          },
        },
      },
    ],
  };

  addConfig: ScForm.Add = {
    header: { title: '添加' },

    buttons: [
      {
        mode: 'submit',
        text: '确认添加',
      },
    ],
    rules: [
      {
        none1: {
          value: [{ required: true, trigger: 'blur', message: '请输入店铺名称' }],
        },
        none2: {
          value: [{ required: true, trigger: 'blur', message: '请输入商品ID' }],
        },
        none3: {
          value: [{ required: true, trigger: 'change', message: '请选择有效期' }],
        },
      },
    ],
    data: [
      [
        {
          label: '店铺名称：',
          prop: 'none1',
          tag: { attr: { placeholder: '请输入店铺名称' } },
        },
        {
          label: '添加产品：',
          prop: 'none5',
          tag: { attr: { placeholder: '请输入商品ID' } },
        },
        {
          label: '有效期：',
          prop: 'none3',
          tag: {
            tagType: 'date-picker',
            attr: { type: 'datetime', placeholder: '请选择有效期' },
          },
        },
      ],
    ],
  };

  imgDialog = { show: false, src: '' };

  onImgClick({ row }: Scope, { prop }: obj) {
    this.imgDialog.show = true;
    this.imgDialog.src = row[prop];
  }
}
</script>
