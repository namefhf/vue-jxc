import request from '@/utils/request'
export function listDataGroupByGoods(params) {
  return request({
    url: 'report/purchase/listDataGroupByGoodPage',
    method: 'post',
    data: params
  })
}
