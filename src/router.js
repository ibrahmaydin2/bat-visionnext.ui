/*
  |||||| DİKKAT ||||||
  Index, Inser, Update, Get ekranları Layout altında "children" elementine tanımlanmalanacaktır.
  -------------------------------------------------------------------------------------------------------------
  Yeni oluşturulacak ekranlar Demo'dan kopyalanabilir.
  Yeni oluşturulmuş ekranları dil dosyalarında da tanımlamak gerekmektedir. (locales/tr||en.json)
  Düzeni sağlamak amacıyla "router" dizini kullanılacaktır.
  -------------------------------------------------------------------------------------------------------------
  Her bir router elementinin "name" değeri doğru girilmelidir!
  Bu değer tüm navigasyon işlemlerinde kullanılacak olan parametredir.
  -------------------------------------------------------------------------------------------------------------
  Her dizinin Yeni Kayıt linki createLink altında tanımlanmalıdır.
  -------------------------------------------------------------------------------------------------------------
  İçeriği modal içinde gösterilecek olan ekranlar INDEX altına children olarak tanımlanır
  ve Demo/Show/:url örneğini kullanılır.
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

import DemoIndex from '@/pages/Demo/' // liste ekranı
import DemoSmart from '@/pages/Demo/smart' // liste ekranı
import DemoGet from '@/pages/Demo/get' // fullpage görünümü
import DemoInsert from '@/pages/Demo/insert' // yeni kayıt
import DemoUpdate from '@/pages/Demo/update' // güncelleme

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
            path: '/Demo/',
            name: 'Demo',
            component: DemoIndex,
            meta: {
              title: i18n.t('router.Demo'),
              createLink: 'DemoInsert'
            },
            children: [
              {
                path: 'Show/:url',
                name: 'DemoShow',
                component: DemoGet,
                meta: {
                  title: i18n.t('router.DemoShow'),
                  base: 'Demo'
                }
              }
            ]
          },
          {
            path: '/Demo/smart',
            name: 'Demo',
            component: DemoSmart,
            meta: {
              title: i18n.t('router.Demo'),
              createLink: 'DemoInsert'
            }
          },
          {
            path: '/Search/:q',
            name: 'SearchFilter',
            component: SearchIndex,
            meta: {
              title: i18n.t('router.Search'),
              createLink: 'DemoInsert'
            }
          }
        ]
      },
      {
        path: '/Get',
        component: LayoutGet, // görüntüleme ekranları
        children: [
          {
            path: '/Demo/:url',
            name: 'DemoGet',
            component: DemoGet,
            meta: {
              title: i18n.t('router.DemoGet')
            }
          }
        ]
      },
      {
        path: '/Update',
        component: LayoutUpdate, // görüntüleme ekranları
        children: [
          {
            path: '/Demo/Update/:url',
            name: 'DemoUpdate',
            component: DemoUpdate,
            meta: {
              title: i18n.t('router.DemoUpdate')
            }
          }
        ]
      },
      {
        path: '/Insert',
        component: LayoutInsert, // oluşturma ekranları
        children: [
          {
            path: '/Insert/Demo/:type',
            name: 'DemoInsert',
            component: DemoInsert,
            meta: {
              title: i18n.t('router.DemoInsert'),
              baseLink: 'Demo'
            }
          }
        ]
      },
      {
        path: '/Get',
        component: LayoutGet, // görüntüleme ekranları
        children: [
          {
            path: '/Demo/:type',
            name: 'Demo',
            component: DemoGet
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
