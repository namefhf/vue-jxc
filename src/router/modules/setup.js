import Layout from '@/layout'
export default {
  path: '/setup',
  component: Layout,
  redirect: '/setup/shop_list',
  meta: { title: 'setup', icon: 'settings' },
  children: [
    {
      path: 'shop_list',
      name: 'shop_list',
      component: () => import('@/views/setup/shopList'),
      meta: { title: 'shop_list' }
    },
    {
      path: 'store_list',
      name: 'store_list',
      component: () => import('@/views/sale/saleorder-list'),
      meta: { title: 'store_list' }
    },
    {
      path: 'role_list',
      name: 'role_list',
      component: () => import('@/views/setup/roleList'),
      meta: { title: 'role_list' }
    },
    {
      path: 'role_permissions',
      name: 'role_permissions',
      component: () => import('@/views/setup/rolePermissions'),
      meta: { title: 'role_permissions' },
      hidden: true
    }
  ]
}
