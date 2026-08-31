<template>
  <span style="font-size:60px" @click="handleClick">{{ Kobe }}</span><!--v-bind:属性可以简写为:-->
  <ul style="display: flex;">
    <!-- 链接交给 href 属性传：组件内部会把 content 包成 <a> 标签 -->
    <MyTooltip content1="科比的生平" content2="张雪峰的生平"
    link1="https://baike.baidu.com/item/%E7%A7%91%E6%AF%94%C2%B7%E5%B8%83%E8%8E%B1%E6%81%A9%E7%89%B9/318773"
    link2="https://baike.baidu.com/item/%E5%BC%A0%E9%9B%AA%E5%B3%B0/19735806">
      <li>人物生平</li>
    </MyTooltip>
    <!-- 这个组件现在的属性名是 content1/link1，旧写法 content/href 已经不被组件识别 -->
    <MyTooltip content1="作案人员" link1="https://space.bilibili.com/1370767368?spm_id_from=333.1007.0.0">
      <li>创作团队</li>
    </MyTooltip>
  </ul>
</template>

<script>
import MyTooltip from '../components/MyTooltip.vue'

export default {
  name: 'HelloWorld',
  components: {
    MyTooltip // 局部注册：import 只是把文件读进来，必须在这里登记，模板里的 <MyTooltip> 才会被识别
  },
  data() {
    return {
      Kobe: "请选择你的英雄",
    }
  },
  methods: {
    handleClick() {
      this.Kobe = '牢大坠机了';
    },
    sendClickhander() {
      this.$emit('sendClickhander', this.Kobe);
    }
  }
}
</script>

<style scoped>
span {
  display: block;
  text-align: left;
}

ul li {
  margin: 10px 40px;
  font-size: larger;
}
</style>
