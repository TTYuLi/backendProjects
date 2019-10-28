import Vuex from 'vuex'
import Vue from 'vue'
import Routes from '../../router/routes.js'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    route: Routes,
  },
  mutatations: {
    // 方法函数
    // increment (state) {
    //   // 变更状态
    //   state.count++
    // }
    // store.commit('increment') // 在相应位置调取
  },
  getter: {},
  action: {}
})
export default store