<template>
  <div>
    <h1 class="text-3xl dark:text-white-dark">سبد خرید شما</h1>
    <div
      class="md:flex justify-between items-start gap-5"
      v-if="products.length > 0"
    >
      <BasketTableCart
        @showDeleteModal="showDeleteModalFunc"
        :products="products"
      ></BasketTableCart>
      <BasketNextStep :data="products"></BasketNextStep>
    </div>
    <p v-else class="text-center text-gray-600 mt-5 text-xl">
      سبد خرید شما خالی است!
    </p>
    <Transition>
      <BasketRemoveProductFromBasket
        v-if="showModal"
        @closeModal="showModal = false"
        :product="targetProduct"
        @removeProduct="removeAsBasket"
      ></BasketRemoveProductFromBasket>
    </Transition>
  </div>
</template>
<script setup>
useHead({
  title: 'سبد خرید'
})

definePageMeta({
  middleware: 'auth'
})

useHead({
  title: 'سبد خرید'
})

let products = ref(JSON.parse(localStorage.getItem('products')) || [])

let showModal = ref(false)
let targetProduct = ref(null)

function showDeleteModalFunc (index) {
  targetProduct.value = index
  showModal.value = true
}

function removeAsBasket () {
  products.value.splice(targetProduct.value, 1)
  localStorage.setItem('products', JSON.stringify(products.value))
  showModal.value = false
}
</script>
