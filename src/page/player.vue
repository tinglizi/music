<template>
    <div class="player">
      <div class="normal-player">
        <div class="background">
          <div class="filter"></div>
          <img src="http://p1.music.126.net/vmCcDvD1H04e9gm97xsCqg==/109951163350929740.jpg" alt="">
        </div>
        <div class="top">
          <div class="back">
            <i class="iconfont icon-jiantou2"></i>
          </div>
          <div class="title">笑抽</div>
          <h2 class="subtitle">毛不已</h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper">
              <div class="cd play">
                <img src="" alt="" class="image">
              </div>
            </div>
          </div>
          <div class="middle-r" style="display: none">
            <div class="lyric-wrapper"></div>
          </div>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">0:00</span>
            <div class="progress-bar-wrapper">
              <div class="progress-bar">
                <div class="bar-inner">
                  <div class="progress"></div>
                  <div class="progress-btn-wrapper">
                    <div class="progress-btn"></div>
                  </div>
                </div>
              </div>
            </div>
            <span class="time time-l">0:00</span>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i class="iconfont icon-liebiaoxunhuan mode"></i>
            </div>
            <div class="icon i-left">
              <i class="iconfont icon-shangyishou1 mode"></i>
            </div>
            <div class="icon i-center">
              <i class="iconfont icon-bofang mode"></i>
            </div>
            <div class="icon i-right">
              <i class="iconfont icon-shangyishou mode"></i>
            </div>
            <div class="icon i-right">
              <i class="iconfont icon-xihuan mode"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import {getPlaySong, getLyric} from '../api'
export default{
  data () {
    return {
      id: '',
      song: {},
      lyric: {}
    }
  },
  created () {
  },
  methods: {
    _getSong () {
      getPlaySong(this.id).then(res => {
        console.log(res)
        this.song = res.
      })
    },
    _getLyric () {
      getLyric(this.id).then(res => {
        console.log(res)
      })
    }
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
      .progress-bar-wrapper{
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
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
      }
    }
  }
</style>
