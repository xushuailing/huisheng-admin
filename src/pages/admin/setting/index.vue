<template>
  <div class='admin-setting'>
    <div class=" p-15 bg-white mt-20 border-radius-4">
      <div class="flex flex-ac flex-jsb font-18">
        <span>用户指南</span>
        <el-button type="primary"
                   plain>添加</el-button>
      </div>
      <div class="mt-15">
        123
      </div>

    </div>
    <div class=" p-15 bg-white mt-20 border-radius-4">
      <div class="flex flex-ac flex-jsb font-18">
        <span>用户协议</span>
        <el-button type="primary"
                   plain>添加</el-button>
      </div>
      <div class="mt-15">
        123
      </div>
    </div>
    <div class=" p-15 bg-white mt-20 border-radius-4">
      <div class="flex flex-ac flex-jsb font-18">
        <span>莱赶集规则及服务保障</span>
        <el-button type="primary"
                   plain>添加</el-button>
      </div>
      <div class="mt-15">
        123
      </div>
    </div>
    <div class=" p-15 bg-white mt-20 border-radius-4">
      <div class="flex flex-ac flex-jsb font-18">
        <span>营业执照</span>
        <el-button type="primary"
                   plain>添加</el-button>
      </div>
      <div class="mt-15"
           style="height:120px">
        <img style="width:200px"
             class="h100 mr-15"
             src="http://placehold.it/200x200"
             alt="">
        <img style="width:200px"
             class="h100"
             src="http://placehold.it/200x200"
             alt="">
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class AdminSetting extends Vue {}
</script>
<style lang="scss" scoped>
.admin-setting {
  .title {
  }
}
</style>
