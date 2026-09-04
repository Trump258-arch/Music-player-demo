# web-study · 英雄音乐盒 / Hero Music Box

> 这是一个大学生前端初学者的实践项目，配置有登录和路由，实现用户登入打开播放器的功能。网站提供张雪峰和科比两个绝版英雄，并配合了他们的专属淘汰BGM，便于用户随时切换。

> This is a hands-on project by a college student learning front-end development. It features login and routing, allowing users to log in and open the music player. The site offers two limited-edition heroes — Zhang Xuefeng and Kobe — each paired with their exclusive elimination BGM, so users can switch between them at any time.

## 功能特性 / Features

- 登录 + 路由守卫：axios 网络请求登录，token 存 localStorage，未登录访问内部页会被打回登录页，已登录访问登录页自动跳首页
- 播放器页面：张雪峰、科比两个英雄各有一个专属音乐播放页
- 歌词同步：LRC 歌词解析、逐行高亮、轮播滚动，支持整体延迟/倍速
- 旋转唱片：requestAnimationFrame 驱动的旋转动画，点击播放/暂停
- 英雄切换：首页背景图随所选英雄联动切换（v-show）
- 自定义 Tooltip 组件：插槽 + props + 点击跳转外链
- Vuex 状态管理：计数器示例

- Login with route guards — axios-based login, token in localStorage; internal pages redirect to login without a token, and logged-in users skip the login page
- Player pages — a dedicated music page for each hero
- Synced lyrics — LRC parsing, line-by-line highlight and carousel, configurable delay/speed
- Spinning vinyl — rotate animation driven by requestAnimationFrame, click to play/pause
- Hero switcher — homepage background switches with the selected hero (v-show)
- Custom Tooltip component — slot + props + clickable external links
- Vuex state management — a simple counter demo

## 技术栈 / Tech Stack

Vue 3 · Vue Router 4 · Vuex 4 · axios · lyric-parser · Vue CLI 5 (PWA)

## 登录接口 / Login API

登录页通过 axios 请求本地后端完成校验：

- 实例配置：`axios.create({ baseURL: 'http://localhost:3000', timeout: 5000 })`
- 请求：`GET /api/login`，查询参数 `username`、`password`
- 约定：后端返回 `{ status: 200 }` 视为登录成功，跳转首页并写入 token；否则提示失败
- 注意：后端未启动时登录会失败；代码中保留了注释掉的本地校验逻辑，可随时回退

## 快速开始 / Getting Started

```bash
# 安装依赖 / Install dependencies
npm install

# 开发模式（热更新）/ Compiles and hot-reloads for development
npm run serve

# 生产构建 / Compiles and minifies for production
npm run build
```

## 项目结构 / Project Structure

```
src/
├── router/index.js        # 路由表 + 全局前置守卫（登录校验）
├── store/index.js         # Vuex（counter 示例）
├── views/
│   ├── Login.vue          # 登录页（axios 网络请求）
│   ├── Home.vue           # 首页：英雄选择 + 背景图联动
│   ├── ZXF.vue            # 张雪峰：播放器 + 歌词轮播
│   └── Kobe.vue           # 科比：播放器 + 歌词（二倍速）
└── components/
    ├── MyTooltip.vue      # 自定义提示气泡（插槽 + props + 外链）
    └── HelloWorld.vue     # 脚手架示例组件（Tooltip 演示）
```

## 说明 / Notes

- 登录接口、账号校验、BGM、歌词均为学习用途的本地实现，真实项目请使用后端接口
- 歌曲/图片资源版权归原作者所有，仅用于个人学习
- The login API, credentials, BGM and lyrics are implemented locally for learning purposes only — use a real backend in production
- All songs/images belong to their original creators and are used for personal study only

## 更多 / More

Vue CLI 配置参考 / See [Configuration Reference](https://cli.vuejs.org/config/).
