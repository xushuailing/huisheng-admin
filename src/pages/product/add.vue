<template>
  <div class="bg-white border-radius-4 p-30">
    <el-form ref="form"
             :model="form"
             :rules="rules"
             size="small">
      <el-form-item label="产品分类："
                    prop="sort">
        <el-select v-model="form.sort"
                   :disabled="isDetail">
          <el-option v-for="item in sorts"
                     :key="item.id"
                     :label="item.name"
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
                    prop="detail">
        <div class="font-info">仅支持尺寸1:1、jpg格式</div>
        <sc-editor v-model="form.detail"
                   :disabled="isDetail"
                   ref="scEditor"
                   class="mt-10">
        </sc-editor>
      </el-form-item>
      <el-form-item label="发货时间："
                    prop="deliveryTime">
        <el-checkbox v-model="form.deliveryTime"
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
import { Component, Vue, Watch } from 'vue-property-decorator';
import EditTable from './components/editTable.vue';
import { ScEditTable } from './@types/sc-edit-table.d';
import { _GetTableSpan, _ObjectSpanMethod, TableColumns, MergeKey } from './utils';
import { obj } from '@/lib/@types/sc-param.d';

interface Form {
  sort: string;
  name: string[];
  size: string[];
  detail: string;
  deliveryTime: number;
}

interface Option {
  name: string;
  id: string;
}

const _MergeKeys: MergeKey = {
  index: ['sort'],
};

@Component({ components: { EditTable } })
export default class ProductAdd extends Vue {
  $refs!: {
    table: any;
    form: any;
  };

  get id() {
    return this.$route.query.id;
  }

  get isDetail() {
    // TODO: params 拿不到
    console.log('!!this.$route: ', this.$route);
    return !!this.$route.query.detail;
  }

  form: Form = {
    sort: '',
    // TODO: 怎么区分当前是虚拟还是实物，虚拟 1 行，实物 2 行
    name: [''],
    size: [],
    detail: '',
    deliveryTime: 0,
  };

  rules = {
    size: [
      { required: true, message: '请输入商品规格', trigger: ['blur', 'change'] },
      { validator: this.checkSize, trigger: ['blur', 'change'] },
    ],
    detail: [{ required: true, message: '请输入商品详情', trigger: ['blur', 'change'] }],
    deliveryTime: [{ required: true, message: '请选择发货时间', trigger: ['blur', 'change'] }],
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
        tagType: 'upload-file',
        attr: { limit: 100, fileSize: 10000, custom: { timeout: 2000000 } },
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
    //
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
