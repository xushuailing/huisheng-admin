<template>
  <div class="upload-video">
    <el-upload ref="elUploadVideo"
               :class="['video-uploader', { 'hide-load': isLoad }]"
               list-type="picture-card"
               name="img"
               :action="action"
               :accept="fileType"
               :file-list="fileList"
               :before-upload="BeforeAvatarUpload"
               :on-success="onSuccess"
               v-bind="$attrs"
               v-on="$listeners">
      <div v-show="!isLoad">
        <i class="el-icon-video-play"></i>
        <div class="font-info">选择视频</div>
      </div>
      <div slot="file"
           slot-scope="{file}">
        <video :src="file.url"
               height="86"
               class="video"></video>
        <el-progress v-if="file.percentage&&file.percentage<100"
                     type="circle"
                     :percentage="formatPercentage(file.percentage)"
                     class="bg-white"></el-progress>
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview"
                @click="onPreview(file)">
            <i class="el-icon-video-play"></i>
          </span>
          <span v-if="!$attrs.disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>

    <sc-dialog ref="scDialog"
               append-to-body
               custom-class="sc-dialog__img"
               :visible.sync="dialogVisible">
      <video slot="conter"
             :src="dialogUrl"
             controls
             alt />
    </sc-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Ref, Prop } from 'vue-property-decorator';
import {
  ElUploadInternalFileDetail,
  ElUploadProgressEvent,
  ElUpload,
  ElUploadInternalRawFile,
} from 'element-ui/types/upload.d';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class UploadVideo extends Vue {
  @Prop([String, Array]) value!: string | string[];

  @Ref('elUploadVideo') $upload!: ElUpload;

  action = this.$api.files.setImg;

  fileType = ['avi', 'flv', 'mp4', '3gp', 'mov', 'm4v', 'wmv', 'rmvb']
    .map((t) => `.${t}`)
    .join(',');

  fileSize = 10000;

  fileList: ElUploadInternalFileDetail[] = [];

  uploadFileList: ElUploadInternalFileDetail[] = [];

  @Watch('value')
  onValueChange(val: string[]) {
    this.init(val);
  }

  init(url: String[]) {
    const urls = this.$utils._DataTypeChange(url);
    const list: any[] = [];
    urls.forEach((e, i) => {
      const arr = this.$utils._DataTypeChange(e, '/');
      const name = arr[arr.length - 1];
      const file = this.fileList.find((f: obj) => ((f.response && f.response.url) || f.url) === e);
      list.push({
        uid: (file && file.uid) || i,
        name: (file && file.name) || name,
        url: e,
      });
    });
    this.fileList = list;
  }

  @Watch('fileList')
  onFileListChange(val: ElUploadInternalFileDetail[]) {
    if (val) this.uploadFileList = ([] as ElUploadInternalFileDetail[]).concat(val);
  }

  get isLoad() {
    const attrs = this.$attrs;
    const limit = attrs.limit || 5;
    return limit <= this.uploadFileList.length;
  }

  BeforeAvatarUpload(file: ElUploadInternalFileDetail) {
    const { fileType, fileSize } = this;
    const isLt500k = file.size / 1024 < fileSize * 1024;
    const isType = true;
    if (!isLt500k) {
      this.$message.error(`上传文件大小不能超过 ${fileSize}M!`);
    }
    const flag = isType && isLt500k;
    if (flag) this.uploadFileList.push(file);
    return flag;
  }

  formatPercentage(percentage: number) {
    return Math.abs(Number(percentage.toFixed(0)));
  }

  onPreview(file: ElUploadInternalFileDetail) {
    this.dialogUrl = file.url;
    this.dialogVisible = true;
  }

  onSuccess(res: obj, file: ElUploadInternalFileDetail, fileList: ElUploadInternalFileDetail[]) {
    this.uploadFileList = ([] as ElUploadInternalFileDetail[]).concat(fileList);
    this.$emit('input', fileList.map((v: obj) => (v.response && v.response.data) || v.url));
  }

  handleRemove(file: ElUploadInternalFileDetail) {
    const fileIndex = this.fileList.findIndex((v) => v.uid === file.uid);
    if (~fileIndex) {
      this.$upload.abort(file);
      this.fileList.splice(fileIndex, 1);
    }
  }

  dialogUrl? = '';

  dialogVisible = false;
}
</script>
<style lang='scss'>
  $num: 86px;
  .upload-video {
    .video-uploader {
      .el-upload--picture-card {
        height: $num;
        width: $num;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 1.8;
        i {
          font-size: 20px;
        }
      }
      &.hide-load .el-upload--picture-card {
        display: none;
      }
    }

    .el-progress {
      width: 100%;
      height: 100%;
      svg {
        height: $num;
        width: $num;
        padding: 5px;
      }
    }
    .el-upload-list__item {
      height: $num;
      width: $num;
    }
  }
</style>
