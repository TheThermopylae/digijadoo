<template>
  <div>
    <div
      class="fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-11/12 bg-blue-500 z-10 md:w-2/3 lg:w-2/5 p-3 rounded-lg"
    >
      <div class="flex justify-between items-center">
        <svg
          @click="$emit('closeModal')"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-6 cursor-pointer"
        >
          <path
            fill-rule="evenodd"
            d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
            clip-rule="evenodd"
          />
        </svg>
        <h2>حذف بلاگ</h2>
      </div>
      <p class="my-5">آیا میخواهید این بلاگ را حذف کنید؟</p>
      <div class="md:grid grid-cols-2 gap-3">
        <div>
          <button
            @click="deleteBlogFunc"
            v-if="!loading"
            class="btn bg-green-500 w-full text-white hover:bg-green-600 mb-2 md:m-0"
          >
            بله
          </button>
          <button
            v-else
            class="btn bg-green-500 w-full text-white hover:bg-green-600"
          >
            <LoadingSpinner></LoadingSpinner>
          </button>
        </div>
        <button
          @click="$emit('closeModal')"
          class="btn bg-red-500 w-full text-white hover:bg-red-600"
        >
          خیر
        </button>
      </div>
    </div>
    <div @click="$emit('closeModal')" id="blureffect"></div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

let loading = ref(false)

let props = defineProps(['blog'])
let emit = defineEmits(['acceptDelete', 'closeModal'])

let toast = useToast()

async function deleteBlogFunc () {
  try {
    loading.value = true
    let data = await $fetch(`/api/admin/blog/deleteBlog`, {
      method: 'POST',
      headers: {
        credentials: 'include'
      },
      body: { id: props.blog }
    })
    toast.success('بلاگ شما با موفقیت حذف شد')
    emit('acceptDelete')
    emit('closeModal')
  } catch (error) {
    toast.error(error.data)
  } finally {
    loading.value = false
  }
}
</script>
