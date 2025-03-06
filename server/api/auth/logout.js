export default defineEventHandler(async event => {
  let config = useRuntimeConfig()

  let data = await $fetch(`${config.public.API_BASE_URL}/auth/logout`)

  setCookie(event, 'token', data.token, {
    httpOnly: true,
    secure: true,
    maxAge: new Date(0),
    path: '/'
  })

  return data
})
