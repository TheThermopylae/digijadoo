<template>
  <div class="overflow-x-auto bg-white dark:bg-dark-s mt-5 rounded-lg shadow p-5">
    <table class="table">
      <!-- head -->
      <thead>
        <tr class="dark:text-gray-400">
          <th>آیدی</th>
          <th>تاریخ</th>
          <th>ساعت</th>
          <th>تعداد محصول</th>
          <th>وضعیت</th>
          <th>محصولات</th>
          <th>خریدار</th>
          <th>آدرس</th>
        </tr>
      </thead>
      <tbody>
        <AdminDashboardOrdersCard
          v-for="item in orders"
          :key="item._id"
          :order="item"
        ></AdminDashboardOrdersCard>
      </tbody>
    </table>
  </div>
</template>

<script setup>
let props = defineProps(['orders'])
</script>
