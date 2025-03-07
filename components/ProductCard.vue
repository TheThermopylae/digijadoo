<template>
  <div
    class="bg-white dark:bg-dark-s shadow p-2 rounded-xl relative flex flex-col justify-between h-[380px] md:h-[420px] xl:h-[480px]"
    v-if="props.data"
  >
    <div>
      <img
        :src="`${$config.public.API_BASE_URL}${props.data.images[0]}`"
        :alt="props.data.title"
        class="w-full rounded-lg"
      />
      <h4 class="mb-3 mt-2 text-sm xl:text-[16px]">{{ props.data.title }}</h4>
      <div
        class="w-5 h-5 rounded-full border border-black"
        :style="{ background: props.data.color }"
      ></div>
    </div>
    <div class="text-[15px] lg:text-[17px]">
      <div class="flex justify-between items-end">
        <span class="text-purple-c block"
          >{{ props.data.price.toLocaleString() }} تومان</span
        >
      </div>
      <NuxtLink
        :to="`/products/${props.data.title}`"
        class="transition-all text-white p-2 rounded-lg block mt-2 text-center bg-purple-c hover:opacity-90 text-sm"
        >مشاهده جزییات</NuxtLink
      >
    </div>
  </div>
</template>
<script setup>
let props = defineProps(['data'])
</script>
