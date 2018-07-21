let newPlayList = []
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
  }
}

export default mutations
