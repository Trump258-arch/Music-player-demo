<template>
    <!-- 科比页：专辑封面（点击播放/暂停）+ 音乐 + 返回链接 -->
    <img id="album-img" @click="playAudio()" :style="{ transform: 'rotate(' + deg + 'deg)' }" alt="Kobe"
        src="../assets/OIP-C.jpg">

    <!-- audio 的三个媒体事件：播放 / 暂停 / 播完，都交给 syncPlayState 同步状态 -->
    <audio ref="audio" src="/See you again.mp3" @play="syncPlayState" @pause="syncPlayState" @ended="handleEnded"></audio>
    <div class="lyric-container">
        <div class="lyric-wrapper" :style="{ transform: 'translateY(-' + currentLineNum * 32 + 'px)' }">
            <p v-for="(line, index) in lyric.lines" :key="index" :class="{ active: index === currentLineNum }">
                {{ line.txt }}
            </p>
        </div>
    </div>
    <router-link to="/">返回首页</router-link>
</template>

<script>
import Lyric from 'lyric-parser'

export default {
    name: 'KOBE',
    data() {
        return {
            deg: 0,          // 图片当前旋转角度（度）
            animTimer: null, // requestAnimationFrame 的句柄，用于停止动画
            isPlaying: false, // 是否正在播放（由 audio 的 play/pause 事件同步而来）
            lyric: null,         // 保存歌词实例
            currentLineNum: 0,   // 当前高亮的歌词行号
            lyricOffset: 3,   // 歌词整体延迟（毫秒）：0 = 不延迟
            lrcText: `[00:11.29] It's been a long day without you, my friend
[00:17.75] And I'll tell you all about it when I see you again
[00:23.52] We've come a long way from where we began
[00:29.61] Oh, I'll tell you all about it when I see you again
[00:35.43] When I see you again
[00:40.60] Damn, who knew?
[00:42.17] All the planes we flew
[00:43.45] Good things we've been through
[00:45.04] That I've been standing right here talking to you
[00:47.92] About another path
[00:49.35] I know we loved to hit the road and laugh
[00:51.41] But something told me that it wouldn't last
[00:53.89] Had to switch up
[00:55.17] Look at things different, see the bigger picture
[00:57.89] Those were the days, hard work forever pays
[01:00.75] Now I see you in a better place, uh, uh
[01:05.68] How could we not talk about family when family's all that we've got?
[01:09.03] Everything I went through, you were standing there by my side
[01:12.06] And now you gon' be with me for the last ride
[01:14.27] It's been a long day without you, my friend
[01:20.51] And I'll tell you all about it when I see you again (when I see you again)
[01:26.76] We've come a long way (yeah, we've come a long way)
[01:29.86] From where we began (you know where we started)
[01:32.74] Oh, I'll tell you all about it when I see you again (I'll tell you)
[01:38.68] When I see you again
[01:42.75] 
[01:53.35] Yeah! First you both go out your way
[01:58.40] And the vibe is feeling strong
[01:59.72] And what's small turn to a friendship
[02:01.55] A friendship turn to a bond
[02:02.88] And that bond will never be broken
[02:04.56] The love will never get lost
[02:08.74] And when brotherhood come first
[02:10.34] Then the line will never be crossed
[02:11.98] Established it on our own
[02:13.25] When that line had to be drawn
[02:14.85] And that line is what we reach
[02:16.28] So remember me when I'm gone
[02:20.62] How could we not talk about family when family's all that we've got?
[02:24.12] Everything I went through, you were standing there by my side
[02:27.01] And now you gon' be with me for the last ride
[02:29.15] So let the light guide your way, yeah
[02:36.76] Hold every memory as you go
[02:41.63] And every road you take will always lead you
[02:48.33] Home, home
[02:53.14] It's been a long day without you, my friend
[02:59.52] And I'll tell you all about it when I see you again
[03:05.68] We've come a long way from where we began
[03:11.43] Oh, I'll tell you all about it when I see you again
[03:17.53] When I see you again
[03:22.30] 
[03:29.53] When I see you again
[03:32.99] 
[03:41.78] When I see you again
[03:43.38] `
        }
    },
    methods: {
        // 点击图片：播放 ⇄ 暂停
        async playAudio() {
            const audio = this.$refs.audio
            if (audio.paused) {
                await audio.play()
                // 暂停状态 → 播放
                this.lyric.play(this.$refs.audio.currentTime * 1000 - this.lyricOffset, true)
            } else {
                await audio.pause()
                // 播放状态 → 暂停
                this.lyric.stop()
            }
        },
        // audio 的 play/pause/ended 事件都会触发这里，把 DOM 的真实状态同步到 data
        syncPlayState() {
            // 组件被销毁时 $refs 会被清空，先判断一下，避免报错
            if (!this.$refs.audio) return
            this.isPlaying = !this.$refs.audio.paused
        },
        // 歌曲播完：同步状态 + 停掉歌词（否则歌曲结束后歌词还会自己继续"滚"）
        handleEnded() {
            this.syncPlayState()
            this.lyric && this.lyric.stop()
        }
    },
    // 注意：钩子名必须是 created（多一个 d），写成 create 永远不会被 Vue 调用
    created() {
        this.lyric = new Lyric(this.lrcText, ({ lineNum, txt }) => {
            // 每走到一句新歌词，就会执行这里
            console.log('当前歌词行：', lineNum, '内容：', txt)
            this.currentLineNum = lineNum
        })
        // 二倍速：把每句歌词的触发时间减半（不改 lrcText 原数据，只改解析结果）
        // 原理：这个库运行时会实时读取 lines[i].time 来决定什么时候报歌词，
        // 所以构造完直接改数组里的时间就生效；同比例减半，排序也不会乱
        this.lyric.lines.forEach(line => {
            line.time = line.time / 2
        })
    },
    // 组件销毁前收尾：停动画、停音乐，防止"幽灵代码"继续空转
    beforeUnmount() {
        cancelAnimationFrame(this.animTimer)   // 停掉旋转动画
        if (this.$refs.audio) {
            this.$refs.audio.pause()           // 停掉音乐
        }
        this.lyric && this.lyric.stop()
    },
    watch: {
        // 监听 isPlaying：播放时启动旋转动画，暂停时停掉
        isPlaying: {
            handler(newVal) {
                if (newVal) {
                    // requestAnimationFrame：每一帧把角度 +0.6 度，形成匀速旋转
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
.lyric-container {
    width: 700px;
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
