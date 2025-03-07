<template>
  <div>
    <h2 class="text-3xl mb-5">نظرات</h2>
    <AdminDashboardCommentsSection
      v-if="products"
      :products="products"
    ></AdminDashboardCommentsSection>
    <h2 class="text-3xl my-5">ریپلای ها</h2>
    <AdminDashboardReplySection
      v-if="products"
      :products="products"
    ></AdminDashboardReplySection>
  </div>
</template>

<script setup>
let { data: products, refresh } = await useFetch(
  '/api/admin/products/getProducts',
  {
    credentials: 'include'
  }
)

provide('refresh', refresh)

useHead({
  title: 'نظرات'
})
</script>
