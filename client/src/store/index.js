import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})
export default new Vuex.Store({
    plugins: [vuexLocal.plugin],
    state: {
        token: "",
        member: false,
        status: "",
        idMembre: "",
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        adjustMember(state, adjustement) {
            state.member = adjustement.member,
                state.status = adjustement.status,
                state.idMembre = adjustement.idMembre
        },
    },
    actions: {},
    modules: {}
})