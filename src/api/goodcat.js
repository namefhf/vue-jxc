import request from '@/utils/request'
export function listAllData() {
  return request({
    url: 'goodCat/listAllData',
    method: 'POST'
  })
}
