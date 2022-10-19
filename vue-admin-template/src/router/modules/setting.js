import Layout from '@/layout'
export default {
  path: '/setting', // 路径
  component: Layout, // 组件
  meta: {
    id: 'settings'
  },
  // 配置二级路的路由表
  children: [{
    path: '', 
    name: 'setting',
    component: () => import('@/views/setting'),
    
    meta: {
      title: '设置',
      icon: 'setting'
    }
  }]
}
