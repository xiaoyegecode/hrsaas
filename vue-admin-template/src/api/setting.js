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
/**
 * 修改角色
 * ***/
export const updateRole = (data)=> {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}
/**
 * 获取角色详情
 * **/
export const getRoleDetail = (id) => {
  return request({
    url: `/sys/role/${id}`
  })
}
/** **
 *  删除角色
 *
 * ****/
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
/**
 * 获取公司信息
 * **/
export function getCompanyInfoAPI(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}


