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
              <el-button @click="handleClick(scope.row)"
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
              <el-button @click="handleClick(scope.row)"
                         type="text"
                         size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';

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

  mounted() {
    this.getList();
  }

  handleClick() {}

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
