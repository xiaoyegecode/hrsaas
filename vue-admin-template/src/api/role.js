import request from '@/utils/request'
/**
 * 获取角色详情
 * @param {*} id 
 * @returns 
 */
export const getUserRoleByIdAPI = (id) => {
  return request({
    url: `/sys/role/${id}`
  })
}
export const setRolesPermissionAPI = (data) => {
  return request({
    url: '/sys/role/assignPrem',
    method: 'PUT',
    data
  })
}

