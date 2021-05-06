import Vue from 'vue'
import Vuex from 'vuex'
// vuex-persistedstate 默认把数据存储localStorage
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        login: false,

    },
    mutations: {
        setLogin(state) {
            state.login = true;
        },

    },
    actions: {},
    modules: {},
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })]
})