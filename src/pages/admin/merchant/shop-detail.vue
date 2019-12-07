<template>
  <div class='merchant-shop-detail pb-30'>
    <el-tabs v-model="activeName">
      <el-tab-pane label="店铺基本信息"
                   lazy
                   name="1">
        <div class="p-30 bg-white border-radius-8">
          <div v-for="item in detail"
               :key="item.prop"
               class="pb-15 mb-10">
            <div v-if="item.type ==='img'"
                 class="flex">
              <div style="width:90px">{{item.label}}</div>
              <img v-for="img in item.value"
                   :width="item.width"
                   :height="item.height"
                   class="mr-10"
                   :key="img"
                   :src="img"
                   alt="">
            </div>
            <div v-else
                 class="flex">
              <div style="width:90px">{{item.label}}</div>
              <div>{{item.value}}</div>
            </div>
          </div>
          <el-button @click="onProhibit"
                     type="primary"
                     class="mt-20">
            下架
          </el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="产品列表"
                   lazy
                   name="2">
        <sc-min-table stripe
                      ref="table"
                      :columns-handler="columnsHandler"
                      :columns="columns"
                      :table-config="tableConfig"
                      @table-emitTableHandlerClick="onTableHandlerClick">
        </sc-min-table>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="修改销量"
               :visible.sync="form.dialogVisible"
               width="30%">
      <div>
        <span>销量：</span>
        <el-input v-model.number="form.input"
                  type="number"
                  placeholder="请输入销量"></el-input>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="onSubmit">确定修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { obj } from '../../../lib/@types/sc-param';

const columns: ScTable.SetColumns = [
  ['商品信息', 'title'],
  ['商品类型', 'type'],
  ['商品类别', 'type_title'],
  ['销量', 'xnum', 100],
  ['店铺名称', 'companyname'],
];

@Component
export default class MerchantShopDetail extends Vue {
  columns = this.$utils._SetTableColumns(columns);

  columnsHandler = [{ name: 'editsales', title: '修改销量' }];

  tableConfig = {
    api: this.$api.admin.merchant.shop.goods,
    index: {
      shopid: 1,
    },
    handleWidth: 100,
  };

  activeName = '1';

  form = {
    dialogVisible: false,
    input: '',
    id: 0,
  };

  detail: obj[] = [
    { label: '店铺名称：', value: '', prop: 'shopname' },
    { label: '店铺状态：', value: '', prop: 'company_state' },
    {
      label: '店铺标志：',
      value: [],
      prop: 'none3',
      type: 'img',
      width: '120px',
      height: '120px',
    },
    { label: '掌柜名称：', value: '', prop: 'username' },
    { label: '服务电话：', value: '', prop: 'com_phone' },
    { label: '开店时间：', value: '', prop: 'none6' },
    { label: '营业时间：', value: '', prop: 'none7' },
    { label: '经营品类：', value: '', prop: 'typetitle' },
    { label: '配送方式：', value: '', prop: 'none9' },
    {
      label: '营业执照：',
      value: [],
      prop: 'none10',
      type: 'img',
      width: '260px',
      height: '150px',
    },
    {
      label: '身份证：',
      value: [],
      prop: 'none11',
      type: 'img',
      width: '260px',
      height: '150px',
    },
  ];

  get allId(): { uid: string; shopid: string } {
    const { uid, id } = this.$route.query as any;
    return {
      uid,
      shopid: id,
    };
  }

  mounted() {
    this.getDetail(this.allId);
  }

  onSubmit() {
    const { input, id } = this.form;

    if (!input && input != '0') {
      this.$message.warning('请输入销量');
      return;
    }
    const api = this.$api.admin.merchant.shop.shopNum;
    this.$http.post(api, { shopid: this.allId.shopid, gid: id, xnum: input }).then((res) => {
      this.$message.success('修改成功');
    });

    this.form.dialogVisible = false;
  }

  async onProhibit() {
    try {
      const flag = await this.$utils._MessageConfirm('是否下架该店铺', '下架');

      if (flag) {
        const api = this.$api.admin.merchant.shop.prohibit;
        await this.$http.get(api, {
          shopid: this.allId.shopid,
        });

        this.getDetail(this.allId);
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  async getDetail(id: any) {
    const api = this.$api.admin.merchant.shop.show;
    const { data } = await this.$http.get(api, id);

    this.detail.forEach((v) => {
      v.value = data[v.prop];
    });

    console.log('this.detail', this.detail);
  }

  onTableHandlerClick({ row, index, type }: ScTable.Event.TableHandlerClick) {
    if (type === 'editsales') {
      this.form.dialogVisible = true;
      this.form.id = row.id;
    }
  }
}
</script>
