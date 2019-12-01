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
            <el-form-item prop="id"
                          :rules="{required: true, message: '请输入规格名称', trigger: 'blur'}"
                          label-width="auto">
              <el-input v-model="form.id"
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
      <el-form-item label="发货时间："
                    prop="deliveryTime">
        <el-checkbox v-model="form.deliveryTime"
                     :disabled="isDetail">三天内发货</el-checkbox>
      </el-form-item>
      <el-form-item label="有效时间："
                    prop="effectTime">
        <effect-time :value.sync="form.effectTime"></effect-time>
      </el-form-item>
      <el-form-item label="满减规则说明："
                    prop="desc"
                    label-width="110px">
        <el-input v-model="form.desc"
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
import { Component, Vue, Watch } from 'vue-property-decorator';
import EditTable from '@/components/editTable.vue';
import { ScEditTable } from '@/components/@types/sc-edit-table.d';
import { _GetTableSpan, _ObjectSpanMethod, TableColumns, MergeKey } from '@/utils/handleTableSpan';
import EffectTime from '@/components/effective-date.vue';
import { obj } from '@/lib/@types/sc-param.d';

interface Form {
  title: string;
  sort: string;
  id: string;
  size: string[];
  detail: string;
  deliveryTime: any;
  effectTime: any;
}

const _MergeKeys: MergeKey = {
  index: ['id', 'handler'],
};

@Component({ components: { EditTable, EffectTime } })
export default class MarketAdd extends Vue {
  $refs!: {
    table: any;
    form: any;
  };

  get id() {
    return this.$route.query.id;
  }

  get isDetail() {
    return !!this.$route.query.detail;
  }

  form: Form = {
    title: '满减优惠活动',
    sort: '',
    id: '',
    size: [],
    detail: '',
    deliveryTime: 0,
    effectTime: null,
  };

  rules = {
    // size: [
    //   { required: true, message: '请输入商品规格', trigger: ['blur', 'change'] },
    //   { validator: this.checkSize, trigger: ['blur', 'change'] },
    // ],
    // deliveryTime: [{ required: true, message: '请选择发货时间', trigger: ['blur', 'change'] }],
  };

  size: string[][] = [[], []];

  checkSize(rule: obj, value: string[][], callback: Function) {
    console.log('value: ', value);
    return callback();
  }

  handleAdd() {
    this.$refs.form.validateField('id', (errmsg: string) => {
      const value = this.form.id;
      if (!errmsg) {
        this.form.size.push(value);
        this.form.id = '';
        const row = {
          index: this.form.size.length,
          id: value,
          price: '',
          image: '',
          aging: '',
        };
        this.table = [...this.table, ...new Array(3).fill(row)];
        this.$refs.table.setValue(this.table);
      }
    });
  }

  handleMinus(index: number) {
    this.size.pop();
    this.table.splice(index, 3);
    this.$refs.table.setValue(this.table);
  }

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
      prop: 'id',
      editable: false,
      'show-overflow-tooltip': false,
    },
    {
      label: '图片',
      prop: 'image',
      tag: {
        tagType: 'upload-img',
        attr: { limit: 1, fileSize: 10000, custom: { timeout: 2e6 } },
      },
    },
    {
      label: '商品标题',
      prop: 'title',
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
      prop: 'num2',
      tag: {
        tagType: 'input-number',
        attr: { min: 0, controls: false, class: 'w100' },
      },
    },
  ];

  tableRules = {
    // price: { value: [{ required: true, message: '请输入价格', trigger: 'blur' }] },
    // image: { value: [{ required: true, message: '请上传图片', trigger: ['blur', 'change'] }] },
    // aging: { value: [{ required: true, message: '请输入时效', trigger: 'blur' }] },
  };

  get mergeKeys() {
    return Object.values(_MergeKeys).flat();
  }

  rowspanObj: any = [];

  spanMethod(tableObj: TableColumns): obj {
    return _ObjectSpanMethod(tableObj, this.mergeKeys, this.rowspanObj);
  }

  handleSubmit() {
    //
  }

  handleCancel() {
    this.$router.push('index');
  }

  getDetail() {
    this.$http.post(this.$api.merchant.product.show, { gid: this.id, shopid: '' }).then((res) => {
      console.log('res: ', res);
    });
  }

  mounted() {
    if (this.isDetail) {
      this.getDetail();
    }
  }
}
</script>

<style lang="scss">
  .market-add {
    .sc-edit-table__form .el-form-item {
      margin-top: 10px;
    }
    .el-form-item--mini.el-form-item,
    .el-form-item--small.el-form-item {
      margin-bottom: 10px;
    }
  }
</style>
