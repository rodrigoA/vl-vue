import Vue from 'vue'
import Router from 'vue-router'
import VLArtist from '@/components/VagalumeArtist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'VLArtist',
      component: VLArtist
    }
  ]
})
