<template>
  <div class="flex flex-col min-h-screen bg-white-c dark:bg-[#171717] dark:text-text-dark transition-all">
    <HeaderTheHeader :categories="categories"></HeaderTheHeader>
    <div
      class="flex-grow container m-auto py-5 lg:pt-5"
      :categories="categories"
    >
      <slot />
    </div>
    <TheFooter />
  </div>
</template>

<script setup>
let config = useRuntimeConfig()

let { data: categories } = await useFetch(
  `${config.public.API_BASE_URL}/category`
)

provide('categories', categories)
</script>
