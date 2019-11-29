<template>
  <div class="sc-table">
    <div class="sc-table_center">
      <el-table ref="elTable"
                :data="tableList"
                class="border-radius-8"
                @select-all="selectionChange"
                @sort-change="onSortChange"
                @select="selectionChange"
                v-bind="tableBind"
                v-on="$listeners">
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
                           :index="indexMethod"
                           :type="tp.type"
                           v-bind="tp.props"></el-table-column>
          <el-table-column v-else-if="tp.type === 'selection'"
                           :key="tp.type"
                           :type="tp.type"
                           v-bind="tp.props"></el-table-column>
        </template>
        <template v-for="col in columnsRender">
          <el-table-column :key="col.label"
                           v-if="col.isMustShow || !col.isHide"
                           v-bind="getColBind(col)">
            <template slot-scope="scope">
              <div v-if="col.special === 'img'"
                   class="w100 flex-jc">
                <img v-if="scope.row[col.prop]"
                     style="object-fit: cover;"
                     v-bind="getCptBind(scope, col)"
                     @click="onImgClick(scope, col)"
                     v-on="col.listeners"
                     :src="scope.row[col.prop]"
                     alt />
                <span v-else>无</span>
              </div>
              <el-switch v-else-if="col.special === 'switch'"
                         v-model="scope.row[col.prop]"
                         :active-value="1"
                         :inactive-value="0"
                         @change="onSwitchChange(scope, col)"
                         v-on="col.listeners"
                         v-bind="getCptBind(scope, col)"></el-switch>
              <div v-else-if="col.special === 'tag'">
                <el-tag v-for="tag in handleTags(scope, col)"
                        v-bind="getCptBind(scope, col)"
                        :key="tag"
                        v-on="col.listeners"
                        class="mr-5">{{ tag }}</el-tag>
              </div>
              <div v-else>
                <component :is="col.component"
                           v-on="col.listeners"
                           v-bind="getCptBind(scope, col)"></component>
              </div>
            </template>
          </el-table-column>
        </template>

        <el-table-column v-if="columnsHandlerType"
                         label="操作"
                         :width="handleWidth||columnsHandlerType.width"
                         header-align='center'
                         fixed="right">
          <template slot-scope="scope">
            <div style="display: flex;justify-content: space-around;">
              <template v-for="(item, index) in columnsHandlerType.content">

                <el-link @click="onHandlerClick(scope, item.name)"
                         :key="index"
                         :underline="false"
                         :type="item.type||'primary'">
                  {{item.title}}
                </el-link>

              </template>
            </div>
          </template>
        </el-table-column>
        <template v-if="slotAppend"
                  slot="append">
          <slot name="append"></slot>
        </template>
      </el-table>
    </div>
    <sc-dialog ref="scDialog"
               :visible.sync="imgDialog.show"
               :isOpenFull="false"
               custom-class="sc-dialog__img">
      <img slot="conter"
           :src="imgDialog.src"
           alt />
    </sc-dialog>
    <sc-dialog ref="scDialog"
               :visible.sync="videoDialog.show"
               :isOpenFull="false"
               custom-class="sc-dialog__img">
      <div slot="conter"
           style="height:50vh;width:50vw">
        <sc-video :url="videoDialog.src"></sc-video>
      </div>
    </sc-dialog>
  </div>
</template>
<script>
import { COLUMN_PROPS, TYPES, BOOLEAN_KEYS, COLUMNS_HANDLER } from '../../../config/table';
import { tableMethods } from '../../../mixins/methods';

