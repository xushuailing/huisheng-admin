<template>
  <div class="goods-table mt-30 border-horizontal border-vertical border-radius-8 text-c">
    <div class="table-header bg-info-lighter border-bottom"
         :style="colWidth">
      <div v-for="(item,key) in header"
           :key="key"
           class="p-20">{{item}}</div>
    </div>
    <template v-if="list.length">
      <div v-for="(row,i) in list"
           :key="i"
           :style="colWidth"
           class="table-row">
        <template v-for="(col,k) in header">
          <div v-if="columns.includes(k)"
               :key="k"
               class="p-20 flex-ac">
            <div v-if="k === 'title'"
                 class="flex-ac">
              <img :width="80"
                   :height="80"
                   :src="row.image"
                   style="object-fit: cover"
                   class="mr-10">
              <span>{{row[k]}}</span>
            </div>
            <div v-else-if="k==='size'"
                 class="w100">
              {{(row.fid_val||'') + ' ' + (row.attr_val||'')}}
            </div>
            <div v-else-if="col=='商品总价'"
                 class="w100">{{row[k]?'￥'+row[k]:''}}</div>
            <div v-else
                 class="w100">{{row[k]}}</div>
          </div>
        </template>
      </div>
    </template>
    <div v-else
         class="p-20 font-16 font-info">暂无数据</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class GoodsTable extends Vue {
  @Prop(Object) header!: obj;

  @Prop(Array) list!: obj[];

  get columns() {
    return Object.keys(this.header);
  }

  get colWidth() {
    return { 'grid-template-columns': `2fr repeat(${this.columns.length - 1}, 1fr)` };
  }
}
</script>
<style lang='scss' scoped>
  .goods-table {
    .table-header,
    .table-row {
      display: grid;
      // grid-template-columns: 2fr repeat(3, 1fr);
      grid-template-rows: auto;
    }
  }
</style>
