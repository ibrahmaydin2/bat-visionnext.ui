/*
  |||||| DİKKAT ||||||
  Index, Inser, Update, Get ekranları Layout altında "children" elementine tanımlanmalanacaktır.
  -------------------------------------------------------------------------------------------------------------
  Yeni oluşturulacak ekranlar WorkOrder'dan kopyalanabilir.
  Yeni oluşturulmuş ekranları dil dosyalarında da tanımlamak gerekmektedir. (locales/tr||en.json)
  Düzeni sağlamak amacıyla "router" dizini kullanılacaktır.
  -------------------------------------------------------------------------------------------------------------
  Her bir router elementinin "name" değeri doğru girilmelidir!
  Bu değer tüm navigasyon işlemlerinde kullanılacak olan parametredir.
  -------------------------------------------------------------------------------------------------------------
  Her dizinin Yeni Kayıt linki createLink altında tanımlanmalıdır.
  -------------------------------------------------------------------------------------------------------------
  İçeriği modal içinde gösterilecek olan ekranlar INDEX altına children olarak tanımlanır
  ve WorkOrder/Show/:url örneğini kullanılır.
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

import SearchIndex from '@/pages/Search/'

import WorkOrderIndex from '@/pages/WorkOrder/' // liste ekranı
import WorkOrderGet from '@/pages/WorkOrder/get' // fullpage görünümü
import WorkOrderInsert from '@/pages/WorkOrder/insert' // yeni kayıt
import WorkOrderUpdate from '@/pages/WorkOrder/update' // güncelleme

// import WorkOrderProvisionIndex from '@/pages/WorkOrderProvision/' // liste ekranı
// import WorkOrderProvisionShow from '@/pages/WorkOrderProvision/show' // modal view
// import WorkOrderProvisionGet from '@/pages/WorkOrderProvision/get' // fullpage görünümü
import WorkOrderProvisionInsert from '@/pages/WorkOrderProvision/insert' // yeni kayıt
// import WorkOrderProvisionUpdate from '@/pages/WorkOrderProvision/update' // güncelleme

import Report from '@/pages/Report/'

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
          {
            path: '/WorkOrder/',
            name: 'WorkOrder',
            component: WorkOrderIndex,
            meta: {
              title: i18n.t('router.WorkOrder'),
              createLink: 'WorkOrderInsert'
            },
            children: [
              {
                path: 'Show/:url',
                name: 'WorkOrderShow',
                component: WorkOrderGet,
                meta: {
                  title: i18n.t('router.WorkOrderShow'),
                  base: 'WorkOrder'
                }
              }
            ]
          },
          {
            path: '/Search/:q',
            name: 'SearchFilter',
            component: SearchIndex,
            meta: {
              title: i18n.t('router.Search'),
              createLink: 'WorkOrderInsert'
            }
          }
        ]
      },
      {
        path: '/Get',
        component: LayoutGet, // görüntüleme ekranları
        children: [
          {
            path: '/WorkOrder/:url',
            name: 'WorkOrderGet',
            component: WorkOrderGet,
            meta: {
              title: i18n.t('router.WorkOrderGet')
            }
          }
        ]
      },
      {
        path: '/Update',
        component: LayoutUpdate, // görüntüleme ekranları
        children: [
          {
            path: '/WorkOrder/Update/:url',
            name: 'WorkOrderUpdate',
            component: WorkOrderUpdate,
            meta: {
              title: i18n.t('router.WorkOrderUpdate')
            }
          }
        ]
      },
      {
        path: '/Insert',
        component: LayoutInsert, // oluşturma ekranları
        children: [
          {
            path: '/Insert/WorkOrder/:type',
            name: 'WorkOrderInsert',
            component: WorkOrderInsert,
            meta: {
              title: i18n.t('router.WorkOrderInsert'),
              baseLink: 'WorkOrder'
            }
          },
          {
            path: '/Insert/WorkOrderProvision/:type',
            name: 'WorkOrderProvisionInsert',
            component: WorkOrderProvisionInsert,
            meta: {
              title: i18n.t('router.WorkOrderProvisionInsert'),
              baseLink: 'WorkOrder'
            }
          }
        ]
      },
      {
        path: '/Get',
        component: LayoutGet, // görüntüleme ekranları
        children: [
          {
            path: '/Report/:type',
            name: 'Report',
            component: Report
          }
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
