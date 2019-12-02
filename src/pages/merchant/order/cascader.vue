<template>
  <div class="Cascader">
    <el-select v-model="form.address_provinces_id"
               filterable
               placeholder="请选择省份"
               @change="onProvinceChange">
      <el-option v-for="item in  provinces"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="form.address_city_id"
               filterable
               class="ml-30"
               placeholder="请选择市区"
               @change="onCityChange">
      <el-option v-for="item in  citys"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="form.address_areas_id"
               filterable
               class="ml-30"
               placeholder="请选择直辖区"
               @change="onAreaChange">
      <el-option v-for="item in  areas"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';

interface Option extends obj {
  label: string;
  value: string;
}

@Component
export default class Cascader extends Vue {
  @Prop(Object) value!: object;

  @Watch('value')
  onValueChange(val: any) {
    if (val) {
      this.form = val;
    }
  }

  form = {
    address_provinces_id: '',
    address_city_id: '',
    address_areas_id: '',
  };

  @Watch('form')
  onFormChange(form: obj) {
    this.$emit('update:value', form);
  }

  provinces: Option[] = [];

  citys: Option[] = [];

  areas: Option[] = [];

  onProvinceChange(value: string) {
    console.log('province: ', value);
  }

  onCityChange(value: string) {
    console.log('city: ', value);
  }

  onAreaChange(value: string) {
    console.log('area: ', value);
  }
}
</script>
