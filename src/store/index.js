import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/net/storeUtils' 

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('user'),
    historyValue: []
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      setItem('user', payload)
    },
    addHistory (state, payload) {
      state.historyValue.unshift(payload)
    },
    deleteHistory (state, payload) {
      state.historyValue.splice(state.historyValue.indexOf(payload),1)
    },
    deleteAll (state) {
      state.historyValue.splice(0)
    }
  },
  actions: {
    getData (context, payload) {
      context.commit('setUser', payload)
    }
  },
  modules: {
  }
})
