/**
 * 文章相关的接口请求模块
 */
import request from "@/utils/request"

//  获取文章列表
// 用户传递对象进来，声明params参数来接收用户传递来的数据，把数据设置给请求的params
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
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
    method: 'GET',
    url: '/mp/v1_0/channels',
  })
}

//  删除文章
export const deleteArticle = articleId => {
  return request({
    method: 'DELETE',
    // 接口文档中写的路径参数需要再url中传递
    // 接口路径中有 :xxx 格式的字段，则需要传递路径参数
    url: `/mp/v1_0/articles/${articleId}`,
    // 根据文章id删除指定文章 ES6拼接
  })
}

//  新建文章
// 第二个参数不传 默认为 false 不存为草稿
export const addArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    // Query 参数
    params: {
      // draft:draft  //同名简写
      draft //是否存为草稿，true为草稿
    },
    // 请求体 body 数据
    // data:data
    data
  })
}

//  编辑文章
// 路径参数 文章id articleId ES6拼接
export const updateArticle = (articleId, data, draft = false) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      draft //是否存为草稿，true为草稿
    },
    data
  })
}

//  获取指定文章
export const getArticle = articleId => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}`,
  })
}