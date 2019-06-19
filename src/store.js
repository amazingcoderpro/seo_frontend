import Vue from 'vue'
import Vuex from 'vuex'
// import router from './router'
// import menufilter from './components/menufilter.js'

Vue.use(Vuex)

const types = {
  SET_AUTHENTICATED: 'SET_AUTHENTICATED', // 是否认证通过
  SET_USER: 'SET_USER', // 用户信息
  SET_MENU_TREE: 'SET_MENU_TREE', // 页面菜单
  SET_ROUTER_TREE: 'SET_ROUTER_TREE', // 设置路由
}

const state = { // 需要维护的状态
  isAuthenticated: false,  // 是否认证
  user: {},   // 存储用户信息
  menu_tree: [],
  router_tree: []
}

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  user: state => state.user,
  menu_tree: state => state.menu_tree,
  router_tree: state => state.router_tree
}

const mutations = {
  [types.SET_AUTHENTICATED](state, isAuthenticated) {
    if (isAuthenticated)
      state.isAuthenticated = isAuthenticated
    else
      state.isAuthenticated = false
  },
  [types.SET_USER](state, user) {
    if (user)
      state.user = user
    else
      state.user = {}
  },
  [types.SET_MENU_TREE](state, menu_tree) {
    // if (menu_tree.length > 0)
    //   state.menu_tree = menu_tree
    // else
    //   state.menu_tree = []
    state.menu_tree = menu_tree
  },
  [types.SET_ROUTER_TREE](state, router_tree) {
    // let routes = []
    // menufilter(routes, router_tree)
    // router.addRoutes(routes)
    // router.push('/index');
    state.router_tree = router_tree
  }
}

const actions = {
  setAuthenticated: ({ commit }, isAuthenticated) => {
    commit(types.SET_AUTHENTICATED, isAuthenticated)
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user)
  },
  setMenuTree: ({ commit }, menu_tree) => {
    commit(types.SET_MENU_TREE, menu_tree)
  },
  setRouterTree: ({ commit }, router_tree) => {
    commit(types.SET_ROUTER_TREE, router_tree)
  },
  clearCurrentState: ({ commit }) => {
    commit(types.SET_AUTHENTICATED, false)
    commit(types.SET_USER, null)
    commit(types.SET_MENU_TREE, null)
    commit(types.SET_ROUTER_TREE, null)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
