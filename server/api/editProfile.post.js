export default defineEventHandler(async event => {
  let token = getCookie(event, 'token')
  let config = useRuntimeConfig()
  let formData = await readMultipartFormData(event)
  const form = new FormData()
  

  formData.forEach(item => {
    if (item.type) {
      form.append(
        'avatar',
        new File([item.data], item.filename, { type: item.type })
      )
    } else {
      form.append(item.name, item.data)
    }
  })

  try {
    let backendResponse = await fetch(
      `${config.public.API_BASE_URL}/user/profile`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: form
      }
    )

    const result = await backendResponse.json()
    return result
  } catch (error) {
    return error
  }
})
