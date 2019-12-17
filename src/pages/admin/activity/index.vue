<template>
  <div>
    <sc-min-table ref="table"
                  :row-class-name="tableRowClassName"
                  :columns-handler="columnsHandler"
                  :columns-schema="columnsSchema"
                  :columns-events='columnsEvents'
                  :columns="columns"
                  :table-config="tableConfig"
                  @table-emitTableHandlerClick="onTableHandlerClick">
    </sc-min-table>

    <el-dialog :title="dialog.title"
               :visible.sync="dialog.visible">
      <sc-upload v-if="dialog.visible"
                 ref="ElUpload"
                 :limit="1"
                 v-model="dialog.value"></sc-upload>
      <span slot="footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary"
                   @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>
<script lang='ts'>
import { Component, Vue, Ref } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { obj } from '@/lib/@types/sc-param.d';

const columns: ScTable.SetColumns = [
  ['序列号', 'listsort', 200],
  ['类型', 'title'],
  ['图片', 'img', 300, null, 'img'],
];

@Component
export default class ActvIndex extends Vue {
  @Ref('table') table!: ScTable;

  columns = this.$utils._SetTableColumns(columns);

  columnsHandler: ScTable.ColumnsHandler = [
    {
      name: 'upload',
      title: '上传图片',
      handler: ({ row, column, $index }) => !row.img,
    },
    {
      name: 'update',
      title: '更新图片',
      handler: ({ row, column, $index }) => row.img,
    },
  ];

  tableConfig: ScTable.TableConfig = {
    api: this.$api.admin.activity.index,
    handleWidth: 200,
    isPagination: false,
  };

  columnsSchema: ScTable.ColumnsSchema = {
    图片: {
      propsHandler: (prop) => ({ ...prop, height: 70, width: 100 }),
    },
  };

  columnsEvents = {
    index: {
      width: 200,
    },
  };

  dialog = {
    title: '更换图片',
    visible: false,
    value: null,
    id: null,
  };

  tableRowClassName({ row, rowIndex }: any) {
    return rowIndex % 1 ? '' : 'bg-primary-light-9';
  }

  async onSubmit() {
    try {
      const { id, value } = this.dialog;
      if (!value) {
        this.$message.warning('图片不能为空');
      }

      const api = this.$api.admin.activity.index.setActivity;
      const data = await this.$http.get(api, { id, img: value });

      this.dialog.value = null;
      this.dialog.id = null;
      this.dialog.visible = false;

      this.table.emitRefresh();

      this.$message.success(`${this.dialog.title}成功`);
    } catch (error) {
      console.log('error', error);
    }
  }

  onTableHandlerClick({ row, type }: { row: obj; type: string }) {
    if (type === 'upload') {
      this.dialog.title = '上传图片';
    } else if (type === 'update') {
      this.dialog.title = '更新图片';
    }
    this.dialog.value = row.img;
    this.dialog.id = row.id;
    this.dialog.visible = true;
  }
}
</script>
