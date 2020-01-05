<template>
  <div class="sc-edit-table">
    <!-- 工具栏 -->
    <div class="flex-jsb flex-ac mb-10">
      <div v-bind="toolbarBind.title">{{toolbar.title}}</div>
      <div class="toolbar-btns">
        <slot name="toolbar-btn">
          <el-button v-if="toolbar.reset"
                     v-bind="toolbarBind.icon"
                     :icon="toolbar.useIcon ? 'iconfont icon-huifu' :''"
                     @click="handleReset">
            <span v-if="!toolbar.useIcon">重置</span>
          </el-button>
          <el-button v-if="toolbar.add !== false"
                     v-bind="toolbarBind.icon"
                     :icon="toolbar.useIcon ? 'el-icon-plus' :''"
                     @click="handleAdd">
            <span v-if="!toolbar.useIcon">新增</span>
          </el-button>
          <el-button v-if="toolbar.edit"
                     v-bind="toolbarBind.icon"
                     :icon="toolbar.useIcon ? 'el-icon-edit' :''"
                     @click="handleEdit">
            <span v-if="!toolbar.useIcon">编辑</span>
          </el-button>
          <sc-exports v-if="toolbar.export"
                      class="ml-10"
                      :api='toolbar.export.api'
                      :limit="toolbar.export.limit"
                      :columns="toolbar.export.columns"
                      :params="toolbar.export.params"
                      :selectTableData="toolbar.export.selectData"
                      :queryTable="toolbar.export.queryTable"
                      :totalElements="tableData.length">
          </sc-exports>
          <!-- <el-button size="small"
                 @click="removeEmpty()">移除空行</el-button> -->
          <slot name="toolbar-add-btn"></slot>
        </slot>
      </div>
    </div>
    <slot name="top"></slot>
    <!-- 表格+表单 -->
    <el-form :model="editForm"
             v-bind="formBind"
             ref="editForm"
             class="sc-edit-table__form">
      <el-table ref="editTable"
                :data="tableData"
                v-bind="tableBind"
                v-on="$listeners">
        <!-- 表格特殊列 -->
        <template v-for="tp in columnsSpecial">
          <el-table-column v-if="tp.type === 'expand'"
                           v-bind="tp.props"
                           :type="tp.type"
                           :key="tp.type">
            <template slot-scope="props">
              <slot name="expand"
                    v-bind="props"></slot>
            </template>
          </el-table-column>
          <el-table-column v-else-if="tp.type === 'index'"
                           :key="tp.type"
                           :type="tp.type"
                           v-bind="tp.props"></el-table-column>
          <el-table-column v-else-if="tp.type === 'selection'"
                           :key="tp.type"
                           :type="tp.type"
                           v-bind="tp.props"></el-table-column>
        </template>
        <!-- 表格内容列 -->
        <template v-for="col in columnsRender">
          <el-table-column :key="col.prop"
                           v-if="!col.isHide"
                           v-bind="getColBind(col)">
            <template slot-scope="{ row, column, $index }">
              <el-form-item v-if="isEditable(col)"
                            :prop="`data.${$index}.${col.prop}`"
                            :rules="rules[col.prop] && rules[col.prop].value">
                <sc-form-tag ref="scFormTag"
                             :class="inputAlign"
                             :data="getFormTagData(col, $index)"
                             :form="data[$index][col.prop]">
                </sc-form-tag>
              </el-form-item>
              <div v-else
                   class="p-10">
                <component :is="col.component"
                           v-on="col.listeners"
                           v-bind="getCptBind(row, column, col)"></component>
              </div>
            </template>
          </el-table-column>
        </template>
        <!-- 表格操作按钮 -->
        <el-table-column v-if="toolbar.add !== false || toolbar.delete !== false"
                         align="center"
                         prop="handler"
                         label="操作"
                         width="100">
          <template slot-scope="scope">
            <el-button v-if="toolbar.useIcon"
                       size="mini"
                       icon="el-icon-delete"
                       @click.native.prevent="handleDelete(scope.$index)"></el-button>
            <el-button v-else
                       type="text"
                       size="default"
                       @click.native.prevent="handleDelete(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <!-- 显示全部/部分 -->
    <div v-if="tableData.length < editForm.data.length"
         class="sc-edit-table__total w100 border-solid text-c sc-font-text-placeholder p-10"
         @click="toggleTotal">
      <i :class="[isTotal?'el-icon-caret-top':'el-icon-caret-bottom', 'mr-5']"></i>
      <span>{{isTotal? '显示部分' : '显示全部'}}</span>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { ElForm } from 'element-ui/types/form.d';
