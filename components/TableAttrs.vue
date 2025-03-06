<template>
  <div>
    <h2 class="title mb-3">ویژگی های محصول</h2>
    <div class="overflow-x-auto bg-white md:w-1/2 mb-10 rounded-xl shadow">
      <table class="table text-lg">
        <tbody>
          <tr v-for="(item, index) in props.data[1].attrs" :key="index">
            <td>{{ item[0] }} : <span class="text-gray-600">{{ item[1] }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
let props = defineProps(['data'])
</script>
