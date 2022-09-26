import router from '@/router'
import store from '@/store'
const whiteList = ['/login', '/404']
// 2. 首先判断有无token
// 2.1.1 判断是否处于登录页面，是的话 跳首页 否则 直接留在当前页（直接放行 next()）
// 2.2 token 不存在 说明 不处于登录状态
// 2.2.1 判断一下 是否处于白名单 是的话 直接留在 当前页 否则 跳转到登录页
router.beforeEach((to, from, next) => {
  //  首先判断有无token
  if (store.getters.token) {
    //   如果有token 继续判断是不是去登录页
    if (to.path === '/login') {
      //  表示去的是登录页
      next('/')
    } else {
      next()
    }
  } else {
    // 如果没有token
    if (whiteList.includes(to.path)) {
      // 如果找到了 表示在在名单里面
      next() // 放行
    } else { 
      next('/login')
    }
  }
  
})