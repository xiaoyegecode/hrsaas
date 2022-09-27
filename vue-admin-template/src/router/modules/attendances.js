import Layout from '@/layout'
export default {
  path: '/attendances', // 路径
  component: Layout, // 组件
  // 配置二级路的路由表
  children: [{
    path: '', 
    name: 'attendances', 
    component: () => import('@/views/attendances'),
    
    meta: {
      title: '考勤',
      icon: 'skill'
    }
  }]
}
