/* eslint-disable arrow-body-style */
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig, AxiosPromise } from 'axios';
import { Message } from 'element-ui';
import utils from '../utils';

interface Request {
  <T = any>(url: string, param?: object, custom?: AxiosRequestConfig): AxiosPromise<T>;
}

interface ResponseData {
  data: any;
  code: number;
  msg: string;
}
interface ResponseData {
  data: any;
  status: number;
  message: string;
}

const errorMessage = (message: string) => {
  Message({ type: 'error', message, duration: 2000 });
};

const Token = (): object => {
  const Authorization = utils._Storage.get('TOKEN') || null;
  return Authorization ? { Authorization: `bearer ${Authorization}` } : {};
};

const successResponse = (res: AxiosResponse) => {
  const { code, msg } = res.data;

  if (Number(code) !== 0 && msg) errorMessage(msg);

  return res;
};

const errorResponse = (err: AxiosError) => {
  let errMag = '连接到服务器失败';
  if (err && err.response) {
    const { status } = err.response;
    switch (status) {
      case 400:
        errMag = '错误请求';
        break;
      case 401:
        errMag = '权限不足/令牌过期';
        break;
      default:
        errMag = `连接错误${status}`;
    }
    // if (status === 401) {
    //   if (!isDev) {
    //     utils._UserInfo._RemoveAll();
    //     setTimeout(() => {
    //       window.router.push('/login');
    //     }, 800);
    //   }
    // }
  }
  errorMessage(errMag);
  return Promise.reject(err);
};

// 最大等待时间
axios.defaults.timeout = 20000;

// 设置默认请求头
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest',
};

// 请求拦截器
axios.interceptors.request.use(
  (res) => res,
  (error) => {
    utils._ResponseError(error);
    return Promise.reject(error);
  },
);

// 响应拦截器即异常处理
axios.interceptors.response.use(successResponse, errorResponse);

const get: Request = (url, param = {}, custom = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get<ResponseData>(url, { params: param, ...custom })
      .then((res) => {
        if (Number(res.data.code) === 0 || res.data.status) {
          resolve(res.data as any);
        } else {
          reject(res.data);
        }
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};

const post: Request = (url, param = {}, custom = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .post<ResponseData>(url, param, custom)
      .then((res) => {
        if (Number(res.data.code) === 0 || res.data.status) {
          resolve(res.data as any);
        } else {
          reject(res);
        }
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};

export default {
  /** get请求 */
  get,
  /** post请求 */
  post,
  /** axios请求 */
  axios<T = any>(custom: AxiosRequestConfig = {}): AxiosPromise<T> {
    return axios(custom);
  },
  /** 获取token */
  getToken: Token(),
};
