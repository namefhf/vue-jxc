import request from '@/utils/request'
export function listDataGroupByDay(params) {
  return request({
    url: '/charts/sale/listDataGroupByDay',
    method: 'post',
    data: params
  })
}
export function listStockDataGroupByStore() {
  return request({
    url: 'charts/store/listStockDataGroupByStore',
    method: 'post'
  })
}
