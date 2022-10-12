// import PageTools from './PageTools'
// const components = [PageTools]

// export default {
//   install: function (Vue) {
//     components.forEach(ele => {
//       Vue.component(ele.name, ele)
//     })
//   }
// }
// export default (Vue) => {
//   components.forEach(ele => {
//     Vue.component(ele.name, ele)
//   })
// }
import * as filters from '@/filters'

const requireComponent = require.context('./', true, /\.vue$/)
const res = requireComponent.keys().map(requireComponent)
export default (Vue) => {
  res.forEach(ele => {
    Vue.component(ele.default.name, ele.default)
  })
  // 批量注册全局过滤器
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
}
