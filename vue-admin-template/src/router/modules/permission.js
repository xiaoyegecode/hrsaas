import Layout from '@/layout'
export default {
  path: '/permission', // 路径
  component: Layout, // 组件
  meta: {
    id: 'permissions'
  },
  // 配置二级路的路由表
  children: [{
    path: '', 
    name: 'permission', 
    component: () => import('@/views/permission'),
    
    meta: {
      title: '权限管理',
      icon: 'lock'
    }
  }]
}
