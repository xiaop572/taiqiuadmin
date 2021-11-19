import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import Login from '../views/login/login.vue'
import OrderDishes from '../views/orderDishes/orderDishes.vue'
import order from '../views/order/order.vue'
import coachDetails from '../views/coachDetails/coachDetails.vue'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'/',
        name:'orderDishes',
        component:OrderDishes
      },
      {
        path:'/order',
        name:'order',
        component:order
      },
      {
        path:'/coachDetails',
        name:'coachDetails',
        component:coachDetails
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  if (!token && to.path !== '/login') {
    next('/login')
  }
  next()
})

export default router