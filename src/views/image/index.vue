<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 路径导航 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑 路径导航 -->
        <!-- <el-button style="float: right; padding: 3px 0" type="text"
          >操作按钮</el-button
        > -->
      </div>
      <!-- 按钮radio -->
      <div class="action-head">
        <!-- <el-radio-group v-model="collect" size="mini" @change="onCollectChange"> -->
        <el-radio-group v-model="collect" size="mini" @change="loadImages(1)">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
          size="mini"
          type="success"
          @click="dialogUploadVisible = true"
          >上传素材</el-button
        >
      </div>
      <!-- /按钮radio -->
      <!-- 素材列表 -->
      <el-row :gutter="10">
        <el-col
          :xs="12"
          :sm="6"
          :md="6"
          :lg="4"
          v-for="(img, index) in images"
          :key="index"
        >
          <el-image style="height: 100px" :src="img.url" fit="cover"></el-image>
        </el-col>
      </el-row>
      <!-- /素材列表 -->

      <!-- 数据分页 -->
      <el-pagination background layout="prev, pager, next" :total="totalCount" 
      :page-size="pageSize"
      @current-change="onPageChange">
      </el-pagination>
      <!-- /数据分页 -->
    </el-card>

    <!-- 上传素材弹出层 -->
    <!-- :append-to-body="true" 穿透背景 跑到body节点下，在所有页面上端 -->
    <el-dialog
      title="上传素材"
      :visible.sync="dialogUploadVisible"
      :append-to-body="true"
    >
      <!-- upload组件本身就支持请求提交上传操作，
    使用它不用自己去发请求，它会自己发。
    上传图片发请求不用封装的axios，使用内部自己的请求，需要单独配置请求头。
    请求方法：默认就是 POST 
    请求路径：action （必须写完整路径）
    请求头：headers-->
      <!-- 按照配置的请求信息，自己发请求就上传了 -->
      <el-upload
        class="upload-demo"
        drag
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="uploadHeaders"
        name="image"
        multiple
        :show-file-list="false"
        :on-success="onUploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImages } from "@/api/image";
export default {
  name: "ImageIndex",
  data() {
    // 在这里单独再获取一次本地存储的信息
    const user = JSON.parse(window.localStorage.getItem("user"));
    return {
      collect: false, //默认查询全部素材列表
      images: [], //图片素材列表
      dialogUploadVisible: false, //上传素材对话框
      // 初始化上传图片请求头
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`,
      },
      // 页码
      totalCount:0, //总数据条数
      pageSize:20,  //每页大小
    };
  },
  created() {
    // 页面初始化加载第1页数据
    this.loadImages(1); //默认查看全部
  },
  methods: {
    // 有默认值的参数必须作为最后一个参数
    loadImages(page) {
      getImages({
        collect:this.collect, //查看收藏列表
        page,
        per_page:this.pageSize,
      }).then((res) => {
        // console.log(res);
        this.images = res.data.data.results;
        this.totalCount=res.data.data.total_count;
      });
    },
    // 绑定值变化时 触发的事件，组件本身支持的事件
    // onCollectChange() {
    //   // console.log(value); //value值点全部就是true，点收藏就是false
    //   console.log(this.collect);
    //   this.loadImages(1);
    // },
    onUploadSuccess() {
      // 关闭对话框
      this.dialogUploadVisible = false;
      // 更新素材列表
      this.loadImages(false);
    },
    onPageChange(page){
      // console.log(page);
      this.loadImages(page) //加载page页图片
    },
  },
};
</script>

<style scoped lang="less">
.action-head {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
</style>