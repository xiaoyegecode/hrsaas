import { loginAPI } from '@/api/login'
import { getUserInfoAPI, getUserDetailByIdAPI } from '@/api/user'
import { resetRouter } from '@/router'
const state = {
  token: null,
  userInfo: {},
  hrsaasTime: 0
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
  },
  REMOVE_TOKEN(state) {
    state.token = null
  },
  SET_HRSAASTIME(state, time) {
    state.hrsaasTime = time
  }
}
const actions = {
  async loginActions({ commit }, data) {
    const result = await loginAPI(data)
    commit('SET_TOKEN', result)
    commit('SET_HRSAASTIME', +new Date())
  },
  async getUserInfo({ commit }) {
    const res = await getUserInfoAPI()
    // console.log(res)
    const points = ['role-assign']
    res.roles.points = points
    const res1 = await getUserDetailByIdAPI(res.userId)
    const result = { ...res, ...res1 }
    commit('SET_USER_INFO', result)
    return res.roles
  },
  logout({ commit }) {
    commit('REMOVE_USER_INFO'),
    // 因为用了持久化插件 删除vuex中的token会同步清除缓存中的token
    commit('REMOVE_TOKEN')
    resetRouter()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
