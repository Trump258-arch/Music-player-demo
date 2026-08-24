<template>
  <img id="album-img" @click="playAudio()" :style="{ transform: 'rotate(' + deg + 'deg)' }" alt="ZXF"
    src="/img/icons/张雪峰老师.webp">

  <audio ref="audio" src="/念张师.mp3" @play="syncPlayState" @pause="syncPlayState" @ended="syncPlayState"></audio>
  <div class="lyric-container">
    <div class="lyric-wrapper" :style="{ transform: 'translateY(-' + currentLineNum * 32 + 'px)' }">
      <p v-for="(line, index) in lyric.lines" :key="index" :class="{ active: index === currentLineNum }">
        {{ line.txt }}
      </p>
    </div>
  </div>
  <div>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<script>
import Lyric from 'lyric-parser'

export default {
  name: 'ZXF',
  data() {
    return {
      deg: 0,
      animTimer: null,
      isPlaying: false,
      lyric: null,         // 保存歌词实例
      currentLineNum: 0,   // 当前高亮的歌词行号
      lyricOffset: 0,   // 歌词整体延迟（毫秒）：0 = 不延迟；改成 2000 就是每句晚 2 秒出现
      // 注意：lyric-parser 要求"分钟"两位数，且小数位是两位（厘秒 .NN），
      // 不是三位毫秒！小数写三位会导致时间算错，歌词被排序得乱七八糟
      lrcText: `[00:00.54] 你一句别怂 我就敢往前冲
[00:04.06] 张雪峰老师 我还记得你
[00:07.44] 一句一句把我拉出迷雾里
[00:11.11] 张雪峰老师 我还记得你
[00:14.58] 那些年少的愁 你替我扛起
[00:19.24] 粉笔灰落在肩上
[00:20.85] 像雪一样安静
[00:22.33] 你笑着说前途远
[00:24.00] 别先把自己看轻
[00:26.51] 多少个深夜回家
[00:27.72] 我还在翻那页纸
[00:29.51] 你说过的每句话
[00:31.16] 都在我心里立起
[00:33.18] 后来风吹过来
[00:35.05] 我也学会了
[00:36.72] 不躲不退
[00:38.55] 往自己的山坡走
[00:40.63] 张雪峰老师 我还记得你
[00:43.86] 一句一句把我拉出迷雾里
[00:47.20] 张雪峰老师 我还记得你
[00:50.69] 那些年少的愁 你替我扛起
[01:00.46] 你站在讲台上
[01:01.68] 把难题说的亮堂
[01:03.43] 一支笔一块黑板
[01:05.15] 照见我眼里的慌
[01:07.21] 你总把话说实在
[01:09.03] 像冬天一杯热汤
[01:10.69] 不绕弯不装腔
[01:12.25] 把路给我摆在前方
[01:14.35] 那时候我害怕
[01:16.23] 怕未来太长
[01:17.96] 你一句别怂
[01:19.61] 我就敢往前冲
[01:21.63] 张雪峰老师 我还记得你
[01:23.36] 一句一句把我拉出迷雾里
[01:28.68] 张雪峰老师 我还记得你
[01:31.96] 那些年少的愁 你替我扛起
[01:37.21] 粉笔灰落在肩上
[01:38.29] 像雪一样安静
[01:40.25] 你笑着说前途远
[01:41.81] 别先把自己看轻
[01:43.74] 多少个深夜回家
[01:45.38] 我还在翻那页纸
[01:47.17] 你说过的每句话
[01:48.76] 都在我心里立起
[01:50.82] 后来风吹过来
[01:52.66] 我也学会了
[01:54.37] 不躲不退
[01:56.08] 往自己的山坡走
[01:58.00] 张雪峰老师 我还记得你
[02:01.52] 一句一句把我拉出迷雾里
[02:05.14] 张雪峰老师 我还记得你
[02:08.54] 那些年少的愁 你替我扛起
[02:13.71] 如果有一天 我走得很远
[02:16.66] 也会想起那间教室的光线
[02:20.24] 想起你拍着桌子说别怕吃苦
[02:23.60] 说这条路总会有人走出去
[02:28.72] 张雪峰老师 我还记得你
[02:31.56] 一句一句把我拉出迷雾里
[02:35.29] 张雪峰老师 我还记得你
[02:38.43] 那些年少的愁 你替我扛起
[02:42.78] 呜～
[02:55.25] 我还记得你
`
    }
  },
  methods: {
    handleSendClickhander(data) {
      console.log(data);
    },
    async playAudio() {
      const audio = this.$refs.audio
      if (audio.paused) {
        await audio.play()
        // audio.currentTime 单位是"秒"，lyric-parser 要的是"毫秒"，所以要 ×1000
        // 再减去 lyricOffset：把歌词的"时钟"往回拨 2 秒，让每句歌词晚 2 秒出现
        // 第二个参数 true：不立刻补发上一句歌词
        this.lyric.play(audio.currentTime * 1000 - this.lyricOffset, true)
        // 暂停状态 → 播放
      } else {
        await audio.pause()
        this.lyric.stop()
        // 播放状态 → 暂停
      }
    },
    syncPlayState() {
      // 组件被销毁时 $refs 会被清空，先判断一下，避免报错
      if (!this.$refs.audio) return
      // 把DOM真实状态同步到data
      this.isPlaying = !this.$refs.audio.paused
    }
  },
  created() {
    // 初始化歌词实例（放在 created 而不是 mounted：
    // 模板里要遍历 lyric.lines，而 created 在模板第一次渲染之前执行，
    // 这样第一次渲染时歌词数据就已经就绪，不会报"lyric 是 null"的错误）
    // 参数1：LRC字符串；参数2：歌词行切换时的回调函数
    this.lyric = new Lyric(this.lrcText, ({ lineNum, txt }) => {
      // 每走到一句新歌词，就会执行这里
      console.log('当前歌词行：', lineNum, '内容：', txt)
      this.currentLineNum = lineNum
    })
  },
  // 组件销毁前，把"手动开着的活"全部收尾，防止幽灵动画和报错
  beforeUnmount() {
    cancelAnimationFrame(this.animTimer)   // 停掉旋转动画
    if (this.$refs.audio) {
      this.$refs.audio.pause()             // 停掉音乐
    }
    this.lyric && this.lyric.stop()        // 停掉歌词定时器，防止"幽灵歌词"
  },
  watch: {
    // 监听 isPlaying：播放时启动旋转动画（黑胶唱片转起来），暂停时停掉
    isPlaying: {
      handler(newVal) {
        if (newVal) {
          const loop = () => {
            this.deg += 0.6
            this.animTimer = requestAnimationFrame(loop)
          }
          loop()
        } else {
          cancelAnimationFrame(this.animTimer)
        }
      }
    }
  }
}
</script>

<style>
/* 歌词轮播样式（放在本组件里：直接刷新 /zxf 页面时也能生效） */
.lyric-container {
  width: 400px;
  height: 200px;
  overflow: hidden;
  margin: 20px auto;
}

.lyric-wrapper {
  transition: transform 0.3s ease;
}

.lyric-wrapper p {
  height: 32px;
  line-height: 32px;
  margin: 0;
  text-align: center;
  color: #999;
  font-size: 20px;
  transition: all 0.3s ease;
}

/* 当前高亮歌词（现在是白底页面，用深色；以后加了深色背景可改回 #fff） */
.lyric-wrapper p.active {
  color: #333;
  font-size: 30px;
  font-weight: bold;
}
</style>