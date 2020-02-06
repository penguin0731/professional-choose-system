// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/common.css';

import Vue from 'vue'
import App from './App'
import store from '@/store'
import ElementUI from 'element-ui'
import router from './router'
import myDate from './dateFormat'
import VueCookies from 'vue-cookies'


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueCookies);

Vue.prototype.$myDate = myDate;

// router.beforeEach((to, from, next) => {
//   if(to.matched.some(r => r.meta.requireAuth)) {
//     const user = Vue.$cookies.get('loginUser');
//     if(user) {
//       next();
//     }else {
//       next('/login');
//     }
//   }else {
//     next();
//   }
// })

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