export default {
  name: 'ScTable',

  mixins: [tableMethods('elTable')],
  props: {
    // 表格数据
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },

    // 表头数据
    columns: {
      type: Array,
      default() {
        return [];
      },
    },

    // 表格单个类型 type selection|index|expand
    columnsType: [String, Array],

    // 表格单个类型事件 type  selectable()
    columnsEvents: Object,

    // 表头自定义公共属性 如:width="120"|min-width="90"
    columnsProps: Object,

    // 表格的操作根据 COLUMNS_HANDLER 里所存在的操作
    columnsHandler: [String, Array],

    // 表头自定义key 如:{ label: 'name' }
    columnsKeyMap: Object,

    // 单独定义 columns 的某一列，这里的设置会覆盖 columnsProps 的配置属性
    columnsSchema: Object,

    // Table Slot
    slotAppend: Boolean,

    // 当前页数
    page: {
      type: Number,
      default: 0,
    },
    // 当前条数
    size: {
      type: Number,
      default: 10,
    },

    // 接口
    api: {
      type: Object,
      default: () => ({}),
    },

    handleWidth: {
      table: [Number, String],
    },
  },
  data() {
    return {
      imgDialog: { show: false, src: '' },
      videoDialog: { show: false, src: '' },

      column: this.columns,

      columnsRender: [],
      columnsSpecial: [],

      tableList: [],
    };
  },

  created() {},
  watch: {
    tableData(val) {
      if (val) {
        this.getImgUrl(val);
      }
    },
  },
  computed: {
    tableBind() {
      const { $attrs } = this;
      const bind = {
        stripe: true,
        'highlight-current-row': true,
        'row-key': 'id',
      };
      Object.keys($attrs).forEach((key) => {
        const v = $attrs[key];
        const uniformKey = key.replace(/([A-Z])/g, '-$1').toLowerCase(); // 驼峰命名转换 : aB ==> a-b
        bind[key] = ~BOOLEAN_KEYS.indexOf(uniformKey) && v === '' ? true : v; // 如果只有key,那么val就为true
      });
      return bind;
    },

    columnsHandlerType() {
      const { columnsHandler: name } = this;
      const WIDTH = 55; // 默认一个操作事件的宽
      let handler = { content: [], width: WIDTH }; // 初始化属性

      // 一个操作
      if (typeof name === 'string') {
        handler.content = COLUMNS_HANDLER.filter((v) => v.name === name);
      } else if (Array.isArray(name) && name.length) {
        for (const key of name) {
          if (typeof key === 'string') {
            handler.content.push(COLUMNS_HANDLER.find((it) => it.name === key));
          } else if (this.$utils._DataTypeJudge(key) === '[object Object]') {
            const buttons = [];
            if (key.name && key.title) {
              buttons.push(key);
            } else {
              const btn = COLUMNS_HANDLER.find((e) => e.name === key.name);

              buttons.push(btn);
            }
            handler.content.push(...buttons);
          }
        }
      } else {
        handler = null;
      }
      if (handler && handler.content.length) {
        handler.width = handler.content.length * WIDTH + 40;
      } else {
        handler = null;
      }
      return handler;
    },
  },
  methods: {
    init() {
      this.handlerRender();
      this.handlerSpecial();
    },

    // 获取图片路径
    getImgUrl(list) {
      // 获取 img 对应的字段
      const prop = this.columns.filter((v) => v.special === 'img').map((v) => v.prop);

      // 复制列表数据
      const tableList = list;
      if (prop.length && list.length) {
        const ids = [];
        const position = [];
        prop.forEach((e) => {
          // 把 img 的值为 id 的删除掉
          tableList.forEach((ee, index) => {
            if (Number(ee[e])) {
              position.push({ index, prop: e }); // 当前 img 为 id 对应的列表下标和字段
              ids.push(ee[e]); // img 为 id 值得集合
              delete ee[e]; // 删除 img 为 id 的 字段
            }
          });
        });
      }
      this.tableList = tableList;
    },

    // 处理渲染表格的格式
    handlerRender() {
      // 赋值
      const { columnsKeyMap, columnsProps: props, columnsSchema: schema } = this;

      const column = this.$utils._Clone(this.column);

      // 合并默认渲染的 label prop 和自定义的 label prop
      const map = Object.assign({}, { label: 'label', prop: 'prop' }, columnsKeyMap);

      const option = {
        width: 'auto',
        'show-overflow-tooltip': true,
        align: 'center',
        'header-align': 'center',
      };
      const data = column.map((col, i) => {
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
      // return data
    },

    // 用于渲染特殊列 ==> TYPES(所有的特殊列)
    handlerSpecial() {
      const { columnsType: type, columnsEvents: prop } = this;
      this.columnsSpecial = [];

      let typeColums = [];
      if (typeof type === 'string' && ~TYPES.indexOf(type)) {
        typeColums = [type];
      }
      if (Array.isArray(type)) {
        type.forEach((it) => {
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

      const option = {
        isMustShow: true,
        isRevise: true,
        isAdd: true,
        fixed: 'left',
      };
      const selection = { 'reserve-selection': true }; // 选择框默认属性
      const index = { label: '序号' }; // 序号默认属性
      const common = { width: 50, 'header-align': 'center', align: 'center' }; // 公共属性

      const data = typeColums.map((t) => {
        const attr = t === 'index' ? index : t === 'selection' ? selection : {};
        return {
          type: t,
          props: {
            ...common,
            ...attr,
            ...map[t],
          },
          ...option,
        };
      });
      this.columnsSpecial = data;
      // return data
    },

    // 筛选
    onSortChange({ prop, order }) {
      let data = {};
      data.orderField = prop;
      if (order === 'ascending') {
        data.orderType = 'ASC';
      } else if (order === 'descending') {
        data.orderType = 'DESC';
      } else {
        data = null;
      }

      this.$emit('emitSortChange', data ? [data] : []);
    },

    // 选择中的数据 做导出
    selectionChange(data, item) {
      this.$refs.elTable.setCurrentRow(item);
    },

    // 操作事件
    onHandlerClick(scope, type) {
      if (this.api.show && type === 'edit') {
        this.getEditData(scope, type);
        return;
      }
      this.$emit('emitTableHandlerClick', {
        row: scope.row,
        index: scope.$index,
        type,
      });
    },

    // 查看图片
    onImgClick({ row }, { prop }) {
      this.imgDialog.show = true;
      this.imgDialog.src = row[prop];
    },

    // 查看视频
    onVideoClick({ row }, { prop }) {
      this.videoDialog.show = true;
      this.videoDialog.src = row[prop];
    },

    // 状态更改
    onSwitchChange({ row }, col) {
      const data = { id: row.id };
      data[col.prop] = row[col.prop];
      this.$emit('emitSwitchChange', data);
    },

    // 列的数据
    getColBind(col) {
      /**
       * 列的数据,删除一些用不到的数据
       * @event getColBind
       * @param {Object}  col   单个列表数据
       * @returns bind  处理后的数据
       */
      const bind = Object.assign({}, col);
      delete bind.component;
      delete bind.listeners;
      delete bind.propsHandler;
      return bind;
    },

    // 自定义一些列数据
    getCptBind({ row, column }, col) {
      const props = { row, col, column };
      const handler = col.propsHandler;
      const type = col.special;
      const value = ['img', 'switch', 'audio', 'video'];
      if (value.includes(type) && !column.width) {
        props.column.width = 70;
        props.col.width = 70;
      }
      if (type === 'img') {
        props.width = 25;
        props.height = 25;
      }

      return (handler && handler(props)) || props;
    },

    handleTags(scope, col) {
      const tags = col.formater ? col.formater(scope.row, col, this) : scope.row[col.prop];
      return this.$utils._DataTypeChange(tags);
    },

    indexMethod(index) {
      return this.page * this.size + index + 1;
    },

    // 获取修改数据
    getEditData(scope, type) {
      const loading = this.$utils._Loading.show();
      const { id } = scope.row;
      const api = this.api.show;
      this.$http
        .get(api, { id })
        .then((res) => {
          const { data } = res;
          // 抛出修改数据
          this.$emit('emitGetEditData', data);
          this.$emit('emitTableHandlerClick', {
            row: scope.row,
            index: scope.$index,
            type,
          });
        })
        .finally(() => {
          loading.close();
        });
    },
  },
  mounted() {
    this.init();
  },
};
</script>
