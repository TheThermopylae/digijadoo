<template>
  <section
    class="bg-purple-c text-white flex justify-center items-center flex-col rounded-lg p-14 mb-6"
  >
    <h1 class="text-2xl">بلاگ دیجی جادو</h1>
    <div class="breadcrumbs text-sm">
      <ul>
        <li><nuxtLink to="/">صفحه اصلی</nuxtLink></li>
        <li><NuxtLink to="/blogs">بلاگ</NuxtLink></li>
        <li class="font-semibold">
          {{ props.title }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
let props = defineProps(['title'])
</script>
