<template>
  <div>
    <h1 class="text-3xl">سفارشات</h1>
    <AdminDashboardOrdersStatus
      v-if="orders"
      :orders="orders.orders"
    ></AdminDashboardOrdersStatus>
    <h2 class="mb-5 text-xl">سفارشات</h2>
    <AdminDashboardOrderTable
      :orders="orders.orders"
      v-if="orders"
    ></AdminDashboardOrderTable>
  </div>
</template>
<script setup>
useHead({
  title: 'سفارشات'
})

let { data: orders, refresh } = await useFetch('/api/admin/orders/getOrders', {
  credentials: 'include'
})

provide('refresh', refresh)
</script>
