import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


import axios  from 'axios'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('token'));


const routes = [
  {
    path: '/',
    name: 'homeView',
    component: () => import('../views/index/index.vue')
  },
  {
    path: '/index',
    name: 'indexView',
    component: () => import('../views/index/index.vue')
  },
  {
    path: '/typeproduct/list',
    name: 'typeProductList',
    component: () => import('../views/typeproducts/list.vue')
  },
  {
    path: '/typeproduct/edit/:id',
    name: 'typeProductDoEdit',
    component: () => import('../views/typeproducts/edit.vue')
  },
  {
    path: '/typeproduct/edit',
    name: 'typeProductEdit',
    component: () => import('../views/typeproducts/edit.vue')
  },
  {
    path: '/product/edit',
    name: 'productEdit',
    component: () => import('../views/products/insert.vue')
  },
  {
    path: '/product/edit/:id',
    name: 'productDoEdit',
    component: () => import('../views/products/edit.vue')
  },
  {
    path: '/product/list',
    name: 'productList',
    component: () => import('../views/products/list.vue')
  },
  {
    path: '/account/insert',
    name: 'accountInsert',
    component: () => import('../views/accounts/insert.vue')
  },
  {
    path: '/account/edit/:id',
    name: 'accountDoEdit',
    component: () => import('../views/accounts/edit.vue')
  },
  {
    path: '/account/list',
    name: 'accountList',
    component: () => import('../views/accounts/list.vue')
  },
  {
    path: '/order/edit',
    name: 'orderEdit',
    component: () => import('../views/orders/edit.vue')
  },
  {
    path: '/order/list',
    name: 'orderList',
    component: () => import('../views/orders/list.vue')
  },
  {
    path: '/statistic/month',
    name: 'statisticMonth',
    component: () => import('../views/statistic/month.vue')
  },
  {
    path: '/statistic/quarter',
    name: 'statisticQuarter',
    component: () => import('../views/statistic/quarter.vue')
  },
  {
    path: '/statistic/year',
    name: 'statisticYear',
    component: () => import('../views/statistic/year.vue')
  },
  {
    path: '/inventory/type',
    name: 'inventoryByType',
    component: () => import('../views/statistic/inventorybytype.vue')
  },
  {
    path: '/sale/type',
    name: 'saleByType',
    component: () => import('../views/statistic/salebytype.vue')
  },
  {
    path: '/home',
    name: 'homeView',
    component: () => import('../views/index/home.vue')
  },

  // user link 
  {
    path: '/user/home',
    name: 'userHome',
    component: () => import('../views/users/home.vue')
  },
  {
    path: '/user/about',
    name: 'userAbout',
    component: () => import('../views/users/about.vue')
  },
  {
    path: '/user/contact',
    name: 'userContact',
    component: () => import('../views/users/contact.vue')
  },
  {
    path: '/user/feedback',
    name: 'userFeedback',
    component: () => import('../views/users/feedback.vue')
  },
  {
    path: '/user/quession',
    name: 'userQuession',
    component: () => import('../views/users/quession.vue')
  },

 
  {
    path: '/signup',
    name: 'userSignup',
    component: () => import('../views/users/signup.vue')
  },
  {
    path: '/user/signup',
    name: 'userSign',
    component: () => import('../views/users/signup.vue')
  },
  {
    path: '/email/form',
    name: 'EmailForm',
    component: () => import('../views/users/EmailForm.vue')
  },
  {
    path: '/signin',
    name: 'userSignin',
    component: () => import('../views/users/signin.vue')
  },
  {
    path: '/update/info',
    name: 'UpdateInfo',
    component: () => import('../views/users/UpdateInfo.vue')
  },
  {
    path: '/update/pass',
    name: 'UpdatePass',
    component: () => import('../views/users/UpdatePass.vue')
  },
 
  {
    path: '/change/pass',
    name: 'ChangePass',
    component: () => import('../views/users/ChangePass.vue')
  },
  {
    path: '/product/type/:id',
    name: 'productBytypeId',
    component: () => import('../views/users/probytype.vue')
  },
  {
    path: '/product/type/:id',
    name: 'productTypeDetail',
    component: () => import('../views/users/probytypedetail.vue')
  },

  {
    path: '/product/detail/:id',
    name: 'productDetail',
    component: () => import('../views/users/prodetail.vue')
  },
  {
    path: '/cart/:id',
    name: 'cart',
    component: () => import('../views/users/cart.vue')
  },
  {
    path: '/cart',
    name: 'shoppingCart',
    component: () => import('../views/users/cart.vue')
  },
  {
    path: '/order',
    name: 'userOrder',
    component: () => import('../views/users/useroder.vue')
  },
  {
    path: '/admin/order/edit/:id',
    name: 'OrderEdit',
    component: () => import('../views/orders/edit.vue')
  },
  {
    path: '/product/search',
    name: 'productSearch',
    component: () => import('../views/users/search.vue')
  },

  {
    path: '/order/fix/:id',
    name: 'FixOrder',
    component: () => import('../views/users/FixOrder.vue')
  },

  // websocket
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
