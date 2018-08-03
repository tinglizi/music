const getters = {
  // 获取播放歌曲信息
  getPlaySongInfo (state) {
    return state.songInfo
  },
  // 获取是否播放
  getPlaying (state) {
    return state.playing
  },
  // 是否显示小屏播放列表
  showList (state) {
    return state.songList
  },
  // 获取播放列表
  getPlayList (state) {
    return state.playList
  },
  // 获取当前播放歌曲的索引值
  getCurrentIndex (state) {
    return state.currentIndex
  },
  // 获取播放模式
  getMode (state) {
    return state.mode
  },
  // 获取收藏列表
  getCollect (state) {
    return state.collect
  },
  // 获取loading状态
  getLoading (state) {
    return state.loading
  }
}
export default getters
