<template>
  <div class="md:w-1/3 bg-white p-3 shadow rounded-xl mt-2 md:mt-0">
    <h2 class="text-xl mb-5">جمع کل سبد خرید</h2>
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
    <nuxtLink class="btn-c p-2 w-full mt-1 block text-center" to="/payment"
      >ادامه</nuxtLink
    >
  </div>
</template>

<script setup>
let props = defineProps(['data'])

let price = computed(() => {
  let sum = 0
  props.data.forEach(product => (sum += product.price))
  return sum
})
</script>
