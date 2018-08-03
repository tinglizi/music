<template>
    <div class="list-view" @scroll="distance" ref="listView">
      <ul>
        <li class="list-group" ref="listGroup" v-for="(group,index) in data" :key="index" >
          <h2 class="list-group-title">{{group.title}}</h2>
          <ul>
            <li class="list-group-item" v-for="(item,index2) in group.items" :key="index2" @click="slectSinger(item)">
              <img v-lazy="item.avatar" class="avatar">
              <span class="name">{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="list-shortcut">
        <ul>
          <li class="item" v-for="(letter,index) in letterList" :key="index" ref="letter"
              :class="{'current': currentIndex === index}"
              @touchstart = "touchStart(index, $event)"
              @touchmove = "touchMove"
          >{{letter}}</li>
        </ul>
      </div>
    </div>
</template>
<script>
export default{
  data () {
    return {
      currentIndex: 0,
      touchlist: {
        startY: 0,
        endY: 0
      }
    }
  },
  props: {
    data: {
      type: Array
    }
  },
  computed: {
    // 返回首字母
    letterList () {
      return this.data.map((item) => {
        return item.title.charAt(0)
      })
    }
  },
  methods: {
    distance (e) {
      // 获取滚动到距离顶部的距离
      let top = e.target.scrollTop
      // 获取列表标题li
      let liarr = this.$refs.listGroup
      for (var i = 0; i < liarr.length; i++) {
        // 如果滚动条的距离大于等于当前li距离顶部的距离，则设置currentIndex = i
        if (top >= liarr[i].offsetTop) {
          this.currentIndex = i
        }
      }
    },
    touchStart (index, e) {
      // 获取点击的索引
      this.touchlist.touchIndex = index
      // 获取首次点击的pageY
      this.touchlist.startY = e.touches[0].pageY
      this._scroll(index)
    },
    touchMove (e) {
      // 获取移动的pageY
      this.touchlist.endY = e.touches[0].pageY
      // 让最后移动的减去首次点击的差除以20（每个字母直接的间距）取整
      let dis = parseInt((this.touchlist.endY - this.touchlist.startY) / 20) | 0
      // 让首次点击的字母的索引值 + dis = 最后移动的索引值
      let idx = dis + this.touchlist.touchIndex
      this._scroll(idx)
    },
    _scroll (index) {
      // 获取列表标题li
      let liarr = this.$refs.listGroup
      let top
      for (var i = 0; i < liarr.length; i++) {
        // 如果选择的字母index与li的index相同，则滚动到相应的位置
        if (index === i) {
          top = liarr[i].offsetTop
        }
      }
      this.$refs.listView.scrollTop = top
    },
    slectSinger (item) {
      this.$emit('selectItem', item)
    }
  }
}
</script>
<style lang="less" scoped>
  .list-view {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    background: #F2F3F4;
    .list-group {
      .list-group-title {
        height: 20px;
        line-height: 20px;
        padding-left: 12px;
        margin-bottom: 10px;
        font-size:12px;
        color: #fff;
        background:rgba(0, 0, 0, 0.1);
      }
      .list-group-item {
        display: flex;
        align-items: center;
        padding: 5px 0;
        margin: 0 5px;
        border-bottom: 1px solid rgb(228, 228, 228);
        &:last-child {
          border: none;
          margin-bottom: 10px;
        }
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 3px;
        }
        .name {
          margin-left: 20px;
          color: #2E3030;
          font-size: 14px;
        }
      }
    }
    .list-shortcut {
      position: fixed;
      z-index: 30;
      right: 3px;
      top: 58%;
      transform: translateY(-50%);
      width: 20px;
      padding: 200px 0;
      border-radius: 3px;
      text-align: center;
      font-family:Helvetica;
      .item {
        padding: 5px 5px;
        line-height: 1;
        color: #757575;
        font-size: 12px;
        font-weight: bold;
        &.current {
          color:#d44439;
        }
      }
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
