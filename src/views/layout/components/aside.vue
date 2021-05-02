<template>
  <!-- el-menu-item的index不能重复，确保唯一即可 -->
  <!-- router：是否使用 vue-router 的模式，
启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
  <!--default-active="/" 默认激活菜单的 index -->
  <el-menu
  class="nav-menu"
    default-active="/"
    background-color="#002033"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <h2 class="menu-title">头条发布系统</h2>
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/article">
      <i class="el-icon-document"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="/image">
      <i class="iconfont iconimage"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="iconfont iconpublish"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/comment">
      <i class="iconfont iconcomment"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <i class="iconfont iconfans"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/settings">
      <i class="el-icon-setting"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "AppAside",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="less">
.menu-title{
  color: #fff;
  text-align: center;
}
.nav-menu{
  .iconfont{
    margin-right: 10px;
    padding-left: 5px;
  }
}
</style>