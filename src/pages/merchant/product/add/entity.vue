<template>
  <div class="bg-white border-radius-4 p-30">
    <el-form ref="form"
             :model="form"
             :rules="rules"
             label-width="110px"
             size="small">
      <el-form-item label="商品分类："
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
      <el-form-item label="商品名称："
                    prop="title">
        <el-input v-model="form.title"
                  maxlength="24"
                  show-word-limit
                  placeholder="请输入名称"
                  style="width:50%"
                  :disabled="isDetail"></el-input>
      </el-form-item>
      <el-form-item label="商品参数："
                    prop="parameter">
        <el-input v-model="form.parameter"
                  placeholder="请输入商品参数"
                  style="width:50%"
                  :disabled="isDetail"></el-input>
      </el-form-item>
      <el-form-item label="商品图片："
                    prop="image"
                    label-position="top">
        <div>宝贝图片尺寸：800*800px，主图大小不能超过800k</div>
        <div class="flex">
          <div v-for="(image,i) in form.image"
               :key="i"
               class="mr-10">
            <sc-upload v-model="form.image[i]"
                       :limit="1"
                       :class="['inline-block',!i?'main-image flex-column':'']"
                       :disabled="isDetail"></sc-upload>
            <div v-if="!i"
                 class="font-12 text-c">商品主图</div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="主图视频比例："
                    prop="video_ratio">
        <el-radio-group v-model="form.video_ratio"
                        :disabled="isDetail">
          <el-radio label="1">1:1或16:9</el-radio>
          <el-radio label="2">3:4</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="主图视频："
                    prop="video"
                    label-width="110px">
        <div class="flex">
          <upload-video v-model="form.video"
                        :limit="1"
                        :disabled="isDetail"
                        class="mt-5"></upload-video>
          <ol class="flex-1 m-0 pl-30 font-info"
              style="list-style-type: decimal;">
            <li>尺寸：此处可使用1:1或16:9比例视频</li>
            <li>时长：≤60s，建议30秒以内短视频可优先展示</li>
            <li>内容：突出商品1-2核心卖点，不建议电子相册的图片翻页视频</li>
          </ol>
        </div>
      </el-form-item>
      <el-form-item label="商品规格："
                    prop="is_specifications"
                    label-position="top"
                    class="mb-0">
        <el-radio-group v-model="form.is_specifications"
                        :disabled="isDetail">
          <el-radio :label="0">需要规格</el-radio>
          <el-radio :label="1">不需要规格</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <div v-show="!form.is_specifications"
             class="mt-10 pt-20 pl-30 pr-30 pb-20 bg-background-color-base border-radius-4">
          <div v-if="!isDetail">
            <div class="mb-10">添加规格：</div>
            <div v-for="(name, index) in form.arry"
                 :key="index"
                 class="flex">
              <el-form-item :prop="`arry.${index}`"
                            :rules="sizeFirstRules"
                            label-width="auto">
                <el-input v-model="form.arry[index]"
                          :placeholder="`请输入规格${index+1}名称`"></el-input>
              </el-form-item>
              <el-form-item v-for="(item,i) in form.size[index]"
                            :key="i"
                            :prop="`size.${index}.${i}`"
                            :rules="sizeSecondRules"
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
            <span>{{isDetail?'':'宝贝销售价格：'}}</span>
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
                      :span-method="spanMethod"
                      @emitDeleteComplete="handleMinus"></edit-table>
          <el-form-item prop="size"></el-form-item>
        </div>
      </el-form-item>
      <el-form-item label="商品详情："
                    prop="content">
        <div v-if="!isDetail"
             class="font-info">仅支持尺寸1:1、jpg格式</div>
        <div v-if="isDetail"
             v-html="form.content"
             class="p-20 border-solid border-radius-4"></div>
        <sc-editor v-else
                   v-model="form.content"
                   ref="scEditor"
                   class="mt-10">
        </sc-editor>
      </el-form-item>
      <el-form-item label="售后信息设置："
                    prop="after_sale"
                    label-position="top">
        <div>&nbsp;</div>
        <span class="mr-20"
              style="margin-left:-80px">售后服务</span>
        <el-checkbox v-model="form.after_sale"
                     :true-label="1"
                     :false-label="0"
                     :disabled="isDetail">7天无理由退货</el-checkbox>
      </el-form-item>
      <el-form-item label="发货时间："
                    prop="delivery_type">
        <el-radio-group v-model="form.delivery_type"
                        :disabled="isDetail">
          <el-radio :label="0">三天内发货</el-radio>
          <el-radio :label="1">预订单</el-radio>
        </el-radio-group>
        <div v-show="form.delivery_type"
             class="bg-info-lighter border-radius-8 pt-20 pl-20 pr-20 pb-5">
          <el-form-item label="填写发货时间："
                        prop="delivery_time">
            <el-date-picker v-model="form.delivery_time"
                            placeholder="请选择发货时间"
                            :disabled="isDetail"></el-date-picker>
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item v-if="!isDetail">
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
import { ScEditTable } from '@/components/@types/sc-edit-table.d';
import { _GetTableSpan, _ObjectSpanMethod, TableColumns, MergeKey } from '@/utils/handleTableSpan';
import { obj } from '@/lib/@types/sc-param.d';
import { _Shopid } from '../../config';
import { ScForm } from '@/lib/@types/sc-form.d';
import UploadVideo from './upload-video.vue';

