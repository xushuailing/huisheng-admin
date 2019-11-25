<template>
  <div>
    <div class="stand">
      <ul>
        <li class="attr" v-for="(item,index) in standData" :key="index">
          <span @click="remove(index)">删除:</span>
          <el-input class="title" disabled v-model="item.title" placeholder="请输入规格名称">:</el-input>
          <!-- <span>请输入规格{{index+1}}名称</span> -->
          <template v-if="item.attrs.length">
            <div class="putt" v-for="(subitem,i) in item.attrs" :key="i">
              <el-input v-model="subitem.attr" placeholder="请输入值"></el-input>
              <div class="close" @click="closeAtrr(index,i)">×</div>
            </div>
          </template>
          <div class="append" @click="addAtrr(index)">+</div>
        </li>
      </ul>
      <div class="add">
        <el-button type="primary" @click="getTable">生成规格列表</el-button>
        <!-- <el-button type="primary" @click="read">读取规格列表</el-button> -->
      </div>

    </div>
    <div class="table">
      <el-table v-if="isTable" :data="tableData" border style="width: 100%">
        <el-table-column prop="title1" label="规格1" width="180">
        </el-table-column>
        <el-table-column prop="title2" label="规格2" width="180">
        </el-table-column>
        <el-table-column prop="price" label="价格">
        </el-table-column>
        <el-table-column prop="img" label="图片">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      input: '',
      isTable: false,
      standData: [
        {
          title: '请输入规格1名称',
          attrs: [],
        },
        {
          title: '请输入规格2名称',
          attrs: [],
        },
      ],
      list: [],
      group: [],
    };
  },
  created() {},
  methods: {
    // 添加规格表格
    getTable() {
      this.isTable = true;
      this.tableData = [];
      this.group = [];
      this.list = [];
      const specifice1 = this.standData[0].attrs;
      const specifice2 = this.standData[1].attrs;
      specifice1.forEach((v) => {
        specifice2.forEach((k) => {
          this.list.push({ title1: v.attr, title2: k.attr, price: '', img: '' });
        });
      });
      this.tableData = this.list;
    },

    // 删除规格行
    remove(i) {
      this.standData.splice(i, 1);
    },
    // 添加属性值
    addAtrr(i) {
      this.standData[i].attrs.push({ attr: '' });
    },
    // 删除属性值
    closeAtrr(a, b) {
      //   console.log(a, b);
      this.standData[a].attrs.splice(b, 1);
    },
    // 读取规格属性数组
    read() {
      // 如果后台返回的数据是这样的
      const arr = [
        '颜色:红色;尺码:M;品质:好;',
        '颜色:红色;尺码:S;品质:好;',
        '颜色:白色;尺码:M;品质:好;',
        '颜色:白色;尺码:S;品质:好;',
      ];
      const a = arr[0].split(';');
      const num = a.length - 1;
      let ss = [];
      for (let tt = 0; tt < num; tt++) {
        ss.push([]);
      }

      arr.forEach((item) => {
        for (let tt = 0; tt < num; tt++) {
          ss[tt].push(item.split(';')[tt].split(':')[1]);
        }
      });
      ss = ss.map((item) => Array.from(new Set(item)));
      for (let s = 0; s < ss.length; s++) {
        for (let t = 0; t < ss[s].length; t++) {
          ss[s][t] = { attr: ss[s][t] };
        }
      }
      for (let i = 0; i < num; i++) {
        this.standData.push({ title: a[i].split(':')[0], attrs: ss[i] });
      }
      console.log(this.standData);
    },
  },
};
</script>
<style>
.table,
.stand {
  padding: 40px;
}
.table {
  height: 500px;
}
.add {
  margin-top: 20px;
}
.attr {
  margin-bottom: 10px;
}
.el-input {
  width: auto;
}
.putt {
  display: inline-block;
  position: relative;
  margin-right: 10px;
}
.append {
  width: 40px;
  height: 40px;
  border: 1px solid #dcdfe6;
  line-height: 30px;
  text-align: center;
  display: inline-block;
  font-size: 28px;
  cursor: pointer;
  vertical-align: middle;
}
.title {
  background-color: bisque;
  margin-right: 10px;
}
.close {
  position: absolute;
  width: 15px;
  height: 15px;
  /* color: #409eff; */
  border: 1px solid #dcdfe6;
  border-radius: 50%;
  line-height: 11px;
  text-align: center;
  right: -5px;
  top: -5px;
  cursor: pointer;
}
</style>
