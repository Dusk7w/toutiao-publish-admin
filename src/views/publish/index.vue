<template>
  <div class="publish-container">
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 路径导航 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑 路径导航 -->
      </div>
      <!-- 表单区域 -->
      <!-- :model="article" 只有在做表单验证的时候才是必须的 -->
      <el-form ref="form" :model="article" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>

        <el-form-item label="内容">
          <el-input type="textarea" v-model="article.content"></el-input>
        </el-form-item>

        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道">
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
          <el-button type="primary" @click="onPublish(false)">发表</el-button>
          <el-button  @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
      <!-- /表单区域 -->
    </el-card>
    <!-- /卡片区域 -->
  </div>
</template>

<script>
// 1.获取频道列表接口
import { getArticlesChannels, addArticle } from "@/api/article";

export default {
  name: "PublishIndex",
  data() {
    return {
      article: {
        title: '', //文章标题
        content: '', //文章内容
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
    };
  },
  // 3.在初始化钩子函数中调用加载频道函数 loadChannels()
  created() {
    this.loadChannels();
  },
  methods: {
    // 4.在方法中，写loadChannels()这个方法，来请求获取数据
    loadChannels() {
      // 5.调用getArticlesChannels方法来请求获取数据,在res中处理逻辑
      getArticlesChannels().then((res) => {
        // console.log(res) //data对象
        // 6.获取到之后，把数据存储到channels:[]数组中
        this.channels = res.data.data.channels;
      })

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
      // console.log("submit!");
      // 找到数据接口
      // 封装请求方法
      // 请求提交表单

      //参数为article表单数据，就是提交的请求体 body
      addArticle(this.article,draft).then( res => {
        // 处理响应结果
        // console.log(res)
        this.$message({
          message:'发布成功',
          type:'success'
        })
      })
    },
  },
};
</script>

<style scoped lang="less">
</style>