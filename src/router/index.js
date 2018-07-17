import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import LoginHandler from '@/components/LoginHandler'
import Register from '@/components/Register'
import Groups from '@/components/Groups'
import Expense from '@/components/Expense'

Vue.use(Router)
Vue.use(require('vue-moment'))

var $ = require('jquery')

$(document).ready(function () {
  $('.navbar-burger').click(function () {
    $('.navbar-burger').toggleClass('is-active')
    $('.navbar-menu').toggleClass('is-active')
  })
})

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
      path: '/logout',
      name: 'Logout',
      component: Logout
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
