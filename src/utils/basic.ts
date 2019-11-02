import VueRouter, { Route } from 'vue-router';
import { AxiosResponse } from 'axios';
import storage from './storage';

/**
 * 根据环境来加载资源方式
 *
 * @returns {string}
 */
export const _CdnPath = (): string => {
  const cdn = 'https://oss.shencom.cn';
  const oss = 'https://scplugins.oss-cn-shenzhen.aliyuncs.com';
  const isDev = process.env.NODE_ENV === 'development';
  const isPro = process.env.VUE_APP_IS_PRO;
  const cndPath = isPro ? cdn : oss;
  return isDev ? '../assets' : `${cndPath}/plugins${isPro ? '' : '/test'}/scloud/lib`;
};

/**
 * 下载文件
 *
 * 文件名为空时,使用后端返回的名字
 *
 * @param {AxiosResponse} response 请求数据
 * @param {string} [name] 文件名
 */
export const _ExportsFile = (response: AxiosResponse, name?: string) => {
  const { data } = response;
  let fileName = name;
  if (!data) return;
  if (!name) {
    const { request } = response;
    const disposition = request.getResponseHeader('Content-Disposition');
    if (disposition && disposition.includes('attachment')) {
      [, fileName] = disposition.split('=');
    }
  }
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');

  link.style.display = 'none';
  link.href = url;
  link.setAttribute(
    'download',
    decodeURI((fileName && fileName.replace(/^"|"$/g, '')) || '文件.xls'),
  );

  document.body.appendChild(link);
  link.click();
};

/**
 * 跳转首页
 *
 * @param {VueRouter} router
 */
export const _GoHomeRouter = (router: VueRouter) => {
  const path = '/';
  router.push(path);
};
