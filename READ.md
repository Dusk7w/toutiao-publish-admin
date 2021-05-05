1、后端返回的数据都是字符串
我们可以通过调试工具中的Network-> Response
网络面板看到原始的返回数据

2、我们在项目中使用axios发出的请求
axios为了方便，它会在内部把原始的JSON格式字符串转为Javascript 对象

3.JS大数字问题
JSON.parse("1253585734669959168")
  =>  1253585734669959200

4.删除文章失败 400 原因：
在删除文章的时候，删除的不是真正的id
后端传来的id:1253585734669959168 是字符串
请求时 会把这个响应数据转为js对象 id类型会还原为数字
在还原数字过程中会出现问题，超出精度 表示不了
就不是原来的id了

5.解决方法：json-bigint 第三方包
npm i json-bigint 
const str = '{"id" : 1253585734669959168}'
JSON.parse(str)     =>  1253585734669959200
JSONbig.parse(str)  =>  BigNumber 12535,85734669959168
<!-- JSONbig会把超出JS安全整数范围的数字转为一种类型为BigNumber的对象 
我们在使用的时候需要把这个BigNumber.toString()就能得到原来正确的数据-->
JSONbig.parse(str).id.toString  =>  1253585734669959168

const data = JSONbig.parse(str)
JSON.stringify(data)  =>  {"id" : "1253585734669959168"} 普通JSON转换后是字符id
JSONbig.stringify(data)  =>  {"id" : 1253585734669959168} JSONbig可以正确还原为数字id

6.解决思路：
Axios会在内部使用JSON.parse把后端返回的数据转为JS数据对象
所以 不要让Axios使用JSON.parse来转换这个数据，而是使用json-bigint做转换处理
axios提供了一个API：
//定义后端返回的原始数据处理
//参数data就是后端返回的原始数据（未经处理的JSON格式字符串）
transformResponse: [function (data) {
  <!-- axios默认在 内部使用JSON.parse 来转换处理原始数据-->

    return JSON.parse(data);
  }],
