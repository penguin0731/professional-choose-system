// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/common.css';

import Vue from 'vue'
import App from './App'
import store from '@/store'
import ElementUI from 'element-ui'
import router from './router'
import VueCookies from 'vue-cookies'
import Date from './dateFormat'


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueCookies);


router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
})

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app")
