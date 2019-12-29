<template>
  <div class="bg-white border-radius-4 p-30">
    <el-form ref="form"
             :model="form"
             :rules="isDetail?{}:rules"
             size="small">
      <el-form-item label="产品分类："
                    prop="pid">
        <el-select v-model="form.pid"
                   :disabled="isDetail">
          <el-option v-for="item in sorts"
                     :key="item.id"
                     :label="item.title"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品规格："
                    prop="size"
                    label-position="top">
        <div>&nbsp;</div>
        <div class="pt-20 pl-30 pr-30 pb-30 bg-background-color-base border-radius-4">
          <div v-if="!isDetail">
            <div class="mb-10">添加规格</div>
            <el-form-item v-for="(name, index) in form.name"
                          :key="index"
                          :prop="`name.${index}`"
                          :rules="{required: true, message: '请输入规格名称', trigger: 'blur'}"
                          label-width="auto">
              <el-input v-model="form.name[index]"
                        :placeholder="`请输入规格${form.name.length>1?index+1:''}名称`"></el-input>
              <el-input v-for="(item,i) in size[index]"
                        :key="i"
                        v-model="size[index][i]"
                        class="ml-10"></el-input>
              <el-button icon="el-icon-plus"
                         class="ml-10"
                         @click="handleAdd(index)"></el-button>
              <el-button icon="el-icon-minus"
                         class="ml-10"
                         @click="handleMinus(index)"></el-button>
            </el-form-item>
          </div>
          <div>{{isDetail?'商品规格':'宝贝销售价格'}}</div>
          <edit-table v-model="table"
                      ref="table"
                      :toolbar="toolbar"
                      :table-config="tableConfig"
                      :form-config="formConfig"
                      :columns="columns"
                      :rules="tableRules"
                      :span-method="spanMethod"></edit-table>
        </div>
      </el-form-item>
      <el-form-item label="商品详情："
                    prop="content">
        <div class="font-info">仅支持尺寸1:1、jpg格式</div>
        <el-input v-if="isDetail"
                  :value="form.content"
                  type="textarea"
                  disabled
                  autosize></el-input>
        <sc-editor v-else
                   v-model="form.content"
                   ref="scEditor"
                   class="mt-10">
        </sc-editor>
      </el-form-item>
      <el-form-item label="发货时间："
                    prop="delivery_time">
        <el-checkbox v-model="form.delivery_time"
                     :disabled="isDetail">三天内发货</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   class="pl-30 pr-30"
                   @click="handleSubmit">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Mixins } from 'vue-property-decorator';
import EditTable from '@/components/editTable.vue';
import { _Shopid } from '../config';
import AddMixin from './add-mixin';
import { _GetTableSpan, _ObjectSpanMethod, TableColumns, MergeKey } from '@/utils/handleTableSpan';
import { ScEditTable } from '@/components/@types/sc-edit-table.d';
import { obj } from '@/lib/@types/sc-param.d';

interface Form {
  pid: string;
  name: string[];
  size: string[];
  content: string;
  delivery_time: boolean;
}

interface Option {
  name: string;
  id: string;
}

const _MergeKeys: MergeKey = {
  index: ['pid'],
};

@Component({ components: { EditTable } })
export default class ProductAdd extends Mixins(AddMixin) {
  $refs!: {
    table: any;
    form: any;
  };

  get id() {
    return this.$route.query.id;
  }

  get isDetail() {
    return !!this.$route.query.id;
  }

  form: Form = {
    pid: '',
    name: [''],
    size: [],
    content: '',
    delivery_time: true,
  };

  rules = {
    size: [
      { required: true, message: '请输入商品规格', trigger: ['blur', 'change'] },
      { validator: this.checkSize, trigger: ['blur', 'change'] },
    ],
    content: [{ required: true, message: '请输入商品详情', trigger: ['blur', 'change'] }],
    delivery_time: [{ required: true, message: '请选择发货时间', trigger: ['blur', 'change'] }],
  };

