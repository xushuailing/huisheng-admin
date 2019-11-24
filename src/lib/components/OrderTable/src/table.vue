<template>
  <div class="ttable">
    <div class="thead bg-white">
      <div class="thead-item font-blod f-20"
           v-for="(item,index) in thead"
           :key="index">{{item}}</div>
    </div>
    <div class="tbody">
      <div class="tbody-item bg-white"
           v-for="(item, index) in tableData"
           :key="index">
        <slot :row="item"></slot>
      </div>
    </div>
    <!-- <div class="tfoot">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.page" :page-sizes="[10, 20, 30, 50, 100]" :page-size="pagination.limit" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
      </el-pagination>
    </div> -->
  </div>
</template>

<script>
export default {
  props: { tableData: Array, thead: Array },
  data() {
    return {
      pagination: {
        total: 0,
        page: 1,
        limit: 20,
      },
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pagination.limit = val;
      this.$emit('handleSizeChange', val);
    },
    handleCurrentChange(val) {
      this.pagination.page = val;
      this.$emit('handleCurrentChange', val);
    },
  },
};
</script>

<style lang="scss" scoped>
.ttable {
  .thead {
    background: #f7f7f7;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 8px;
    padding: 20px;
    &-item {
      flex: 1;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
    }
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
