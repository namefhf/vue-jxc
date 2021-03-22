import request from '@/utils/request'
export function listPage(params) {
  return request({
    url: 'role/listPage',
    method: 'post',
    data: params
  })
}
