/*
  |||||| DİKKAT ||||||
  Index, Inser, Update, Get ekranları Layout altında "children" elementine tanımlanmalanacaktır.
  -------------------------------------------------------------------------------------------------------------
  Yeni oluşturulacak ekranlar Route'dan kopyalanabilir.
  Yeni oluşturulmuş ekranları dil dosyalarında da tanımlamak gerekmektedir. (locales/tr||en.json)
  Düzeni sağlamak amacıyla "router" dizini kullanılacaktır.
  -------------------------------------------------------------------------------------------------------------
  Her bir router elementinin "name" değeri doğru girilmelidir!
  Bu değer tüm navigasyon işlemlerinde kullanılacak olan parametredir.
  -------------------------------------------------------------------------------------------------------------
  Her dizinin Yeni Kayıt linki createLink altında tanımlanmalıdır.
  -------------------------------------------------------------------------------------------------------------
  İçeriği modal içinde gösterilecek olan ekranlar INDEX altına children olarak tanımlanır
  ve Route/Show/:url örneğini kullanılır.
  -------------------------------------------------------------------------------------------------------------
  En alt dizinde bulunan "*" "tümü" anlamına gelir ve her zaman en alt satırda olmalıdır.
  Tanımlanmamış tüm ekranlar / hatalı linkler ana sayfaya yönlendirecektir.
*/
import Vue from 'vue'
import Router from 'vue-router'
import Pages from '@/pages'
import AuthRequired from '@/AuthRequired'
import Dashboard from '@/pages/Dashboard'
import DashboardIndex from '@/pages/Dashboard/Default'
import i18n from './i18n'

import LayoutIndex from '@/pages/layout/'
import LayoutGet from '@/pages/layout/get'
import LayoutInsert from '@/pages/layout/insert'
import LayoutUpdate from '@/pages/layout/update'

import RouteIndex from '@/pages/Route/' // liste ekranı
import RouteGet from '@/pages/Route/get' // fullpage görünümü
import RouteInsert from '@/pages/Route/insert' // yeni kayıt
import RouteUpdate from '@/pages/Route/update' // güncelleme

import VehicleIndex from '@/pages/Vehicle/' // liste ekranı
import VehicleGet from '@/pages/Vehicle/get' // fullpage görünümü
import VehicleInsert from '@/pages/Vehicle/insert' // yeni kayıt
import VehicleUpdate from '@/pages/Vehicle/update' // güncelleme

import EmployeeIndex from '@/pages/Employee/' // liste ekranı
import EmployeeGet from '@/pages/Employee/get' // fullpage görünümü
import EmployeeInsert from '@/pages/Employee/insert' // yeni kayıt
import EmployeeUpdate from '@/pages/Employee/update' // güncelleme

import ItemIndex from '@/pages/Item/' // liste ekranı
import ItemGet from '@/pages/Item/get' // fullpage görünümü
import ItemInsert from '@/pages/Item/insert' // yeni kayıt
import ItemUpdate from '@/pages/Item/update' // güncelleme

import BranchIndex from '@/pages/Branch/' // liste ekranı
import BranchGet from '@/pages/Branch/get' // fullpage görünümü
import BranchInsert from '@/pages/Branch/insert' // yeni kayıt
import BranchUpdate from '@/pages/Branch/update' // güncelleme

import WarehouseIndex from '@/pages/Warehouse/' // liste ekranı
import WarehouseGet from '@/pages/Warehouse/get' // fullpage görünümü
import WarehouseInsert from '@/pages/Warehouse/insert' // yeni kayıt
import WarehouseUpdate from '@/pages/Warehouse/update' // güncelleme

import CustomerIndex from '@/pages/Customer/' // liste ekranı
import CustomerGet from '@/pages/Customer/get' // fullpage görünümü
import CustomerInsert from '@/pages/Customer/insert' // yeni kayıt
import CustomerUpdate from '@/pages/Customer/update' // güncelleme

