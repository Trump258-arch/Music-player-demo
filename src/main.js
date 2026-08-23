// 项目入口文件：整个应用从这里启动
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

// 三步走：
// 1. createApp(App)   创建应用实例，根组件是 App.vue
// 2. .use(router)     安装路由插件——装完模板里才能用 <router-link> 和 <router-view>
// 3. .mount('#app')   把应用挂载到 index.html 里的 <div id="app"> 上
createApp(App).use(router).mount('#app')
