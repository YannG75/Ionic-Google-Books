import Vue from 'vue'
import Home from '../components/Home.vue'
import { IonicVueRouter } from '@ionic/vue';

Vue.use(IonicVueRouter);


const routes =  [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/region',
    name: 'region',
    component: () =>
        import(/* webpackChunkName: "about" */ '../components/region.vue')
  },
  {
    path: '/department',
    name: 'department',
    component: () =>
        import(/* webpackChunkName: "about" */ '../components/department.vue')
  }

]

const router = new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
