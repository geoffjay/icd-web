import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  hashbang: false,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: function (resolve) {
        require(['@/components/Dashboard'], resolve)
      }
    },
    {
      path: '/image/:id?',
      name: 'image',
      component: function (resolve) {
        require(['@/components/Image'], resolve)
      }
    },
    {
      path: '/camera',
      name: 'camera',
      component: function (resolve) {
        require(['@/components/Camera'], resolve)
      }
    },
    {
      path: '/job',
      name: 'job',
      component: function (resolve) {
        require(['@/components/Job'], resolve)
      }
    },
    {
      path: '/connect',
      name: 'connect',
      component: function (resolve) {
        require(['@/components/Connect'], resolve)
      }
    },
    {
      path: '/configure',
      name: 'configure',
      component: function (resolve) {
        require(['@/components/Configure'], resolve)
      }
    },
    {
      // TODO Test if this is even needed anymore
      // TODO Put status components under components/Status
      // XXX Could redirect to /dashboard instead
      path: '*',
      component: function (resolve) {
        require(['@/components/NotFound'], resolve)
      }
    }
  ]
})

export default router
