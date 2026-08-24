<template>
  <!-- 首页：一张背景图 + 两个导航链接 -->
  <div class="background" style="background-image: url('/img/icons/张雪峰老师.webp')">
    <!-- router-link 渲染出来就是一个 <a> 标签，点击后切换路由页面 -->
    <HelloWorld @sendClickhander="handleSendClickhander" msg="Welcome to Your Vue.js App" />
    <div style="font-size:50px;text-align:center;margin-top:50px">
      <router-link to="/zxf">张雪峰</router-link>|
      <router-link to="/kobe">科比</router-link>
      <p>{{ getCounter }}</p>
      <button @click="addClick">点击</button>
    </div>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue'
import { mapGetters,mapMutations } from 'vuex'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  computed:{
    ...mapGetters(["getCounter"])
  },
  methods: {
    ...mapMutations(["addCounter"]) ,
    addClick(){
      this.addCounter(10);
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

.background {
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
}
</style>
