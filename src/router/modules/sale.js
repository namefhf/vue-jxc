import Layout from '@/layout'
export default {
  path: '/sale',
  component: Layout,
  name: 'sale',
  redirect: '/sale/saleorder_list',
  meta: { title: 'sale', icon: 'nested' },
  children: [
    {
      path: 'saleorder_list',
      name: 'saleorder_list',
      component: () => import('@/views/sale/saleorder-list'),
      meta: { title: 'saleorder_list' }
    },
    {
      path: 'sale_list',
      name: 'sale_list',
      component: () => import('@/views/nested/menu1/index'),
      meta: { title: 'sale_list' }
    },
    {
      path: 'salereturn_list',
      name: 'salereturn_list',
      component: () => import('@/views/nested/menu1/index'),
      meta: { title: 'salereturn_list' }
    },
    {
      path: 'saleorder_add',
      name: 'saleorder_add',
      component: () => import('@/views/sale/saleorder-add'),
      meta: { title: 'saleorder_add' },
      hidden: true
    }
  ]
}
