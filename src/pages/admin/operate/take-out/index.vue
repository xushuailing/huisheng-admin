
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
                   lazy
                   :label="tab.label"
                   :name="tab.name">
        <component :is="tab.component"
                   ref="tables"
                   :type="tab.type"
                   :name="tab.name"
                   class="mt-20"></component>
      </el-tab-pane>
    </el-tabs>

    <sc-add-form :visible.sync="visible"
                 :api="addApi"
                 :config="addConfig"
                 @emitAddComplete="onAddComplete">
    </sc-add-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator';
import { ScForm } from '@/lib/@types/sc-form.d';
import { obj } from '@/lib/@types/sc-param.d';
import issue from './issue-list.vue';
import manage from './manage-list.vue';
import noob from './noob-list.vue';
import video from './video-list.vue';
import { ScTable } from '../../../../lib/@types/sc-table';

// const types = [{ value: 1, label: '外卖学院' }, { value: 2, label: '视频教程' }];
@Component
export default class TpSetting extends Vue {
  @Ref('tables') tables!: any[];

  // 1.新手入门 2.视频教程 3.经营之道 4.常见问题
  tabs = [
    { label: '新手入门', name: 'noob', component: noob, type: 1 },
    { label: '视频学习', name: 'video', component: video, type: 2 },
    { label: '经营之道', name: 'manage', component: manage, type: 3 },
    { label: '常见问题', name: 'issue', component: issue, type: 4 },
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
          prop: 'type',
          tag: {
            listeners: {
              change: this.onTypeChange,
            },
            tagType: 'select',
            attr: { placeholder: '请选择类型' },
            options: this.tabs.map((v) => ({ value: v.type, label: v.label })),
          },
        },
        {
          label: '添加问题：',
          prop: 'title',
          tag: { attr: { placeholder: '请输入添加问题' } },
        },
        {
          label: '回答：',
          prop: 'content',
          isHide: false,
          tag: { attr: { type: 'textarea', rows: 6, placeholder: '请输入回答' } },
        },
        {
          label: '添加视频：',
          prop: 'video',
          isHide: true,
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
    rules: [
      {
        type: {
          value: [{ required: true, message: '请选择类型', trigger: 'change' }],
        },
        content: {
          value: [{ required: true, message: '请输入回答', trigger: 'blur' }],
        },
        title: {
          value: [{ required: true, message: '请输入添加问题', trigger: 'blur' }],
        },
      },
    ],
    handleSubmit: (data) => {
      if (data.type == 2) {
        return { ...data, content: data.video };
      }
      return data;
    },
  };

  get addApi() {
    return this.$api.admin.operate.takeOut.create;
  }

  onTypeChange(val: number) {
    const data = this.addConfig.data[0];

    if (val === 2) {
      data[2].isHide = true;
      data[3].isHide = false;
    } else {
      data[2].isHide = false;
      data[3].isHide = true;
    }
  }

  onAdd() {
    this.visible = true;
  }

  onAddComplete({ data, status }: ScForm.EventComplete) {
    if (status) {
      this.tables.forEach((table) => {
        if (data.type === table.type) {
          (table.$refs[table.name] as ScTable).emitRefresh();
        }
      });
    }
  }
}
</script>
