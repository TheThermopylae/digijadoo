<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn m-1 bg-white dark:bg-dark-s dark:text-text-dark">مرتب سازی</div>
    <ul
      tabindex="0"
      class="dropdown-content bg-white dark:bg-dark-s rounded-box z-10 w-52 p-2 shadow"
    >
      <li class="px-2 py-1 active:bg-purple-c active:text-white transition-all rounded-lg">
        <a @click="emitSort('newest')">جدیدترین</a>
      </li>
      <li class="px-2 py-1 active:bg-purple-c active:text-white transition-all rounded-lg">
        <a @click="emitSort('cheapest')">ارزان ترین</a>
      </li>
      <li class="px-2 py-1 active:bg-purple-c active:text-white transition-all rounded-lg">
        <a @click="emitSort('expensive')">گران ترین</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
const selectedSort = ref('newest')
let emit = defineEmits(['changeType'])

const emitSort = type => {
  selectedSort.value = type
  emit('changeType', selectedSort.value)
}

onMounted(() => {
  // emitSort()
})
</script>
