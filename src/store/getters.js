const getters = {
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
  }
}
export default getters
