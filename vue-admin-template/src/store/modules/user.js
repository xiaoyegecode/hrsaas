import { loginAPI } from '@/api/login'
const state = {
  token: null
}
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  }
}
const actions = {
  async loginActions({ commit }, data) {
    const result = await loginAPI(data)
    commit('SET_TOKEN', result)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
