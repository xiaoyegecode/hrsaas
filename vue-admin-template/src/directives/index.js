import store from '@/store'
export const imgerror = {
  inserted(el, binding) {
    el.onerror = function () {
      el.src = binding.value
    }
  }
}
export const ishasPermission = {
  inserted(el, binding) {
    const isHas = store.state.user.userInfo.roles.points.includes(binding.value)
    if (isHas) return
    el.remove()
  }
}