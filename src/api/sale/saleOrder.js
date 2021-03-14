import request from '@/utils/request'
export function listPage(params) {
  return request({
    url: '/bill/saleOrder/listPage',
    method: 'post',
    data: params
  })
}
export function assAudit(params) {
  return request({
    url: '/bill/saleOrder/passAudit',
    method: 'post',
    data: params
  })
}
export function antiAudit(params) {
  return request({
    url: 'bill/saleOrder/antiAudit',
    method: 'post',
    data: params
  })
}
