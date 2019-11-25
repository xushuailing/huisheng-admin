<template>
  <div class="upload-container">
    <el-button icon="el-icon-upload"
               size="mini"
               type="primary"
               @click="dialogVisible = true">
      本地图片
    </el-button>
    <el-dialog :visible.sync="dialogVisible"
               title="请上传本地图片">
      <sc-upload ref="ElUpload"
                 :limit="5"
                 :fileType="[]"
                 v-model="defaultFileList">

      </sc-upload>

      <div slot="footer">
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary"
                   @click="handleSubmit">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ElUploadInternalRawFile, ElUpload } from 'element-ui/types/upload';

export interface IUploadObject {
  hasSuccess: boolean;
  uid: number;
  url: string;
  width: number;
  height: number;
}

@Component({
  name: 'EditorImageUpload',
})
export default class extends Vue {
  $refs!: {
    ElUpload: ElUpload;
  };

  private dialogVisible = false;

  private defaultFileList = '';

  private handleSubmit() {
    const arr = this.$utils._DataTypeChange(this.defaultFileList).map((v) => ({ url: v }));
    this.$emit('successCBK', arr);
    this.defaultFileList = '';
    this.dialogVisible = false;
  }
}
</script>
