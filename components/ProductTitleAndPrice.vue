<template>
  <div class="place-content-enter text-center">
    <div class="breadcrumbs text-sm mb-5">
      <ul class="text-center justify-center">
        <li><nuxtLink to="/">فروشگاه اینترنتی دیجی جادو</nuxtLink></li>
        <li class="font-bold">
          <a>{{ props.data.title }}</a>
        </li>
      </ul>
    </div>
    <h1 class="text-2xl mt-5 lg:mt-0">
      {{ props.data.title }}
    </h1>
    <span class="text-lg lg:text-xl text-blue-500 my-6 block"
      >{{ props.data.price.toLocaleString() }} تومان</span
    >
  </div>
</template>

<script setup>
let props = defineProps(['data'])
</script>
