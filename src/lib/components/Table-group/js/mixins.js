import { tableMethods } from '../../../mixins/methods';

export default {
  mixins: [tableMethods('scTable')],
  provide() {
    return {
      common: {
        columns: this.columns,
        columnsHandler: this.columnsHandler,
        searchConfig: this.searchConfig,
        tableConfig: this.tableConfig,
        formAddConfig: this.formAddConfig,
      },
    };
  },

  props: {
    // 表头数据
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    // 分页配置
    paginationConfig: {
      type: Object,
      default: () => ({}),
    },

    // 表格单个类型 type selection|index|expand
    columnsType: [String, Array],

    // 表格的操作 根据 COLUMNS_HANDLER 里所存在的操作
    columnsHandler: [String, Array],

    // 表格单个类型事件 type  selectable()
    columnsEvents: {
      type: Object,
      default: () => ({}),
    },

    // 表头自定义key 如:{ label: 'name' }
    columnsKeyMap: {
      type: Object,
      default: () => ({}),
    },

    // 表头自定义公共属性 如:width="120"|min-width="90"
    columnsProps: {
      type: Object,
      default: () => ({}),
    },

    // 单独定义 columns 的某一列，这里的设置会覆盖 columnsProps 的配置属性
    columnsSchema: {
      type: Object,
      default: () => ({}),
    },

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

    // 修改配置
    editConfig: {
      type: Object,
      default: () => ({}),
    },

    // 添加配置
    formAddConfig: {
      type: Object,
      default: () => ({}),
    },

    // 树配置数据
    treeConfig: {
      type: Object,
      default: () => ({}),
    },

    // Table Slot
    slotAppend: Boolean,
  },
  data() {
    return {
      disableEveryRequest: this.tableConfig.disableEveryRequest || false,

      tableLoading: false,
      editDialogShow: false,
      addDialogShow: false,
      column: this.columns,
      tableData: [],
      sorts: null,
      query: null,
      pagination: {},
      selectTableData: [],
    };
  },
  computed: {
    api() {
      return this.tableConfig.api || {};
    },

    // 表单按钮卡槽
    formButtonSlot() {
      const slots = [
        {
          mode: 'add',
          slotName: 'addForm-footer-btn',
          button: this.formAddConfig.buttons || [],
        },
        {
          mode: 'edit',
          slotName: 'edit-footer-btn',
          button: this.formAddConfig.buttons || [],
        },
      ];

      const buttons = {};
      slots.forEach((v) => {
        const defaultSlot = { mode: 'slot', slotName: v.slotName };
        buttons[v.mode] = [].concat(v.button, [defaultSlot]);
      });
      return buttons;
    },

    // // 新增表单按钮卡槽
    // addButtonsSlot() {
    //   const defaultSlot = { mode: 'slot', slotName: 'addForm-footer-btn' };
    //   const buttons = this.formAddConfig.buttons || [];
    //   return [].concat(buttons, [defaultSlot]);
    // },
    // // 编辑表单按钮卡槽
    // editButtonsSlot() {
    //   const defaultSlot = { mode: 'slot', slotName: 'edit-footer-btn' };
    //   const buttons = this.editConfig.buttons || [];
    //   return [].concat(buttons, [defaultSlot]);
    // },

    // 处理各各组件事件
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

    // 获取添加表单api
    addFormApi() {
      const data = this.formAddConfig && this.formAddConfig.data;
      const api = data ? this.api.create : null;
      return api;
    },

    // 获取删除api
    isDelete() {
      return this.api && this.api.delete;
    },

    // 是否显示刷新
    isRefresh() {
      return this.tableConfig.isRefresh !== false;
    },

    isSearch() {
      return this.searchConfig && Object.keys(this.searchConfig).length;
    },

    // 获取修改表单api
    editApi() {
      const data = this.editConfig && this.editConfig.data;
      const api = data ? this.api.update : null;
      return api;
    },

    limit() {
      return (this.tableConfig.table && this.tableConfig.table.limit) || {};
    },

    bindComponentEvent() {
      const { search, exports, settingTable } = this.listeners;
      return {
        search: Object.assign({}, search, {
          emitSearchSorts: this.onSortChange,
        }),
        exports,
        settingTable,
      };
    },

    breadcrumbButtons() {
      const { breadcrumbButtons } = this.tableConfig;
      return breadcrumbButtons || [];
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
  methods: {
    // 筛选
    onSortChange(data) {
      this.sorts = data;
      this.getDataTable();
      // this.$emit('emitSortChange', data);
    },

    // 选中数据
    onSelectionChange(data) {
      this.selectTableData = data;
      // this.$emit('emitSelectionChange', data);
    },

    // 清空用户选中数据
    emitClearSelection() {
      this.selectTableData = [];
      this.$refs.scTable.clearSelection();
    },

    // 自定义表格 改变 table 标题的 显示条数,位置
    onChangeUserDefinedTable() {
      this.$refs.scTable.init();
      // this.$emit('emitChangeUserDefinedTable');
    },

    // 选择每页的条数
    handleSizeChange(val) {
      this.pagination.page = 1;
      this.pagination.limit = val;
      this.paginationConfig.currentPage = 0;
      this.getDataTable();
      // this.$emit('emitPaginationSizeChange', val);
    },

    // 选择页数
    handleCurrentChange(val) {
      this.pagination.page = val;
      this.paginationConfig.currentPage = val;
      this.getDataTable();
      // this.$emit('emitPaginationCurrentChange', val);
    },

    // 状态切换
    onSwitchChange(data) {
      this.updateDataTable(data);
      // this.$emit('emitSwitchChange', data);
    },

    // 修改回调
    onEditComplete(data) {
      if (data.status) this.getDataTable();
      // this.$emit('emitEditComplete', data);
    },

    // 添加回调
    onAddComplete(data) {
      if (data.status) this.addTable();
      // this.$emit('emitAddComplete', data);
    },

    // 添加表格数据
    addTable() {
      this.paginationConfig.currentPage = 1;
      // this.pagination.size = 10;
      this.pagination.page = 1;
      this.sort = null;
      this.query = null;

      this.getDataTable();
    },

    // 搜索
    onTableSearchClick(data) {
      this.paginationConfig.currentPage = 1;
      // this.pagination.size = 10;
      this.pagination.page = 1;
      // this.sort = [];
      this.query = data;
      // this.$emit('emitTableSearchClick', data, type);
      this.getDataTable();
    },
    // 点击树的
    onTreeNodeClick(data) {
      const { disableTreeClickRequest, index } = this.tableConfig;
      // this.pagination.size = 10;
      this.pagination.page = 1;
      this.sort = [];

      if (disableTreeClickRequest) return;

      if (index) {
        // pid || categoryId 是兼容以前配置
        if (index.pid !== undefined) {
          this.$set(this.tableConfig.index, 'pid', data.id);
          // this.tableConfig.index.pid = data.id;
        } else if (index.categoryId !== undefined) {
          this.$set(this.tableConfig.index, 'categoryId', data.id);
        } else if (this.$utils._DataTypeJudge(index.treeParams) === '[object Object]') {
          Object.keys(index.treeParams).forEach((k) => {
            this.$set(this.tableConfig.index, k, data.id);
          });
        }
      }
      this.getDataTable();
    },

    // 表格操作事件
    onTableHandlerClick(data) {
      if (data.type === 'del') {
        this.deleteTable([data.row.id]);
      }
      // if (data.type === 'edit') {
      // this.getEditData(data);
      // }
      // this.$emit('emitTableHandlerClick', data);
    },

    // 刷新按钮
    emitRefresh() {
      if (this.tableConfig.isRefreshClearSelection !== false) this.clearSelection(); // 清除用户选择数据
      this.addTable();
    },

    // 操作按钮
    onHeaderHandle(type) {
      this.$emit('emitHeaderHandle', type);
      if (type === 'add') {
        this.addDialogShow = true;
      }
      if (type === 'refresh') {
        this.emitRefresh();
      }
      if (type === 'del') {
        const ids = this.selectTableData.map((v) => v.id);
        this.deleteTable(ids);
      }
    },

    // 设置表格调用参数
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

    // 获取表格数据
    getDataTable(
      param = {
        ...this.tableConfig.index,
        // sorts: this.sorts,
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

          const content = data.data.map((v) => {
            const obj = v;
            this.columns.forEach((e) => {
              if (obj[e.prop] === undefined) obj[e.prop] = '';
            });
            return obj;
          });

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
        });
    },

    // 删除数据
    async deleteTable(ids) {
      if (!ids.length) {
        this.$message.error('请选择要删除的数据!');
        return;
      }
      const api = this.api.delete;
      const deleteMessage = this.tableConfig.deleteMessage || {};
      const { title, message, option } = deleteMessage;
      const flag = await this.$utils._MessageConfirm(message, title, option);
      if (!flag) return;
      const param = {};
      if (ids.length === 1) {
        param.id = ids[0];
      } else {
        param.ids = ids;
      }

      const delMethod = this.tableConfig.delMethod || 'post';

      this.$http[delMethod](api, { ...this.tableConfig.deleteParams, ...param })
        .then((res) => {
          this.$message({
            message: (res.data && res.data.errmsg) || '删除成功',
            type: 'success',
          });

          this.clearSelection();

          this.selectTableData = this.selectTableData.filter((select) => {
            const s = ~ids.findIndex((e) => e === select.id);
            if (!s) this.toggleRowSelection(select, true);
            return !s;
          });

          this.getDataTable();

          this.$emit('emitDeleteComplete', true, this);
        })
        .catch(() => {
          this.$emit('emitDeleteComplete', false, this);
        });
    },

    // 更新表格数据
    updateDataTable(data) {
      this.tableLoading = true;
      const api = this.api.update;
      this.$http
        .post(api, data)
        .then((res) => {
          this.$message({
            message: (res.data && res.data.errmsg) || '设置成功',
            type: 'success',
          });
          this.tableLoading = false;
          this.$emit('emitUpdateComplete', true);

          this.getDataTable();
        })
        .catch(() => {
          this.tableLoading = false;
          this.$emit('emitUpdateComplete', false);

          // 处理更新失败，状态也改变问题
          const { tableList } = this.$refs.scTable;
          const index = tableList.findIndex((v) => v.id === data.id);
          const item = tableList[index];
          const status = Number(!data.status);
          item.status = status;
          this.$set(tableList, index, item);
        });
    },

    // 获取修改数据
    onGetEditData(data) {
      this.editConfig.id = data.id;
      this.editConfig.data.forEach((v) => {
        v.forEach((e) => {
          e.default = e.handleEdit ? e.handleEdit(data[e.prop], e.prop, data) : data[e.prop];
        });
      });
      this.editDialogShow = true;
    },

    emitGetTableDataComplete(info, status, response) {
      this.$emit('emitGetTableDataComplete', { info, status, response, vm: this });
    },
  },
};