import Auth from '@/views/Auth'
import Login from '@/views/Auth/login'
import Register from '@/views/Auth/register'
import ForgotPassword from '@/views/Auth/forgot-password'
import ResetPassword from '@/views/Auth/reset-password'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: Pages,
    redirect: '/Dashboard',
    beforeEnter: AuthRequired,
    children: [
      {
        path: '/Dashboard',
        name: 'Dashboard',
        component: Dashboard,
        redirect: '/Dashboard',
        children: [{
          path: '/',
          name: '',
          component: DashboardIndex
        }]
      },
      {
        path: '/',
        redirect: '/Dashboard',
        component: LayoutIndex, // listeleme ekranları
        children: [
          { path: '/Route', name: 'Route', component: RouteIndex, meta: { title: i18n.t('router.Route'), createLink: 'RouteInsert' } },
          { path: '/Vehicle', name: 'Vehicle', component: VehicleIndex, meta: { title: i18n.t('router.Vehicle'), createLink: 'VehicleInsert' } },
          { path: '/Employee', name: 'Employee', component: EmployeeIndex, meta: { title: i18n.t('router.Employee'), createLink: 'EmployeeInsert' } },
          { path: '/Item', name: 'Item', component: ItemIndex, meta: { title: i18n.t('router.Item'), createLink: 'ItemInsert' } },
          { path: '/Branch', name: 'Branch', component: BranchIndex, meta: { title: i18n.t('router.Branch'), createLink: 'BranchInsert' } },
          { path: '/Warehouse', name: 'Warehouse', component: WarehouseIndex, meta: { title: i18n.t('router.Warehouse'), createLink: 'WarehouseInsert' } },
          { path: '/Customer', name: 'Customer', component: CustomerIndex, meta: { title: i18n.t('router.Customer'), createLink: 'CustomerInsert' } }
        ]
      },
      {
        path: '/Get',
        component: LayoutGet, // görüntüleme ekranları
        children: [
          { path: '/Route/:url', name: 'RouteGet', component: RouteGet, meta: { title: i18n.t('router.RouteGet'), baseLink: 'Route' } },
          { path: '/Vehicle/:url', name: 'VehicleGet', component: VehicleGet, meta: { title: i18n.t('router.VehicleGet'), baseLink: 'Vehicle' } },
          { path: '/Employee/:url', name: 'EmployeeGet', component: EmployeeGet, meta: { title: i18n.t('router.EmployeeGet'), baseLink: 'Employee' } },
          { path: '/Item/:url', name: 'ItemGet', component: ItemGet, meta: { title: i18n.t('router.ItemGet'), baseLink: 'Item' } },
          { path: '/Branch/:url', name: 'BranchGet', component: BranchGet, meta: { title: i18n.t('router.BranchGet'), baseLink: 'Branch' } },
          { path: '/Warehouse/:url', name: 'WarehouseGet', component: WarehouseGet, meta: { title: i18n.t('router.WarehouseGet'), baseLink: 'Warehouse' } },
          { path: '/Customer/:url', name: 'CustomerGet', component: CustomerGet, meta: { title: i18n.t('router.CustomerGet'), baseLink: 'Customer' } }
        ]
      },
      {
        path: '/Update',
        component: LayoutUpdate, // görüntüleme ekranları
        children: [
          { path: '/Update/Route/:url', name: 'RouteUpdate', component: RouteUpdate, meta: { title: i18n.t('router.RouteUpdate'), baseLink: 'Route' } },
          { path: '/Update/Vehicle/:url', name: 'VehicleUpdate', component: VehicleUpdate, meta: { title: i18n.t('router.VehicleUpdate'), baseLink: 'Vehicle' } },
          { path: '/Update/Employee/:url', name: 'EmployeeUpdate', component: EmployeeUpdate, meta: { title: i18n.t('router.EmployeeUpdate'), baseLink: 'Employee' } },
          { path: '/Update/Item/:url', name: 'ItemUpdate', component: ItemUpdate, meta: { title: i18n.t('router.ItemUpdate'), baseLink: 'Item' } },
          { path: '/Update/Branch/:url', name: 'BranchUpdate', component: BranchUpdate, meta: { title: i18n.t('router.BranchUpdate'), baseLink: 'Branch' } },
          { path: '/Update/Warehouse/:url', name: 'WarehouseUpdate', component: WarehouseUpdate, meta: { title: i18n.t('router.WarehouseUpdate'), baseLink: 'Warehouse' } },
          { path: '/Update/Customer/:url', name: 'CustomerUpdate', component: CustomerUpdate, meta: { title: i18n.t('router.CustomerUpdate'), baseLink: 'Customer' } }
        ]
      },
      {
        path: '/Insert',
        component: LayoutInsert, // oluşturma ekranları
        children: [
          { path: '/Insert/Route', name: 'RouteInsert', component: RouteInsert, meta: { title: i18n.t('router.RouteInsert'), baseLink: 'Route' } },
          { path: '/Insert/Vehicle', name: 'VehicleInsert', component: VehicleInsert, meta: { title: i18n.t('router.VehicleInsert'), baseLink: 'Vehicle' } },
          { path: '/Insert/Employee', name: 'EmployeeInsert', component: EmployeeInsert, meta: { title: i18n.t('router.EmployeeInsert'), baseLink: 'Employee' } },
          { path: '/Insert/Item', name: 'ItemInsert', component: ItemInsert, meta: { title: i18n.t('router.ItemInsert'), baseLink: 'Item' } },
          { path: '/Insert/Branch', name: 'BranchInsert', component: BranchInsert, meta: { title: i18n.t('router.BranchInsert'), baseLink: 'Branch' } },
          { path: '/Insert/Warehouse', name: 'WarehouseInsert', component: WarehouseInsert, meta: { title: i18n.t('router.WarehouseInsert'), baseLink: 'Warehouse' } },
          { path: '/Insert/Customer', name: 'CustomerInsert', component: CustomerInsert, meta: { title: i18n.t('router.CustomerInsert'), baseLink: 'Customer' } }
        ]
      }
    ]
  },
  {
    path: '/Auth',
    component: Auth,
    redirect: '/Auth/Login',
    children: [{
      path: 'Login',
      name: 'Login',
      component: Login
    },
    {
      path: 'Register',
      name: 'Register',
      component: Register
    },
    {
      path: 'ForgotPassword',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: 'ResetPassword',
      name: 'ResetPassword',
      component: ResetPassword
    }]
  },
  {
    path: '*',
    redirect: '/Dashboard'
  }
]

const router = new Router({
  linkActiveClass: 'active', // navigasyonda aktif linke ".active" ekler
  routes, // yukarıdaki linkleri çalıştırır.
  mode: 'history', // url yapısını history olarak çalıştıracaktır.
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition // önceki sayfaya geri dönüldüğünde scroll edilmiş alana geri dönmesini sağlar.
    } else {
      return {
        x: 0,
        y: 0 // yeni sayfanın tepede başlamasını sağlar.
      }
    }
  }
})

export default router
