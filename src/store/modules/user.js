import { login, getInfo, logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  // token: '',
  roles: [],
  name: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // login({ username: username.trim(), password: password })
      //   .then(response => {
      //     const { data } = response
      //     commit('SET_TOKEN', data.token)
      //     setToken(data.token)
      //     resolve()
      //   })
      //   .catch(error => {
      //     reject(error)
      //   })
      commit('SET_TOKEN', 'admin-token')
      setToken('admin-token')
      resolve()
    })
  },
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // getInfo(state.token)
      //   .then(response => {
      //     const { data } = response
      //     if (!data) {
      //       reject('Verification failed, please login again.')
      //     }
      //     const { roles, name, avatar } = data
      //     if (!roles || roles.length <= 0) {
      //       reject('getInfo: roles must be a non-null array!')
      //     }
      //     commit('SET_ROLES', roles)
      //     commit('SET_NAME', name)
      //     commit('SET_AVATAR', avatar)
      //     resolve(data)
      //   })
      //   .catch(error => {
      //     reject(error)
      //   })
      commit('SET_ROLES', ['admin'])
      commit('SET_NAME', 'admin')
      commit(
        'SET_AVATAR',
        'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      )
      resolve({ roles: ['admin'], name: 'admin' })
    })
  },
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // logout(state.token)
      //   .then(() => {
      //     commit('SET_TOKEN', '')
      //     commit('SET_ROLES', [])
      //     removeToken()
      //     resetRouter()
      //     dispatch('tagsView/delAllViews', null, { root: true })
      //     resolve()
      //   })
      //   .catch(error => {
      //     reject(error)
      //   })
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()
      dispatch('tagsView/delAllViews', null, { root: true })
      resolve()
    })
  },
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
