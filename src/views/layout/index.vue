<template>
  <el-container class="layout-container">
    <!-- 侧边栏 导航区域 -->
    <el-aside class="aside" width="200px">
      <!-- 侧边栏子组件，小写 -->
      <app-aside class="aside-menu" />
    </el-aside>

    <!-- 头部区域 -->
    <el-container>
      <el-header class="header">
        <div>
          <i class="el-icon-s-fold"></i>
          <span>江苏传智播客科技教育有限公司</span>
        </div>
        <el-dropdown>
          <!-- 用户头像区域 -->
          <div class="avatar-wrap">
            <img class="avatar" src="../../assets/icon.jpg" alt="">
            <span>用户昵称</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <!-- 用户下拉菜单区域 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <!-- 主体区域 -->
      <el-main class="main">
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>

  <!-- <div>顶部导航栏</div> -->
  <!-- <div>侧边导航栏</div> -->
  <!-- 子路由出口 -->
  <!-- <router-view /> -->
</template>

<script>
// 引入侧边栏子组件
import AppAside from "./components/aside";

export default {
  name: "LayoutIndex",
  // 注册侧边栏子组件
  components: {
    AppAside,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="less">
.layout-container {
  // 父元素没有宽高，直接充满整个页面
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.aside {
  background-color: #d3dce6;
  .aside-menu {
    height: 100%; //充满整个父元素
  }
}
.header {
  // background-color: #b3c0d1;
  border-bottom: 1px solid #ccc;
  display: flex; //水平排列
  justify-content: space-between; //div元素项左右撑开
  align-items: center; //垂直居中
}
.main {
  background-color: #e9eef3;
}
.avatar-wrap{
  display: flex;
  align-items: center;
  .avatar{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
</style>