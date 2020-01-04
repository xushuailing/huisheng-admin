<template>
  <div class="market-add bg-white border-radius-4 p-30">
    <div class="mb-20">优惠券名称：{{form.title}}</div>
    <el-form ref="form"
             :model="form"
             :rules="rules"
             size="small">
      <el-form-item label=""
                    prop="size">
        <div class="pt-20 pl-30 pr-30 pb-30 bg-background-color-base border-radius-4">
          <div v-if="!isDetail">
            <div class="mb-10">添加活动商品：</div>
            <el-form-item prop="gid"
                          :rules="sizeRules"
                          label-width="auto">
              <el-input v-model="form.gid"
                        placeholder="请输入商品ID"></el-input>
              <el-button class="ml-10"
                         type="primary"
                         @click="handleAdd">添加</el-button>
            </el-form-item>
          </div>
          <div>
            <span>商品活动列表：</span>
            <span class="font-info">添加商品时，请添加折扣条件，如果没添加折扣条件，则按失效折扣活动来算</span>
          </div>
          <edit-table v-model="table"
                      ref="table"
                      :toolbar="toolbar"
                      :table-config="tableConfig"
                      :form-config="formConfig"
                      :columns="columns"
                      :rules="tableRules"
                      :span-method="spanMethod"
                      @emitDeleteComplete="handleMinus"></edit-table>
        </div>
      </el-form-item>
      <el-form-item label="发放日期："
                    prop="granttime">
        <el-date-picker v-model="form.granttime"
                        placeholder="请选择发放日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="有效时间："
                    prop="effectTime">
        <effect-time :value.sync="form.effectTime"></effect-time>
      </el-form-item>
      <el-form-item label="折扣规则说明："
                    prop="introduction"
                    label-width="110px">
        <el-input v-model="form.introduction"
                  type="textarea"
                  :rows="4"></el-input>
      </el-form-item>
      <el-form-item class="pt-20">
        <el-button type="primary"
                   class="pl-30 pr-30"
                   @click="handleSubmit">保存</el-button>
        <el-button class="pl-30 pr-30"
                   @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Ref } from 'vue-property-decorator';
import { ElForm } from 'element-ui/types/form.d';
import { obj } from '@/lib/@types/sc-param.d';
import EditTable from '@/components/editTable.vue';
import { ScEditTable } from '@/components/@types/sc-edit-table.d';
import { _GetTableSpan, _ObjectSpanMethod, TableColumns, MergeKey } from '@/utils/handleTableSpan';
import { _Shopid } from '../config';
import EffectTime from './time.vue';

interface Form extends obj {
  title: string;
  sort: string;
  gid: string;
  size: (string | number)[];
  granttime: any | string;
  effectTime: any | string;
  introduction: string;
}

interface Goods extends obj {
  id: number;
  gid: number;
  shopid: number;
  num_one: number;
  discount_price_one: string;
  num_two: number;
  discount_price_two: string;
  num_three: number;
  discount_price_three: string;
  createtime: string;
  goods: {
    id: number;
    image: string;
    goodstitle: string;
    price: string;
  };
}

const _Pick = require('lodash/pick');
const _Omit = require('lodash/omit');
const _Chunk = require('lodash/chunk');

const _MergeKeys: MergeKey = {
  index: ['id', 'handler'],
};

const propNums = ['one', 'two', 'three'];

@Component({ components: { EditTable, EffectTime } })
export default class MarketAdd extends Vue {
  @Ref('table') $table!: ScEditTable.Methods;

  @Ref('form') $form!: ElForm;

  get id() {
    return this.$route.query.id;
  }

  get isDetail() {
    return !!this.$route.query.detail;
  }

  /** 表单 */

  form: Form = {
    title: '',
    sort: '',
    gid: '',
    size: [],
    granttime: '',
    effectTime: null,
    introduction: '',
  };

  rules = {
    // size: [
    //   { required: true, message: '请输入商品规格', trigger: ['blur', 'change'] },
    //   { validator: this.checkSize, trigger: ['blur', 'change'] },
    // ],
    // granttime: [{ required: true, message: '请选择发货时间', trigger: ['blur', 'change'] }],
  };

  checkSize(rule: obj, value: string[][], callback: Function) {
    console.log('value: ', value);
    return callback();
  }

  /** 折扣表格渲染 */

  sizeRules: obj = this.getSizeRules();

  getSizeRules() {
    return { required: true, message: '请输入规格名称', trigger: 'blur' };
  }

  handleAdd() {
    this.$form.validateField('gid', async (errmsg: string) => {
      const value = this.form.gid;

      if (!errmsg) {
        this.form.size.push(value);
        this.form.gid = '';
        const goods = await this.getDiscountGoods(value);
        const row = {
          index: this.form.size.length,
          id: value,
          gid: value,
          goodstitle: goods.title,
          image: goods.image,
          price: goods.price,
        };
        this.table = [...this.table, ...new Array(3).fill(row)];
        this.$table.setValue(this.table);
      }
    });
  }

  handleMinus(index: number) {
    this.table.splice(index, 3);
    this.$table.setValue(this.table);
  }

  /** 动态表格 */

  table: obj[] = [];

  @Watch('table')
  onTableChange(data: obj[]) {
    this.rowspanObj = _GetTableSpan(_MergeKeys, data);
  }

  toolbar: ScEditTable.Toolbar = { add: false, delete: true };

  get tableConfig(): ScEditTable.TableConfig {
    return { emptyRows: 0, showRequired: true, inputAlign: 'center', disabled: !!this.isDetail };
  }

