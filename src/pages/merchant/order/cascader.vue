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
               placeholder="请选择直辖区">
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

  @Watch('value', { immediate: true })
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

  @Watch('form', { deep: true })
  onFormChange(form: obj) {
    this.$emit('update:value', form);
  }

  provinces: Option[] = [];

  citys: Option[] = [];

  areas: Option[] = [];

  onProvinceChange(value: string) {
    console.log('province: ', value);
    this.getCity(value);
  }

  onCityChange(value: string) {
    console.log('city: ', value);
    this.getArea(value);
  }

  getProvince() {
    this.$http
      .get(this.$api.merchant.order.address.province, {})
      .then((res) => {
        const options =
          res.data && res.data.map((e: obj) => ({ label: e.province, value: e.provinceid }));
        this.provinces = options || [];
      })
      .catch((err) => {
        this.$utils._ResponseError(err);
      });
  }

  getCity(id: string) {
    const api = this.$api.merchant.order.address.city;
    const params = { provinceid: id };
    this.$http
      .get(api, params)
      .then((res) => {
        const options = res.data && res.data.map((e: obj) => ({ label: e.city, value: e.cityid }));
        this.citys = options || [];
      })
      .catch((err) => {
        this.$utils._ResponseError(err);
      });
  }

  getArea(id: string) {
    const api = this.$api.merchant.order.address.area;
    const params = { cityid: id };
    this.$http
      .get(api, params)
      .then((res) => {
        const options =
          res.data && res.data.map((e: obj) => ({ label: e.province, value: e.provinceid }));
        this.areas = options || [];
      })
      .catch((err) => {
        this.$utils._ResponseError(err);
      });
  }

  mounted() {
    this.getProvince();
  }
}
</script>
