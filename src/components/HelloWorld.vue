<template>
    <span style="font-size:150px" @click="handleClick">{{ Kobe }}</span><!--v-bind:属性可以简写为:-->
    <div v-html="text"></div>
    <div v-for="item in items" :key="item.id">
      <p v-if="item.sit === '活着'">{{ item.name }}</p>
    </div>
    <form>
      请输入：<input type="text" v-model="Kobe">
      <button @click="handleClick1">
        提交
      </button>
    </form>
</template>

<script>
import { Text } from 'vue';

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: "模板语法",
      text: "<a href='https://www.4399.com/'>4399小游戏</a>",
      Kobe: "冰红茶巧乐兹雪碧",
      items: [
        { id: 1, name: '科比', sit: '死了' },
        { id: 2, name: '詹姆斯', sit: '活着' },
        { id: 3, name: '库里', sit: '活着' }
      ]
    }
  },
  methods: {
    handleClick() {
      this.Kobe = '牢大坠机了';
      return this.Kobe;
    },
    handleClick1() {
      this.Kobe = 'Man!What can I say?'
    },
    sendClickhander(){
      this.$emit('sendClickhander',this.Kobe);
    }
  }
}
</script>
