<template>
    <div class="dialog" >
      <div class="dialog-wrapper">
        <div class="dialog-content">
          <p class="text">{{dialogTitle}}</p>
          <div class="dialog-operate">
            <div class="operate-btn" @click.stop="close">取消</div>
            <div class="operate-btn" @click.stop="confirm">清空</div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default{
  data () {
    return {
    }
  },
  props: ['isAlert', 'dialogTitle'],
  methods: {
    // 确认清空播放列表
    confirm () {
      this.$emit('confirm')
    },
    // 关闭对话框
    close () {
      this.$emit('closeAlert')
    }
  }
}
</script>
<style scoped lang="less">
  .dialog {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 998;
    background-color: rgba(0, 0, 0, 0.3);
    .dialog-wrapper {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      z-index: 999;
      .dialog-content {
        width: 270px;
        border-radius: 5px;
        background: #f2f3f4;
        .text {
          padding: 12px 15px;
          line-height: 22px;
          text-align: center;
          font-size: 16px;
          color: #2e3030;
        }
        .dialog-operate {
          display: flex;
          display: -webkit-flex;
          display: -ms-flex;
          align-items: center;
          text-align: center;
          font-size: 16px;
          box-sizing: border-box;
          .operate-btn {
            flex: 1;
            line-height: 22px;
            padding: 12px 0;
            border-top: 1px solid #F2F3F4;
            color: #d44439;
          }
        }
      }
    }
  }
</style>
