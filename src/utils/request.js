// 基于 axios 封装的请求模块

import axios from 'axios'

// 创建一个axios实例，复制了一个axios，通过这个实例去发送请求，把需要的配置 配置给这个实例
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net'
})

// 请求拦截器
// https://github.com/axios/axios
request.interceptors.request.use(
  // 任何所有请求会经过这里，调用这个函数
  // 参数config是当前请求相关的配置信息对象
  // config是可以修改的
  function (config) {
    // console.log(config);

    const user = JSON.parse(window.localStorage.getItem('user'))
    // 如果有登录用户信息，则统一设置token
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }

    // 然后我们就可以在允许请求出去之前定制统一业务功能处理
    // 例如：统一的设置token

    // 当这里return config之后 请求才会在真正的发出去
    return config
  },
  // 请求失败，会经过这里
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器

// 导出请求方法
export default request