import { COLUMN_PROPS, TYPES, BOOLEAN_KEYS } from '@/lib/config/table';
import { obj } from '@/lib/@types/sc-param.d';
import ScTags from '@/lib/@types/sc-form-tags.d';
import { ScEditTable } from './@types/sc-edit-table.d';

// TODO: 显示部分时新增一行，会默认展开全部，否则只会验证显示行表单数据

@Component({ name: 'ScEditTable' })
export default class EditTable extends Vue {
  // ---------- 工具栏设置 -----------

  /** 工具栏属性配置 */
  @Prop({ type: Object, default: () => ({}) })
  toolbar!: ScEditTable.Toolbar;

  // ---------- 表格配置 -----------

  /** 表格数据 */
  @Prop({ type: Array, default: () => [] })
  value!: obj[];

  /** 表头 */
  @Prop({ type: Array, required: true })
  columns!: ScEditTable.Columns;

  /** 表格属性配置 */
  @Prop({ type: Object, default: () => ({}) })
  tableConfig!: ScEditTable.TableConfig;

  /** 表格单个类型 type selection|index|expand */
  @Prop({ type: [String, Array] })
  columnsType!: string | obj[];

  /** 表格单个类型事件 type  selectable() */
  @Prop({ type: Object, default: () => ({}) })
  columnsEvents!: obj;

  /** 表头自定义公共属性 如:width="120"|min-width="90" */
  @Prop({ type: Object, default: () => ({}) })
  columnsProps!: obj;

  /** 单独定义 columns 的某一列，这里的设置会覆盖 columnsProps 的配置属性 */
  @Prop({ type: Object, default: () => ({}) })
  columnsSchema!: obj;

  // ---------- 表单配置 -----------

  /** 表单属性配置 */
  @Prop({ type: Object, default: () => ({ add: true }) })
  formConfig!: ScEditTable.FormConfig;

  /** 表单验证规则 */
  @Prop({ type: Object, default: () => ({}) })
  rules!: obj;

  /** 表格内容列 */
  columnsRender: obj[] = [];

  /** 表格特殊列 */
  columnsSpecial: any[] = [];

  /** 初始值 */
  oldValue: obj[] = this.value;

  /** 传给 FormTag 的表单数据 */
  data: ScEditTable.FormTag[] = [];

  /** 表单实际数据 */
  editForm: ScEditTable.Form = {
    data: [],
  };

  // 表格实际显示数据(限制行数)
  tableData: obj[] = [];

  // 表格是否开启可编辑状态
  get isTableEditable() {
    return !this.toolbar.edit;
  }

  // 是否已显示全部
  get isTotal() {
    return this.tableData.length && this.tableData.length === this.editForm.data.length;
  }

  /** 空行 */
  get emptyRow() {
    return this.columns.reduce((row: obj, e: obj) => {
      row[e.prop] = { prop: e.prop, value: null };
      return row;
    }, {});
  }

