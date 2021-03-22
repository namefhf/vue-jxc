import Layout from '@/layout'
export default {
  path: '/baseData',
  component: Layout,
  redirect: '/baseData/goods_list',
  meta: { title: 'baseData', icon: 'settings' },
  alwaysShow: true,
  children: [
    {
      path: 'goods_list',
      name: 'goods_list',
      component: () => import('@/views/baseData/goodsList'),
      meta: { title: 'goods_list' }
    }
  ]
}
