import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export const SET_USER = 'SET_USER'

export default new Vuex.Store({
    state: {
        user: {},
        groups: {},
        notification: {
            message: '',
            type: 'error'
        }
    },

    getters: {
        user: state => {
            return state.user
        },
        groups: state => {
            return state.groups
        },
        notification: state => {
            return state.notification
        }
    },

    mutations: {
        user (state, user) {
            state.user = user
        },
        groups(state, groups) {
            groups.forEach(element => {
                Vue.set(state.groups, element.id, element)
            });
        },
        notification(state, notification) {
            state.notification = notification
        }
    },

    actions: {
        notification({ commit }, data) {
            commit('notification', data)
        },
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
        groups({ state, commit }) {
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
        },
        expense({ state, commit }, data) {
            if(!state.user.value) {
                var session_key = localStorage.getItem('session_key')
                var instance = axios.create({
                    headers: {'Authorization': session_key}
                })

                var url = '/groups/' + data.group + '/transactions'
                instance.post(url, data).then(response => {
                    commit('notification', { 'message': 'Expense successfully added', 'type': 'success' })
                }, error => {
                    commit('notification', { 'message': 'Error adding expense', 'type': 'error' })
                })
            }
        },
        payment({ state, commit }, data) {
            if(!state.user.value) {
                var session_key = localStorage.getItem('session_key')
                var instance = axios.create({
                    headers: {'Authorization': session_key}
                })

                var url = '/groups/' + data.group + '/payments'
                instance.post(url, data).then(response => {
                    commit('notification', { 'message': 'Payment successfully added', 'type': 'success' })
                }, error => {
                    commit('notification', { 'message': 'Error adding payment', 'type': 'error' })
                })
            }
        }
    }
})