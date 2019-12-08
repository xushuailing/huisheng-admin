<template>
  <div class="bg-white border-radius-4 p-30">
    <el-form ref="form"
             :model="form"
             :rules="rules"
             size="small">
      <el-form-item label="商品分类："
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
      <el-form-item label="商品名称："
                    prop="title">
        <el-input v-model="form.title"
                  maxlength="24"
                  show-word-limit
                  placeholder="请输入名称"
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
                       class="inline-block"
                       :disabled="isDetail"></sc-upload>
            <div v-if="!i"
                 class="font-12 text-c">商品主图</div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="主图视频比例："
                    prop="rate">
        <el-radio-group v-model="form.rate"
                        :disabled="isDetail">
          <el-radio label="1">1:1或16:9</el-radio>
          <el-radio label="0">3:4</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="主图视频："
                    prop="video"
                    label-width="110px">
        <div class="flex">
          <sc-upload v-model="form.video"
                     :limit="5"
                     :disabled="isDetail">
          </sc-upload>
          <ol class="flex-1 m-0 ml-10 font-info"
              style="list-style-type: decimal;">
            <li>尺寸：此处可使用1:1或16:9比例视频</li>
            <li>时长：≤60s，建议30秒以内短视频可优先展示</li>
            <li>内容：突出商品1-2核心卖点，不建议电子相册的图片翻页视频</li>
          </ol>
        </div>
      </el-form-item>
      <el-form-item label="商品规格："
                    prop="hasSize"
                    label-position="top">
        <el-radio-group v-model="form.hasSize"
                        :disabled="isDetail">
          <el-radio :label="true">需要规格</el-radio>
          <el-radio :label="false">不需要规格</el-radio>
        </el-radio-group>
        <div v-show="form.hasSize"
             class="mt-10 pt-20 pl-30 pr-30 pb-30 bg-background-color-base border-radius-4">
          <div v-if="!isDetail">
            <div class="mb-10">添加规格：</div>
            <el-form-item v-for="(name, index) in form.name"
                          :key="index"
                          :prop="`name.${index}`"
                          :rules="{required: true, message: '请输入规格名称', trigger: 'blur'}"
                          label-width="auto">
              <el-input v-model="form.name[index]"
                        :placeholder="`请输入规格${index+1}名称`"></el-input>
              <el-input v-for="(item,i) in form.size[index]"
                        :key="i"
                        v-model="form.size[index][i]"
                        class="ml-10"></el-input>
              <el-button icon="el-icon-plus"
                         class="ml-10"
                         @click="handleAdd(index)"></el-button>
            </el-form-item>
          </div>
          <div>
            <span>{{isDetail?'商品规格':'宝贝销售价格：'}}</span>
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
        </div>
      </el-form-item>
      <el-form-item label="商品详情："
                    prop="detail">
        <div class="font-info">{{!isDetail?'仅支持尺寸1:1、jpg格式':'&nbsp;'}}</div>
        <sc-editor v-if="!isDetail"
                   v-model="form.detail"
                   ref="scEditor"
                   class="mt-10">
        </sc-editor>
        <pre v-else
             v-html="form.detail"
             class="border-solid border-radius-4 p-15"></pre>
      </el-form-item>
      <el-form-item label="售后信息设置："
                    prop="afterSales"
                    label-position="top">
        <div>&nbsp;</div>
        <span class="ml-30 mr-20">售后服务</span>
        <el-checkbox v-model="form.afterSales"
                     :label="true"
                     :disabled="isDetail">7天无理由退货</el-checkbox>
      </el-form-item>
      <el-form-item label="发货时间："
                    prop="isThreeDays">
        <el-radio-group v-model="form.isThreeDays"
                        :disabled="isDetail">
          <el-radio :label="true">三天内发货</el-radio>
          <el-radio :label="false">预订单</el-radio>
        </el-radio-group>
        <div v-show="!form.isThreeDays"
             class="bg-info-lighter border-radius-8 pt-20 pl-20 pr-20 pb-5">
          <el-form-item label="填写发货时间："
                        prop="deliveryTime">
            <el-input v-model="form.deliveryTime"
                      :disabled="isDetail"></el-input>
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
import { Component, Vue, Watch } from 'vue-property-decorator';
import EditTable from '@/components/editTable.vue';
import { ScEditTable } from '@/components/@types/sc-edit-table.d';
import { _GetTableSpan, _ObjectSpanMethod, TableColumns, MergeKey } from '@/utils/handleTableSpan';
import { obj } from '@/lib/@types/sc-param.d';
import { _Shopid } from '../config';

