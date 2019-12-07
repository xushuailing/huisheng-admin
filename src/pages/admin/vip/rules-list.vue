<template>
  <div class='merchant-shop-detail pb-30'>
    <el-tabs v-model="activeName">
      <el-tab-pane label="金牌经理"
                   lazy
                   name="1">
        <el-table :data="manager.list"
                  stripe
                  class="border-radius-8">
          <el-table-column align='center'
                           header-align='center'
                           v-for="item in manager.columns"
                           :key="item.prop"
                           :prop="item.prop"
                           :label="item.label"
                           :width="item.width">
            <template slot-scope="scope">
              <div style="height:80px;line-height: 80px">{{ scope.row[item.prop] }}</div>
            </template>
          </el-table-column>
          <el-table-column fixed="right"
                           label="操作"
                           width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row,1)"
                         type="text"
                         size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="代理"
                   lazy
                   name="2">
        <el-table :data="agent.list"
                  stripe
                  class="border-radius-8">
          <el-table-column align='center'
                           header-align='center'
                           v-for="item in agent.columns"
                           :key="item.prop"
                           :prop="item.prop"
                           :label="item.label"
                           :width="item.width">
            <template slot-scope="scope">
              <div style="height:80px;"
                   class="flex-jc-ac">
                <div v-if="item.prop!=='quota'">{{ scope.row[item.prop] }}</div>
                <div v-else>
                  <div v-for="t in scope.row[item.prop]"
                       :key="t.id">{{t.name}}：{{t.num}}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right"
                           label="操作"
                           width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row,2)"
                         type="text"
                         size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <sc-add-form :visible.sync="managerForm.visible"
                 :api="managerForm.addFormApi"
                 @emitAddComplete="managerForm.onAddComplete"
                 :config="managerForm.config">
    </sc-add-form>
    <sc-add-form :visible.sync="agentForm.visible"
                 :api="agentForm.addFormApi"
                 @emitAddComplete="agentForm.onAddComplete"
                 :config="agentForm.config">
    </sc-add-form>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { ScForm } from '../../../lib/@types/sc-form';

const columnsManager: ScTable.SetColumns = [
  ['会员等级', 'member_name'],
  ['费用', 'money'],
  ['佣金比例', 'divide_comparisons'],
];
const columnsAgent: ScTable.SetColumns = [
  ['代理等级', 'name'],
  ['费用', 'money'],
  ['会员名额', 'quota'],
  ['佣金', 'commission'],
];
@Component
export default class MerchantShopDetail extends Vue {
  manager = {
    list: [],
    columns: this.$utils._SetTableColumns(columnsManager),
  };

  agent = {
    list: [],
    columns: this.$utils._SetTableColumns(columnsAgent),
  };

  activeName = '2';

  managerForm = {
    visible: false,
    addFormApi: this.$api.admin.vip.rules.update,
    onAddComplete: ({ status }: any) => {
      if (status) {
        console.log('提交成功 :');
      }
    },
    config: this.formConfig(1),
  };

  agentForm = {
    visible: false,
    addFormApi: this.$api.admin.vip.rules.update,
    onAddComplete: () => {},
    config: this.formConfig(2),
  };

  // TODO: 修改字段缺少
  formConfig(type: number): ScForm.Add {
    return {
      params: { type },
      type: type == 1 ? 'plain' : 'senior',
      buttons: [
        {
          mode: 'submit',
          text: '确认修改',
        },
      ],
      handleSubmit: (data) => {
        console.log('data :', data);
        if (type == 1) {
          return data;
        }
        // const quota = [
        //   { id: 4, name: '黄金会员', num: 20 },
        //   { id: 5, name: '铂金会员', num: 20 },
        //   { id: 6, name: '钻石会员', num: 20 },
        // ];
        return data;
      },
      header: { title: '修改信息' },
      rules:
        type == 1 ?
          [
            {
              member_name: {
                value: [{ required: true, message: '请输入会员等级', trigger: 'blur' }],
              },
              money: {
                value: [{ required: true, message: '请输入费用', trigger: 'blur' }],
              },
              divide_comparisons: {
                value: [{ required: true, message: '请输入佣金比例', trigger: 'blur' }],
              },
            },
          ] :
          [
            {
              none1: {
                value: [{ required: true, message: '请输入代理等级', trigger: 'blur' }],
              },
              money: {
                value: [{ required: true, message: '请输入费用', trigger: 'blur' }],
              },
              黄金会员: {
                value: [{ required: true, message: '请输入黄金会员名额', trigger: 'blur' }],
              },
              铂金会员: {
                value: [{ required: true, message: '请输入铂金会员名额', trigger: 'blur' }],
              },
              钻石会员: {
                value: [{ required: true, message: '请输入钻石会员名额', trigger: 'blur' }],
              },
              none12: {
                value: [
                  {
                    required: true,
                    message: '请输入返点比例(1-100)',
                    trigger: 'blur',
                  },
                ],
              },
            },
          ],
      data:
        type == 1 ?
          [
            [
              {
                label: '会员等级：',
                prop: 'member_name',
                tag: {
                  attr: { placeholder: '请输入会员等级' },
                },
              },
              {
                label: '费用：',
                prop: 'money',
                tag: { attr: { type: 'number', placeholder: '请输入费用' } },
              },
              {
                label: '佣金比例：',
                prop: 'divide_comparisons',
                tag: {
                  attr: {
                    type: 'number',
                    placeholder: '请输入佣金比例(1-100)',
                    slot: {
                      attr: { slot: 'append' },
                      component: Vue.extend({
                        render(h) {
                          return h('span', {}, '%');
                        },
                      }),
                    },
                  },
                },
              },
            ],
          ] :
          [
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
                prop: 'money',
                tag: { attr: { placeholder: '请输入费用' } },
              },
              {
                label: '黄金会员名额：',
                prop: '黄金会员',
                tag: { attr: { placeholder: '请输入黄金会员名额' } },
              },
              {
                label: '铂金会员名额：',
                prop: '铂金会员',
                tag: { attr: { placeholder: '请输入铂金会员名额' } },
              },
              {
                label: '钻石会员名额：',
                prop: '钻石会员',
                tag: { attr: { placeholder: '请输入钻石会员名额' } },
              },
              {
                label: '返点比例：',
                prop: 'none12',
                tag: {
                  attr: {
                    placeholder: '请输入返点比例(1-100)',
                    slot: {
                      attr: { slot: 'append' },
                      component: Vue.extend({
                        render(h) {
                          return h('span', {}, '%');
                        },
                      }),
                    },
                  },
                },
              },
            ],
          ],
    };
  }

  mounted() {
    this.getList();
  }

  handleClick(row: any, type: number) {
    if (type == 1) {
      this.managerForm.visible = true;
    } else {
      this.agentForm.visible = true;
    }
  }

  async getList() {
    try {
      const api = this.$api.admin.vip.rules.index;
      const { data } = await this.$http.get(api);

      this.manager.list = data.level_list;
      this.agent.list = data.agent_member;
      console.log('data :', data);
    } catch (error) {
      console.log('error :', error);
    }
  }
}
</script>
