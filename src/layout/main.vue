<template>
  <div class="app-main flex-1"
       id="appMain">
    <keep-alive>
      <router-view :key="key"
                   v-if="keepAlive"></router-view>
    </keep-alive>
    <router-view :key="key"
                 v-if="!keepAlive"></router-view>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class appMain extends Vue {
  get keepAlive() {
    return this.$route.meta.keepAlive;
  }

  get key() {
    return this.$route.fullPath;
  }
}
</script>
