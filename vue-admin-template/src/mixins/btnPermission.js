export default {
  methods: {
    ishasPermission(permissionid) {
      return !this.$store.state.user.userInfo.roles.points.includes(permissionid)
    }
  }
}