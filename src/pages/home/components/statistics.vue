<template>
  <div class="home-statistics">
    <div class="home-title">新增数据统计</div>
    <el-row :gutter="20">
      <el-col :span='8'
              v-for="item in statistics"
              :key="item.id">
        <div class="p-15 bg-white flex-1 flex-jsb flex-ac border-radius-8">
          <div class="flex-ac ">
            <el-avatar :size="58"
                       shape="square"
                       :src="item.img"></el-avatar>
            <span class="font-28 ml-10 font-bold">{{item.num}}</span>
          </div>
          <span class="font-text-secondary">{{item.docs}}</span>
        </div>

      </el-col>
    </el-row>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class HomeStatistics extends Vue {
  statistics = [
    { id: 0, img: 'http://placehold.it/200x200', num: 200, docs: '描述' },
    { id: 1, img: 'http://placehold.it/200x200', num: 200, docs: '描述' },
    { id: 2, img: 'http://placehold.it/200x200', num: 200, docs: '描述' },
  ];
}
</script>
