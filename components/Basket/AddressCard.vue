<template>
  <div
    class="bg-white dark:bg-dark-s shadow p-3 w-full rounded-lg text-lg last:mb-0 flex justify-between items-center"
  >
    {{ props.address.title }}
    <input
      type="radio"
      name="radio-1"
      class="radio"
      :checked="props.address.default"
      @change="changeAddress"
    />
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

let props = defineProps(['address', 'index'])

let { userData } = userAuth()

let toast = useToast()

async function changeAddress () {
  try {
    userData.value.address.forEach(address => (address.default = false))

    let addresses = userData.value.address

    let setDefault = (addresses[props.index].default = true)

    let data = await $fetch('/api/address/addAddress', {
      credentials: 'include',
      method: 'POST',
      body: { ...userData.value, address: addresses }
    })

    toast.success('آدرس پیشفرض شما عوض شد')
  } catch (err) {
    toast.error(err.data.message)
  }
}
</script>
