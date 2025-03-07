<template>
  <tr class="relative">
    <td>{{ props.order._id }}</td>
    <td>{{ props.order.createdAt }}</td>
    <td>{{ props.order.timeAt }}</td>
    <td>{{ props.order.number }} عدد</td>
    <td>
      <select
        :id="'order-status-' + props.order._id"
        v-model="status"
        class="p-1 rounded set-ring"
        @change="changeOrderStatus"
        v-if="!loading"
      >
        <option value="pending">در انتظار</option>
        <option value="processing">در حال پردازش</option>
        <option value="shipped">ارسال شده</option>
        <option value="delivered">تحویل شده</option>
        <option value="canceled">لغو شده</option>
      </select>
      <LoadingSpinner v-else class="text-purple-c"></LoadingSpinner>
    </td>
    <td class="flex gap-2 text-center">
      <div v-for="item in uniqueProducts" :key="item._id">
        <h4>
          {{ item.title }} ({{ item.count }} عدد)
        </h4>
        <div
          class="w-5 h-5 rounded-full m-auto mt-1 border border-black"
          :style="{ backgroundColor: item.color }"
        ></div>
      </div>
    </td>
    <td>{{ props.order.userid.username }}</td>
    <td>
      <p>
        {{ findAddress.province }} / {{ findAddress.city }} / خیابان
        {{ findAddress.street }} / کد پستی :
        {{ findAddress.postalCode }}
      </p>
    </td>
  </tr>
</template>

<script setup>
import { useToast } from 'vue-toastification'

let refresh = inject('refresh')
let props = defineProps(['order'])
let loading = ref(false)

const findUniqueProducts = props.order.productDetails.reduce((acc, product) => {
  if (acc[product._id]) {
    acc[product._id].count++
  } else {
    acc[product._id] = { ...product, count: 1 }
  }
  return acc
}, {})

const uniqueProducts = Object.values(findUniqueProducts)

let findAddress = computed(() => {
  return props.order.userid.address.find(address => address.default)
})

let status = props.order.status

let toast = useToast()

async function changeOrderStatus () {
  let orderStatus = {
    orderId: props.order._id,
    status
  }

  loading.value = true
  try {
    let data = await $fetch('/api/admin/orders/changeOrderStatus', {
      headers: {
        credentials: 'include'
      },
      method: 'POST',
      body: orderStatus
    })

    await refresh()
    toast.success(data.message)
  } catch (err) {
    toast.error('انجام عملیات با خطا مواجه شد. لطفا دوباره امتحان کنید')
  } finally {
    loading.value = false
  }
}
</script>
