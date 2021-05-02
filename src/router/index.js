import Vue from 'vue'
import VueRouter from 'vue-router'
// 加载登录组件
// import Login from '../views/login/index.vue'

// 在vuecli创建的项目中 @表示src
// 它是src目录的路径别名
import Login from '@/views/login/'
import Home from '@/views/home/'
import Layout from '@/views/layout/'

Vue.use(VueRouter)

// 路由配置表
const routes = [
  // 登录页面的路由
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  // 布局父组件页面的路由
  {
    path: '/', //根路径直接写/
    // 命名路由layout有一个默认子路由，这个路由没有意义，所有有警告
    // 如果有默认子路由，就不要给父路由起名字
    // name: 'layout',
    component: Layout,
    // 把home配置为子路由，渲染在layout组件的路由出口中
    children: [
      // 首页的路由 （子路由）
      {
        path: '', //path为空，会作为默认子路由渲染
        name: 'home', //路由的名字
        component: Home
      }
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
