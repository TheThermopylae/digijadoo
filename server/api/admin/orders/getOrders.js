export default defineEventHandler(async event => {
  let token = getCookie(event, 'token')
  let config = useRuntimeConfig()

  try {
    let data = await $fetch(`${config.public.API_BASE_URL}/admin/order`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return data
  } catch (error) {
    return error
  }
})
