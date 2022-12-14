import request from '@/utils/request'
/**
 * 获取用户的基本资料
 * @returns
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}
/**
 * 获取用户的基本信息  现在写它 完全是为了显示头像
 * @param {*} id 
 * @returns 
 */
export const getUserDetailByIdAPI = (id) => {
  return request({
    url: `/sys/user/${id}`
  })
}
/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetailAPI(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonalAPI(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}
