// 基于 axios 封装的请求模块

import axios from 'axios'

// 创建一个axios实例，复制了一个axios，通过这个实例去发送请求，把需要的配置 配置给这个实例
const request = axios.create({
  baseURL:'http://api-toutiao-web.itheima.net'
})

// 请求拦截器

// 响应拦截器

// 导出请求方法
export default request

