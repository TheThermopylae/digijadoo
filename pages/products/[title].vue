<template>
  <div v-if="products" class="mt-20 lg:mt-10">
    <ProductDetail :data="findProduct"></ProductDetail>
    <DescriptionProduct :data="findProduct"></DescriptionProduct>
    <!-- <TableAttrs :data="targetProduct"></TableAttrs> -->
    <div>
      <h2 class="title mb-2">محصولات مشابه</h2>
      <ProductsSlider
        :data="similarProducts"
        v-if="similarProducts.length > 0"
      ></ProductsSlider>
      <p class="text-center text-xl" v-else>محصولی یافت نشد!</p>
    </div>
  </div>
</template>

<script setup>
let config = useRuntimeConfig()

let { data: products, refresh } = await useFetch(
  `${config.public.API_BASE_URL}/filterproduct`,
  {
    headers: {
      credentials: 'include'
    }
  }
)

provide('refresh', refresh)

let route = useRoute()


let findProduct = computed(() => {
  return products.value.find(product => product.title == route.params.title)
})

console.log(findProduct.value);


let similarProducts = computed(() => {
  return products.value.filter(product => product.color !== findProduct.value.color && product.categoryid._id == findProduct.value.categoryid._id)
})
useHead({
  title: findProduct.value.title
})
</script>
