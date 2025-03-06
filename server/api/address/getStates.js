export default defineEventHandler(async event => {
  try {
    let data = await $fetch(`https://iranplacesapi.liara.run/api/Provinces`)

    return data
  } catch (error) {
    return error
  }
})
