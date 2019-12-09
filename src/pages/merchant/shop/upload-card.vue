<template>
  <div class="upload-card flex">
    <div class="text-c">
      <sc-upload v-model="card.positive"
                 :limit="1"></sc-upload>
      <div class="font-info">上传正面</div>
    </div>
    <div class="text-c">
      <sc-upload v-model="card.back"
                 :limit="1"
                 class="ml-30"></sc-upload>
      <div class="font-info">上传反面</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';

interface Card {
  positive: string;
  back: string;
}

@Component
export default class UploadCard extends Vue {
  @Prop(Object) value!: Card;

  @Watch('value', { immediate: true })
  onValueChange(value: Card) {
    this.card = value;
  }

  card: Card = {
    positive: '',
    back: '',
  };

  @Watch('card', { deep: true })
  onCardChange(card: Card) {
    this.$emit('update:value', card);
  }
}
</script>
<style lang="scss">
  .upload-card {
    .sc-upload .img-uploader .el-upload--picture-card,
    .sc-upload .img-uploader .el-upload-list__item {
      width: 171.2px;
      height: 108px;
      line-height: 108px;
    }
    .el-progress-circle {
      width: 171.2px !important;
    }
    .sc-upload .img-uploader .el-progress svg {
      width: 108px;
      height: 108px;
    }
  }
</style>
