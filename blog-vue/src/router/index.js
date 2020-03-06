import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/home'
  }
  ,
  {
    path: '/home',
    name: 'Home',
    component: () => import( 'views/home/Home')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import( 'views/user/User')
  },
  {
    path:'/detail/:id',
    component:() => import('views/detail/Detail')
  },
  {
    path:'/author/:author',
    component:() => import('views/author/Author')
  },
  {
    path:'/search/:keyword',
    component:() => import('views/search/Search')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
