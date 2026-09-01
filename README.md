# web-study · 英雄音乐盒 / Hero Music Box

> 这是一个大学生前端初学者的实践项目，配置有登录和路由，实现用户登入打开播放器的功能。网站提供张雪峰和科比两个绝版英雄，并配合了他们的专属淘汰BGM，便于用户随时切换。

> This is a hands-on project by a college student learning front-end development. It features login and routing, allowing users to log in and open the music player. The site offers two limited-edition heroes — Zhang Xuefeng and Kobe — each paired with their exclusive elimination BGM, so users can switch between them at any time.

## 功能 / Features

- **登录与路由守卫**：token 存于 localStorage，未登录访问内部页面会被打回登录页；已登录访问登录页则自动进入首页
- **双英雄播放器**：张雪峰、科比各有一个专属音乐播放页，点击唱片播放 / 暂停
- **歌词同步**：LRC 解析、逐行高亮、轮播滚动，支持整体延迟与倍速（科比页为二倍速）
- **旋转唱片**：requestAnimationFrame 驱动的旋转动画
- **英雄切换**：首页背景图随所选英雄联动切换（v-show 实现）
- **自定义 Tooltip 组件**：props 传参 + 插槽 + 超链接跳转，悬停显示提示气泡
- **Vuex 状态管理**：计数器示例（点击进行跑步 +10m）

- **Login with route guards** — internal pages redirect to login without a token; logged-in users skip the login page
- **Player pages** — a dedicated music page for each hero, click the vinyl to play / pause
- **Synced lyrics** — LRC parsing, line-by-line highlight and carousel, configurable delay and speed (2x on the Kobe page)
- **Spinning vinyl** — rotation animation driven by requestAnimationFrame
- **Hero switcher** — homepage background switches with the selected hero (v-show)
- **Custom Tooltip component** — props + slots + hyperlinks, hover to show a tooltip bubble
- **Vuex state management** — a simple counter demo

## 技术栈 / Tech Stack

Vue 3 · Vue Router 4 · Vuex 4 · lyric-parser · Vue CLI 5 (PWA)

## 快速开始 / Getting Started

```bash
npm install      # 安装依赖
npm run serve    # 开发模式（热更新）
npm run build    # 生产构建
```

默认测试账号 / Demo account：`123456` / `123456`

## 项目结构 / Project Structure

```
├── public/                    # 静态资源，打包后原样放在网站根目录
│   ├── 念张师.mp3             # 张雪峰专属 BGM
│   ├── See you again.mp3      # 科比专属 BGM
│   └── img/icons/             # 英雄图片与 PWA 图标
└── src/
    ├── main.js                # 入口：挂载 App，注册 router 和 store
    ├── App.vue                # 根组件：只当"相框"，渲染路由页面
    ├── router/index.js        # 路由表 + 全局前置守卫（登录校验）
    ├── store/index.js         # Vuex（counter 示例）
    ├── registerServiceWorker.js  # PWA 离线缓存
    ├── views/
    │   ├── Login.vue          # 登录页
    │   ├── Home.vue           # 首页：英雄选择 + 背景图联动
    │   ├── ZXF.vue            # 张雪峰：播放器 + 歌词轮播
    │   └── Kobe.vue           # 科比：播放器 + 歌词（二倍速）
    └── components/
        ├── HelloWorld.vue     # 模板语法示例，演示 Tooltip 用法
        └── MyTooltip.vue      # 自定义提示气泡：props + 插槽 + 超链接
```

## 说明 / Notes

- 登录校验、账号密码、BGM、歌词均为学习用途的本地实现，真实项目请使用后端接口
- 歌曲与图片资源版权归原作者所有，仅用于个人学习
- Login, credentials, BGM and lyrics are implemented locally for learning purposes only — use a real backend in production
- All songs and images belong to their original creators and are used for personal study only

Vue CLI 配置参考 / See [Configuration Reference](https://cli.vuejs.org/config/).
