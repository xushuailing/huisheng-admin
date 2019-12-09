<template>
  <div class="ttable">
    <div class="mb-20">
      <sc-search ref="scSearchCollapse"
                 model="collapse"
                 :config="searchConfig"
                 @emitSearchSubmit="onTableSearchClick"
                 :visible.sync="searchFormVisible">
      </sc-search>
    </div>

    <div ref="table">
      <div class="thead flex-jc-ac bg-white border-radius-8">
        <div :class="['p-15 font-bold text-c font-16',!item.width&&'flex-1']"
             v-for="(item,index) in thead"
             :key="index"
             :style="{width:item.width?item.width+'px':'auto'}">
          <el-checkbox v-if="item.type==='checked'"
                       @change="handleSelectAll"></el-checkbox>
          <span v-else>{{item.label}}</span>
        </div>
      </div>
      <div class="tbody">
        <template v-if="tableData.length">
          <div class="tbody-item"
               v-for="(item, index) in tableData"
               :key="index">
            <slot :row="item"
                  :width="widths"
                  :index="index"></slot>
          </div>
        </template>
        <div v-else
             class="p-30 text-c font-16 font-info">暂无数据</div>
      </div>
      <div class="tfoot">
        <sc-pagination ref="scPagination"
                       v-if="tableConfig.isPagination!==false"
                       v-bind="paginationConfig"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       v-on="listeners.pagination">
        </sc-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { tableMethods } from '../../../mixins/methods';

export default {
  mixins: [tableMethods('scTable')],
  props: {
    // 表头数据
    thead: Array,
    // 表格配置项
    tableConfig: {
      type: Object,
      default: () => ({}),
    },
    // 搜索配置数据
    searchConfig: {
      type: Object,
      default: () => ({}),
    },
    // 分页配置
    paginationConfig: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      searchFormVisible: false,
      btnText: false,
      tableData: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 20,
      },
    };
  },
  computed: {
    api() {
      return this.tableConfig.api || {};
    },
    isCollapse() {
      return this.searchConfig.model === 'collapse';
    },
    widths() {
      return this.thead.map((t) => t.width);
    },
    listeners() {
      const { $listeners: Ev } = this;
      const events = {
        table: {},
        pagination: {},
        tree: {},
        add: {},
        edit: {},
        search: {},
        exports: {},
        settingTable: {},
      };

      const replaceString = (srt, re) => srt.replace(`${re}-`, '');

      Object.keys(events).forEach((key) => {
        Object.keys(Ev).forEach((event) => {
          const re = new RegExp(`^${key}`, 'gm');
          if (re.test(event)) {
            events[key][replaceString(event, key)] = Ev[event];
          }
        });
      });
      return events;
    },
  },
  methods: {
    onOpenCollapse() {
      this.searchFormVisible = !this.searchFormVisible;
      if (this.isCollapse) {
        this.btnText = !this.btnText;
      }
    },

    // 搜索
    onTableSearchClick(data) {
      this.paginationConfig.currentPage = 1;
      this.pagination.page = 1;
      this.query = data;
      this.getDataTable();
    },

    // 获取表格数据
    getDataTable(
      param = {
        ...this.tableConfig.index,
        ...this.pagination,
        ...this.query,
      },
    ) {
      if (this.tableConfig.disableDefaultRequest || this.disableEveryRequest) {
        this.emitGetTableDataComplete('prevent', false, null);
        return;
      }

      // 如果有 treeParams 删除该属性
      if (param.treeParams) delete param.treeParams;

      this.tableLoading = true;
      const api = this.api.index;

      const loading = this.$utils._Loading.show({ target: this.$refs.table });
      this.$http
        .get(api, param)
        .then((data) => {
          const limit = Number(data.limit);
          const page = Number(data.page);
          const count = Number(data.count);

          /** 全部删除最后一页数据时,再次调用接口并且 page-1 */
          if (page > 1 && !data.data.length) {
            this.pagination.page = this.pagination.page - 1;
            this.getDataTable();
            return;
          }

          const content = data.data;

          this.paginationConfig.pageSize = limit; // 分页配置页面数量
          this.paginationConfig.currentPage = page; // 分页配置当前页面
          this.paginationConfig.total = count; // 分页配置页面总数

          this.pagination.page = page; // 请求当前页数
          this.pagination.limit = limit; // 请求页面数量

          this.tableData = content;

          if (this.tableConfig.disableEveryRequest) this.disableEveryRequest = true;

          this.emitGetTableDataComplete('success', true, data);
        })
        .catch((err) => {
          this.emitGetTableDataComplete('error', false, { ...err });
        })
        .finally(() => {
          this.tableLoading = false;
          loading.close();
        });
    },

    setDataTable(option = {}) {
      const pagination = option.pagination || {};
      pagination.limit = pagination.limit || this.pagination.limit;
      pagination.page = pagination.page || this.pagination.page;

      const sorts = option.sorts || this.sorts;

      const query = option.query || this.query;

      const index = option.index || this.tableConfig.index;

      this.tableConfig.disableDefaultRequest = false;
      if (this.tableConfig.disableEveryRequest) this.disableEveryRequest = false;
      this.getDataTable({
        ...pagination,
        sorts,
        query,
        ...index,
      });
    },

    // 选择每页的条数
    handleSizeChange(val) {
      this.pagination.page = 1;
      this.pagination.limit = val;
      this.paginationConfig.currentPage = 0;
      this.getDataTable();
      this.$emit('emitPaginationSizeChange', val);
    },

    // 选择页数
    handleCurrentChange(val) {
      this.pagination.page = val;
      this.paginationConfig.currentPage = val;
      this.getDataTable();
      this.$emit('emitPaginationCurrentChange', val);
    },

    handleSelectAll(value) {
      this.$emit('select-all', value);
    },

    emitGetTableDataComplete(info, status, response) {
      this.$emit('emitGetTableDataComplete', { info, status, response, vm: this });
    },
  },
  created() {
    this.pagination.limit = this.paginationConfig.size || 10;
    this.pagination.page = this.paginationConfig.page || 1;
  },
  mounted() {
    this.clearFilter();
    this.getDataTable();
  },
};
</script>

<style lang="scss" scoped>
  .ttable {
    .thead flex-jc-ac {
      background: #f7f7f7;
    }
    .tbody {
      margin-top: 20px;
      &-item {
        margin-top: 20px;
      }
    }
    .tfoot {
      margin-top: 20px;
      text-align: center;
    }
  }
</style>
