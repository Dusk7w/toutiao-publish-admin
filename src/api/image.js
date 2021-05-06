/**
 * 素材请求相关模块
 */

import request from '@/utils/request'

// 上传图片素材
export const uploadImage = data => {
  return request({
    method:'POST',
    url:'/mp/v1_0/user/images',
    // 一般文件上传的接口都要求把请求头中的Content-Type
    // 设置为multipart/form-data
    // 使用axios上传文件的话不需要手动设置，只要给data一个FormData对象即可
    // new FormData()
    data
  })
}

/**
 * FormData的主要用途有两个：
1、将form表单元素的name与value进行组合，实现表单数据的序列化，从而减少表单元素的拼接，提高工作效率。
2、异步上传文件

https://blog.csdn.net/jyn15159/article/details/108973373

// 创建一个空的FormData对象
let fd = new FormData();
// fd可以通过调用append()方法给自己添加成员信息
// 语法：fd.append(name,value)
// append():既可以添加普通表单域信息，也可以添加文件表单域信息
let ff = document.getElementById('pic').files[0] // 获得上传附件对象信息
fd.append('username',document.getElementById('username').value)
fd.append('pwd',document.getElementById('pwd').value)
fd.append('pic',ff)
// 通过axios把上传文件传递给服务器端
axios.post(url, fd)
 */