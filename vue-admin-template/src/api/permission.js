import request from '@/utils/request'
// 获取所有权限点
export function getPermissionListAPI() {
  return request({
    url: '/sys/permission'
  })
}
// 新增权限
export function addPermissionAPI(data) {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}

// 更新权限
export function updatePermissionAPI(data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'put',
    data
  })
}

// 删除权限
export function delPermissionAPI(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'delete'
  })
}
// 获取权限详情
export function getPermissionDetailAPI(id) {
  return request({
    url: `/sys/permission/${id}`
  })
}
