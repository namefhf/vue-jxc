import request from '@/utils/request'
export function listOptionsIncludeGuide(params) {
  console.log('params', params)
  return request({
    url: '/employee/listOptionsIncludeGuide',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
