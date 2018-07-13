import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  songId: '',
  play: false
}

export default new Vuex.Store({
  state
})
