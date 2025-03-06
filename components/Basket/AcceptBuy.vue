<template>
  <div class="md:w-1/3 bg-white p-3 shadow rounded-xl">
    <div class="my-2">
      <div class="flex justify-between items-center border-b pb-3 mb-2">
        <h4>قیمت کالا :</h4>
        <span class="text-gray-600">{{ price.toLocaleString() }} تومان</span>
      </div>
      <div class="flex justify-between items-center border-b pb-3 mb-2">
        <h4>هزینه ارسال :</h4>
        <span class="text-gray-600">50,000 تومان</span>
      </div>
      <div class="flex justify-between items-center">
        <h4>هزینه کل :</h4>
        <span class="text-green-500"
          >{{ (price + 50000).toLocaleString() }} تومان</span
        >
      </div>
    </div>
    <button
      class="btn-c p-2 w-full text-center h-12 flex items-center justify-center"
      @click="purchase"
      v-if="!loading"
    >
      پرداخت
    </button>
    <button
      class="btn-c p-2 w-full text-center h-12 flex items-center justify-center"
      v-else
    >
      <LoadingSpinner></LoadingSpinner>
    </button>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

let products = ref(JSON.parse(localStorage.getItem('products')) || [])

let loading = ref(false)

let { userData } = userAuth()

let price = computed(() => {
  let sum = 0
  products.value.forEach(product => (sum += product.price))
  return sum
})

let toast = useToast()

async function purchase () {
  let order = {
    price: 0,
    productid: [],
    userid: userData.value._id,
    number: 0
  }

  let someDefaultAddress = userData.value.address.some(addres => addres.default)

  console.log(someDefaultAddress)

  if (!someDefaultAddress) {
    toast.error('لطفا یکی از آدرس های خود را انتخاب کنید')
    return
  }

  try {
    loading.value = true

    for (let i = 0; i < products.value.length; i++) {
      order.price += order.price = products.value[i].price

      for (let j = 0; j < products.value[i].count; j++) {
        order.productid.push(products.value[i].id)
      }

      order.number = order.productid.length
    }

    let data = await $fetch('/api/sendOrder', {
      method: 'POST',
      headers: {
        credentials: 'include'
      },
      body: order
    })

    localStorage.setItem('products', JSON.stringify([]))
    return navigateTo(data.url, { external: true })
  } catch (err) {
    toast.error('مشکلی پیش آمد. لطفا دوباره امتحان کنید')
  } finally {
    loading.value = false
  }
}
</script>
