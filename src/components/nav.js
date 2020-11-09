import i18n from '../i18n'
export const items = [
  {
    title: 'HEAD',
    navs: [
      {
        title: 'Ana Kayıtlar',
        router: 'Route',
        sub: [
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
          },
          {
            title: i18n.t('nav.Item'),
            router: 'Item',
            icon: 'fas fa-Item',
            params: {}
          },
          {
            title: i18n.t('nav.Branch'),
            router: 'Branch',
            icon: 'fas fa-Branch',
            params: {}
          },
          {
            title: i18n.t('nav.Warehouse'),
            router: 'Warehouse',
            icon: 'fas fa-Warehouse',
            params: {}
          },
          {
            title: i18n.t('nav.Customer'),
            router: 'Customer',
            icon: 'fas fa-Customer',
            params: {}
          }
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
