<template>
  <div class="article-container">
    <!-- 卡片区域1 -->
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 路径导航 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑 路径导航 -->
      </div>
      <!-- 数据筛选 表单 -->
      <el-form ref="form" :model="form" label-width="40px" size="medium ">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <!-- el-radio 默认把lable作为文本和选中之后的value值 -->
            <!-- 把文本和lable分开，lable写真正的value值 :label变为数值-->
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择频道">
            <el-option label="全部" value="null"></el-option>
            <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="(channel, index) in channels"
              :key="index"
            ></el-option>
            <!-- v-for遍历，channel是频道，channels是频道数组,一定要绑定:key-->
          </el-select>
        </el-form-item>

        <el-form-item label="日期">
          <!--format 显示在输入框中日期的样式 yyyy-MM-dd 年月日 
              value-format 显示获取到的 选中值 日期的样式-->
          <el-date-picker
            v-model="rangeDate"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <!-- button按钮的click事件有一个默认参数
            当你没有指定参数的时候，它会默认传递一个没用的数据-->
          <!-- 点击查询时 重新加载 -->
          <el-button type="primary" @click="loadArticles(1)" :disabled="loading"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
      <!-- /数据筛选 表单 -->
    </el-card>
    <!-- /卡片区域1 -->

    <!-- 卡片区域2 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据查询条件共查询到{{ totalCount }}条结果：
      </div>
      <!-- 数据列表 -->
      <!-- Table 表格组件：
        1.把需要展示的数组列表articles[]数据绑定给 table 组件的 data 属性
          注意：不用去 v-for 遍历，table表格自己会遍历
        2.设计表格列 el-table-column 
          width 可以设定表格列的 宽度
          lable 可以设定表格列的 标题
          prop 用来设定要渲染的列表项 数据字段，只能展示文本
        3.表格列默认只能渲染普通文本，如果需要展示其他内容，如按钮、图片
        需要自定义<template></template>表格列模板。
       -->
      <el-table
        :data="articles"
        style="width: 100%"
        stripe
        size="mini"
        class="list-rable"
        v-loading="loading"
      >
        <el-table-column prop="date" label="封面">
          <template slot-scope="scope">
            <!-- fit填充模式  图片加载失败，组件自动显示
            lazy 图片懒加载 当图片滚动到可视范围内才会加载。-->
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.cover.images[0]"
              fit="cover"
              lazy
            >
              <!-- 图片加载期间展示一些东西 自定义 placeholder 插槽的名称-->
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
            <!-- <img
              v-if="scope.row.cover.images[0]"
              class="article-cover"
              :src="scope.row.cover.images[0]"
              alt=""
            />
            <img v-else class="article-cover" src="./article.png" alt="" /> -->
            <!-- 图片是在运行期间动态改变处理的，本地图片必须在打包的时候就存在。 -->
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column label="状态">
          <!-- 自定义表格列模板：标签 -->
          <!-- 自定义模板之后，prop="status"就没有用了，没有自定义模板，默认把prop当做普通文本来使用-->
          <template slot-scope="scope">
            <!-- 如果需要再在定义列模板中获取 当前遍历项数据，
            那么就在template上声明 slot-scope="scope"-->
            <!-- scope.row 获取的是 当前遍历项对象 -->
            <!-- <el-tag>草稿{{scope.row.status}}</el-tag> -->

            <!-- <el-tag type="warning" v-if="scope.row.status == 0">草稿</el-tag>
            <el-tag v-else-if="scope.row.status == 1">待审核</el-tag>
            <el-tag type="success" v-else-if="scope.row.status == 2"
              >审核通过</el-tag
            >
            <el-tag type="danger" v-else-if="scope.row.status == 3"
              >审核失败</el-tag
            >
            <el-tag type="info" v-else-if="scope.row.status == 4"
              >已删除</el-tag
            > -->

            <el-tag :type="articleStatus[scope.row.status].type">{{
              articleStatus[scope.row.status].text
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
        <el-table-column label="操作">
          <!-- 如果需要自定义表格列模板，则需要把自定义的内容放到 template里面-->
         <!-- slot-scope="scope" scope.row.id拿到当前遍历项中的articleId -->
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="onDeleteArticle(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /数据列表 -->

      <!-- 列表分页 -->
      <!-- total 用来设定总数据的条数 默认按照10条每页计算总页码
      page-size 每页显示条目个数 默认10条 -->
      <!-- loading为true 表示禁用 ；loading 为false 表示不禁用 -->
      <!-- :current-page.sync 修饰符 能够实时更新当前页码 同步page数据-->
      <el-pagination
        background
        @current-change="onCurrentChange"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="totalCount"
        :disabled="loading"
        :current-page.sync="page"
      />
      <!-- /列表分页 -->
    </el-card>
    <!-- /卡片区域2 -->
  </div>
</template>

<script>
import { getArticles, getArticlesChannels, deleteArticle } from "@/api/article";

export default {
  name: "ArticleIndex",
  data() {
    //data中用于声明参数
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      articles: [], //文章数据列表
      // 文章状态数组
      articleStatus: [
        { status: 0, text: "草稿", type: "info" }, //0
        { status: 1, text: "待审核", type: "" }, //1
        { status: 2, text: "审核通过", type: "success" }, //2
        { status: 3, text: "审核失败", type: "warning" }, //3
        { status: 4, text: "已删除", type: "danager" }, //4
      ],
      totalCount: 0, //总数据条数
      pageSize: 10, //每页大小
      status: null, //查询文章的状态，不传null就是全部 //通过状态单选按钮来改变状态
      channels: [], //文章频道列表
      channelId: null, //查询文章的频道，v-model绑定到下拉列表中
      rangeDate: null, //筛选的范围日期 默认null查询所有
      loading: true, //表格数据加载中 loading
      page:1, //当前页码
    };
  },
  // 生命周期中调用 loadArticles()方法获取数据
  // 页面初始化的时候，请求loadChannels()方法获取加载列表数据
  created() {
    this.loadChannels();
    this.loadArticles(1); //初始值page默认为1
  },
  methods: {
    loadArticles(page = 1) {
      // 数据请求一开始，展示加载中的loading
      this.loading = true;
      //初始值page默认为1
      // 获取文章列表的方法
      getArticles({
        // page:page, 数据名和数据值同名的时候，可以省略
        page,
        per_page: this.pageSize,
        status: this.status, //status受单选按钮影响
        channel_id: this.channelId, //对象的名字是后端要求的，对象的值需要驼峰，值还没有，需要在data中初始化
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, //开始日期
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null, //截止日期
      }).then((res) => {
        // console.log(res);
        const { results, total_count: totalCount } = res.data.data; //解构赋值，重命名total_count
        this.articles = res.data.data.results; //文章数据列表
        this.totalCount = totalCount;
        // 数据请求结束后，关闭加载中的loading
        this.loading = false;
      });
    },

    // 分页列表 事件处理函数，有一个回调参数page
    onCurrentChange(page) {
      this.loadArticles(page); //重新调用this.loadArticles，传当前改变的页码
    },

    // 加载文章频道列表事件
    loadChannels() {
      getArticlesChannels().then((res) => {
        // console.log(res);
        this.channels = res.data.data.channels;
      });
    },

    // 删除事件
    onDeleteArticle(articleId) {  //articleId声明接收，传给请求方法deleteArticle(要删除文章的id)
      // console.log("onDeleteArticle")
      // 找到数据接口
      // 封装请求方法
      // 删除请求调用
      // 处理响应结果

      console.log(articleId);
      console.log(articleId.toString());

      this.$confirm("确认删除吗?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //  确认 执行这里
          // deleteArticle(要删除文章的id)
          deleteArticle(articleId.toString()).then(res => {
            // console.log(res);
            // 删除成功，更新当前页的文章数据列表
            // this.loadArticles(页码)
            this.loadArticles(this.page)  //第几页删除 就更新第几页列表
          })

        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          })
        })
    },
  },
};
</script>

<style scoped lang="less">
.filter-card {
  margin-bottom: 30px;
}
.list-rable {
  margin-bottom: 20px;
}
.article-cover {
  width: 100px;
  background-size: cover;
}
</style>