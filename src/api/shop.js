import request from '@/utils/request'
export function listPage(params) {
  return request({
    url: 'shop/listPage',
    method: 'post',
    data: params
  })
}
export function upData(params) {
  return request({
    url: 'api/shop/updateData',
    method: 'post',
    data: params
  })
}
