<template>
  <div class='merchant-shop-detail pb-30'>
    <el-tabs class="sc-tabs"
             v-model="activeName">
      <el-tab-pane label="金牌经理"
                   lazy
                   name="0">
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
              <div style="height:80px;line-height: 80px">
                <span v-if="item.prop==='money'">￥{{ scope.row[item.prop] }}</span>
                <span v-else-if="item.prop==='divide_comparisons'">
                  {{ scope.row[item.prop]*100 }}%
                </span>
                <span v-else>{{ scope.row[item.prop] }}</span>
              </div>
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
                   name="1">
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
                <span v-if="item.prop==='money'">￥{{ scope.row[item.prop] }}</span>
                <span v-else-if="item.prop==='commission'">
                  {{ scope.row[item.prop]*100 }}%
                </span>
                <div v-else-if="item.prop==='quota'">
                  <div v-for="t in scope.row[item.prop]"
                       :key="t.id">{{t.name}}：{{t.num}}</div>
                </div>
                <div v-else>{{ scope.row[item.prop] }}</div>
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
                 @emitAddComplete="onAddComplete"
                 :config="managerForm.config">
    </sc-add-form>
    <sc-add-form :visible.sync="agentForm.visible"
                 :api="agentForm.addFormApi"
                 @emitAddComplete="onAddComplete"
                 :config="agentForm.config">
    </sc-add-form>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { ScForm } from '../../../lib/@types/sc-form';

const quota = [
  { id: 4, name: '黄金会员', num: null },
  { id: 5, name: '铂金会员', num: null },
  { id: 6, name: '钻石会员', num: null },
];

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
    id: null,
  };

  agent = {
    list: [],
    columns: this.$utils._SetTableColumns(columnsAgent),
    id: null,
  };

  activeName = '1';

  managerForm = {
    visible: false,
    addFormApi: this.$api.admin.vip.rules.update,
    config: this.formConfig(1),
  };

  agentForm = {
    visible: false,
    addFormApi: this.$api.admin.vip.rules.update,
    config: this.formConfig(2),
  };

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
        if (type == 1) {
          data.name = data.member_name;
          data.id = this.manager.id;
          data.divide_comparisons /= 100;
          return data;
        }
        data.id = this.agent.id;

        const _quota = this.$utils._Clone(quota);

        _quota.forEach((v) => {
          if (v.name in data) {
            v.num = data[v.name];
          }
        });

        data.divide_comparisons = data.commission / 100;

        data.quota = _quota;

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
              name: {
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
              commission: {
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
                prop: 'name',
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
                prop: 'commission',
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

  onAddComplete({ status }: ScForm.EventComplete) {
    if (status) {
      this.getList();
    }
  }

  handleClick(row: any, type: number) {
    if (type == 1) {
      this.managerForm.visible = true;
      this.managerForm.config.data.forEach((data) => {
        data.forEach((item) => {
          if (row[item.prop] || row[item.prop] === 0) {
            if (item.prop === 'divide_comparisons') {
              item.default = row[item.prop] * 100;
              return;
            }
            item.default = row[item.prop];
          }
        });
      });

      this.manager.id = row.level_id;
    } else {
      this.agentForm.visible = true;

      this.agentForm.config.data.forEach((data) => {
        data.forEach((item) => {
          if (item.prop === 'commission') {
            item.default = row[item.prop] * 100;
            return;
          }
          const vip = (row.quota as any[]).find((v) => v.name === item.prop);
          if (vip) {
            item.default = vip.num;
            return;
          }
          item.default = row[item.prop];
        });
      });

      this.agent.id = row.id;
    }
  }

  async getList() {
    try {
      const api = this.$api.admin.vip.rules.index;
      const { data } = await this.$http.get(api);

      this.manager.list = data.level_list;
      this.agent.list = data.agent_member;
    } catch (error) {
      console.log('error :', error);
    }
  }
}
</script>
