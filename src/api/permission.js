import request from '@/utils/request'
export function listAllData() {
  return request({
    url: 'permission/listAllData',
    method: 'post'
  })
}
export function listData(id) {
  return request({
    url: `permission/listData/${id}`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: id
  })
}