  /** input 输入内容对齐方式 */
  get inputAlign() {
    const { inputAlign = 'right' } = this.tableConfig;
    const style = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-end',
    };
    return inputAlign ? style[inputAlign] : '';
  }

  $refs!: {
    editForm: ElForm;
  };

  // 表单数据实时变更(格式化后)，更新外部组件
  @Watch('data', { deep: true })
  handleData(data: obj[]) {
    if (!this.emptyRow) {
      this.editForm = { data: [] };
      return;
    }

    const value = data.map((row: obj) => {
      const formatRow: obj = {};
      Object.keys(row).forEach((key: string) => {
        formatRow[key] = row[key].value;
      });
      return formatRow;
    });
    this.$emit('input', value);

    const { rows } = this.tableConfig;
    this.tableData = this.isTotal || !rows ? value : value.slice(0, rows);
    this.editForm = { data: value };
  }

  // 绑定表格属性
  get tableBind() {
    const { $attrs } = this;
    const bind = {
      border: true,
      'highlight-current-row': true,
    };
    return this.bindKeys(bind, $attrs);
  }

  // 绑定表单属性
  get formBind() {
    const { attr } = this.formConfig;
    const bind = {
      'status-icon': false,
      size: 'small',
    };
    return this.bindKeys(bind, attr || {});
  }

  // 工具栏按钮配置项
  get toolbarBind() {
    const attr = (this.toolbar && this.toolbar.attr) || {};
    const title = this.bindKeys({}, attr.title || {});
    const icon = this.bindKeys({ size: 'small' }, attr.icon || {});
    return { title, icon };
  }

  // 绑定属性
  bindKeys(bind: obj, keys: obj) {
    Object.keys(keys).forEach((e) => {
      const v = keys[e];
      const uniformKey = e.replace(/([A-Z])/g, '-$1').toLowerCase(); // 驼峰命名转换 : aB ==> a-b
      bind[e] = ~BOOLEAN_KEYS.indexOf(uniformKey) && v === '' ? true : v; // 如果只有key,那么val就为true
    });
    return bind;
  }

  // 当前列是否可编辑
  isEditable(col: obj) {
    return (
      !this.tableConfig.disabled &&
      this.isTableEditable &&
      ('editable' in col ? col.editable : true)
    );
  }

  // 处理渲染表格的格式
  handlerRender() {
    // 赋值
    const { columnsProps: props, columnsSchema: schema } = this;

    const column = this.$utils._Clone(this.columns);

    // 合并默认渲染的 label prop 和自定义的 label prop
    const map = Object.assign({}, { label: 'label', prop: 'prop' });

    const option = { width: 'auto', 'show-overflow-tooltip': true };
    const data = column.map((col: obj, i) => {
      const mix = (schema && schema[col[map.label]]) || {};
      const item = this.columns.find((v) => v.prop === col[map.prop]) || {};
      const { width, isHide } = col;
      // 合并 => 公共属性 + 全局设置属性 + 存储数据 + 渲染方法 + 表头数据 + 固定属性 + 自定义方式
      const results = Object.assign(
        {},
        option,
        props,
        col,
        COLUMN_PROPS,
        item,
        { width, isHide },
        mix,
      );
      // 处理 Element 渲染数据的  label prop
      results.label = results[map.label];
      results.prop = results[map.prop];
      return results;
    });

    setTimeout(() => {
      this.columnsRender = data;
    }, 0);
  }

  // 用于渲染特殊列 ==> TYPES(所有的特殊列)
  handlerSpecial() {
    const { columnsType: type, columnsEvents: prop } = this;
    this.columnsSpecial = [];

    let typeColums: string[] = [];
    if (typeof type === 'string' && ~TYPES.indexOf(type)) {
      typeColums = [type];
    }
    if (Array.isArray(type)) {
      type.forEach((it: any) => {
        if (~TYPES.indexOf(it)) {
          typeColums.push(it);
        }
      });
      if (~typeColums.indexOf('expand')) {
        typeColums.splice(typeColums.indexOf('expand'), 1);
        typeColums.unshift('expand');
      }
    }
    // 处理特殊列的属性和方法
    const map = prop || {};

    const selection = { 'reserve-selection': true, align: 'center' }; // 选择框默认属性
    const index = { label: '序号', align: 'center' }; // 序号默认属性
    const common = { width: 50 }; // 公共属性

    const data = typeColums.map((t: string) => {
      const attr = t === 'index' ? index : t === 'selection' ? selection : {};
      return {
        type: t,
        props: {
          ...common,
          ...attr,
          ...map[t],
        },
      };
    });
    this.columnsSpecial = data;
  }

  /**
   * 格式化表单数据
   * @param {Array<obj>} value 表单(初始)数据
   */
  formatData(value: obj[] = this.value) {
    this.data = value.map((row) => {
      const formItem: ScEditTable.FormTag = {};
      const props = new Set([...Object.keys(row), ...Object.keys(this.emptyRow)]);
      props.forEach((prop) => {
        formItem[prop] = { prop, value: row[prop] || null };
      });

      // 不设置 id 值或已有 id 值
      if (!this.tableConfig.rowId || formItem.id) {
        return formItem;
      }

      const key = this.tableConfig.rowKey || '';
      const id = key + Date.now();
      return { id: { prop: 'id', value: id }, ...formItem };
    });
  }

  /**
   * 列的数据,删除一些用不到的数据
   * @param {Object}  col   单个列表数据
   * @returns bind  处理后的数据
   */
  getColBind(col: obj) {
    const bind = Object.assign({ align: 'center' }, col);
    if (this.tableConfig.showRequired) {
      // 设置表头必填符号
      const rulesObj = this.rules[col.prop];
      const rules = (rulesObj && rulesObj.value) || [];
      if (rules.some((e: obj) => e && e.required)) {
        bind['render-header'] = (h: any) => [
          h('span', { class: 'font-danger font-16', style: { verticalAlign: 'middle' } }, '* '),
          h('span', {}, bind.label),
        ];
      }
    }

    delete bind.component;
    delete bind.listeners;
    delete bind.propsHandler;
    return bind;
  }

  // 自定义一些列数据
  getCptBind(row: obj, column: obj, col: obj) {
    const props = { row, col, column };
    const handler = col.propsHandler;
    // const type = col.special;
    // const value = ['img', 'switch', 'audio', 'video'];
    // if (value.includes(type) && !column.width) {
    //   props.column.width = 70;
    //   props.col.width = 70;
    // }
    return (handler && handler(props)) || props;
  }

  /**
   * 设置 formtag 数据
   * @param col - 列配置项
   * @param index - 行序号
   * @returns 列配置
   */
  getFormTagData(col: obj, index: number) {
    const tag = col.tag || {};
    const attr = tag.attr || {};
    if (this.$utils._DataTypeJudge(attr.isDisabled) === '[object Function]') {
      const row = this.value[index];
      const cell = row[col.prop];
      attr.disabled = attr.isDisabled(cell, row, index, col.prop);
    }

    const listeners = tag.listeners || {};
    const bindIndex = Object.keys(listeners).reduce((p: obj, c: string) => {
      p[c] = (...args: any[]) => {
        listeners[c] && listeners[c](...args, index, col.prop);
      };
      return p;
    }, {});

    return {
      tag: {
        ...tag,
        attr: { ...attr, row: index, col: col.prop },
        listeners: bindIndex,
      },
      rules: this.rules[col.prop],
    };
  }

  /** 切换显示表格所有行数据 */
  toggleTotal() {
    const { data } = this.editForm;
    const { rows } = this.tableConfig;
    this.tableData = this.isTotal ? data.slice(0, rows) : data;
  }

  /**
   * 新增行事件
   * @description 当前行数达到设置最大值时不再新增，表单验证通过则新增一行
   */
  handleAdd() {
    if (!this.isTotal) this.toggleTotal();

    const { max } = this.tableConfig;
    if (max && this.data.length >= max) {
      this.$message.warning(`最多添加${max}条记录`);
      return;
    }

    this.validate().then((result) => {
      if (result && this.emptyRow) {
        this.addRow();
      }
    });
  }

  /** 新增一行 */
  addRow() {
    const row: obj = this.$utils._Clone(this.emptyRow);

    this.columns.forEach((col) => {
      if (!col.default) return;
      const { multiple, value } = col.default;
      if (multiple && !Array.isArray(value)) {
        throw new Error('默认值类型为 multiple 时，value 应为 Array');
      }
      row[col.prop].value = multiple ? value[this.data.length] || value[value.length - 1] : value;
    });

    const { addPosition, rowId, rowKey } = this.tableConfig;
    const method = addPosition === 'bottom' ? 'push' : 'unshift';
    if (rowId) {
      const key = rowKey || '';
      const id = key + Date.now();
      this.data[method]({ id: { prop: 'id', value: id }, ...row });
    } else {
      this.data[method](row);
    }
  }

  /**
   * 删除指定行
   * @param {Number} index 要删除的行号
   */
  handleDelete(index: number) {
    this.clearFormItemValidate(index);
    this.data.splice(index, 1);
    this.$emit('emitDeleteComplete', index);

    // 显示替补行验证信息
    this.$nextTick(() => {
      this.validateFormItem(index);
    });
  }

  /** 开启编辑状态 */
  handleEdit() {
    // TODO：除了配置项中 editable 为 false的列，全部开启编辑状态
    this.toolbar.edit = false;
  }

  /**
   * 验证表单
   * @returns Promise 异步的验证结果(true/false)
   */
  validate() {
    return new Promise<Boolean>((resolve, reject) => {
      this.$refs.editForm
        .validate()
        .then((valid) => {
          resolve(valid);
        })
        .catch((err) => {
          resolve(err);
          this.$message.error(`${this.toolbar.title || ''}表格数据填写错误，请先修正再新增`);
        });
    });
  }

  /**
   * 验证指定行表单项
   * @param {Number} index 行号
   */
  validateFormItem(index: number) {
    const { fields } = this.$refs.editForm as obj;
    for (const field of fields) {
      const map = field.prop.match(/data\.([^])\./);
      const currRow = map && Number(map[1]);
      if (currRow === index) {
        this.$refs.editForm.validateField(field.prop, () => {});
      } else if (currRow > index) {
        break;
      }
    }
  }

  /** 移除表单项校验结果 */
  clearFormValidate() {
    this.$refs.editForm.clearValidate();
  }

  /**
   * 清除指定行验证信息
   * @param {Number} index 行号
   */
  clearFormItemValidate(index: number) {
    const { fields } = this.$refs.editForm as obj;
    for (const field of fields) {
      const map = field.prop.match(/data\.([^])\./);
      const currRow = map && Number(map[1]);
      if (currRow === index) {
        field.clearValidate();
      } else if (currRow > index) {
        break;
      }
    }
  }

  /**
   * 移除空行
   * @param {String} formKey 当前表单的 key
   * @returns {Object} 表单key 和 表单数据
   */
  async removeEmpty(formKey: string) {
    const { data } = this.editForm;
    const deleteLines: number[] = [];

    data.forEach((row, i) => {
      let isEmpty = true;
      for (const [key, value] of Object.entries(row)) {
        if (key in this.emptyRow && value) {
          const type = this.$utils._DataTypeJudge(value).slice(8, -1);
          const cases: obj = {
            Array: !(value as any[]).length,
            Object: !Object.keys(value).length,
          };
          isEmpty = cases[type] || false;
          if (!isEmpty) break;
        }
      }
      if (isEmpty) deleteLines.push(i);
    });

    deleteLines.reverse().forEach(this.handleDelete);
    await this.$nextTick();
    return { key: formKey, data: this.editForm.data };
  }

  /** 重置表单确认操作 */
  handleReset() {
    this.$confirm('确定要重置表单修改内容吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        this.reset();
      })
      .catch(() => {});
  }

  /** 重置表单 */
  reset() {
    this.$refs.editForm.resetFields();
    this.formatData(this.oldValue);
    this.$nextTick(() => {
      this.init();
    });
  }

  /** 设置表格的值 */
  setValue(value: any, row?: number, col?: string) {
    if (typeof row !== 'undefined') {
      if (col) {
        this.$set(this.data[row][col], 'value', value);
      } else if (this.$utils._DataTypeJudge(value) === '[object Object]') {
        const temp: ScEditTable.FormTag = {};
        const props = new Set([...Object.keys(value), ...Object.keys(this.emptyRow)]);
        props.forEach((prop) => {
          temp[prop] = { prop, value: value[prop] || null };
        });
        this.$set(this.data, row, temp);
      } else {
        throw new Error('表格行数据格式应为  Object');
      }
    } else if (Array.isArray(value)) {
      this.formatData(value);
    } else {
      throw new Error('表格数据格式应为 Array');
    }
  }

  /** 初始化默认行数据 */
  init(val = this.value) {
    if (val.length) {
      this.formatData();
    } else {
      const { max, emptyRows } = this.tableConfig;
      const rows = typeof emptyRows === 'undefined' ? 1 : emptyRows;
      const len = Math.min(rows, max || Infinity);
      for (let i = 0; i < len; i++) {
        this.addRow();
      }
    }
  }

  mounted() {
    this.handlerRender();
    this.handlerSpecial();
    this.init();
  }
}
</script>

