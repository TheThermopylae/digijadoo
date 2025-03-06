<template>
  <div class="bg-white shadow rounded-xl px-5 py-4 hidden lg:block sticky top-5">
    <h2 class="text-center text-xl mb-3">مرتب سازی بر اساس</h2>
    <div class="flex items-center gap-3 mb-3">
      <input
        id="newest"
        type="radio"
        name="radio-btn"
        class="radio"
        value="newest"
        v-model="selectedSort"
        @change="emitSort"
      />
      <label for="newest">جدیدترین</label>
    </div>
    <div class="flex items-center gap-3 mb-3">
      <input
        id="cheapest"
        type="radio"
        name="radio-btn"
        class="radio"
        value="cheapest"
        v-model="selectedSort"
        @change="emitSort"
      />
      <label for="cheapest">ارزان ترین</label>
    </div>
    <div class="flex items-center gap-3 mb-3">
      <input
        id="expensive"
        type="radio"
        name="radio-btn"
        class="radio"
        value="expensive"
        v-model="selectedSort"
        @change="emitSort"
      />
      <label for="expensive">گران ترین</label>
    </div>
  </div>
</template>

<script setup>
const selectedSort = ref('newest')

const emitSort = () => {
  emit('changeType', selectedSort.value)
}

const emit = defineEmits(['changeType'])

onMounted(() => {
  // emitSort()
})
</script>
