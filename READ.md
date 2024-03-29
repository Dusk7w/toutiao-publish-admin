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


7.复习-分页
分页的目的是为了缓解查询数据的压力，提高页面的响应速度，让用户更快的看到页面内容。

假如是固定的数据，例如10条，20条，以后不会增加了。那就没有必要分页，没有意义。

如果是动态产生的数据，例如文章列表，商品列表、评论列表。
数据量增加的越来越多。所以分页就是用来缓解数据查询和渲染的压力的。

数据库中有100条数据：
-第几页
-每页大小
后端会从数据库中获取数据，
假设每页10条数据
-请求第1页数据，1-10
-请求第2页数据，11-20
-请求第3页数据，21-30
-...
然后后端通过接口提供给前端使用。

-page     页码，默认第一页
-per_page 每页大小，默认每页10条数据

8.数据筛选
-接口的参数
-通过表单的交互得到接口参数

9.axios
//Method请求方法，常见的有:
GET（ 一般用于查询）、
POST（一般用于添加）、
PUT（一般用于修改，完整替换）、
DELETE（一般用于删除操作）、
PATCH （一般用于修改操作，局部修改），从使用角度不用关心为什么，因为这是后端设计的，我们决定不了。

axios({
  //请求方法
  method：'post',   

  //PATH请求路径
  url：'请求路径',  

  //请求路径中的：xxx 表示路径参数
  //使用的时候需要指定参数，把数据值替换掉:xxx，这个参数是拼接到url路径中的
  url：'/mp/v1_0/articles/:target",

  url：'/mp/v1_0/articles/1",
  url：'/mp/v1_0/articles/2",

  //在axios中通过headers选项设置请求头参数
  headers:{
    //名字：值
    //因为axios发送的请求默认会设置'Content-Type':application/json'
    Content-Type：'application/json
    <!--添加用户身份的代码 放在请求拦截器中 统一处理 -->
    Authorization:用户token
  }

  //axios中通过data选项设置Body请求体参数
  data：{
      mobile:'',
      code:''
  }

  //axios中通过params选项设置Query参数
  //Query参数也叫查询参数
  //如果有Query参数，axios会在内部把这个对象转为key=value&key=value的数据格式，然后以？分割频道的ur1的后面传递给接口。
  params:{
    status:2
  }
})

请求参数：
  -请求头Headers
  -查询参数Query
  -请求体Body
  -路径参数