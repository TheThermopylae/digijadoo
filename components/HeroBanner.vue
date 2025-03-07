<template>
  <div
    class="mb-10 banner w-full rounded-lg flex justify-center items-center h-[400px]"
  >
    <p class="text-center text-xl md:text-3xl mb-5 text-white">
      دیجی جادو، فروشگاه محصولات
      <vue-typewriter-effect
        class="text-purpl-400"
        :strings="categoriesArray"
        v-if="categoriesArray"
      />
    </p>
  </div>
</template>

<script setup>
import VueTypewriterEffect from 'vue-typewriter-effect'

let categories = inject('categories')

let categoriesArray = ref([])

if (categories.value) {
  categories.value.forEach(category =>
    categoriesArray.value.push(category.name)
  )
}
</script>

<style scoped>
.banner {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('/public/banner.jpg') center/cover;
}
</style>
