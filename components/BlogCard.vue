<template>
  <div class="bg-white shadow rounded-lg">
    <NuxtLink :to="`/blogs/${props.data.title}`">
      <img
        :src="`${$config.public.API_BASE_URL}${props.data.img}`"
        :alt="props.data.title"
        class="w-full rounded-tl-lg rounded-tr-lg h-[240px]"
      />
    </NuxtLink>
    <div class="p-2 flex flex-col justify-between">
      <div class="flex flex-col justify-between h-[110px]">
        <h4 class="text-lg mb-2">{{ props.data.title }}</h4>
        <p class="break-words line-clamp-2 text-gray-600">
          {{ props.data.dec }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
let props = defineProps(['data'])
</script>
