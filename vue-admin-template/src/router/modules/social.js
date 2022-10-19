import Layout from '@/layout'
export default {
  path: '/social', // 路径
  component: Layout, // 组件
  meta: {
    id: 'social_securitys'
  },
  // 配置二级路的路由表
  children: [{
    path: '', 
    name: 'social',
    component: () => import('@/views/social'),
    
    meta: {
      title: '社保',
      icon: 'table'
    }
  }]
}
