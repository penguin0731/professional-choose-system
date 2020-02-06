import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/App.vue'
import Index from '@/view';
import Login from '@/view/login';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/view'),
      meta: {
        requireAuth: true
      },
      beforeEnter: (to, from, next) => {
        if (to.meta.requireAuth) {
          const user = Vue.$cookies.get('loginUser');
          user ? next() : next('/login');
        }
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

