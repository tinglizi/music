<template>
    <div class="player">
      <div class="normal-player" v-show="play">
        <div class="background">
          <div class="filter"></div>
          <img :src="songs.picurl" alt="" class="image">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="iconfont icon-jiantou2"></i>
          </div>
          <div class="title">{{songs.songName}}</div>
          <h2 class="subtitle">{{songs.singer}}</h2>
        </div>
        <div class="middle">
          <div class="middle-l" v-if="!toggleLyric">
            <div class="cd-wrapper">
              <div class="cd play" @click="showLyric">
                <img :src="songs.picurl" alt="" class="image">
              </div>
            </div>
          </div>
          <div class="middle-r" v-if="toggleLyric" >
            <div class="lyric-wrapper" @click="showLyric">
              <div class="currentLyric" v-if="currentLyric" ref="lyricBox">
                <p ref="lyricLine" class="text" v-for="(line, index) in currentLyric" :key="index" :class="currentLineNum === index ? 'current' : ''">
                  {{line.txt}}
                </p>
              </div>
              <p class="no-lyric">没有歌词了</p>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="progress" @percentChange="progressChange"></progress-bar>
            </div>
            <span class="time time-r">{{format(duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left" >
              <i class="iconfont mode" :class="iconMode" @click="changeMode"></i>
            </div>
            <div class="icon i-left" >
              <i class="iconfont icon-shangyishou1 mode" @click="prev"></i>
            </div>
            <div class="icon i-center" >
              <i class="iconfont mode" :class="togglePlayClass ? 'icon-zanting' : 'icon-bofang'" @click="togglePlay"></i>
            </div>
            <div class="icon i-right" >
              <i class="iconfont icon-shangyishou mode" @click="next"></i>
            </div>
            <div class="icon i-right">
              <i class="iconfont mode" @click="collect" :class="isCollect ? 'icon-asmkticon0242' : 'icon-xihuan'"></i>
            </div>
          </div>
        </div>
      </div>
      <!-- 小窗口播放 -->
      <div class="mini-player" v-show="showList" @click="showFullScreen">
        <div class="icon">
          <img :src="songs.picurl" alt="">
        </div>
        <div class="text">
          <h2 class="name">{{songs.songName}}</h2>
          <div class="desc">{{songs.singer}}</div>
        </div>
        <div class="control">
          <div class="progress-circle" @click.stop="togglePlay">
            <i class="iconfont " :class="togglePlayClass ? 'icon-zanting' : 'icon-bofang'"></i>
          </div>
        </div>
        <div class="control">
          <div class="progress-circle" @click.stop="showPlayList">
            <i class="iconfont icon-liebiao1"></i>
          </div>
        </div>
      </div>
      <!-- 播放列表 -->
      <play-list :isShow="isshowPlayList" @hide="hide" :iconMode="iconMode"></play-list>
      <!--播放音频-->
      <audio class="playAudio" ref="audio" autoplay :src="songAudio.url" @timeupdate="timeUpdate" @canplay="totalTime" @ended="end"></audio>
    </div>
</template>
<script>
import {getPlaySong, getLyric} from '../api'
import {playSongInfo} from '../utils/song'
import {mapGetters} from 'vuex'
import progressBar from '../components/progressBar.vue'
import playList from './playList.vue'
import {playMode, parseLyric} from '../utils/config'
export default{
  data () {
    return {
      // 是否显示小屏
      isShowMini: false,
      // 歌曲信息
      songs: {},
      // 歌曲音频
      songAudio: {},
      // 歌词
      currentLyric: null,
      // 歌词行数
      currentLineNum: 0,
      // 歌曲播放的时间
      currentTime: 0,
      // 歌曲总长度
      duration: 0,
      // 歌曲进度条
      progress: 0,
      // 显示播放列表
      isshowPlayList: false,
      // 切换暂停/播放按钮样式
      togglePlayClass: true,
      // 是否循环播放
      loop: false,
      // 切换歌词显示
      toggleLyric: false,
      // 收藏
      isCollect: false,
      // 收藏列表
      collectList: []
    }
  },
  computed: {
    // 获取songid
    songInfo () {
      return this.$store.state.songInfo
    },
    ...mapGetters([
      'getPlaying',
      'showList',
      'getPlayList',
      'getCurrentIndex',
      'getMode',
      'getCollect'
    ]),
    play () {
      return this.$store.state.playUI
    },
    // 监听切换播放模式图标
    iconMode () {
      if (this.getMode === playMode.sequence) {
        return 'icon-liebiaoxunhuan'
      } else if (this.getMode === playMode.loop) {
        return 'icon-danquxunhuan'
      } else {
        return 'icon-suijibofang'
      }
    }
  },
  watch: {
    // 监听songid,获取歌曲数据
    songInfo (newVal, oldVal) {
      if (newVal) {
        this.getSong(newVal)
        this._getSong(newVal.id)
        this._getLyric(newVal.id)
      }
      this.collects()
    },
    getPlaying (newVal) {
      const audio = this.$refs.audio
      newVal ? audio.play() : audio.pause()
      this.togglePlayClass = newVal
    },
    getCollect (newVal) {
      this.collectList = newVal
    }
  },
  methods: {
    // 获取播放音频
    _getSong (id) {
      getPlaySong(id).then(res => {
        this.songAudio = res.data.data[0]
      })
    },
    // 获取歌词
    _getLyric (id) {
      getLyric(id).then(res => {
        let lyric = res.data.lrc.lyric
        // 获取歌词并将歌词进行解析
        this.currentLyric = parseLyric(lyric)
        // 歌词重载以后 高亮行设置为 0, 歌词的marginTop设置为0
        this.currentLineNum = 0
        this.$nextTick(() => {
          if (this.$refs.lyricBox) {
            this.$refs.lyricBox.style.marginTop = 0
          }
        })
      })
    },
    // 切换显示歌词
    showLyric () {
      this.toggleLyric = !this.toggleLyric
      if (this.$refs.lyricBox) {
        this.$refs.lyricBox.style.marginTop = 0
      }
    },
    // 获取歌曲信息
    getSong (song) {
      this.songs = playSongInfo(song)
    },
    // 点击切换播放状态
    togglePlay () {
      // 设置播放状态
      this.$store.commit('setPlaying', !this.getPlaying)
      // this.getPlaying ? audio.play() : audio.pause()
    },
    // 改变播放位置
    timeUpdate (e) {
      this.currentTime = e.target.currentTime
      // 遍历歌词数组，判断如果当前时间与歌词时间一致，则设置当前显示行的索引
      this.currentLyric.forEach((item, index) => {
        if (this.format(this.currentTime) === this.format(item.time)) {
          this.currentLineNum = index
        }
      })
      this.handleLyric()
      // 进度条的位置 = 当前的时间长度 / 总长度
      this.progress = this.currentTime / this.duration
    },
    // 设置歌词跳转
    handleLyric () {
      // 如果当前歌词行数大于5，将lyricBox向上移一行
      if (this.currentLineNum > 5) {
        this.$nextTick(() => {
          if (this.$refs.lyricBox) {
            this.$refs.lyricBox.style.marginTop = -(this.currentLineNum - 5) * 40 + 'px'
          }
        })
      }
    },
    // 总播放时间
    totalTime (e) {
      this.duration = this.$refs.audio.duration
    },
    // 进度条拖动改变
    progressChange (position, isMove) {
      // 判断当前是否是拖动进度条，如果正在拖动进度条则暂停播放
      isMove ? this.$refs.audio.pause() : this.$refs.audio.play()
      // 计算当前播放时间，并设置音频的currentTime
      let currentTime = this.duration * position
      this.$refs.audio.currentTime = currentTime
    },
    // 播放时间格式化
    format (time) {
      time = time || 0
      // 向下取整，将时间转化为分钟
      let minute = Math.floor(time / 60) || 0
      // 获取秒数，
      let second = Math.floor(time % 60)
      if (second < 10) {
        second = '0' + second
      }
      return minute + ':' + second
    },
    // 显示播放列表
    showPlayList () {
      this.isshowPlayList = true
    },
    // 隐藏播放列表
    hide () {
      this.isshowPlayList = false
    },
    // 点击显示大屏
    showFullScreen () {
      this.$store.commit('toggleScreen', true)
    },
    // 上一首
    prev () {
      let prevIndex
      prevIndex = this.getCurrentIndex - 1
      if (prevIndex < 0) {
        prevIndex = this.getPlayList.length - 1
      }
      this.getPlayList.forEach((currentVal, index, arr) => {
        if (arr[prevIndex] === currentVal) {
          this.$store.commit('saveSong', currentVal)
          this.$store.commit('setPlaying', true)
          this.$store.commit('setCurrentIndex', currentVal)
        }
      })
    },
    // 下一首
    next () {
      let nextIndex = this.getCurrentIndex + 1
      if (nextIndex >= this.getPlayList.length) {
        nextIndex = 0
      }
      this.getPlayList.forEach((currentVal, index, arr) => {
        if (arr[nextIndex] === currentVal) {
          this.$store.commit('saveSong', currentVal)
          this.$store.commit('setPlaying', true)
          this.$store.commit('setCurrentIndex', currentVal)
        }
      })
    },
    // 切换播放模式
    changeMode () {
      // 设置播放模式
      let mode = (this.getMode + 1) % 3
      this.$store.commit('setMode', mode)
    },
    // 音频播放完后
    end () {
      // 设置循环播放
      if (this.getMode === 1) {
        // 设置当前的播放位置从0开始
        this.$refs.audio.currentTime = 0
        // 播放完成后再次调用audio播放方法
        this.$refs.audio.play()
      } else {
        // 列表播放
        // 调用next方法播放下一首
        this.next()
      }
    },
    // 收藏当前歌曲
    collect () {
      this.isCollect = !this.isCollect
      // 点击收藏为true
      if (this.isCollect) {
        this.$store.commit('setCollect', this.songInfo)
      } else {
        // 取消收藏
        this.$store.commit('cancelCollect', this.songInfo)
      }
    },
    // 判断当前歌曲是否收藏
    collects () {
      for (let i in this.collectList) {
        // 判断当前歌曲是否收藏，收藏则显示红色，否则不显示
        if (this.songInfo.al.name === this.collectList[i].al.name) {
          this.isCollect = true
          return
        } else {
          this.isCollect = false
        }
      }
    },
    // 收回播放界面
    back () {
      this.$store.commit('toggleScreen', false)
      this.isShowMini = true
    }
  },
  components: {
    progressBar,
    playList
  }
}
</script>
<style lang="less" scoped>
  .normal-player{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: #F2F3F4;
  }
  .background{
    position: absolute;
    left: -50%;
    top: -50%;
    width: 300%;
    height: 300%;
    z-index: -1;
    opacity: 0.6;
    -webkit-filter: blur(30px);
    filter: blur(30px);
    .filter{
      position: absolute;
      width: 100%;
      height: 100%;
      background: black;
      opacity: 0.6;
    }
  }
  .top{
    position: relative;
    margin-bottom: 25px;
    .back{
      position: absolute;
      margin-bottom: 25px;
      i{
        display: block;
        padding: 3px 9px;
        font-size:28px;
        color: #f1f1f1;
      }
    }
    .title{
      display: block;
      font-size: 22px;
      color: #f1f1f1;
      text-align: center;
      margin-top: 3px;

    }
    .subtitle{
      width: 70%;
      margin: 0 auto;
      line-height: 20px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 12px;
      color: #f1f1f1;
    }
  }
  .middle{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: fixed;
    width: 100%;
    top: 80px;
    bottom: 170px;
    white-space: nowrap;
    font-size: 0;
    .middle-l{
      display: inline-block;
      vertical-align: top;
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 80%;
      .cd-wrapper{
        position: absolute;
        left: 10%;
        top: 0;
        width: 80%;
        height: 100%;
        .cd{
          width: 100%;
          height: 100%;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          border: 15px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          overflow: hidden;
          img{
            width: 100%;
          }
          .img{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .cd.pause{
          -webkit-animation-play-state: paused;
          animation-play-state: paused;
        }
        .cd.play{
          -webkit-animation-play-state: paused;
          animation-play-state: paused;
        }
      }
    }
    .middle-r{
      display: inline-block;
      position: absolute;
      top: 0;
      vertical-align: top;
      width: 100%;
      height: 100%;
      overflow: hidden;
      .lyric-wrapper{
        width: 80%;
        margin: 0 auto;
        overflow: hidden;
        text-align: center;
       .currentLyric{
         .text{
           line-height:40px;
           color: #c7c7c7;
           font-size: 14px;
         }
         .current {
           color: #fff;
         }
       }
      }
    }
  }
  .bottom{
    position: absolute;
    bottom: 50px;
    width: 100%;
    .progress-wrapper{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      width: 80%;
      margin: 0px auto;
      padding: 10px 0;
      .time{
        color: #f1f1f1;
        font-size: 11px;
        -webkit-box-flex: 0;
        -ms-flex: 0 0 30px;
        flex: 0 0 30px;
        line-height: 30px;
        width: 30px;
      }
      .time-l{
        float: left;
      }
      .time-r{
        text-align: right;
      }
      .progress-bar-wrapper{
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
      }
    }
    .operators {
      display: flex;
      align-items: center;
      .icon {
        flex: 1;
        color: #f1f1f1;
        &.disable {
          color: #f1f1f1;
        }
        i {
          font-size: 30px;
        }
        .mode {
          font-size: 25px;
        }
        &.i-left {
          text-align: right;
        }
        &.i-center {
          padding: 0 20px;
          text-align: center;
          i {
            font-size: 40px;
          }
        }
        &.i-right {
          text-align: left;
        }
        .icon-asmkticon0242{
          color: #f00;
        }
      }
    }
  }
  .mini-player{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 60px;
    background: rgba(255, 255, 255, 0.85);
    .icon {
      -webkit-box-flex: 0;
      -ms-flex: 0 0 40px;
      flex: 0 0 40px;
      width: 88px;
      padding: 0 10px 0 20px;
      img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .text{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      overflow: hidden;
      .name {
        margin-bottom: 2px;
        line-height: 14px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 14px;
        color: #2E3030;
      }
      .desc {
        margin-bottom: 2px;
        line-height: 14px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 14px;
        color: #2E3030;
      }
    }
    .control {
      -webkit-box-flex: 0;
      -ms-flex: 0 0 30px;
      flex: 0 0 30px;
      width: 30px;
      overflow: hidden;
      margin-right: 20px;
      .progress-circle{
        position: relative;
        i{
          font-size: 26px;
        }
      }
    }
  }
  .lyric-wrapper {
    width: 80%;
    margin: 0 auto;
    overflow: hidden;
    text-align: center;
    .currentLyric{
      p.text{
        line-height: 40px;
        color: #c7c7c7;
        font-size: 14px;
      }
    }
  }
</style>
