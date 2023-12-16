import request from '@/utils/request'
/**
 * @description: 登录
 * @param {*}
 * @return {*}
 */
 export function login(data: object) {
    return request({
      url: '/cct/login',
      method: 'post',
      noLoading: true,
      data
    })
}
