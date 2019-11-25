<template>
  <div class="home-messages">
    <div class="home-title">消息中心</div>
    <div style="height:300px">
      <div class="pr-15 pl-15 bg-white border-radius-8 h100 flex-column">
        <div v-for="(item,index) in  messages"
             :key="item.id"
             :class="{'border-top':index>0}"
             class="flex-ac pt-15 pb-15 flex-1">
          <el-avatar :size="60"
                     :src="item.img"></el-avatar>
          <div class="ml-10">
            <div class="font-bold font-18">{{item.name}}</div>
            <div class="font-16">{{item.docs}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class HomeMessages extends Vue {
  messages = [
    { id: 0, img: 'http://placehold.it/200x200', name: '名字', docs: '描述' },
    { id: 1, img: 'http://placehold.it/200x200', name: '名字', docs: '描述' },
    { id: 2, img: 'http://placehold.it/200x200', name: '名字', docs: '描述' },
  ];
}
</script>
