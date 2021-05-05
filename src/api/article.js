/**
 * 文章相关的接口请求模块
 */
 import request from "@/utils/request"

//  获取文章列表
// 用户传递对象进来，声明params参数来接收用户传递来的数据，把数据设置给请求的params
export const getArticles = params => {
  return request({
    method:'GET',
    url:'/mp/v1_0/articles',
    // Body 参数使用 data 设置
    // Query 参数使用 params 设置
    // Headers 参数使用 headers 设置
    // params:params
    params  //简写
  })
}

//  获取文章频道数据
export const getArticlesChannels = () => {
  return request({
    method:'GET',
    url:'/mp/v1_0/channels',
  })
}