interface Form<T = string> extends obj {
  pid: string;
  arry: T[];
  size: string[][];
}

interface Size {
  guige_title: string;
  guige_val: string[];
}

interface Option {
  name: string;
  id: string;
}

const _MergeKeys: MergeKey = {
  index: ['sku_title', 'handler'],
};

const _GroupBy = require('lodash/groupBy');
const _Pick = require('lodash/pick');

@Component({ components: { EditTable, UploadVideo } })
export default class Entity extends Vue {
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
            console.log('this.form.arry: ', this.form.arry);
          } else if (key === 'image') {
            this.form.image[0] = data[key];
          } else if (key === 'goods_thumb' && data[key]) {
            data[key].forEach((url: string, i: number) => {
              this.form.image[i + 1] = url;
            });
          } else {
            (this.form as obj)[key] = data[key];
          }
        }
      });

      const table: obj[] = [];
      data.arr.forEach((item: obj) => {
        item.sku_val &&
          item.sku_val.forEach((row: obj) => {
            const rowData = {
              index: item.fid,
              sku_title: item.sku_title,
              title: row.title,
              price: row.price,
              img: row.img,
            };
            table.push(rowData);
          });
      });
      this.$nextTick(() => {
        this.$refs.table.setValue(table);
      });
    }
  }

  form = {
    pid: '',
    title: '',
    parameter: '',
    image: ['', '', '', '', ''],
    goods_thumb: [],
    video_ratio: '1',
    video: [],
    is_specifications: 0,
    arry: ['', ''],
    size: [[''], ['']],
    content: '',
    after_sale: 0,
    delivery_type: 0,
    delivery_time: '',
  };

  rules = {
    pid: [{ required: true, message: '请选择商品分类', trigger: ['blur', 'change'] }],
    title: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
    image: [
      { required: true, message: '请上传商品图片', trigger: ['blur', 'change'] },
      {
        validator: (rules: obj, value: string[], cb: Function) => {
          if (value[0]) cb();
          cb(new Error('上传商品主图'));
        },
        trigger: ['blur', 'change'],
      },
    ],
    is_specifications: [
      { required: true, message: '请选择是否需要规格', trigger: ['blur', 'change'] },
    ],
    size: [{ validator: this.checkSize, trigger: ['blur', 'change'] }],
    content: [{ required: true, message: '请输入商品详情', trigger: ['blur', 'change'] }],
    delivery_type: [{ required: true, message: '请选择发货时间', trigger: ['blur', 'change'] }],
    delivery_time: [{ validator: this.checkTime, trigger: ['blur', 'change'] }],
  };

  @Watch('form.size', { immediate: true })
  onSizeChange(size: string[][]) {
    const [rows, cols] = size;
    const data = rows.map((sku_title, row) => {
      const columns = cols.map((title, col) => {
        const item = this.table[row + col];
        return {
          index: row,
          sku_title,
          title,
          price: (item && item.price) || '',
          img: (item && item.price) || '',
        };
      });
      return columns;
    });
    this.$nextTick(() => {
      this.$refs.table.setValue(data.flat());
    });
  }

  sizeFirstRules: obj = this.getRules('first');

  sizeSecondRules: obj = this.getRules('second');

  getRules(num: 'first' | 'second') {
    if (num === 'first') {
      return {
        validator: (rules: obj, value: string[], cb: Function) => {
          if (value[0]) cb();
          cb(new Error('请输入规格名称'));
        },
        trigger: ['blur', 'change'],
      };
    }
    return { required: true, message: '请输入规格名称', trigger: ['blur', 'change'] };
  }

  async checkSize(rule: obj, value: any, callback: Function) {
    if (!this.form.is_specifications) {
      if (this.table.length) {
        const res = await this.$refs.table.validate();
        if (res) return callback();
        return callback(new Error('请将规格信息补充完整'));
      }
      return callback(new Error('请录入商品规格'));
    }
    return callback();
  }

  checkTime(rule: obj, value: string, callback: Function) {
    if (this.form.delivery_type && !value) {
      return callback(new Error('请输入发货时间'));
    }
    return callback();
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

  toolbar: ScEditTable.Toolbar = { title: '商品规格', add: false, delete: false };

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
      prop: 'sku_title',
      editable: false,
      'show-overflow-tooltip': false,
    },
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
        attr: { limit: 1, fileSize: 10000, custom: { timeout: 2000000 } },
      },
    },
  ];

  tableRules = {
    price: { value: [{ required: true, message: '请输入价格', trigger: 'blur' }] },
    img: { value: [{ required: true, message: '请上传图片', trigger: ['blur', 'change'] }] },
  };

  get mergeKeys() {
    return Object.values(_MergeKeys).flat();
  }

  rowspanObj: any = [];

  spanMethod(tableObj: TableColumns): obj {
    return _ObjectSpanMethod(tableObj, this.mergeKeys, this.rowspanObj);
  }

  async handleSubmit() {
    if (this.form.is_specifications) {
      this.sizeFirstRules = {};
      this.sizeSecondRules = {};
    }
    await this.$nextTick();
    this.$refs.form.validate((valid: boolean, object: any) => {
      if (valid) {
        this.submit();
      } else {
        this.validateError();
      }

      this.sizeFirstRules = this.getRules('first');
      this.sizeSecondRules = this.getRules('second');
    });
  }

  validateError() {
    this.$message.error('输入内容不符合要求，请修正后提交！');
  }

  submit() {
    const data: obj = this.$utils._Clone(this.form);
    data.img1 = data.image[1];
    data.img2 = data.image[2];
    data.img3 = data.image[3];
    data.img4 = data.image[4];
    data.image = data.image[0];
    data.video = data.video[0];

    if (data.is_specifications) {
      data.arry = [];
      data.arr = [];
    } else {
      data.arry = data.arry.map((guige_title: string, i: number) => ({
        guige_title,
        guige_val: data.size[i],
      }));
      const arrProps = ['title', 'price', 'img'];
      const size = _GroupBy(this.table, 'sku_title');
      data.arr = Object.entries(size).map(([sku_title, row]: [string, any]) => {
        const sku_val = row.map((item: obj) => _Pick(item, arrProps));
        return { sku_title, sku_val };
      });
    }

    delete data.goods_thumb;
    delete data.size;

    const api = this.$api.merchant.product.create.entity;
    const param = { shopid: _Shopid, ...data };

    console.log(
      '%c提交',
      'color:#fff;background:#40b883;border-radius:5px;padding:2px 5px;',
      param,
    );

    this.$http.post(api, param).then((res) => {
      console.log('res: ', res);
      this.$message.success('发布成功');
      setTimeout(() => {
        this.$router.push('list');
      }, 500);
    });
  }
}
</script>
