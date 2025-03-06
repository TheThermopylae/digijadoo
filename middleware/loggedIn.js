export default defineNuxtRouteMiddleware(() => {
  let { userData } = userAuth()

  if (userData.value) {
    return navigateTo('/')
  }
})
