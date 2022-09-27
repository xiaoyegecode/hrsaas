import request from '@/utils/request'
/**
 * 获取所有角色
 * @param {*} params 
 * @returns 
 */
export const getRoleListAPI = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}
/**
 * 新增角色
 * @param {*} data 
 * @returns 
 */
export const addRoleAPI = (data) => {
  return request({
    url: '/sys/role',
    data,
    method: 'post'
  })
}
