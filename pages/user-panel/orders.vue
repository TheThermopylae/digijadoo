<template>
  <div>
    <h1 class="text-3xl">سفارشات</h1>
    <UserDashboardOrderHistory
      :orders="orders.orders"
      v-if="orders"
    ></UserDashboardOrderHistory>
    <div>
      <h2 class="text-xl mb-5">سفارش های اخیر</h2>
      <div>
        <UserDashboardOrdersCard
          v-for="item in orders.orders"
          :key="item._id"
          v-if="orders"
          :order="item"
        ></UserDashboardOrdersCard>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'سفارشات'
})

let { data: orders } = await useFetch('/api/getUserOrders', {
  credentials: 'include'
})
</script>
