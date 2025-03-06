<template>
  <div class="text-center">
    <NuxtLink
      :to="{
        path: `/products`,
        query: { ...route.query, category: props.data._id }
      }"
    >
      <img
        class="w-full rounded-full"
        :src="$config.public.API_BASE_URL + props.data.image"
        :alt="'تصویر ' + props.data.name"
      />
    </NuxtLink>
    <h4>{{ props.data.name }}</h4>
  </div>
</template>

<script setup>
const props = defineProps(['data'])

const route = useRoute()
</script>
