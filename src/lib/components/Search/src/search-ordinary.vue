<template>
  <div class="ScSearchOrdinary">
    <el-input v-if="isPlain"
              placeholder="请输入内容"
              size="small"
              @keyup.enter.native="onSearchSubmit(input.value)"
              clearable
              v-model="input.value"
              @clear="onResetFields">
      <el-button slot="append"
                 @click="onSearchSubmit(input.value)"
                 icon="el-icon-search"></el-button>
    </el-input>
    <el-input v-else
              placeholder="请输入内容"
              size="small"
              clearable
              @keyup.enter.native="onSearchSubmit(input.value)"
              v-model="input.value"
              @clear="onResetFields">
      <el-select v-model="input.prop"
                 style="width:100px"
                 clearable
                 slot="prepend"
                 placeholder="请选择">
        <template v-for="item in searchConfig.data">
          <el-option v-if="item.isSelect"
                     :key="item.value"
                     :label="item.label"
                     :value="item.prop">
          </el-option>
        </template>

      </el-select>
      <el-button slot="append"
                 @click="onSearchSubmit(input.value)"
                 icon="el-icon-search">
      </el-button>
    </el-input>
  </div>
</template>
<script>
export default {
  name: 'ScSearchOrdinary',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      input: {
        value: null,
        prop: null,
      },
      searchConfig: this.config,
    };
  },
  computed: {
    isPlain() {
      const { model } = this.searchConfig;
      if (!model || model === 'ordinary') {
        return this.searchConfig.type !== 'senior';
      }
      return false;
    },
  },
  methods: {
    async onSearchSubmit(flag) {
      const data = this.input;
      let arr = [];
      if (data.prop) {
        data.operate = 'LIKE';
        arr = [{ exps: [data] }];
      } else if (this.$utils._DataTypeJudge(this.searchConfig.data) === '[object Array]') {
        this.searchConfig.data.forEach((v) => {
          if (v.isSelect) {
            arr.push({
              value: data.value,
              prop: v.prop,
              operate: 'LIKE',
              lr: 'or',
            });
          }
        });
        arr = [{ exps: arr }];
      }
      arr = flag ? arr : null;

      const { handleSubmit: handle } = this.searchConfig;

      arr = handle ? await handle(arr, this) : arr;

      // 为 null 时, 为清空查询条件
      if (!this.$utils._DataIsEmpty(arr) && arr !== null) return;

      this.$emit('emitSearchSubmit', arr, 'searchInput');
    },
    onResetFields() {
      this.$emit('emitSearchReset');
    },
  },
};
</script>
