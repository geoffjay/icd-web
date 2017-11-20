// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueProgress from 'vue-progress'

import router from './router'

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'

import App from '@/components/App'

Vue.use(VueResource)
Vue.use(VueProgress)
Vue.use(BootstrapVue)

Vue.config.productionTip = false
Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // Make the Vue instance globally available
  created: function () {
    window.Vue = this
  },
  router,
  template: '<App/>',
  components: { App }
})
