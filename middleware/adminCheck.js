export default defineNuxtRouteMiddleware(() => {
  let { userData } = userAuth()

  if (userData.value.role == 'USER') {
    return navigateTo('/user-panel')
  }
})
