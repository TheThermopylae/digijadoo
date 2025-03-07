<template>
  <tr class="last:border-0 dark:border-b-dark">
    <td class="flex items-center p-0">
      <div class="md:flex items-center">
        <img
          :src="`${config.public.API_BASE_URL}${props.product.images[0]}`"
          class="w-16 h-16"
          alt=""
        />
        <h4 class="text-[10px] lg:text-sm">{{ props.product.title }}</h4>
      </div>
    </td>
    <td>{{ props.product._id }}</td>
    <td>{{ props.product.price.toLocaleString() }} تومان</td>
    <td>
      <div
        class="w-8 h-8 rounded-full m-auto border border-gray-300 dark:border-b-dark"
        :style="{ backgroundColor: props.product.color }"
      ></div>
    </td>
    <td>{{ props.product.categoryid.name }}</td>
    <td class="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6 cursor-pointer text-left absolute left-0 hover:bg-gray-100 dark:hover:bg-dark-c transition-all rounded-full"
        @click="showMenu = true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>
      <Transition>
        <div
          v-if="showMenu"
          class="w-52 bg-gray-200 dark:bg-dark-c absolute left-1/2 bottom-0 p-2 rounded-lg z-10"
        >
          <nuxtLink
            :to="`/admin-panel/products/${props.product._id}`"
            class="block w-full text-right hover:bg-gray-300 hover:dark:bg-dark-s transition-all py-1 px-1.5 rounded-lg"
          >
            ویرایش محصول
          </nuxtLink>
          <div>
            <button
              :disabled="loading"
              class="block w-full text-right hover:bg-red-500 hover:text-white transition-all py-1 px-1.5 rounded-lg"
              @click="deleteProduct"
            >
              حذف محصول
              <LoadingSpinner
                v-if="loading"
                class="w-2.5 h-2.5 mr-1"
              ></LoadingSpinner>
            </button>
          </div>
          <button
            class="block w-full text-right hover:bg-gray-300 hover:dark:bg-dark-s transition-all rounded-lg py-1 px-1.5"
            @click="showMenu = false"
          >
            بستن
          </button>
        </div>
      </Transition>
    </td>
  </tr>
</template>

<script setup>
import { useToast } from 'vue-toastification'

let config = useRuntimeConfig()
let showMenu = ref(false)

let props = defineProps(['product'])

let emit = defineEmits(['deletedProduct'])

let loading = ref(false)

let toast = useToast()

async function deleteProduct () {
  loading.value = true

  try {
    let data = await $fetch('/api/admin/products/removeProduct', {
      method: 'POST',
      headers: {
        credentials: 'include'
      },
      body: props.product
    })

    emit('deletedProduct')
    toast.success('محصول مورد نظر شما حذف شد')
  } catch (error) {
    toast.error(error.data.message)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
td {
  text-align: center;
}
</style>
