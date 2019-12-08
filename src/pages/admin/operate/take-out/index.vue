
<template>
  <div>
    <sc-breadcrumb>
      <el-button @click="onAdd">添加</el-button>
    </sc-breadcrumb>
    <el-tabs v-model="activeName"
             type="card"
             :lazy="true">
      <el-tab-pane v-for="tab in tabs"
                   :key="tab.name"
                   :label="tab.label"
                   :name="tab.name">
        <component :is="tab.component"
                   class="mt-20"></component>
      </el-tab-pane>
    </el-tabs>

    <sc-add-form :visible.sync="visible"
                 :api="addApi"
                 :config="addConfig">
    </sc-add-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ScForm } from '@/lib/@types/sc-form.d';
import { obj } from '@/lib/@types/sc-param.d';
import issue from './issue-list.vue';
import manage from './manage-list.vue';
import noob from './noob-list.vue';
import video from './video-list.vue';

const types = [{ value: 1, label: '外卖学院' }, { value: 2, label: '视频教程' }];

@Component
export default class TpSetting extends Vue {
  tabs = [
    { label: '合同设置', name: 'issue', component: issue },
    { label: '代运营', name: 'manage', component: manage },
    { label: '合同设置', name: 'noob', component: noob },
    { label: '代运营', name: 'video', component: video },
  ];

  activeName = this.tabs[0] && this.tabs[0].name;

  visible = false;

  addConfig: ScForm.Add = {
    buttons: [
      {
        mode: 'submit',
        text: '完成',
        sort: 2,
      },
      // {
      //   mode: 'cancel',
      //   text: '取消',
      //   sort: 1,
      // },
    ],
    header: { title: '添加' },
    data: [
      [
        {
          label: '类型：',
          prop: 'none7',
          tag: { tagType: 'select', attr: { placeholder: '请选择类型' }, options: types },
        },
        {
          label: '添加问题：',
          prop: 'none8',
          tag: { attr: { placeholder: '请选择添加问题' } },
        },
        {
          label: '回答：',
          prop: 'none9',
          tag: { attr: { type: 'textarea', rows: 6, placeholder: '请输入回答' } },
        },
        {
          label: '添加视频：',
          prop: 'none10',
          tag: {
            tagType: 'upload-file',
            attr: {
              limit: 1,
              fileSize: 50,
            },
          },
        },
      ],
    ],
  };

  // TODO: 接口没有
  get addApi() {
    return this.$api.admin.setting.platform.create;
  }

  onAdd() {
    this.visible = true;
  }
}
</script>
