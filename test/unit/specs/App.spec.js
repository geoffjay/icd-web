import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/components/App'
import Image from '@/components/Image'

describe('App.vue', () => {
  it('should render correct contents', () => {
    Vue.use(VueRouter)
    const router = new VueRouter({routers: [
      {path: '/image/:id', name: 'image', component: Image}
    ]})
    const Constructor = Vue.extend(App)
    const vm = new Constructor().$mount()
    router.push({name: 'image', params: {id: 1}})
    Vue.nextTick(() => {
      console.log('html:', vm.$el)
      expect(vm.$el.querySelector('#image .container h2').textContent)
        .to.equal('Image # 1')
      done()
    })
  })
})
