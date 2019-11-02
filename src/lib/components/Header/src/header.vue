<template>
  <div class='sc-header'>
    <div class="sc-header_info">
      <span>{{title}}</span>
      <u>{{desc}}</u>
    </div>
    <div class="sc-header_btn">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ScHeader',
  props: {
    header: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    title() {
      return this.header.title || this.$route.name;
    },
    desc() {
      return this.header.desc || this.$route.meta.description;
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang='scss' scoped>
.sc-header {
  display:flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  &_info {
    margin-bottom: 18px;
    font-size: 16px;
    border-left: 2px solid #ccc;
    color: #333;
    padding-left: 10px;
    u {
      font-size: 12px;
      color: #666;
      padding-left: 5px;
    }
  }
}
</style>
