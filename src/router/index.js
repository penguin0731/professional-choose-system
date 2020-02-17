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
      component: Index,
      meta: {
        title: '专业方向选报系统',
        requireAuth: true
      },
      beforeEnter: (to, from, next) => {
        const user = Vue.$cookies.get('loginUser');
        user ? next() : next('/login');
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录'
      },
    },
    // {
    //   path: '/',
    //   redirect: '/login'
    // }
  ]
})

