<template>
    <div class="progressBox">
      <div class="progress-bar" ref="progressBar" @click="changeBar">
        <div class="bar-inner">
          <div class="progress" ref="progress"></div>
          <div class="progress-btn-wrapper">
            <div class="progress-btn" ref="progressBtn"
                 @touchstart.stop="touchStart"
                 @touchmove.stop="touchMove"
                 @touchend.stop="touchEnd"
            ></div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
const btnWidth = 16
export default{
  data () {
    return {
      touch: {}
    }
  },
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  watch: {
    percent (newVal) {
      if (newVal > 0 && !this.touch.initiated) {
        // 设置进度条的总宽度等于总宽度减去进度按钮的宽度
        let barWidth = this.$refs.progressBar.clientWidth - btnWidth
        // 设置当前进度条的宽度等于 当前时长 / 总时长 * 进度条的总宽度
        let width = newVal * barWidth
        this.setProgress(width)
      }
    }
  },
  methods: {
    // 点击改变进度条宽度
    changeBar (e) {
      let rect = this.$refs.progressBar.getBoundingClientRect()
      let disX = e.pageX - rect.left
      this.setProgress(disX)
      this.setPlayPosition(false)
    },
    // 设置进度条的宽度
    setProgress (val) {
      this.$refs.progress.style.width = `${val}px`
      // 设置进度按钮的位置
      this.$refs.progressBtn.style.transform = `translate3d(${val}px,0,0)`
    },
    // 开始
    touchStart (e) {
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    // 移动
    touchMove (e) {
      // 如果不是拖动就直接返回
      if (!this.touch.initiated) {
        return
      }
      // 设置播放位置
      this.setPlayPosition(true)
      // 整个进度条的宽度
      let barWidth = this.$refs.progressBar.clientWidth - btnWidth
      // 从点击开始到拖动结束的位置
      let deltaX = e.touches[0].pageX - this.touch.startX
      // 拖动的位置 + 拖动前进度条的宽度
      let offsetWidth = deltaX + this.touch.left
      if (offsetWidth > barWidth) {
        offsetWidth = barWidth
      }
      if (offsetWidth < 0) {
        offsetWidth = 0
      }
      // 设置进度条的宽度
      this.setProgress(offsetWidth)
    },
    // 结束
    touchEnd () {
      this.touch.initiated = false
      // 设置播放位置
      this.setPlayPosition(false)
    },
    // 设置播放位置
    setPlayPosition (status) {
      // 整个进度条的宽度
      let barWidth = this.$refs.progressBar.clientWidth - btnWidth
      let percents = this.$refs.progress.clientWidth / barWidth
      this.$emit('percentChange', percents, status)
    }
  }
}
</script>
<style scoped lang="less">
  .progress-bar{
      height: 30px;
    .bar-inner{
      position: relative;
      top: 13px;
      height: 4px;
      background: rgba(0, 0, 0, 0.3);
      .progress{
        position: absolute;
        height: 100%;
        background: #d44439;
      }
      .progress-btn-wrapper{
        position: absolute;
        left: -8px;
        top: -13px;
        width: 30px;
        height: 30px;
        .progress-btn{
          position: relative;
          top: 7px;
          left: 7px;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          width: 16px;
          height: 16px;
          border: 5px solid #f1f1f1;
          border-radius: 50%;
          background: #d44439;
        }
      }
    }
  }

</style>
