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
                    prop="arry"
                    label-position="top">
        <div>&nbsp;</div>
        <div class="mt-15 pt-20 pl-30 pr-30 pb-20 bg-background-color-base border-radius-4">
          <div v-if="!isDetail">
            <div class="mb-10">添加规格：</div>
            <div v-for="(name, index) in form.arry"
                 :key="index"
                 class="flex">
              <el-form-item :prop="`arry.${index}`"
                            :rules="sizeRules"
                            label-width="auto">
                <el-input v-model="form.arry[index]"
                          :placeholder="`请输入规格${index+1}名称`"></el-input>
              </el-form-item>
              <el-form-item v-for="(item,i) in form.size[index]"
                            :key="i"
                            :prop="`size.${index}.${i}`"
                            :rules="sizeRules"
                            label-width="auto"
                            class="ml-10">
                <el-input v-model="form.size[index][i]"></el-input>
              </el-form-item>
              <div class="ml-10">
                <el-button v-show="form.size[index].length>1"
                           icon="el-icon-minus"
                           class="mr-10"
                           @click="handleMinus(index)"></el-button>
                <el-button icon="el-icon-plus"
                           class="ml-0"
                           @click="handleAdd(index)"></el-button>
              </div>
            </div>
          </div>
          <div>
            <span class="">{{isDetail?'商品规格：':'宝贝销售价格：'}}</span>
            <span v-if="!isDetail"
                  class="font-info">在标题栏中输入或选择内容可以进行筛选和批量填充</span>
          </div>
          <edit-table v-model="table"
                      ref="table"
                      :toolbar="toolbar"
                      :table-config="tableConfig"
                      :form-config="formConfig"
                      :columns="columns"
                      :rules="tableRules"
                      :span-method="spanMethod"></edit-table>
          <el-form-item prop="size"></el-form-item>
        </div>
      </el-form-item>
      <el-form-item label="商品详情："
                    prop="content"
                    label-width="82px">
        <div v-if="!isDetail"
             class="font-info font-12">仅支持尺寸1:1、jpg格式</div>
        <div v-if="isDetail"
             v-html="form.content"
             class="p-10 border-solid border-radius-4"></div>
        <sc-editor v-else
                   v-model="form.content"
                   ref="scEditor"
                   class="mt-10">
        </sc-editor>
      </el-form-item>
      <el-form-item label="发货时间："
                    prop="delivery_type">
        <el-checkbox v-model="form.delivery_type"
                     true-label="1"
                     false-label="0"
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

interface Form<T = string> extends obj {
  pid: string;
  arry: T[];
  size: string[][];
  content: string;
  delivery_type: '0' | '1';
}

interface Option {
  name: string;
  id: string;
}

const _MergeKeys: MergeKey = {
  index: ['pid'],
};