const _toPairs = require('lodash/toPairs');

interface Form extends obj {
  sort: string;
  name: string[];
  size: string[][];
}

interface Option {
  name: string;
  id: string;
}

const _MergeKeys: MergeKey = {
  index: ['sort', 'handler'],
};

@Component({ components: { EditTable } })
export default class ProductAdd extends Vue {
  $refs!: {
    table: any;
    form: any;
  };

  userInfo = this.$utils._Storage.get('user_info');

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
    title: '',
    image: ['', '', '', '', ''],
    rate: '',
    video: '',
    hasSize: true,
    // TODO: 怎么区分当前是虚拟还是实物，虚拟 1 行，实物 2 行
    name: ['', ''],
    size: [[], []],
    detail: '',
    isThreeDays: false,
    deliveryTime: '',
  };

  rules = {
    sort: [{ required: true, message: '请选择商品分类', trigger: ['blur', 'change'] }],
    title: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
    image: [{ required: true, message: '请上传商品图片', trigger: ['blur', 'change'] }],
    hasSize: [
      { required: true, message: '请输入商品规格', trigger: ['blur', 'change'] },
      { validator: this.checkSize, trigger: ['blur', 'change'] },
    ],
    detail: [{ required: true, message: '请输入商品详情', trigger: ['blur', 'change'] }],
    isThreeDays: [{ required: true, message: '请选择发货时间', trigger: ['blur', 'change'] }],
  };

  sorts: Option[] = [];

  @Watch('form.size')
  onSizeChange(size: string[][]) {
    const [rows, cols] = size;
    const data = rows.map((sort, row) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      cols.map((name, col) => {
        const item = this.table[row + col];
        return {
          index: row,
          sort,
          name,
          price: (item && item.price) || '',
          image: (item && item.price) || '',
        };
      }));
    this.$refs.table.setValue(data.flat());
  }

  checkSize(rule: obj, value: string[][], callback: Function) {
    console.log('value: ', value);

    return callback();
  }

  handleAdd(index: number) {
    this.$refs.form.validateField(`name.${index}`, (errmsg: string) => {
      if (!errmsg) {
        console.log('%cadd', 'color:#fff;background:#40b883;border-radius:5px;padding:2px 5px;');
        this.form.size[index].push(this.form.name[index]);
        this.form.name[index] = '';
      }
    });
  }

  handleMinus(index: number) {
    const [rows] = this.form.size;
    rows.splice(index, 1);
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
      label: '规格名称',
      prop: 'sort',
      editable: false,
      'show-overflow-tooltip': false,
    },
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
  ];

  tableRules = {
    price: { value: [{ required: true, message: '请输入价格', trigger: 'blur' }] },
    image: { value: [{ required: true, message: '请上传图片', trigger: ['blur', 'change'] }] },
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
    const loading = this.$utils._Loading.show();
    const api = this.$api.merchant.product.show;
    const param = { gid: this.id, shopid: _Shopid };

    try {
      const res = await this.$http.post(api, param);
      console.log('res: ', res);
      if (res.status) {
        const data = res.data;
        _toPairs(this.form).forEach(([k, v]: any[]) => {
          v = data[k];
        });
      } else {
        this.$message.error('获取数据失败');
      }
    } catch (error) {
      this.$utils._ResponseError(error);
    }
    loading.close();
  }

  mounted() {
    if (this.isDetail) {
      this.getDetail();
    }
  }
}
</script>
