import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state ={
  cartList:[]
}
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
  }
})
