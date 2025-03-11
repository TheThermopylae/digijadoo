<template>
  <div class="lgmt-10">
    <HeroBanner />
    <CategorySlider>دسته بندی ها</CategorySlider>
    <ProductsSlider
      class="mt-5"
      :data="products.slice(0, 8).reverse()"
      :pagination="true"
      v-if="products"
    >
      <template #title>
        <h3>پر فروش ترین ها</h3>
      </template>
      <template #link>
        <NuxtLink class="hover:text-purple-c" :to="{ path: '/products' }"
          >بیشتر...</NuxtLink
        >
      </template>
    </ProductsSlider>
    <ProductsSlider
      :pagination="true"
      class="mt-5"
      :data="products.slice(0, 8)"
      v-if="products"
    >
      <template #title>
        <h3>جدید ترین ها</h3>
      </template>
      <template #link>
        <NuxtLink
          class="hover:text-purple-c"
          :to="{ path: '/products', query: { sort: 'newest' } }"
          >بیشتر...</NuxtLink
        >
      </template>
    </ProductsSlider>
    <BlogSlider :pagination="true" :blogs="blogs.slice(0, 10)" v-if="blogs" />
  </div>
</template>

<script setup>
useHead({
  title: 'صفحه اصلی'
})

let config = useRuntimeConfig()

let { data: products } = await useAsyncData(() =>
  $fetch(`${config.public.API_BASE_URL}/filterProduct`)
)

let { data: blogs } = useFetch(`${config.public.API_BASE_URL}/blog`)
</script>
