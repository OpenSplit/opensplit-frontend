import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export const SET_USER = 'SET_USER'

export default new Vuex.Store({
    state: {
        user: {},
        groups: []
    },

    getters: {
        user: state => {
            return state.user
        },
        groups: state => {
            return state.groups
        }
    },

    mutations: {
        user (state, user) {
            state.user = user
        },
        groups(state, groups) {
            state.groups = groups
        }
    },

    actions: {
        user({ state, commit }) {
            if(!state.user.value) {
                var session_key = localStorage.getItem('session_key')
                var instance = axios.create({
                    headers: {'Authorization': session_key}
                })
                var url = process.env.VUE_APP_API + '/users'
                instance.get(url)
                .then(response => {
                    commit('user', response.data)
                })
            }
        },
        groups({state, commit}) {
            if(!state.user.value) {
                var session_key = localStorage.getItem('session_key')
                var instance = axios.create({
                    headers: {'Authorization': session_key}
                })
                var url = process.env.VUE_APP_API + '/groups'
                instance.get(url)
                .then(response => {
                    commit('groups', response.data)
                })
            }
        }
    }
})