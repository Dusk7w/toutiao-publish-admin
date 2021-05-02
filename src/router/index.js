import Vue from 'vue'
import VueRouter from 'vue-router'
// 加载登录组件
// import Login from '../views/login/index.vue'

// 在vuecli创建的项目中 @表示src
// 它是src目录的路径别名
import Login from '@/views/login/index.vue'

Vue.use(VueRouter)

// 路由配置表
const routes = [
  // 登录页面的路由
  {
    path:'/login',
    name:'login',
    component:Login
  }
]

const router = new VueRouter({
  routes
})

export default router
