export default defineNuxtRouteMiddleware(() => {
  let { userData } = userAuth()

  if (userData.value.role == 'ADMIN') {
    return navigateTo('/admin-panel')
  }
})
