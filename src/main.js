// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/index'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
// import 'lib-flexible'

Vue.use(MuseUI)

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  loading: require('../static/default.png')
})

// 解决点击延迟3秒
fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
