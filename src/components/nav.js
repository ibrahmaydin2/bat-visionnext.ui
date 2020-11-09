import i18n from '../i18n'
export const items = [
  {
    title: 'HEAD',
    navs: [
      {
        title: 'Ana Kayıtlar',
        router: 'Route',
        sub: [
          { title: 'yeni sipariş', router: 'Route', link: 'Insert' },
          { title: 'yeni sipariş', router: 'Route', link: 'Insert' },
          { title: 'yeni sipariş', router: 'Route', link: 'Insert' }
        ]
      },
      {
        title: 'Ürün Yönetimi',
        router: 'Route',
        sub: [
          { title: 'yeni sipariş', router: 'Route', link: 'Insert' },
          { title: 'yeni sipariş', router: 'Route', link: 'Insert' },
          { title: 'yeni sipariş', router: 'Route', link: 'Insert' }
        ]
      }
    ]
  },
  {
    title: 'HEAD',
    navs: [
      {
        title: 'Ana Kayıtlar',
        router: 'Route',
        sub: [
          { title: 'yeni sipariş', router: 'Route', link: 'Insert' },
          { title: 'yeni sipariş', router: 'Route', link: 'Insert' },
          { title: 'yeni sipariş', router: 'Route', link: 'Insert' }
        ]
      },
      {
        title: 'Ürün Yönetimi',
        router: 'Route',
        sub: [
          { title: 'yeni sipariş', router: 'Route', link: 'Insert' },
          { title: 'yeni sipariş', router: 'Route', link: 'Insert' },
          { title: 'yeni sipariş', router: 'Route', link: 'Insert' }
        ]
      }
    ]
  },
  {
    title: 'HEAD',
    navs: [
      {
        title: 'Ana Kayıtlar',
        router: 'Route',
        sub: [
          { title: 'yeni sipariş', router: 'Route', link: 'Insert' },
          { title: 'yeni sipariş', router: 'Route', link: 'Insert' },
          { title: 'yeni sipariş', router: 'Route', link: 'Insert' }
        ]
      },
      {
        title: 'Ürün Yönetimi',
        router: 'Route',
        sub: [
          { title: 'yeni sipariş', router: 'Route', link: 'Insert' },
          { title: 'yeni sipariş', router: 'Route', link: 'Insert' },
          { title: 'yeni sipariş', router: 'Route', link: 'Insert' }
        ]
      }
    ]
  }
]

export const shortcut = [
  {
    title: i18n.t('nav.Route'),
    router: 'Route',
    icon: 'fas fa-truck',
    params: {}
  },
  {
    title: i18n.t('nav.Vehicle'),
    router: 'Vehicle',
    icon: 'fas fa-tags',
    params: {}
  },
  {
    title: i18n.t('nav.Employee'),
    router: 'Employee',
    icon: 'fas fa-user',
    params: {}
  }
]
