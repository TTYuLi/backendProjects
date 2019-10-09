// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'jquery'

import svgJs from './utils/svg'
Vue.use(svgJs)
// import svg from 'svg.js'
// Vue.prototype.$svg = svg
// import '@svgdotjs/svg.panzoom.js'

import iview from 'iview'
import 'iview/dist/styles/iview.css';

Vue.use(iview)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
