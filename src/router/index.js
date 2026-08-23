import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
// 路由表：一条路由 = 一个网址（path） + 一个页面组件（component）
// 页面组件统一放在 src/views 文件夹里
const routes = [
  {
    path: '/',        // 首页
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

export default router
