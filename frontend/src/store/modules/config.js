// 全局的一些通用配置
// import Cookies from 'storejs'

const state = {
  baseUrl: '',
}

const mutations = {
  SETBASEURL: (state, url) => {
    state.baseUrl = url
  }
}

const actions = {
  setBaseUrl({ commit }, url) {
    commit('SETBASEURL', url)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
