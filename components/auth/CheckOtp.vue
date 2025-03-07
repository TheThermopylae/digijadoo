<template>
  <div class="flex justify-center items-center h-screen flex-col bg-white-c dark:bg-dark-s dark:text-text-dark">
    <form class="w-full md:w-96 p-4 md:p-0" @submit.prevent>
      <div class="flex justify-center mb-3">
        <img src="/public/logo.png" alt="logo" class="w-40 h-40 rounded-full" />
      </div>
      <h1 class="text-3xl mb-5">بررسی کد</h1>
      <div>
        <label for="user-otp" class="text-xl">کد ورود</label>
        <input
          type="number"
          name="user-otp"
          id="user-otp"
          class="cinput set-ring my-2"
          v-model="otpCode"
        />
      </div>
      <button v-if="!loading" @click="sendData" class="btn-c text-white w-full">
        ورود
      </button>
      <button
        v-else
        class="btn-c text-white w-full flex justify-center items-center"
      >
        <LoadingSpinner></LoadingSpinner>
      </button>
    </form>
    <NuxtLink to="/" class="fixed top-5 right-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6 text-red-500"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </NuxtLink>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
useHead({
  title: 'ورود / عضویت'
})

let props = defineProps(['phone', 'showText'])

let loading = ref(false)

let toast = useToast()

let otpCode = ref('')

let { userData } = userAuth()

async function sendData () {
  if (!otpCode.value) toast.warning('کد ورود را وارد کنید')
  else {
    try {
      loading.value = true
      let data = await $fetch('/api/auth/otp', {
        method: 'POST',
        body: { otp: otpCode.value, phone: props.phone }
      })

      toast.success(props.showText)
      userData.value = data
      return navigateTo('/')
    } catch (error) {
      toast.error('مشکلی پیش آمده است. لطفا دوباره امتحان کنید')
    } finally {
      loading.value = false
    }
  }
}
</script>
