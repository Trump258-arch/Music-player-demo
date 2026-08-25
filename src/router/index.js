import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
// 路由表：一条路由 = 一个网址（path） + 一个页面组件（component）
// 页面组件统一放在 src/views 文件夹里
const routes = [

  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',        // 首页
    name: 'Home',
    component: Home
  },
  {
    path: '/zxf',     // 张雪峰页
    name: 'ZXF',
    component: () => import('../views/ZXF.vue')
    // 懒加载：访问到这条路由时才下载对应组件的代码，首屏加载更快
  },
  {
    path: '/kobe',    // 科比页
    name: 'KOBE',
    component: () => import('../views/Kobe.vue')
  }
]
// 创建路由实例
// createWebHistory()：网址是正常的 /zxf 形式（不带 # 号），部署时需要服务器做一下配置
const router = createRouter({
  history: createWebHistory(),
  routes
})

// ========== 全局前置守卫：登录权限检查 ==========
// 注意：必须先 createRouter 创建出 router 实例，才能调用 router.beforeEach
router.beforeEach((to, from, next) => {
  // 1. 从本地取出登录标记
  const hasToken = localStorage.getItem('token')

  // 2. 判断：想去的不是登录页，并且没登录
  if (to.path !== '/' && !hasToken) {
    // 打回登录页
    next('/')
  } else {
    // 其他情况一律放行
    next()
  }
  if (to.path === '/' && hasToken) {
    next('/home')    // 已登录就别再看登录页了，直接进首页
  }
})

export default router
