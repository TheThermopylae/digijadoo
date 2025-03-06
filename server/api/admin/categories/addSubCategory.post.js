export default defineEventHandler(async event => {
  let token = getCookie(event, 'token')
  let config = useRuntimeConfig()

  let formData = await readMultipartFormData(event)
  const form = new FormData()

  formData.forEach(item => {
    if (item.type) {
      form.append(
        'image',
        new File([item.data], item.filename, { type: item.type })
      )
    } else {
      form.append(item.name, item.data)
    }
  })

  console.log(formData);
  

  try {
    let data = await fetch(`${config.public.API_BASE_URL}/admin/categories/subcategory`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: form
    })

    console.log(data);
    

    return data
  } catch (error) {
    return error
  }
})
