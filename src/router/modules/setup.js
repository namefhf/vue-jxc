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
    }
  ]
}
