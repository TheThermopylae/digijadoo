export default defineEventHandler(async event => {
  let body = await readBody(event)
  let token = getCookie(event, 'token')
  let config = useRuntimeConfig()

  try {
    let data = await $fetch(
      `${config.public.API_BASE_URL}/admin/categories/${body.categoryid}/subcategory/edit/${body.subId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return data
  } catch (error) {
    return error
  }
})
