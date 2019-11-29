<template>
  <div class='sc-min-table'>
    <div v-if="breadcrumbButtons.length"
         class="pb-30">
      <sc-breadcrumb>
        <el-button icon="el-icon-refresh"
                   v-if="isRefresh&&breadcrumbButtons.includes('refresh')"
                   @click="onHeaderHandle('refresh')"></el-button>
        <el-button @click="onHeaderHandle('add')"
                   v-if="addFormApi&&breadcrumbButtons.includes('add')">新增</el-button>
        <el-button @click="onHeaderHandle('del')"
                   v-if="isDelete&&breadcrumbButtons.includes('del')">删除</el-button>
        <slot name="breadcrumb"></slot>
      </sc-breadcrumb>
    </div>
    <div class="pb-10"
         v-if="isSearch">
      <sc-search ref="scSearchCollapse"
                 v-on="listeners.search"
                 model="collapse"
                 :config="this.searchConfig"
                 @emitSearchSubmit="onTableSearchClick"
                 :visible.sync="searchFormVisible">
      </sc-search>

    </div>

    <sc-table ref="scTable"
              v-bind="$attrs"
              v-loading="tableLoading"
              v-on="listeners.table"
              :page="pagination.page"
              :size="pagination.size"
              :columns="columns"
              :columnsEvents="columnsEvents"
              :columnsKeyMap="columnsKeyMap"
              :columnsProps="columnsProps"
              :columnsSchema="columnsSchema"
              :columnsHandler="columnsHandler"
              :columnsType="columnsType"
              :api="api"
              :handleWidth="tableConfig.handleWidth"
              :tableData="tableData"
              :slotAppend="slotAppend"
              @select-all="onSelectionChange"
              @select="onSelectionChange"
              @emitGetEditData="onGetEditData"
              @emitSwitchChange="updateDataTable"
              @emitLienEditTableComplete="updateDataTable"
              @emitTableHandlerClick="onTableHandlerClick"
              @emitSortChange="onSortChange">
      <template slot="expand"
                slot-scope="props">
        <slot name="expand"
              v-bind="props"></slot>
      </template>
      <template slot="append">
        <slot name="append"></slot>
      </template>
    </sc-table>
    <sc-pagination ref="scPagination"
                   v-if="tableConfig.isPagination!==false"
                   v-bind="paginationConfig"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   v-on="listeners.pagination">
    </sc-pagination>

    <sc-add-form ref="scAddForm"
                 v-on="listeners.add"
                 :visible.sync="addDialogShow"
                 v-if="addFormApi"
                 :api="addFormApi"
                 @emitAddComplete="onAddComplete"
                 :config="formAddConfig">
      <template v-for="slot in formButtonSlot.add">
        <slot :slot="slot.slotName"
              :name="slot.slotName"></slot>
      </template>
    </sc-add-form>

    <sc-edit ref="scEdit"
             v-on="listeners.edit"
             :visible.sync="editDialogShow"
             v-if="editApi"
             :api="editApi"
             @emitEditComplete="onEditComplete"
             :config="editConfig">
      <template v-for="slot in formButtonSlot.edit">
        <slot :slot="slot.slotName"
              :name="slot.slotName"></slot>
      </template>
    </sc-edit>
  </div>
</template>
<script>
import mixins from '../js/mixins';

export default {
  name: 'ScMinTable',
  mixins: [mixins],

  data() {
    return {
      searchFormVisible: false,
      btnText: false,
    };
  },

  computed: {
    exportApi() {
      const { isExports } = this.tableConfig;
      const api = isExports ? this.api.export : null;
      return api;
    },

    isDialog() {
      return this.searchConfig.model === 'dialog';
    },
    isCollapse() {
      return this.searchConfig.model === 'collapse';
    },

    isOrdinary() {
      const { isSearch } = this.tableConfig;
      return isSearch !== false;
    },

    isSetting() {
      const { isSetting } = this.tableConfig;
      return isSetting;
    },
  },
  methods: {
    onOpenCollapse() {
      this.searchFormVisible = !this.searchFormVisible;
      if (this.isCollapse) {
        this.btnText = !this.btnText;
      }
    },
  },
};
</script>