<style lang="scss" scoped>
  .sc-edit-table {
    &__total {
      border-top: 0;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      transition: all 300ms;
      cursor: pointer;
      &:hover {
        color: #409eff !important;
        background-color: #f9fafc;
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
        // background-color: $--border-color-extra-light;
        //   color: $--color-primary;
      }
    }
  }
</style>
<style lang="scss">
  .sc-edit-table__form {
    .text-left {
      input {
        text-align: left;
      }
    }
    .text-center {
      input {
        text-align: center;
      }
    }
    .text-end {
      input {
        text-align: end;
        padding-right: 50px;
      }
    }
    .el-table {
      td,
      th {
        padding: 8px 0;
      }
      tr {
        transition: all 1s;
      }
      td {
        padding: 0 !important;
        transition: all 1s;
      }
    }
    .el-form-item {
      margin-top: 18px;
    }
  }
  .sc-edit-table {
    .sc-upload .img-uploader .el-upload--picture-card {
      width: 40px;
      height: 40px;
      line-height: 40px;
    }
    .sc-upload .img-uploader .el-upload-list__item {
      width: 40px;
      height: 40px;
    }
    .el-upload-list--picture-card .el-upload-list__item {
      margin: 0;
    }
    .el-upload-list__item.is-success .el-upload-list__item-status-label {
      display: none;
    }
    .el-upload-list--picture-card .el-upload-list__item-actions {
      font-size: 12px;
    }
  }
</style>
