<template>
  <div class='new-list'>
    <sc-min-table stripe
                  ref="table"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :columns-props="{align:'center'}"
                  :table-config="tableConfig"
                  :formAddConfig="addConfig"
                  :search-config="searchConfig">
    </sc-min-table>
  </div>
</template>
<script lang='ts'>
import { Component, Mixins } from 'vue-property-decorator';
import ListMixin from './mixins/list';

@Component
export default class ActvNew extends Mixins(ListMixin) {
  activity_id = '4';
}
</script>
