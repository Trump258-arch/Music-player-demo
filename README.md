# web-study · 英雄音乐盒 / Hero Music Box 🎵

> 这是一个大学生前端初学者的实践项目，配置有登录和路由，实现用户登入打开播放器的功能。网站提供张雪峰和科比两个绝版英雄，并配合了他们的专属淘汰BGM，便于用户随时切换。

> This is a hands-on project by a college student learning front-end development. It features login and routing, allowing users to log in and open the music player. The site offers two limited-edition heroes — Zhang Xuefeng and Kobe — each paired with their exclusive elimination BGM, so users can switch between them at any time.

## ✨ 功能特性 / Features

- 🔐 **登录 + 路由守卫**：未登录访问内部页面会被打回登录页（token 存于 localStorage）
- 🎶 **播放器页面**：张雪峰、科比两个英雄各有一个专属音乐播放页
- 📜 **歌词同步**：LRC 歌词解析、逐行高亮、轮播滚动，可配置整体延迟/倍速
- 🌀 **旋转唱片**：黑胶唱片旋转动画（requestAnimationFrame），点击播放/暂停
- 📊 **音频可视化**：基于 Web Audio API 的自研频谱圆环组件（零第三方依赖）
- 🖼️ **英雄切换**：首页背景图随所选英雄联动切换
- 📦 **Vuex 状态管理**：计数器示例（点击进行跑步 +10m）

- 🔐 Login with route guards — internal pages redirect to login without a token (stored in localStorage)
- 🎶 Player pages — a dedicated music page for each hero
- 📜 Synced lyrics — LRC parsing, line-by-line highlight and carousel, configurable delay/speed
- 🌀 Spinning vinyl — rotate animation driven by requestAnimationFrame, click to play/pause
- 📊 Audio visualization — a custom spectrum-circle component built on the Web Audio API (zero third-party dependencies)
- 🖼️ Hero switcher — homepage background switches with the selected hero
- 📦 Vuex state management — a simple counter demo

## 🛠️ 技术栈 / Tech Stack

Vue 3 · Vue Router 4 · Vuex 4 · lyric-parser · Web Audio API · Vue CLI 5 (PWA)

## 🚀 快速开始 / Getting Started

```bash
# 安装依赖 / Install dependencies
npm install

# 开发模式（热更新）/ Compiles and hot-reloads for development
npm run serve

# 生产构建 / Compiles and minifies for production
npm run build
```

**默认测试账号 / Demo account**：`123456` / `123456`

## 📂 项目结构 / Project Structure

```
src/
├── router/index.js        # 路由表 + 全局前置守卫（登录校验）
├── store/index.js         # Vuex（counter 示例）
├── views/
│   ├── Login.vue          # 登录页
│   ├── Home.vue           # 首页：英雄选择 + 背景图联动
│   ├── ZXF.vue            # 张雪峰：播放器 + 歌词轮播 + 频谱圆环
│   └── Kobe.vue           # 科比：播放器 + 歌词（二倍速）
└── components/
    ├── AvCircle.vue       # 自研音频频谱圆环（Web Audio API + canvas）
    └── HelloWorld.vue     # 脚手架示例组件
```

## ⚠️ 说明 / Notes

- 登录校验、账号密码、BGM、歌词均为**学习用途的本地实现**，真实项目请使用后端接口
- 歌曲/图片资源版权归原作者所有，仅用于个人学习
- Login, credentials, BGM and lyrics are implemented locally for learning purposes only — use a real backend in production
- All songs/images belong to their original creators and are used for personal study only

## 📖 更多 / More

Vue CLI 配置参考 / See [Configuration Reference](https://cli.vuejs.org/config/).