  sorts: Option[] = [];

  size: string[][] = [[], []];

  @Watch('form.size')
  onSizeChange(size: string[][]) {
    const data = size.map((name, row) => {
      const item = this.table[row];
      return {
        index: row,
        name,
        price: (item && item.price) || '',
        image: (item && item.price) || '',
        aging: (item && item.aging) || '',
      };
    });
    this.$refs.table.setValue(data.flat());
  }

  checkSize(rule: obj, value: string[][], callback: Function) {
    console.log('value: ', value);

    return callback();
  }

  handleAdd(index: number) {
    this.$refs.form.validateField(`name.${index}`, (errmsg: string) => {
      if (!errmsg) {
        this.form.size.push(this.form.name[index]);
        this.form.name[index] = '';
      }
    });
  }

  handleMinus(index: number) {
    this.size[index].pop();
  }

  table: obj[] = [];

  @Watch('table')
  onTableChange(data: obj[]) {
    this.rowspanObj = _GetTableSpan(_MergeKeys, data);
  }

  toolbar: ScEditTable.Toolbar = { add: false };

  get tableConfig(): ScEditTable.TableConfig {
    return { emptyRows: 0, showRequired: true, inputAlign: 'center', disabled: !!this.isDetail };
  }

  formConfig: ScEditTable.FormConfig = { attr: { 'status-icon': false } };

  columns: ScEditTable.Columns = [
    {
      label: '规格名称',
      prop: 'name',
      editable: false,
      'show-overflow-tooltip': false,
    },
    {
      label: '价格（元）',
      prop: 'price',
      tag: {
        tagType: 'input-number',
        attr: { min: 0, controls: false, class: 'w100' },
      },
    },
    {
      label: '图片',
      prop: 'image',
      tag: {
        tagType: 'upload-img',
        attr: { limit: 1, fileSize: 10000, custom: { timeout: 2000000 } },
      },
    },
    {
      label: '时效（日）',
      prop: 'aging',
      tag: {
        tagType: 'input-number',
        attr: { min: 0, precision: 0, controls: false, class: 'w100' },
      },
    },
  ];

  tableRules = {
    price: { value: [{ required: true, message: '请输入价格', trigger: 'blur' }] },
    image: { value: [{ required: true, message: '请上传图片', trigger: ['blur', 'change'] }] },
    aging: { value: [{ required: true, message: '请输入时效', trigger: 'blur' }] },
  };

  get mergeKeys() {
    return Object.values(_MergeKeys).flat();
  }

  rowspanObj: any = [];

  spanMethod(tableObj: TableColumns): obj {
    return _ObjectSpanMethod(tableObj, this.mergeKeys, this.rowspanObj);
  }

  handleSubmit() {
    this.$refs.form.validate((valid: boolean) => {
      if (valid) {
        this.$refs.table.validate().then((res: boolean) => {
          if (res) {
            this.submit();
          }
        });
      } else {
        this.validateError();
      }
    });
  }

  validateError() {
    this.$message.error('输入内容不符合要求，请修正后提交！');
  }

  submit() {
    console.log('%c提交', 'color:#fff;background:#40b883;border-radius:5px;padding:2px 5px;');
    const api = this.$api.merchant.product.update;
    const param = { gid: this.id, shopid: _Shopid };
    // this.$http.post(api, param).then((res) => {
    //   console.log('res: ', res);
    // });
  }

  async getDetail() {
    const api = this.$api.merchant.product.show;
    const res = await this.$http.get(api, { gid: this.id, shopid: _Shopid });
    const data = res.data || {};
    Object.keys(this.form).forEach((key) => {
      if (key in data) {
        (this.form as obj)[key] = data[key];
      }
    });
  }

  async getGoodsType() {
    const api = this.$api.merchant.product.goodsType;
    const res = await this.$http.get(api, { shopid: _Shopid });
    this.sorts = res.data || [];
  }

  mounted() {
    this.getGoodsType();
    this.getDetail();
  }
}
</script>
