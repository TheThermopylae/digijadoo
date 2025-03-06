export default defineEventHandler(async event => {
  let body = await readBody(event)

  try {
    let data = await $fetch(
      `https://iranplacesapi.liara.run/api/Provinces/id/${body.id}/cities`
    )

    return data
  } catch (error) {
    return error
  }
})
