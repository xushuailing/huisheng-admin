<template>
  <div class="product-add bg-white border-radius-4 p-30">
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
                          :rules="sizeRules"
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
        <div v-if="!isDetail"
             class="font-info">仅支持尺寸1:1、jpg格式</div>
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
                    prop="delivery_type">
        <el-checkbox v-model="form.delivery_type"
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
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import EditTable from '@/components/editTable.vue';
import { _Shopid } from '../../config';
import { _GetTableSpan, _ObjectSpanMethod, TableColumns, MergeKey } from '@/utils/handleTableSpan';
import { ScEditTable } from '@/components/@types/sc-edit-table.d';
import { obj } from '@/lib/@types/sc-param.d';

interface Form {
  pid: string;
  name: string[];
  size: string[];
  content: string;
  delivery_type: 0 | 1;
}

interface Option {
  name: string;
  id: string;
}

const _MergeKeys: MergeKey = {
  index: ['pid'],
};

@Component({ components: { EditTable } })
export default class Virtual extends Vue {
  $refs!: {
    table: any;
    form: any;
  };

  @Prop([Number, String]) id!: number | string;

  @Prop({ type: Boolean, default: false }) isDetail!: boolean;

  @Prop(Array) sorts!: Option[];

  @Prop(Object) data!: obj | null;

  @Watch('data')
  onDataChange(data: obj | null) {
    if (data) {
      Object.keys(data).forEach((key) => {
        if (key in this.form) {
          (this.form as obj)[key] = data[key];
        }
      });
    }
  }

  form: Form = {
    pid: '',
    name: [''],
    size: [],
    content: '',
    delivery_type: 0,
  };

  rules = {
    size: [
      { required: true, message: '请输入商品规格', trigger: ['blur', 'change'] },
      { validator: this.checkSize, trigger: ['blur', 'change'] },
    ],
    content: [{ required: true, message: '请输入商品详情', trigger: ['blur', 'change'] }],
    delivery_type: [{ required: true, message: '请选择发货时间', trigger: ['blur', 'change'] }],
  };

  size: string[][] = [[], []];

  @Watch('form.size')
  onSizeChange(size: string[][]) {
    const data = size.map((title, row) => {
      const item = this.table[row];
      return {
        index: row,
        title,
        price: (item && item.price) || '',
        image: (item && item.image) || '',
        day: (item && item.day) || '',
      };
    });
    this.$refs.table.setValue(data.flat());
  }

  sizeRules: obj = this.getSizeRules();

  getSizeRules() {
    return { required: true, message: '请输入规格名称', trigger: 'blur' };
  }

  checkSize(rule: obj, hasSize: string[][], callback: Function) {
    if (hasSize) {
      if (this.table.length) {
        this.$refs.table.validate().then((res: boolean) => {
          if (res) return callback();
          return callback(new Error('请将规格信息补充完整'));
        });
      } else {
        return callback(new Error('请录入商品规格'));
      }
    }
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
      prop: 'title',
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
      prop: 'day',
      tag: {
        tagType: 'input-number',
        attr: { min: 0, precision: 0, controls: false, class: 'w100' },
      },
    },
  ];

  tableRules = {
    price: { value: [{ required: true, message: '请输入价格', trigger: 'blur' }] },
    image: { value: [{ required: true, message: '请上传图片', trigger: ['blur', 'change'] }] },
    day: { value: [{ required: true, message: '请输入时效', trigger: 'blur' }] },
  };

  get mergeKeys() {
    return Object.values(_MergeKeys).flat();
  }

  rowspanObj: any = [];

  spanMethod(tableObj: TableColumns): obj {
    return _ObjectSpanMethod(tableObj, this.mergeKeys, this.rowspanObj);
  }

  async handleSubmit() {
    this.sizeRules = {};
    await this.$nextTick();
    this.$refs.form.validate((valid: boolean, object: any) => {
      console.log('valid: ', valid, object);
      if (valid) {
        this.submit();
      } else {
        this.sizeRules = this.getSizeRules();
        this.validateError();
      }
    });
  }

  validateError() {
    this.$message.error('输入内容不符合要求，请修正后提交！');
  }

  submit() {
    const api = this.$api.merchant.product.update;
    const param = { shopid: _Shopid, ...this.form };
    console.log(
      '%c提交',
      'color:#fff;background:#40b883;border-radius:5px;padding:2px 5px;',
      param,
    );
    // this.$http.post(api, param).then((res) => {
    //   console.log('res: ', res);
    // });
  }
}
</script>
