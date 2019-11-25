<template>
  <section class="sc-upload">
    <template v-if="type === 'img'">
      <el-upload ref="elUploadImg"
                 v-bind="attrs"
                 :class="['img-uploader', { 'hide-load': isLoad }]"
                 list-type="picture-card"
                 :file-list="fileList"
                 :on-preview="onPreview"
                 :on-success="onSuccess"
                 :on-remove="onRemove"
                 :before-upload="BeforeAvatarUpload"
                 :http-request="httpRequest"
                 v-on="listeners">
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <sc-dialog ref="scDialog"
                 :visible.sync="dialogVisible"
                 :isOpenFull="false"
                 custom-class="sc-dialog__img">
        <img slot="conter"
             style="max-width:900px;max-height:500px"
             :src="dialogImageUrl"
             alt />
      </sc-dialog>
    </template>
    <template v-if="type === 'file'">
      <el-upload ref="elUploadFile"
                 v-bind="attrs"
                 :class="['file-uploader', { 'hide-load': isLoad }]"
                 :file-list="fileList"
                 :on-success="onSuccess"
                 :on-remove="onRemove"
                 :before-upload="BeforeAvatarUpload"
                 :http-request="httpRequest"
                 v-on="listeners">
        <el-button size="small"
                   v-show="!isLoad">点击上传</el-button>
      </el-upload>
    </template>
  </section>
</template>

<script lang="js">
import axios from 'axios';

