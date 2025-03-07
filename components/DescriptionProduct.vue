<template>
  <div
    v-html="props.data.longdescription"
    class="shadow bg-white dark:bg-dark-s p-5 rounded-xl my-10 prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc [&_ol]:mr-3 [&_ol]:pr-3 [&_ul]:mr-3 [&_ul]:pr-3 [&_h1]:text-3xl [&_h2]:text-2xl  [&_h3]:text-xl [&_p]:text-gray-600 dark:[&_p]:text-text-dark"
  ></div>
</template>

<script setup>
let props = defineProps(['data'])
</script>

<style>
p:empty::after {
  content: '\00A0';
}
</style>
