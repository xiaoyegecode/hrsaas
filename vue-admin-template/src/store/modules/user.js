import { loginAPI } from '@/api/login'
import { getUserInfoAPI, getUserDetailByIdAPI } from '@/api/user'
const state = {
  token: null,
  userInfo: {}
}
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  },
  REMOVE_USER_INFO(state) {
    state.userInfo = {}
  }
}
const actions = {
  async loginActions({ commit }, data) {
    const result = await loginAPI(data)
    commit('SET_TOKEN', result)
  },
  async getUserInfo({ commit }) {
    const res = await getUserInfoAPI()
    const res1 = await getUserDetailByIdAPI(res.userId)
    const result = { ...res, ...res1 }
    commit('SET_USER_INFO', result)
    return JSON.parse(JSON.stringify(result))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
