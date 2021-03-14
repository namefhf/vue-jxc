import request from '@/utils/request'
export function listOptionsIncludeGuide(params) {
  console.log(params)
  return request({
    url: 'employee/listOptionsIncludeGuide',
    method: 'post',
    data: params
  })
}
