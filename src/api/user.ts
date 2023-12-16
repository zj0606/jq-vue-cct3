import request from '@/utils/request'
interface CodeData {
  verifyCodeKey: string
  verifyCode: string
}
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
/**
 * @description: 生成图形验证码
 * @param {*}
 * @return {*}
 */
 export function createImgVerifyCode() {
  return request({
    url: '/cct/toeEmployee/createImgVerifyCode',
    method: 'get',
    noLoading: true
  })
}

/**
 * @description: 校验验证码
 * @param {*}
 * @return {*}
 */
export function checkImgVerifyCode(data: CodeData) {
  return request({
    url: '/cct/toeEmployee/checkImgVerifyCode',
    method: 'post',
    noLoading: true,
    data
  })
}
