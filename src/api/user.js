/**
 * 用户相关的请求模块
 */

import request from "@/utils/request";

// 用户登录
export const login = data => { //22.data形参去接收login(this.user)传来的参数
  return request({ //直接把结果return出去
    method: "POST",
    url: "/mp/v1_0/authorizations",
    // data用来设置POST请求体
    // data: data //把用户传来的值给data，ES6中对象的属性和属性名同名的时候可以简写
    data //33.最终传递给请求方法中的data
  })
}

// // 获取用户信息
// export const getUserInfo = () => {

// }

// // 修改用户信息
// export const UpdateUser = () => {

// }