const _GroupBy = require('lodash/groupBy');
const _Pick = require('lodash/pick');

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
          if (key === 'arry') {
            data[key].forEach((item: obj, i: number) => {
              this.form.arry[i] = item.guige_title;
              this.form.size[i] = item.guige_val;
            });
          } else {
            (this.form as obj)[key] = data[key];
          }
        }
      });

      // 移除默认行空图片
      this.$refs.table.setValue([]);

      const table: obj[] = [];
      data.arr.forEach((item: obj) => {
        const rowData = {
          index: item.fid,
          sku_title: item.sku_title,
          title: item.title,
          price: item.price,
          img: item.img,
          day: item.day,
        };
        table.push(rowData);
      });
      this.$refs.table.setValue(table);
    }
  }

  form: Form = {
    pid: '',
    size: [['']],
    arry: [''],
    content: '',
    delivery_type: '0',
  };

  @Watch('form.size', { immediate: true })
  onSizeChange(size: string[][]) {
    const [rows, cols] = size;
    const data = rows.flatMap((sku_title, row) => {
      const columns = (cols || ['']).map((title, col) => {
        const item = cols ? this.table[row + col] : this.table[row];
        return {
          index: row,
          sku_title: cols ? sku_title : undefined,
          title: cols ? title : sku_title,
          price: (item && item.price) || '',
          img: (item && item.img) || '',
          day: (item && item.day) || '',
        };
      });
      return columns;
    });
    this.$nextTick(() => {
      this.$refs.table.setValue(data);
    });
  }

  rules = {
    arry: [{ required: true, trigger: ['blur', 'change'] }],
    size: [
      { required: true, message: '请输入商品规格', trigger: ['blur', 'change'] },
      { validator: this.checkSize, trigger: ['blur', 'change'] },
    ],
    content: [{ required: true, message: '请输入商品详情', trigger: ['blur', 'change'] }],
    delivery_type: [{ required: true, message: '请选择发货时间', trigger: ['blur', 'change'] }],
  };

  sizeRules: obj = this.getSizeRules();

  getSizeRules() {
    return { required: true, message: '请输入规格名称', trigger: 'blur' };
  }

  async checkSize(rule: obj, size: string[][], callback: Function) {
    if (this.table.length) {
      const res = await this.$refs.table.validate();
      if (res) return callback();
      return callback(new Error('请将规格信息补充完整'));
    }
    return callback(new Error('请录入商品规格'));
  }

  handleAdd(index: number) {
    this.form.size[index].push('');
  }

  handleMinus(index: number) {
    this.form.size[index].pop();
  }

  table: obj[] = [];

  @Watch('table')
  onTableChange(data: obj[]) {
    this.rowspanObj = _GetTableSpan(_MergeKeys, data);
  }

  toolbar: ScEditTable.Toolbar = { add: false, delete: false };

  get tableConfig(): ScEditTable.TableConfig {
    return {
      emptyRows: 0,
      showRequired: true,
      inputAlign: 'center',
      validMsg: false,
      disabled: !!this.isDetail,
    };
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
      prop: 'img',
      component: Vue.extend({
        props: ['row', 'col'],
        render(h) {
          const { row, col } = this;
          const icon = h('i', { class: 'el-icon-picture-outline font-20 font-info' });
          const errorStyle = 'product-add__image flex-jc-ac bg-border-color-extra-light';
          const error = h('div', { class: errorStyle, slot: 'error' }, [icon]);
          return h(
            'el-image',
            { class: 'product-add__image', attrs: { src: row[col.prop], fit: 'cover' } },
            [error],
          );
        },
      }),
      tag: {
        tagType: 'upload-img',
        attr: { limit: 1, fileSize: 10000, custom: { timeout: 2e6 } },
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
    img: { value: [{ required: true, message: '请上传图片', trigger: ['blur', 'change'] }] },
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
    this.$refs.form.validate((valid: boolean, object: any) => {
      // console.log('valid: ', valid, object);
      if (valid) {
        this.submit();
      } else {
        this.validateError();
      }
    });
  }

  validateError() {
    this.$message.error('输入内容不符合要求，请修正后提交！');
  }

  submit() {
    const data: obj = this.$utils._Clone(this.form);
    data.arry = data.arry.map((guige_title: string, i: number) => ({
      guige_title,
      guige_val: data.size[i],
    }))[0];

    const arrProps = ['title', 'price', 'img', 'day'];
    if (data.size.length > 1) {
      const size = _GroupBy(this.table, 'sku_title');
      data.arr = Object.entries(size).map(([sku_title, row]: [string, any]) => {
        const sku_val = row.map((item: obj) => _Pick(item, arrProps));
        return { sku_title, sku_val };
      });
    } else {
      data.arr = this.table.map((item) => {
        const value = _Pick(item, arrProps);
        return value;
      });
    }

    delete data.goods_thumb;
    delete data.size;

    const api = this.$api.merchant.product.create.virtual;
    const param = { shopid: _Shopid, ...data };

    this.$http.post(api, param).then((res) => {
      this.$message.success('发布成功');
      setTimeout(() => {
        this.$router.push('list');
      }, 500);
    });
  }
}
</script>
