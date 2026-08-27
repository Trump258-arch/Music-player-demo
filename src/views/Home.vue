<template>
  <!-- 首页：一张背景图 + 两个导航链接 -->
  <div>
    <!-- router-link 渲染出来就是一个 <a> 标签，点击后切换路由页面 -->
    <!-- 注意：@sendClickhander 对应的 handleSendClickhander 方法已不存在，
         监听必须一起删掉，否则 HelloWorld 一触发事件 Vue 就会警告 -->
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div style="display:flex;">
      <div style="font-size:50px;margin-top:50px">
        <button @click="clickZXFhandler">张雪峰</button>
        <button @click="clickKOBEhandler">科比</button>
        <p>{{ getCounter +'m'}}</p>
        <button @click="addClick">点击进行跑步</button>
        <button @click="exitHandler">退出登录</button>
      </div>
      <div class="backgroundImg">
        <!-- 两张英雄图叠在一起铺满盒子，v-show 按"当前选中的英雄"决定显示哪张 -->
        <div class="hero-img" v-show="currentHero === 'zxf'"
          style="background-image: url('/img/icons/张雪峰老师.webp');"></div>
        <div class="hero-img" v-show="currentHero === 'kobe'"
          :style="{ backgroundImage: 'url(' + oip + ')' }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue'
// src/assets 里的图片要用 import 引入，webpack 才会打包出正确路径
import oip from '../assets/OIP-C.jpg'
import { mapGetters, mapMutations } from 'vuex'


export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      currentHero: 'zxf',   // 当前选中的英雄：'zxf' 显示张雪峰图，'kobe' 显示科比图
      oip                   // 关键：import 的图片必须放进 data，模板里才能访问到
    }
  },
  computed: {
    ...mapGetters(["getCounter"])
  },
  methods: {
    ...mapMutations(["addCounter"]),
    addClick() {
      this.addCounter(10);
    },
    exitHandler() {
      localStorage.removeItem('token')
      this.$router.push('/')
    },
    // 联动：先切背景图，1 秒后再跳转——让你能看见切换效果
    // setTimeout 第一个参数必须是"函数"，所以要用箭头函数把跳转包起来
    clickZXFhandler() {
      this.currentHero = 'zxf'
      setTimeout(() => this.$router.push('/zxf'), 1000)
    },
    clickKOBEhandler() {
      this.currentHero = 'kobe'
      setTimeout(() => this.$router.push('/kobe'), 1000)
    }
  }

}
</script>

<style>
/* 没加 scoped 说明这些样式是"全局"的，所有页面都能使用 */
#album-img {
  width: 300px;
  height: 300px;
  margin: 30px auto;
  border-radius: 50%;
}

.backgroundImg {
  position: relative;          /* 让两张英雄图层能绝对定位铺满它 */
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 600px;
  margin-left: auto;
  margin-right: 100px;
}

/* 两张英雄图：都绝对定位铺满盒子、叠在一起，v-show 控制显示哪张 */
.hero-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

button {
  background-color: rgba(180, 180, 180, 1);
  font-size: 25px;
  height: 60px;
  text-align: center;
  width: 200px;
  border-radius: 15px;
  margin: 10px;
  display: block;
}
</style>
