<template>
    <div class="play-list" v-show="isShow" @click="hide">
      <div class="list-wrapper" >
        <div class="list-header">
          <div class="title">
            <i class="iconfont icon-liebiaoxunhuan"></i>
            <span class="text">播放顺序 <span class="count">({{songList.length}})</span></span>
            <span class="clear" @click.stop="deleteAll"><i class="iconfont icon-delete"></i></span>
          </div>
        </div>
        <div class="list-content">
          <ul>
            <li class="item" v-for="(item,index) in songList" :key="index" @click.stop="changSong(item)">
              <i class="iconfont " :class="getCurrentIndex === index ? 'icon-lababofang' : ''"></i>
              <span>{{songInfo(item)}}{{getCurrentIndex}}</span>
              <span class="delete" @click.stop="deleteSong(index)">
                <i class="iconfont icon-close" ></i>
              </span>
            </li>
          </ul>
        </div>
        <div class="list-close">
          <span>关闭</span>
        </div>
      </div>
      <!-- 弹出框 -->
      <confirm :isAlert="isAlert" @closeAlert="closeAlert" @confirm="confirm" v-show="isAlert" dialogTitle="是否清空播放列表"></confirm>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {playSongInfo} from '../utils/song'
import confirm from '../components/confirm.vue'
export default{
  data () {
    return {
      // 歌曲列表
      songList: [],
      // 弹出框
      isAlert: false,
      // 正在播放
      isPlaying: 0
    }
  },
  props: ['isShow'],
  computed: {
    ...mapGetters([
      'getPlayList',
      'getCurrentIndex'
    ])
  },
  watch: {
    getPlayList (newVal, oldVal) {
      this.songList = newVal
    }
  },
  methods: {
    // 返回歌曲名称
    songInfo (item) {
      return playSongInfo(item).songName
    },
    // 删除指定歌曲
    deleteSong (index) {
      console.log(this.getCurrentIndex)
      if (index === this.getCurrentIndex) {
        let newIdx = index + 1
        this.songList.forEach((currentItem, index1, arr) => {
          if (newIdx < 0) {
            newIdx = arr.length - 1
          }
          if (newIdx >= arr.length) {
            newIdx = arr.length - 1
          }
          this.changSong(arr[newIdx])
        })
      }
      // 如果整个列表没有歌曲，就清空不显示小窗口
      if (!this.songList.length) {
        this.confirm()
      }
      this.$store.commit('delPlayList', index)
    },
    // 隐藏播放歌曲列表
    hide () {
      this.$emit('hide', false)
    },
    // 清空播放列表
    deleteAll () {
      this.isAlert = true
    },
    // 关闭对话框
    closeAlert () {
      this.isAlert = false
    },
    // 确认删除所有
    confirm () {
      this.$store.commit('delAllPlayList')
      this.hide()
      this.closeAlert()
    },
    // 切换播放列表的歌曲
    changSong (item) {
      // 保存播放的歌曲信息
      this.$store.commit('saveSong', item)
      // 将歌曲添加到播放列表
      this.$store.commit('setPlayList', item)
      // 设置显示播放歌曲界面
      this.$store.commit('toggleScreen', true)
      // 播放歌曲
      this.$store.commit('togglePlay', true)
      // 设置当前播放歌曲的索引值
      this.$store.commit('setCurrentIndex', item)
    }
  },
  components: {
    confirm
  }
}
</script>
<style lang="less" scoped>
  .play-list{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 200;
    background-color: rgba(0, 0, 0, 0.3);
    .list-wrapper{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      border-radius: 8px;
      background-color: #F2F3F4;
      .list-header {
        position: relative;
        padding: 20px 30px 10px 20px;
        .title {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          .iconfont {
            margin-right: 10px;
            font-size: 20px;
            color: #757575;
          }
          .text {
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            font-size: 14px;
            color: #2E3030;
            .count {
              position: relative;
              top: 1px;
            }
          }
          .clear {
            .icon-delete {
              font-size: 14px;
              color: #757575;
            }
          }
        }
      }
      .list-content {
        max-height: 240px;
        overflow: hidden;
        .item {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          height: 40px;
          padding: 0 30px 0 20px;
          overflow: hidden;
          position: relative;
          .icon-lababofang{
            color: #d44439;
            margin-right: 5px;
          }
          .text {
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            line-height: 20px;
            font-size: 14px;
            color: #2E3030;
          }
          .delete {
            position: absolute;
            right: 30px;
            padding: 5px 10px;
            font-size: 12px;
            color: #d44439;
          }
        }
      }
      .list-close {
        text-align: center;
        line-height: 50px;
        background: #F2F3F4;
        font-size: 16px;
        color: #2E3030;
      }
    }
  }
</style>
