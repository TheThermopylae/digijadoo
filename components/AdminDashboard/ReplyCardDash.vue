<template>
  <div
    class="p-2 bg-white rounded-lg shadow flex flex-col justify-between mb-2"
  >
    <strong>مدیر</strong>
    <div>
      <p class="my-2">{{ props.reply.text }}</p>
      <p class="mb-2 text-gray-600">ریپلای شده بر روی : {{ props.comment.text }}</p>
      <button class="btn-c h-12" @click="approvReply" v-if="!loading">
        تایید ریپلای
      </button>
      <button class="btn-c h-12" v-else>
        <LoadingSpinner class="w-5 h-5"></LoadingSpinner>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

let loading = ref(false)

let props = defineProps(['comment', 'product', 'reply'])

// console.log(props.comment, props.reply)

let toast = useToast()

let refresh = inject('refresh')

async function approvReply () {
  loading.value = true

  try {
    let data = await $fetch('/api/admin/products/approvedReply', {
      method: 'POST',
      body: {
        productId: props.product._id,
        commentId: props.comment._id,
        replyId: props.reply._id
      },
      headers: {
        credentials: 'include'
      }
    })

    await refresh()
    toast.success('ریپلای تایید شد')
  } catch (error) {
    toast.error('خطا در انجام عملیات')
  } finally {
    loading.value = false
  }
}
</script>
