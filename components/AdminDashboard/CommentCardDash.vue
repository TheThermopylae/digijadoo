<template>
  <div
    class="p-2 bg-white dark:bg-dark-s rounded-lg shadow flex flex-col justify-between"
    v-if="!props.comment.approved"
  >
    <strong>{{ props.comment.userid }}</strong>
    <div>
      <p class="my-2">{{ props.comment.text }}</p>
      <button
        class="btn-c h-10 flex items-center"
        @click="approvComment"
        v-if="!loading"
      >
        تایید نظر
      </button>
      <button class="btn-c h-10 flex items-center" v-else>
        <LoadingSpinner class="w-5 h-5"></LoadingSpinner>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

let loading = ref(false)

let props = defineProps(['comment', 'product'])

let toast = useToast()

let refresh = inject('refresh')

async function approvComment () {
  loading.value = true

  try {
    let data = await $fetch('/api/admin/products/approvedComments', {
      method: 'POST',
      body: { productId: props.product._id, commentId: props.comment._id },
      headers: {
        credentials: 'include'
      }
    })

    await refresh()
    toast.success('کامنت تایید شد')
  } catch (error) {
    toast.error('خطا در انجام عملیات')
  } finally {
    loading.value = false
  }
}
</script>
