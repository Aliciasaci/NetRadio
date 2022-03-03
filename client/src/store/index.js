import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        events: [],
        token : "",
        member : false,
        status : "",
        idMembre: ""
    },
    getters: {
        EVENTS: state => state.events
    },
    mutations: {
        ADD_EVENT(state, event) {
            state.events.push(event);
        },
        UPDATE_EVENT: (state, { id, title, start, end }) => {
            let index = state.events.findIndex(_event => _event.id == id)

            state.events[index].title = title;
            state.events[index].start = start;
            state.events[index].end = end;
        },
        setToken(state,token){
            state.token = token
        },
        adjustMember(state,adjustement){
            state.member = adjustement.member,
            state.status = adjustement.status,
            state.idMembre = adjustement.idMembre
        }
    },
    actions: {},
    modules: {}
})