<template>
  <div class="tooltip-wrap" @mouseenter="show = true" @mouseleave="show = false">
    <!-- 插槽：任意元素往里套 -->
    <slot></slot>
    <!-- 提示框：href 传了就渲染成 <a> 超链接，没传就是纯文字 -->
    <div v-show="show" class="tooltip-box" :class="placement">
      <!-- v-if 兜底：没传 content2 时第二行不渲染，避免出现一个空 <p> 点击打开空标签页 -->
      <p v-if="content1" @click="cnt1Clicked">{{ content1 }}</p>
      <p v-if="content2" @click="cnt2Clicked">{{ content2 }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyTooltip',
  // 对外暴露的可调参数（props）
  props: {
    content1: {
      type: String,
      default: '' // 提示文字
    },
    content2: {
      type: String,
      default: ''
    },
    placement: {
      type: String,
      default: 'bottom' // 弹出方向：top/bottom/left/right
    },
    link1: {
      type: String,
      default: ''
    },
    link2: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false, // 提示框显隐状态，内部自己管理
    }
  },
  methods: {
    cnt1Clicked() {
      window.open(this.link1); // script 里访问 props 必须加 this.，模板里才可以直接写名字
    },
    cnt2Clicked() {
      window.open(this.link2);
    }
  }
}
</script>

<style scoped>
.tooltip-wrap {
  position: relative;
  display: inline-block;
}

.tooltip-box {
  position: absolute;
  padding: 6px 12px;
  background: rgba(180, 180, 180, 0.7);
  color: #000000;
  font-size: 18px;
  border-radius: 4px;
  border: 2px solid #000000;
  white-space: nowrap;
  z-index: 999;
}

/* 四个方向定位 */
.tooltip-box.top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.tooltip-box.bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.tooltip-box.left {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
}

.tooltip-box.right {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
}
</style>
