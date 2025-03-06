<template>
  <tr
    class="relative"
    :class="{ 'text-purple-c': userData._id == props.user._id }"
  >
    <td>{{ props.user._id }}</td>
    <td>{{ props.user.username }}</td>
    <td>{{ dayjs(props.user.createdAt).format('YYYY/MM/DD') }}</td>
    <td>{{ props.user.email }}</td>
    <td>{{ props.user.codemeli }}</td>
    <td>{{ props.user.phone }}</td>
    <td>
      {{ props.user.role }}
      <div
        class="lg:tooltip"
        data-tip="تغییر نقش"
        v-if="!loading && userData._id != props.user._id"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          class="inline-block mr-1 cursor-pointer"
          viewBox="0 0 48 48"
          @click="changeRole"
        >
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="4"
          >
            <path d="M18 31h20V5" />
            <path d="M30 21H10v22m34-32l-6-6l-6 6" />
            <path d="m16 37l-6 6l-6-6" />
          </g>
        </svg>
      </div>
      <LoadingSpinner
        class="w-3 h-3 mr-1 asolute"
        v-else-if="loading"
      ></LoadingSpinner>
    </td>
  </tr>
</template>

<script setup>
import dayjs from 'dayjs'
import { useToast } from 'vue-toastification'
// import jalali from 'dayjs-jalali'
let props = defineProps(['user'])
let emit = defineEmits(['editUser'])

let { userData } = userAuth()

let loading = ref(false)

let toast = useToast()

async function changeRole () {
  loading.value = true
  try {
    let data = await $fetch('/api/admin/changeRole', {
      method: 'PUT',
      headers: {
        credentials: 'include'
      },
      body: { id: props.user._id }
    })

    toast.success(data)
    emit('editUser')
  } catch (error) {
    toast.error(error.data.message)
  } finally {
    loading.value = false
  }
}
</script>
