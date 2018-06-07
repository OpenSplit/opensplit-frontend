import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import LoginHandler from '@/components/LoginHandler'
import Register from '@/components/Register'
import Groups from '@/components/Groups'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/login/:token',
      name: 'LoginHandler',
      component: LoginHandler
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/groups',
      name: 'Groups',
      component: Groups
    }
  ]
})
