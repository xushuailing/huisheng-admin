import Vue from 'vue';

export interface ScUpload {
  /** 上传组件实例 */
  emitUploadThis?: () => Vue;
  /** 上传前钩子函数 */
  emitBeforeUpload?: () => void;
  /** 上传成功钩子函数 */
  emitUploadComplete?: () => void;
  /** 上传进度条钩子函数 */
  emitPreview?: () => void;
  /** 移除钩子函数 */
  emitRemove?: () => void;
  /** 数据更新 */
  input?: () => void;
}

declare namespace ScUpload {
  interface Config {
    /** 上传接口 默认 /service-file/file/upload */
    action?: string;

    /** 上传文件类型 */
    type?: 'img' | 'file';

    /** 上传后返回类型 */
    returnType?: 'id' | 'url';

    /** 自定义接口配置 */
    custom?: { [k: string]: string };

    /** 默认数据 */
    value?: string | string[];

    /** 上传后访问链接是否直接下载 */
    isDownloadFile: boolean;
  }
}
