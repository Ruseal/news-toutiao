import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/login',
    component: () => import('views/login/')
  },
  {
    path: '/home',
    component: () => import('views/home/')
  },
  {
    path: '/questions',
    component: () => import('views/questions/')
  },
  {
    path: '/video',
    component: () => import('views/video/Text')
  },
  {
    path: '/profile',
    component: () => import('views/profile/')
  },
  {
    path: '/search',
    component: () => import('views/search/Search')
  },
  {
    path: '/details/:detailsId',
    name: 'details',
    component: () => import('components/component/ArticleDetails')
  }
 
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
