import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
Vue.use(Vuex)
const state = {
  // 存放点击播放的歌曲信息
  songInfo: '',
  // 是否显示播放界面
  playUI: false,
  // 是否播放
  playing: true,
  // 播放列表
  playList: [],
  // 是否显示播放列表小窗口
  songList: false,
  // 当前播放歌曲的索引
  currentIndex: -1
}

// state ,存放数据
// mutations,里面装着一些改变数据方法的集合
// getters，可以理解为getters是store的计算属性
// actions, 可以异步处理数据方法（异步操作数据）

export default new Vuex.Store({
  state,
  mutations,
  getters
})
