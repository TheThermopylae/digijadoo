<template>
  <div>
    <div class="bg-white dark:bg-dark-s p-3 rounded-xl shadow mb-5 md:text-center">
      <UserDashboardOrderCardStatus :order="props.order.status"></UserDashboardOrderCardStatus>
      <div class="flex gap-5 flex-col md:flex-row">
        <h4>
          تاریخ :
          <span class="text-gray-600 dark:text-gray-400">{{ props.order.createdAt }}</span>
        </h4>
        <h4>
          ساعت :
          <span class="text-gray-600 dark:text-gray-400">{{ props.order.timeAt }}</span>
        </h4>
        <h4>
          کد سفارش :
          <span class="text-gray-600 dark:text-gray-400">{{ props.order._id }}</span>
        </h4>
        <h4>
          محصولات :
          <span class="text-gray-600 dark:text-gray-400">{{ props.order.number }} عدد</span>
        </h4>
        <h4>
          مبلغ :
          <span class="text-gray-600 dark:text-gray-400"
            >{{ props.order.price.toLocaleString() }} تومان</span
          >
        </h4>
        <h4>
          آدرس انتخاب شده :
          <span class="text-gray-600 dark:text-gray-400">{{ selectedAddress.title }} </span>
        </h4>
      </div>
      <div class="mt-5">
        <div
          v-for="item in uniqueProducts"
          class="mb-2 flex items-center gap-3 last:m-0"
        >
          <img
            :src="$config.public.API_BASE_URL + item.images[0]"
            class="w-20 h-20 rounded-lg"
            alt="product image"
          />
          {{ item.title }} ({{ item.count }} عدد)
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let props = defineProps(['order'])

let selectedAddress = computed(() => {
  return props.order.userid.address.find(address => address.default)
})

const findUniqueProducts = props.order.productDetails.reduce((acc, product) => {
  if (acc[product._id]) {
    acc[product._id].count++
  } else {
    acc[product._id] = { ...product, count: 1 }
  }
  return acc
}, {})

const uniqueProducts = Object.values(findUniqueProducts)
</script>
