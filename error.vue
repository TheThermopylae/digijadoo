<template>
  <div class="flex justify-center items-center h-screen text-center">
    <div v-if="error.statusCode == 404">
      <span class="text-9xl text-gray-400">404</span>
      <p class="mt-5 mb-8 text-purple-c text-xl">صفحه ی مورد نظر پیدا نشد!</p>
      <button @click="clearError({ redirect: '/' })" class="btn-c">
        برو به صفحه اصلی
      </button>
    </div>
    <div v-else>
      <span class="text-9xl text-gray-400">{{ error.statusCode }}</span>
      <p class="mt-5 mb-8 text-purple-c text-xl">مشکلی پیش آمده است!</p>
      <button @click="clearError({ redirect: '/' })" class="btn-c">
        برو به صفحه اصلی
      </button>
    </div>
  </div>
</template>

<script setup>
let error = useError()

useHead({
  title:
    error.value.statusCode === 404 ? 'صفحه ی مورد نظر پیدا نشد' : 'مشکلی پیش آمده است'
})
</script>