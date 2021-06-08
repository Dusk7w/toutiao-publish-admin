<template>
  <div class="publish-container">
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 路径导航 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{
            $route.query.id ? "修改文章" : "发布文章"
          }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑 路径导航 -->
      </div>
      <!-- 表单区域 -->
      <!-- :model="article" 只有在做表单验证的时候才是必须的 -->
      <el-form
        ref="publish-form"
        :model="article"
        :rules="formRules"
        label-width="60px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <!-- 富文本编辑器 -->
          <el-tiptap
            v-model="article.content"
            :extensions="extensions"
            lang="zh"
            height="350"
            placeholder="请输入文章内容"
          ></el-tiptap>
        </el-form-item>

        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道" prop="channel_id">
          <!-- 7.v-for 遍历 渲染 :lable :value 动态绑定值-->
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="(channel, index) in channels"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">{{
            $route.query.id ? "修改" : "发表"
          }}</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
      <!-- /表单区域 -->
    </el-card>
    <!-- /卡片区域 -->
  </div>
</template>

<script>
// 1.获取频道列表接口
import {
  getArticlesChannels,
  addArticle,
  updateArticle,
  getArticle,
} from "@/api/article";
// 111.引入 element-tiptap 富文本插件
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Image,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  HorizontalRule,
  Fullscreen,
  Preview,
  CodeBlock,
  TextColor,
} from "element-tiptap";
import "element-tiptap/lib/index.css";
import { uploadImage } from "@/api/image";

export default {
  name: "PublishIndex",
  // 222.组件注册
  components: {
    "el-tiptap": ElementTiptap,
  },
  data() {
    return {
      article: {
        title: "", //文章标题
        content: "", //文章内容
        cover: {
          //文章封面 cover是个对象
          type: 0, //  封面类型，-1自动 0无图 1单图 3 三图
          images: [], //封面图片的地址
        },
        // 8.在article中初始化数据
        channel_id: null,
      },

      // 2.定义频道数组，接收频道，发请求，把数据保存到这里，然后遍历到页面中
      channels: [], //文章频道列表

      // 编辑器的extensions
      // 按照声明的顺序被添加到菜单栏和气泡菜单中
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 3 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        // 在气泡菜单中渲染菜单按钮
        new Image({
          //默认会把图片生成base64字符串和内容存储在一起，
          // 如果需要自定义图片上传，
          uploadRequest(file) {
            // 如果接口要求Content-Type是multipart/form-data，则请求体必须使用FormData
            // console.log("uploadRequest");
            // console.log(file);

            //通过FormData构造函数创建一个空对象
            // 使用 append() 方法向该对象里添加字段
            const fd = new FormData();
            // 构建上传文件的表单对象，类型image，值file
            fd.append("image", file);
            // 把uploadImage的结果返回给uploadRequest（）函数
            // 第1个return返回Promise对象，因为axios本身所有的then都是返回Promise
            return uploadImage(fd).then((res) => {
              // console.log(res);
              // 第2个return返回最后的结果
              return res.data.data.url;
            }); // 图片的上传方法，返回一个Promise<url>
          },
        }),
        new Underline(), // 下划线
        new Italic(), // 斜体
        new Strike(), // 删除线
        new HorizontalRule(), // 华丽的分割线
        new ListItem(),
        new BulletList(), // 无序列表
        new OrderedList(), // 有序列表
        new TodoItem(),
        new TodoList(),
        new Fullscreen(), //全屏编辑
        new Preview(), //预览，弹层
        new CodeBlock(), //代码块，文本块
        new TextColor(), //文本颜色
      ],
      // 把上传的图片转为base64编码的纯文本的内容，上传到服务器，浏览器会识别并解析还原为图片
      // 图片是和整个文章内容以文本的形式保存在一起的
      formRules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          { min: 5, max: 30, message: "长度在5到30个字符", trigger: "blur" },
        ],
        content: [
          // { required: true, message: "请输入文章内容", trigger: "change" },
          // {
          //   //自定义校验规则
          //   validator(rule, value, callback) {
          //     console.log('validator');
          //     if (value === "<p></p>") {
          //       // 验证失败
          //       callback(new Error("请输入文章内容"));
          //     } else {
          //       // 验证通过
          //       callback();
          //     }
          //   },
          // },
          { required: true, message: "请输入文章内容", trigger: "blur" },
        ],
        channel_id: [
          { required: true, message: "请选择文章频道"},
        ],
      },
    };
  },
  // 3.在初始化钩子函数中调用加载频道函数 loadChannels()
  created() {
    this.loadChannels(); //加载频道

    // 发布和编辑使用的同一个组件，所以这里要判断
    // 如果路由路径参数中 有id 则请求展示文章内容
    // if页面路由路径中有$route.query.id这个参数，表示编辑文章
    if (this.$route.query.id) {
      this.loadArticle(); //加载获取文章
    }
  },
  methods: {
    // 4.在方法中，写loadChannels()这个方法，来请求获取数据
    loadChannels() {
      // 5.调用getArticlesChannels方法来请求获取数据,在res中处理逻辑
      getArticlesChannels().then((res) => {
        // console.log(res) //data对象
        // 6.获取到之后，把数据存储到channels:[]数组中
        this.channels = res.data.data.channels;
      });

      // ES6解构写法：
      // getArticlesChannels().then(({ data : { data }}) => {
      //   this.channels = data.channels
      // })

      // const obj = {
      //   a:{
      //     b:{
      //       c:123
      //     }
      //   }
      // }
      // console.log(obj.a.b.c); //获取c
      // const {a : { b : { c } } } = obj
      // console.log(c); //解构 获取c
    },

    // 9.发表文章事件方法，
    onPublish(draft = false) {
      this.$refs['publish-form'].validate(valid => {
        // 验证失败，停止提交表单
        if (!valid) {
          return;
        }
        // 验证通过，提交表单

        // console.log("submit!");
        // 找到数据接口
        // 封装请求方法
        // 请求提交表单

        // 判断，如果是修改文章，则执行修改操作，否则执行添加操作
        const articleId = this.$route.query.id;
        if (articleId) {
          // 执行修改操作
          updateArticle(articleId, this.article, draft).then((res) => {
            console.log(res);
            this.$message({
              message: `${draft ? "存入草稿" : "发布"}成功`,
              type: "success",
            });
            // 编辑成功后，跳转到内容管理界面
            this.$router.push("/article");
          });
        } else {
          // 执行添加操作

          //参数为article表单数据，就是提交的请求体 body
          addArticle(this.article, draft).then((res) => {
            // 处理响应结果
            // console.log(res)
            this.$message({
              message: `${draft ? "存入草稿" : "发布"}成功`,
              type: "success",
            });
            // 发布成功后，跳转到内容管理界面
            this.$router.push("/article");
          });
        }
      });
    },

    // 修改文章：加载文章内容
    loadArticle() {
      // 找到数据接口
      // 封装请求方法
      // 请求获取数据
      getArticle(this.$route.query.id).then((res) => {
        // console.log(res);
        // 数据绑定展示
        this.article = res.data.data;
      });
      // 模板绑定展示
      // console.log('loadArticle');
    },
  },
};
</script>

<style scoped lang="less">
</style>