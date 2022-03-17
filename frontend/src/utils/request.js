import axios from 'axios';
import { Message } from 'element-ui';
import router from '../router';
import store from '../store'
const qs = require('qs');
import { getToken } from '@/utils/auth'

const pending = [];
const cancelToken = axios.CancelToken

// 重复请求处理
const removePending = (config, fn) => {
  // 生成地址加请求方式的唯一值
  const flagUrl = config.url + '&' + config.method
  // 当前请求存在队列中，取消第二次请求
  if (pending.indexOf(flagUrl) !== -1) {
    if (fn) {
      // f为实例化的cancelToken函数
      fn()
    } else {
      pending.splice(pending.indexOf(flagUrl), 1)
      // cancelToken不存在，则从队列中删除该请求
    }
  } else {
    // 当前请求不在队列中，就加进队列
    if (fn) {
      pending.push(flagUrl)
    }
  }
}

const service = axios.create({
  baseURL: '/',
  withCredentials: true,
  timeout: 100000
});
service.interceptors.request.use(
  (config) => {
    config.headers['token'] = getToken();
    if (config.method === 'post') {
      config.headers['Content-Type'] =
      config.headers['Content-Type'] || 'application/json;charset=UTF-8';
      if (config.url !== '/file/upload') { // 文件上传特殊处理
        config.cancelToken = new cancelToken(c => {
          removePending(config, c)
        })
      }
    }
    return config;
  },
  (error) => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    // 解除队列里面的请求
    if (response.config.method === 'post' && response.config.url !== '/file/upload') {
      removePending(response.config)
    }
    const res = response.data;
		console.log('AutoConsole: res', res)

    // 验证码功能 判断是否为图片 或者是 ArrayBuffer 数据
    if (res instanceof ArrayBuffer) {
      const buffer = new DataView(res);
      if (ArrayBuffer.isView(buffer)) {
        return res
      }
    }

    if (!res.success) {
      // 错误收集
      // if (!store.state.errorLog) {
      //   Message({
      //     message: res.msg || "error",
      //     type: "error",
      //     duration: 5 * 1000,
      //   });
      //   store.commit('SetErrorLog', true)
      //   setTimeout(() => {
      //     store.commit('SetErrorLog', false)
      //   }, 2000);
      // }
      Message.closeAll();
      Message({
        message: res.errorMsg || 'error',
        type: 'error',
        duration: 5 * 1000
      });
      // if (res.status === '-112') {
      //   localStorage.clear();
      //   router.push(`/login`);
      // }
      return Promise.reject(res.errorMsg || 'error');
    } else {
      return res;
    }
  },
  (error) => {
    console.log(error); // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
