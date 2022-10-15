import Layout from '@/layout'
export default {
  path: '/employees', // 路径
  component: Layout, // 组件
  // 配置二级路的路由表
  children: [
    {
    path: '', 
    name: 'employees', 
    component: () => import('@/views/employees'),
    
    meta: { title: '员工',icon: 'people' }
    },
    {
      path: 'detail/:id',
      component: () => import('@/views/employees/Detail'),
      hidden: true,
    },
    {
      path: 'print/:id',
      component: () => import('@/views/employees/Printer'),
      hidden: true,
    }
  ]
}