export default {
  name: 'ScUpload',
  props: {
    // 上传接口
    action: String,

    // 上传后访问链接是否直接下载
    isDownloadFile: Boolean,

    // 上传类型
    type: {
      type: String,
      default: 'img',
    },

    // 自定义接口配置
    custom: {
      type: Object,
      default: () => ({}),
    },

    // 默认数据
    value: [String, Array],
  },
  watch: {
    value(val) {
      this.onReset(val);
      if (!val) {
        this.resetForm();
      }
    },
    fileList(val) {
      if (val) this.uploadFileList = [].concat(val);
    },
  },
  data() {
    return {
      attrs: {},
      fileConfig: {},
      fileList: [],
      uploadFileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      storageFileId: [],
    };
  },
  created() {
    const FILE_OPTION = ['fileType', 'fileSize'];
    const action = this.action || this.$api.files.upload;
    const bind = {};
    const file = {};
    let config = {};

    for (const key in this.$attrs) {
      const e = this.$attrs[key];
      if (FILE_OPTION.includes(key)) {
        file[key] = e;
      } else {
        bind[key] = e;
      }
    }

    if (this.type === 'img') {
      config = {
        fileType: ['image/jpeg', 'image/png'],
        fileSize: 5,
      };
    } else {
      config = {
        fileSize: 10,
        fileType: [],
      };
    }

    const headers = { timeout: 60000 };

    this.attrs = Object.assign({}, { action, headers }, bind);
    this.fileConfig = Object.assign({}, config, file);
    this.$emit('emitUploadThis', this);
    this.init();
  },
  computed: {
    listeners() {
      return this.$listeners;
    },
    isLoad() {
      const attrs = this.$attrs;
      const limit = attrs.limit || 5;
      return limit <= this.uploadFileList.length;
    },
  },
  methods: {
    init() {
      // 默认数据
      let ids = this.value;

      if (!(ids && ids.length)) {
        this.fileList = [];
        return;
      }

      if (this.$utils._DataTypeJudge(ids) === '[object String]') {
        ids = this.$utils._DataTypeChange(ids);
      }

      if (!ids.every((v) => !!Number(v))) {
        const url = this.$utils._DataTypeChange(ids);
        url.forEach((e) => {
          const arr = this.$utils._DataTypeChange(e, '/');
          const name = arr[arr.length - 1];
          this.fileList.push({ name, url: e });
        });
      }
    },

    BeforeAvatarUpload(file) {
      const { type } = this;
      const { fileType, fileSize } = this.fileConfig;
      const isLt500k = file.size / 1024 < fileSize * 1024;
      const msg = type === 'img' ? '图片' : '文件';
      let isType = fileType.length ? fileType.includes(file.type) : true;
      if (type === 'file') {
        const arr = file.name.split('.');
        const T = arr[arr.length - 1];
        isType = fileType.length ? fileType.includes(T) : true;
      }

      if (!isType) {
        const Reg = type === 'img' ? /image\//g : /\./g;
        this.$message.error(`只能上传${fileType.join(',').replace(Reg, '')}的格式${msg}!`);
      }

      if (!isLt500k) {
        this.$message.error(`上传${msg}大小不能超过 ${fileSize}M!`);
      }
      const flag = isType && isLt500k;
      this.$emit('emitBeforeUpload', flag, file);
      if (flag) this.uploadFileList.push(file);

      return flag;
    },

    onPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      this.$emit('emitPreview', file);
    },

    onSuccess(res, file, list) {
      this.$message.success('上传成功');
      this.progress = 100;
      this.emitUploadFile(list);
      this.$emit('emitUploadComplete', true, res);
      this._upload = true;
    },

    onError(err, msg) {
      this.$message.error(msg);
      this.$emit('emitUploadComplete', false, err);
    },

    onRemove(file, list) {
      if (this.source) {
        this.source.cancel('取消上传');
        this.isSource = true;
      }
      this.emitUploadFile(list);
      this.$emit('emitRemove', file, list);
      this._remove = true;
    },

    emitUploadFile(list) {
      this.uploadFileList = [].concat(list);
      const data = list.map((v) => (v.response && v.response.url) || v.url).join(',');
      this.$emit('input', data);
    },

    resetForm() {
      let refs = this.$refs.elUploadImg;
      if (this.type === 'file') {
        refs = this.$refs.elUploadFile;
      }
      refs.clearFiles();
    },

    httpRequest(data) {
      const { CancelToken } = axios;
      this.source = CancelToken.source();
      this.isSource = false;
      const { action, file, onSuccess, onError, headers, onProgress } = data;
      const onUploadProgress = (event) => {
        const { loaded, total } = event;
        const num = Math.floor((loaded / total) * 100);
        const progress = { ...event, percent: num === 100 ? 99 : num };
        if (!this.isSource) {
          onProgress(progress);
        }
      };
      const custom = Object.assign(
        {},
        { onUploadProgress, cancelToken: this.source.token },
        headers,
        this.custom,
      );

      const formData = new FormData();

      if (this.isDownloadFile) {
        formData.append('disposition', 'attachment;filename=');
      }

      formData.append('img', file);

      this.$http
        .post(action, formData, custom)
        .then((res) => {
          onSuccess({ url: res.data[0], uid: file.uid, name: file.name });
          // if (Array.isArray(res.data)) {
          //   onSuccess(res.data[0]);
          // } else {
          //   onSuccess(res.data);
          // }
        })
        .catch((err) => {
          let msg = '上传失败';
          if (JSON.stringify(err).includes('timeout')) {
            msg = '上传超时';
          } else if (err.message) {
            msg = err.message;
          }
          this.onError(err, msg);
        });
    },

    onReset(val) {
      if (this._upload || this._remove) {
        this._remove = false;
        this._upload = false;
        return;
      }
      this.init();
    },
  },
  mounted() {
    // this.init();
  },
};
</script>
<style lang="scss">
$num: 86px;
.sc-upload {
  .img-uploader {
    // min-height: $num;
    // overflow: hidden;
    // display: flex;
    .el-upload--picture-card {
      height: $num;
      width: $num;
      line-height: $num;
      // display: flex;
      // justify-content: center;
      // align-items: center;
      i {
        font-size: 20px;
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
  .file-uploader.hide-load {
    .el-upload {
      display: block;
    }
  }
  .hide-load .el-upload--picture-card {
    display: none;
  }
}
</style>
