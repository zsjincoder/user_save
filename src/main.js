// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import globalData from './global.js';
import 'element-ui/lib/theme-chalk/index.css';
import iView from 'iview'

Vue.config.productionTip = false
Vue.prototype.$global=globalData
Vue.use(ElementUI);
Vue.use(iView)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})