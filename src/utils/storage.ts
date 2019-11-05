/**
 * 本地存储方法
 *
 * @class Storages
 */
class Storages {
  private storage: Storage;

  private prefix: string;

  constructor() {
    this.storage = window.localStorage;
    this.prefix = 'sc_';
  }

  /**
   * 存数据
   *
   * @param {string} key 存储名称
   * @param {*} value 存储的值
   * @param {number} time 有效时间
   * @memberof Storages
   */
  public set(key: string, value: any, time: number = 0): void {
    const H = time * 1000 * 60;
    const now = new Date().getTime() + H;
    const data = JSON.stringify({ time: time ? String(now) : null, value });

    return this.storage.setItem(this.prefix + key, data);
  }

  /**
   * 取数据
   *
   * @param {string} key 存储名称
   * @param {Function} [fun] 获取存储后的回调
   * @returns {*} 存储的值
   * @memberof Storages
   */
  public get<T = any>(key: string): T | null {
    try {
      const data = this.storage.getItem(this.prefix + key);

      const value = data ? JSON.parse(data) : null;

      if (!value) return null;

      if (value.time) {
        const now = new Date().getTime(); // 当前时间
        if (Number(value.time) < now) {
          this.storage.removeItem(this.prefix + key);
          return null;
        }
        return value.value;
      }
      return value.value;
    } catch (error) {
      return null;
    }
  }

  /**
   * 删除本地存储
   *
   * @param {string} key 存储名称
   * @memberof Storages
   */
  public remove(key: string) {
    this.storage.removeItem(this.prefix + key);
  }

  /**
   * 遍历所有本地存储
   *
   * @param {(key: string, val: any) => void} fun
   * @memberof Storages
   */
  public each(fun: (key: string, val: any) => void) {
    const data = this.storage;
    let val = null;
    for (const k in data) {
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty(k)) {
        try {
          val = JSON.parse(data[k]);
          if (val.time) {
            val = val.value;
          }
          if (fun) fun(k, val);
        } catch (error) {
          throw new Error(`${error}--请使用 Storage 存储`);
        }
      }
    }
  }
}
export default new Storages();
