<template>
  <!-- App.vue 只当"相框"（外壳）：所有路由页面都渲染在这个位置。
       路由切换时，只有这里的内容被替换，外壳本身永远不变 -->
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 浏览器默认给 body 留了 8px 外边距，会把居中内容挤偏、还多出滚动条，先清掉 */
body {
  margin: 0;
}

/* #app 是 index.html 里的挂载点，这里放"所有页面通用"的样式，比如全局字体 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}
</style>
