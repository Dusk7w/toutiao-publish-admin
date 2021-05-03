/**
 * 用户相关的请求模块
 */

import request from "@/utils/request";

// 用户登录
export const login = data => { //22.data形参去接收login(this.user)传来的参数
  return request({ //直接把结果return出去
    method: "POST",
    url: '/mp/v1_0/authorizations',
    // data用来设置POST请求体
    // data: data //把用户传来的值给data，ES6中对象的属性和属性名同名的时候可以简写
    data //33.最终传递给请求方法中的data
  })
}

// 获取用户信息
export const getUserProfile = () => {
  // 使用localStorage.getItem去获取user
  // 获取到的是JSON格式的字符串，再还原回js对象
  // const user = JSON.parse(window.localStorage.getItem('user'))
  // console.log(user);
  return request({
    method:'GET',
    url:'/mp/v1_0/user/profile',
    // 后端要求把需要授权的用户身份放到请求头中
    // axios可以通过headers选项设置请求头
    // headers:{
    //   // 属性名和值都得看接口的要求
    //   // 属性名：Authorization，接口要求的
    //   // 属性值：Bearer空格token数据 （Bearer持票人）
    //   // 请求身份：token是登录成功后，后端给返回的数据
    //   // Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTE0NzE5NzIsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.ydeCQit1IRNPngLyzbiYxINTqZHU02Ix6eRvVqvdpII'
    //   // 使用ES6反引号 拼接数据 ` ${拼接的数据}`
    //   Authorization:`Bearer ${user.token}`
    // }
  })
}

// // 修改用户信息
// export const UpdateUser = () => {

// }