<template>
  <el-container class="layout-container">
    <!-- 侧边栏 导航区域 -->
    <el-aside class="aside" width="auto">
      <!--width="auto" 宽度自动-->
      <!-- 侧边栏子组件，小写 -->
      <app-aside class="aside-menu" :is-collapse="isCollapse" />
    </el-aside>

    <!-- 头部区域 -->
    <el-container>
      <el-header class="header">
        <div>
          <!-- class样式处理：
          {
            css类名：布尔值
          }
            true：作用类名；false：不作用类名
           -->
          <i
            :class="{
              'el-icon-s-fold': isCollapse,
              'el-icon-s-unfold': !isCollapse,
            }"
            @click="isCollapse = !isCollapse"
          ></i>
          <span>头条发布系统</span>
        </div>
        <el-dropdown>
          <!-- 用户头像区域 -->
          <div class="avatar-wrap">
            <img class="avatar" :src="user.photo" alt="" />
            <span>{{ user.name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <!-- 用户下拉菜单区域 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <!-- 组件默认不识别原生事件click，除非内部做了处理 
            @click.native：.native修饰符将原生事件绑定到组件上
            -->
            <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
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
import { getUserProfile } from "@/api/user";

export default {
  name: "LayoutIndex",
  // 注册侧边栏子组件
  components: {
    AppAside,
  },
  data() {
    return {
      user: {}, //当前登录用户信息
      isCollapse: false, //子组件aside.vue中侧边栏的展开状态
    };
  },
  // 初始化的时候做请求加载loadUserProfile这个方法
  created() {
    // 组件初始化好后，请求获取用户资料
    this.loadUserProfile();
  },
  methods: {
    // 除了登录接口，其他所有接口都需要授权才能请求使用
    // 其他所有接口都需要提供用户的身份令牌才能获取数据
    loadUserProfile() {
      getUserProfile().then((res) => {
        console.log(res);
        this.user = res.data.data;
      });
    },

    onLogout() {
      this.$confirm("确认退出吗?", "退出提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 把用户的登录状态清除，
          window.localStorage.removeItem("user")
          // 跳转到登录页面
          this.$router.push("/login")
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          })
        })

      // // console.log("onLogout");
      // // 把用户的登录状态清除，
      // window.localStorage.removeItem("user");
      // // 跳转到登录页面
      // this.$router.push("/login");
    },
  },
};

// index.vue展开关闭图片在父组件中，aside.vue侧边栏在子组件中，
// 把控制展开状态的数据放在父组件中，
// 把数据通过 :is-collapse="isCollapse" 传给子组件，这样数据就受父组件来控制
// 子组件要通过props:['is-collapse'] 去声明接收
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
.avatar-wrap {
  display: flex;
  align-items: center;
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
</style>

