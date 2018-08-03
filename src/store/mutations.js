import {SHOWLOADING, HIDELOADING} from './types'
let newPlayList = []
let newCollect = []
const mutations = {
  // 保存播放的歌曲信息
  saveSong (state, info) {
    state.songInfo = info
  },
  // 设置显示/隐藏播放歌曲界面
  togglePlay (state, status) {
    // 设置开始播放歌曲
    state.playing = state
  },
  toggleScreen (state, status) {
    // 显示全屏的播放界面
    state.playUI = status
    // 小屏取相反值
    state.songList = !status
  },
  // 隐藏小屏播放界面
  hidemini (state, status) {
    state.songList = status
  },
  // 设置播放/暂停歌曲
  setPlaying (state, status) {
    state.playing = status
  },
  // 设置播放列表（将歌曲添加到播放列表）
  setPlayList (state, item) {
    // 去除重复的列表值
    // 将item的name值追加到newArr中，如果不存在则添加
    if (newPlayList.indexOf(item.name) === -1 || newPlayList.length === 0) {
      newPlayList.push(item.name)
      state.playList.push(item)
    }
  },
  // 设置播放全部
  setPlayAll (state, items) {
    items.forEach((item, index) => {
      state.playList.push(item)
    })
    console.log(state.playList.length)
  },
  // 设置当前播放歌曲的索引值
  setCurrentIndex (state, item) {
    state.playList.forEach(function (currentItem, index) {
      if (item === currentItem) {
        state.currentIndex = index
      }
    })
  },
  // 删除一首播放歌曲
  delPlayList (state, index) {
    state.playList.splice(index, 1)
    console.log('111111111')
  },
  // 删除播放列表所有歌曲
  delAllPlayList (state) {
    // 播放列表清空
    state.playList = []
    newPlayList = []
    // 隐藏播放列表小窗口
    state.songList = false
    // 停止播放歌曲
    state.playing = false
  },
  // 设置播放模式
  setMode (state, mode) {
    state.mode = mode
  },
  // 添加收藏
  setCollect (state, item) {
    // 去除重复的列表值
    // 将item的name值追加到newArr中，如果不存在则添加
    if (newCollect.indexOf(item.name) === -1 || newCollect.length === 0) {
      newCollect.push(item.name)
      state.collect.push(item)
    }
  },
  // 取消收藏
  cancelCollect (state, item) {
    for (var i in state.collect) {
      if (item === state.collect[i]) {
        state.collect.splice(i, 1)
      }
    }
  },
  //  显示loading
  [SHOWLOADING] (state, status) {
    state.loading = true
  },
  //  隐藏loading
  [HIDELOADING] (state, status) {
    state.loading = false
  }
}

export default mutations
