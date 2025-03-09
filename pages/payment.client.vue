<template>
  <div>
    <h1 class="text-3xl">پرداخت</h1>
    <div v-if="products.length > 0">
      <div>
        <h2 class="text-xl my-4">آدرس های شما :</h2>
        <div class="md:flex items-start gap-5">
          <div
            class="md:w-2/3 grid grid-cols-2 lg:grid-cols-3 gap-5"
            v-if="userData.address.length > 0"
          >
            <BasketAddressCard
              v-for="(item, index) in userData.address"
              :key="index"
              :address="item"
              :index="index"
            >
            </BasketAddressCard>
          </div>
          <div v-else class="md:w-2/3 text-center text-lg leading-10">
            <p class="text-gray-600">آدرسی وجود ندارد!</p>
            <NuxtLink to="/user-panel/add-address" class="text-purple-c"
              >افزودن آدرس</NuxtLink
            >
          </div>
          <ClientOnly>
            <BasketAcceptBuy class="md:w-1/3 mt-2 md:m-0"></BasketAcceptBuy>
          </ClientOnly>
        </div>
      </div>
    </div>
    <div v-else class="text-gray-600 text-center text-lg dark:text-text-dark">سبد خرید شما خالی است!</div>
  </div>
</template>

<script setup>
let { userData } = userAuth()

definePageMeta({
  middleware:'auth'
})

useHead({
  title: 'پرداخت'
})

let products = JSON.parse(localStorage.getItem('products')) || []
</script>
