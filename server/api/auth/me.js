export default defineEventHandler(async event => {
  let config = useRuntimeConfig()

  let token = getCookie(event, 'token')
  try {
    let data = await $fetch(`${config.public.API_BASE_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data.user
  } catch (error) {
    return error
  }
})