  formConfig: ScEditTable.FormConfig = { attr: { 'status-icon': false } };

  columns: ScEditTable.Columns = [
    {
      label: 'ID',
      prop: 'gid',
      width: 100,
      editable: false,
      'show-overflow-tooltip': false,
    },
    {
      label: '图片',
      prop: 'image',
      width: 100,
      editable: false,
      component: Vue.extend({
        props: ['row', 'col'],
        render(h) {
          const { row, col } = this;
          const icon = h('i', { class: 'el-icon-picture-outline font-20 font-info' });
          const errorStyle = 'market-add__image flex-jc-ac bg-border-color-extra-light';
          const error = h('div', { class: errorStyle, slot: 'error' }, [icon]);
          return h(
            'el-image',
            { class: 'market-add__image', attrs: { src: row[col.prop], fit: 'cover' } },
            [error],
          );
        },
      }),
    },
    {
      label: '商品标题',
      prop: 'goodstitle',
      editable: false,
      'show-overflow-tooltip': false,
    },
    {
      label: '满（金额）',
      prop: 'num',
      tag: {
        tagType: 'input-number',
        attr: { min: 0, controls: false, class: 'w100' },
      },
    },
    {
      label: '减（金额）',
      prop: 'discount_price',
      tag: {
        // tagType: 'input-number',
        attr: { class: 'w100' },
      },
    },
  ];

  tableRules = {};

  /** 合并表格 */

  get mergeKeys() {
    return Object.values(_MergeKeys).flat();
  }

  rowspanObj: any = [];

  spanMethod(tableObj: TableColumns): obj {
    return _ObjectSpanMethod(tableObj, this.mergeKeys, this.rowspanObj);
  }

  /** 取消编辑 */
  handleCancel() {
    this.$router.push('index');
  }

  /** 保存 */
  async handleSubmit() {
    this.sizeRules = {};
    await this.$nextTick();
    this.$form.validate((valid, error) => {
      console.log('valid: ', valid, error);
      this.sizeRules = this.getSizeRules();
      if (valid) {
        this.submit();
      }
    });
  }

  async submit() {
    const api = this.$api.merchant.market.update.discount;
    const params = this.handleSubmitData();
    console.log('params: ', params);
    const loading = this.$utils._Loading.show();
    try {
      const { status } = await this.$http.post(api, { ...this.form });
    } catch (error) {
      console.log('保存折扣（实物）失败: ', error);
    }
    loading.close();
  }

  handleSubmitData() {
    const { effectTime } = this.form;
    const { strtime, endtime } = effectTime || {};

    const discountData = this.table || [];
    const discount = _Chunk(discountData, 3).map((goods: obj[]) => {
      const info = goods[0] || {};
      const good = propNums.reduce((item, prop, i) => {
        item[`num_${prop}`] = goods[i] && goods[i].num;
        item[`coupon_price_${prop}`] = goods[i] && goods[i].discount_price;
        return item;
      }, Object.create(null));
      return { gid: info.gid, ...good };
    });

    const data = {
      id: this.$route.query.id,
      shopid: _Shopid,
      ...this.form,
      ...effectTime,
      strtime,
      endtime,
      goods_discount: discount,
    };
    return _Omit(data, ['sort', 'gid', 'size', 'effectTime']);
  }

  /** 获取折扣商品信息 */
  async getDiscountGoods(id: string) {
    const api = this.$api.merchant.market.show.discountGoods;
    const loading = this.$utils._Loading.show();
    try {
      const { data } = await this.$http.get(api, { id });
      loading.close();
      return data || {};
    } catch (error) {
      console.log('error: ', error);
    }
    loading.close();
    return {};
  }

  /** 获取折扣/满减详情 */
  getDetail() {
    const api = this.$api.merchant.market.show.discount;
    const params = { id: this.$route.query.id, shopid: _Shopid };
    const loading = this.$utils._Loading.show({ target: (this.$refs.form as any).$el });
    this.$http
      .get(api, params)
      .then((res) => {
        const { discount, goods_discount } = res.data || {};
        discount.effectTime = _Pick(discount, ['coupon_type', 'strtime', 'endtime']);
        Object.keys(this.form).forEach((k) => {
          if (k in discount) {
            this.form[k] = discount[k];
          }
        });

        const goodsList = goods_discount.map((goods: Goods, index: number) => {
          this.form.size.push(goods.gid);
          const commonProps = ['id', 'index', 'gid', 'goodstitle', 'image', 'price]'];
          const commonData = _Pick({ index, ...goods, ...goods.goods }, commonProps);
          return propNums.map((prop) => {
            const num = goods[`num_${prop}`];
            const discount_price = goods[`discount_price_${prop}`];
            return { ...commonData, num, discount_price };
          });
        });
        if (goodsList.length) {
          this.$table.setValue(goodsList.flat());
        }
      })
      .catch((error) => {
        console.error('获取满减数据失败: ', error);
      })
      .finally(() => {
        loading.close();
      });
  }

  mounted() {
    this.getDetail();
  }
}
</script>

<style lang="scss">
  .market-add {
    .el-table__header tr {
      height: auto;
    }
    .el-table__header tr .cell {
      font-size: 14px;
      color: inherit;
    }
    .sc-edit-table__form .el-table td,
    .sc-edit-table__form .el-table th {
      padding: 4px 0;
    }
    .sc-edit-table__form .el-form-item {
      margin-top: 10px;
    }
    .el-form-item--mini.el-form-item,
    .el-form-item--small.el-form-item {
      margin-bottom: 10px;
    }
    &__image {
      width: 50px;
      height: 50px;
    }
  }
</style>
