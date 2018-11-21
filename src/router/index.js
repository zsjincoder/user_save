import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import register from '@/components/register/register'
import showUser from '@/components/showUser/showUser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/showUser',
      name: 'showUser',
      component: showUser
    },
  ]
})
