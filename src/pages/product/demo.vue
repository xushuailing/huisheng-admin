<template>
  <div class="DynamicTable p-30" style="min-height:2000px">
    <el-form ref="form"
             :model="form"
             label-width="0"
             class="pl-30 pr-30">
      <div class="mb-10">添加规格</div>
      <el-form-item v-for="(name, index) in form.name"
                    :key="index"
                    :prop="`name.${index}`"
                    :rules="{required: true, message: '请输入规格名称', trigger: 'blur'}">
        <el-input v-model="form.name[index]"
                  :placeholder="`请输入规格${index+1}名称`"></el-input>
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
      <div>宝贝销售价格</div>
      <edit-table v-model="table"
                  ref="table"
                  :toolbar="toolbar"
                  :table-config="tableConfig"
                  :form-config="formConfig"
                  :columns="columns"
                  :rules="rules"
                  :span-method="spanMethod"></edit-table>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import EditTable from './components/editTable.vue';
import { ScEditTable } from './@types/sc-edit-table.d';
import { _GetTableSpan, _ObjectSpanMethod, TableColumns, MergeKey } from './utils';
import { obj } from '@/lib/@types/sc-param.d';

const _MergeKeys: MergeKey = {
  index: ['sort'],
};

@Component({ components: { EditTable } })
export default class DynamicTable extends Vue {
  $refs!: {
    table: any;
    form: any;
  };

  form = {
    name: ['', ''],
  };

  size: string[][] = [[], []];

  @Watch('size')
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

  handleAdd(index: number) {
    this.$refs.form.validateField(`name.${index}`, (errmsg: string) => {
      if (!errmsg) {
        this.size[index].push(this.form.name[index]);
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

  tableConfig: ScEditTable.TableConfig = { emptyRows: 0, showRequired: true };

  formConfig: ScEditTable.FormConfig = { attr: { 'status-icon': false } };

  columns: ScEditTable.Columns = [
    {
      label: '规格名称',
      prop: 'sort',
      editable: false,
    },
    {
      label: '规格名称',
      prop: 'name',
      editable: false,
      'show-overflow-tooltip': false,
    },
    {
      label: '价格',
      prop: 'price',
      tag: {
        tagType: 'input-number',
        attr: { precision: 2, controls: false, class: 'w100' },
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
  ];

  rules = {
    price: { value: [{ required: true, message: '请输入产业/营收', trigger: 'blur' }] },
    image: { value: [{ required: true, message: '请输入产业/营收', trigger: 'blur' }] },
  };

  get mergeKeys() {
    return Object.values(_MergeKeys).flat();
  }

  rowspanObj: any = [];

  spanMethod(tableObj: TableColumns): obj {
    return _ObjectSpanMethod(tableObj, this.mergeKeys, this.rowspanObj);
  }
}
</script>
