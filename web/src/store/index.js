import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    userInfo:{},
    productList:{},
    categoryList:{},
  },
  getters: {
  },
  mutations: {
    changeUserInfo(state,value){
      state.userInfo = {
        ...state.userInfo,
        ...value
      }
    },
    changeProductInfo(state,value){
      state.productList = {
        ...state.productList,
        ...value
      }
    },
    changeCategoryList(state,value){
      state.categoryList = {
        ...state.categoryList,
        ...value
      }
    },
    clearCategoryList(state,value){
      state.categoryList = {}
    },
    clearProductInfo(state,value){
      state.productList = {}
    },
    clearUserInfo(state,value){
      state.userInfo = {}
    }
  },
  actions: {
  },
  modules: {
  },
  // 控制vuex數據持久化
  plugins:[createPersistedState({
    paths:["userInfo","productList","categoryList"]
  })]
})
