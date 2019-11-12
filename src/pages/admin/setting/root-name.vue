<template>
  <div class='admin-rootName bg-white p-15'>
    <div class="p-20">
      <sc-add-form mode="page"
                   api="http://baidu.com"
                   :config="config9">
      </sc-add-form>
    </div>
    <!-- <el-button @click="dialogShow=true">显示</el-button> -->
    <!-- <div class="p-20">
      <sc-add-form api="http://baidu.com"
                   :visible.sync="dialogShow"
                   :config="config5">
      </sc-add-form>
    </div> -->
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class AdminRootName extends Vue {
  dialogShow = false;

  /** 系统管理 >总账号管理 */
  config1 = {
    buttons: [
      {
        mode: 'submit',
        text: '更换密码',
      },
    ],
    data: [
      [
        {
          label: '用户名',
          prop: 'none1',
          tag: {
            attr: { placeholder: '请输入用户名' },
          },
        },
        {
          label: '手机号',
          prop: 'none2',
          tag: {
            attr: { placeholder: '请输入手机号', type: 'number' },
          },
        },
      ],
    ],
  };

  /** 系统管理 >总账号管理 > 更换密码 */
  config2 = {
    buttons: [
      {
        mode: 'submit',
        text: '确定更换',
      },
    ],
    data: [
      [
        {
          label: '原始密码',
          prop: 'none1',
          tag: {
            attr: { placeholder: '请输入原始密码' },
          },
        },
        {
          label: '新密码',
          prop: 'none2',
          tag: {
            attr: { placeholder: '请输入新密码' },
          },
        },
      ],
    ],
  };

  /** 会员管理 > 代理会员列表 > 修改 */
  config5 = {
    type: 'senior',
    header: {
      title: '新增数据',
      desc: '文字文字',
    },
    buttons: [
      {
        mode: 'submit',
        text: '确认添加',
      },
    ],
    data: [
      [
        {
          label: '代理等级：',
          prop: 'none1',
          tag: {
            attr: { placeholder: '请输入代理等级' },
          },
        },
        {
          label: '费用：',
          prop: 'none2',
          tag: {
            attr: { placeholder: '请输入费用' },
          },
        },
        {
          label: '黄金会员名额：',
          prop: 'none3',
          tag: {
            tagType: 'input-number',
            attr: { placeholder: '请输入黄金会员名额' },
          },
        },
        {
          label: '铂金会员名额：',
          prop: 'none4',
          tag: {
            tagType: 'input-number',
            attr: { placeholder: '请输入铂金会员名额' },
          },
        },
        {
          label: '钻石会员名额：',
          prop: 'none5',
          tag: {
            tagType: 'input-number',
            attr: { placeholder: '请输入钻石会员名额' },
          },
        },
        {
          label: '返点比例：',
          prop: 'none6',
          tag: {
            attr: { placeholder: '请输入返点比例' },
          },
        },
      ],
    ],
  };

  /** 会员管理 > 添加代理 */
  config6 = {
    buttons: [
      {
        mode: 'submit',
        text: '添加',
      },
    ],
    data: [
      [
        {
          label: '代理姓名：',
          prop: 'none1',
          tag: {
            attr: { placeholder: '请输入代理姓名' },
          },
        },
        {
          label: '电话：',
          prop: 'none2',
          tag: {
            attr: { placeholder: '请输入电话' },
          },
        },
        {
          label: '代理级别：',
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
              {
                value: 2,
                label: '不启用1',
              },
            ],
            attr: { placeholder: '请输入代理级别' },
          },
        },
      ],
    ],
  };

  /** 活动管理 > 广告管理 > 添加 */
  config7 = {
    buttons: [
      {
        mode: 'submit',
        text: '确认添加',
      },
    ],
    data: [
      [
        {
          label: '添加图片：',
          prop: 'none1',
          tag: {
            tagType: 'upload-img',
            attr: {
              limit: 1,
            },
          },
        },
        {
          label: '跳转地址：',
          prop: 'none2',
          tag: {
            attr: { placeholder: '请输入跳转地址' },
          },
        },
        {
          label: '跳转类型：',
          prop: 'none3',
          tag: {
            attr: { placeholder: '请输入跳转类型' },
          },
        },
      ],
    ],
  };

  /** 活动管理 > 今日上新 > 添加 */
  config8 = {
    buttons: [
      {
        mode: 'submit',
        text: '确认添加',
      },
    ],
    data: [
      [
        {
          label: '店铺名称：',
          prop: 'none1',
          tag: {
            attr: { placeholder: '请输入店铺名称' },
          },
        },
        {
          label: '添加产品：',
          prop: 'none2',
          tag: {
            attr: { placeholder: '请输入商品ID' },
          },
        },
        {
          label: '有效期：',
          prop: 'none3',
          tag: {
            tagType: 'date-picker',
            attr: {
              placeholder: '请选择有效期',
              type: 'date',
            },
          },
        },
      ],
    ],
  };

  /** 自营产品管理 > 优惠活动 > 新增优惠券 */
  config9 = {
    buttons: [
      {
        mode: 'submit',
        text: '保存',
        sort: 1,
      },
      {
        mode: 'cancel',
        text: '取消',
        sort: 2,
      },
    ],
    data: [
      [
        {
          label: '优惠券名称：',
          prop: 'none1',
          tag: {
            attr: { placeholder: '请输入优惠券名称' },
          },
        },
        {
          label: '面额：',
          prop: 'none2',
          tag: {
            tagType: 'date-picker',
            attr: {
              placeholder: '请选择面额',
              type: 'date',
            },
          },
        },
        {
          label: '使用条件：',
          prop: 'none3',
          tag: {
            tagType: 'switch',
            attr: {
              'active-text': '无条件使用',
            },
          },
        },
        {
          label: '发放日期：',
          prop: 'none4',
          tag: {
            tagType: 'date-picker',
            attr: {
              placeholder: '请选择发放日期',
              type: 'date',
            },
          },
        },
        {
          label: '有效时间：',
          prop: 'none5',
          tag: {
            tagType: 'date-picker',
            attr: {
              placeholder: '请选择有效时间',
              type: 'date',
            },
          },
        },
      ],
    ],
  };
}
</script>
