/* eslint-disable arrow-body-style */
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig, AxiosPromise } from 'axios';
import { Message } from 'element-ui';
import utils from '../utils';

interface Request {
  <T = any>(url: string, param?: object, custom?: AxiosRequestConfig): AxiosPromise<T>;
}

const Scid = () => {};
const isDev = process.env.NODE_ENV === 'development';

const errorMessage = (message: string) => {
  Message({ type: 'error', message, duration: 2000 });
};

const Token = (): object => {
  const Authorization = utils._Storage.get('TOKEN') || null;
  return Authorization ? { Authorization: `bearer ${Authorization}` } : {};
};

const successResponse = (res: AxiosResponse) => {
  const { errcode, errmsg } = res.data;

  if (errcode !== '0000' && errmsg) errorMessage(errmsg);

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
    if (status === 401) {
      if (!isDev) {
        utils._UserInfo._RemoveAll();
        setTimeout(() => {
          window.router.push('/login');
        }, 800);
      }
    }
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
  (res) => {
    const config = res;
    const scid = Scid();
    const { headers } = config;
    if (!headers.scid) {
      headers.scid = scid;
    }
    if (headers.Authorization === null) {
      return config;
    }
    const token = Token();
    if (!Object.keys(token).length) {
      delete headers.Authorization;
    } else {
      Object.assign(headers, token);
    }
    config.headers = headers;
    return config;
  },
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
      .get(url, { params: param, ...custom })
      .then((res: AxiosResponse) => {
        if (res.data.errcode === '0000') {
          resolve(res);
        } else {
          reject(res);
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
      .post(url, param, custom)
      .then((res: AxiosResponse) => {
        if (res.data.errcode === '0000') {
          resolve(res);
        } else {
          reject(res);
        }
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};

const spPost: Request = (url, data = {}, custom = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, custom)
      .then((res: AxiosResponse) => {
        if (res.status > 199 && res.status < 300) {
          resolve(res);
        } else {
          reject(res);
        }
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};

const spGet: Request = (url, param = {}, custom = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: param, ...custom })
      .then((res: AxiosResponse) => {
        if (res.status > 199 && res.status < 300) {
          resolve(res);
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
  /** spPost请求 */
  spPost,
  /** spGet请求 */
  spGet,
  /** axios请求 */
  axios<T = any>(custom: AxiosRequestConfig = {}): AxiosPromise<T> {
    return axios(custom);
  },
  /** 获取scid */
  getScid: Scid(),
  /** 获取token */
  getToken: Token(),
};
