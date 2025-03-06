export default defineEventHandler(async event => {
  let token = getCookie(event, 'token')
  let config = useRuntimeConfig()
  let formData = await readMultipartFormData(event)

  const productId = formData.find(item => item.name === 'id').data

  formData = formData.filter(item => item.name !== 'id')

  const form = new FormData()

  formData.forEach(item => {
    if (item.type) {
      form.append(
        'images',
        new File([item.data], item.filename, { type: item.type })
      )
    } else {
      form.append(item.name, item.data)
    }
  })

  try {
    let backendResponse = await fetch(
      `${config.public.API_BASE_URL}/admin/updateproduct/${productId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
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
