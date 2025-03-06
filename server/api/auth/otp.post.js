export default defineEventHandler(async event => {
  let body = await readBody(event)
  let config = useRuntimeConfig()

  try {
    let data = await $fetch(`${config.public.API_BASE_URL}/auth/otp`, {
      method: 'POST',
      body: body
    })

    setCookie(event, 'token', data.token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    })

    let user = await $fetch(`${config.public.API_BASE_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${data.token}`
      }
    }) 
    return user.user
  } catch (error) {
    return error
  }
})
