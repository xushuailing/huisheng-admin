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
          <sc-upload v-model="form.video"
                     :limit="1"
                     :fileSize=".78"
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
                    prop="is_specifications"
                    label-position="top">
        <el-radio-group v-model="form.is_specifications"
                        :disabled="isDetail">
          <el-radio :label="true">需要规格</el-radio>
          <el-radio :label="false">不需要规格</el-radio>
        </el-radio-group>
        <div v-show="form.is_specifications"
             class="mt-10 pt-20 pl-30 pr-30 pb-30 bg-background-color-base border-radius-4">
          <div v-if="!isDetail">
            <div class="mb-10">添加规格：</div>
            <el-form-item v-for="(name, index) in form.name"
                          :key="index"
                          :prop="`name.${index}`"
                          :rules="sizeRules"
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
        <!-- <pre v-else
             v-html="form.content"
             class="border-solid border-radius-4 p-15"></pre> -->
      </el-form-item>
      <el-form-item label="售后信息设置："
                    prop="after_sale"
                    label-position="top">
        <div>&nbsp;</div>
        <span class="mr-20"
              style="margin-left:-80px">售后服务</span>
        <el-checkbox v-model="form.after_sale"
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
import { Component, Vue, Watch, Mixins } from 'vue-property-decorator';
import EditTable from '@/components/editTable.vue';
import { ScEditTable } from '@/components/@types/sc-edit-table.d';
import { _GetTableSpan, _ObjectSpanMethod, TableColumns, MergeKey } from '@/utils/handleTableSpan';
import { obj } from '@/lib/@types/sc-param.d';
import AddMixin from './add-mixin';
import { _Shopid } from '../config';
import { ScForm } from '../../../lib/@types/sc-form';

interface Form extends obj {
  pid: string;
  name: string[];
  size: string[][];
}

const _MergeKeys: MergeKey = {
  index: ['pid', 'handler'],
};

@Component({ components: { EditTable } })
export default class ProductAdd extends Mixins(AddMixin) {
  $refs!: {
    table: any;
    form: any;
  };

  userInfo = this.$utils._Storage.get('user_info');

  form: Form = {
    pid: '',
    title: '',
    image: ['', '', '', '', ''],
    video_ratio: '1',
    video: '',
    is_specifications: true,
    name: ['', ''],
    size: [[], []],
    content: '',
    isThreeDays: false,
    deliveryTime: '',
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
      { required: true, message: '请输入商品规格', trigger: ['blur', 'change'] },
      { validator: this.checkSize, trigger: ['blur', 'change'] },
    ],
    content: [{ required: true, message: '请输入商品详情', trigger: ['blur', 'change'] }],
    isThreeDays: [{ required: true, message: '请选择发货时间', trigger: ['blur', 'change'] }],
  };

  @Watch('form.size')
  onSizeChange(size: string[][]) {
    const [rows, cols] = size;
    const data = rows.map((pid, row) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      cols.map((name, col) => {
        const item = this.table[row + col];
        return {
          index: row,
          pid,
          name,
          price: (item && item.price) || '',
          image: (item && item.price) || '',
        };
      }));
    this.$refs.table.setValue(data.flat());
  }

  sizeRules = this.getSizeRules();

  getSizeRules() {
    return [
      {
        validator: (rules: obj, value: string[], cb: Function) => {
          if (value[0]) cb();
          cb(new Error('请输入规格名称'));
        },
        trigger: ['blur', 'change'],
      },
    ];
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
      prop: 'pid',
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

  async handleSubmit() {
    console.log('submit: ');
    this.sizeRules = [];
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
    const data = this.$utils._Clone(this.form);
    data.img1 = data.image[1];
    data.img2 = data.image[2];
    data.img3 = data.image[3];
    data.img4 = data.image[4];
    data.image = data.image[0];

    const api = this.$api.merchant.product.update;
    const param = { shopid: _Shopid, ...data };
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
