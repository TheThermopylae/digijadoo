<template>
  <div class="flex justify-center items-center h-screen flex-col bg-white-c dark:bg-dark-s dark:text-text-dark">
    <form class="w-full md:w-96 p-4 md:p-0" @submit.prevent="sendData">
      <div class="flex justify-center mb-3">
        <NuxtLink to="/">
          <img
            src="/public/logo.png"
            alt="logo"
            class="w-40 h-40 rounded-full"
          />
        </NuxtLink>
      </div>
      <h1 class="text-3xl mb-5">ورود به حساب</h1>
      <div>
        <label for="phone-number" class="text-xl">شماره تلفن</label>
        <input
          type="text"
          name="phone-number"
          id="phone-number"
          class="cinput set-ring mt-2 mb-4"
          v-model="phone"
        />
      </div>
      <button v-if="!loading" class="btn-c text-white w-full">ادامه</button>
      <button
        v-else
        class="btn-c text-white w-full flex justify-center items-center"
      >
        <LoadingSpinner></LoadingSpinner>
      </button>
      <p class="text-right mt-3">
        حساب کاربری ندارید؟
        <NuxtLink to="/auth/register" class="text-purple-c underline"
          >یکی بسازید</NuxtLink
        >
      </p>
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

let config = useRuntimeConfig()

let loading = ref(false)
let emit = defineEmits(['showCheckOtp'])

let toast = useToast()

let phone = ref('')

async function sendData () {
  if (!phone.value) toast.warning('لطفا شماره تلفن خود را وارد کنید')
  else {
    try {
      loading.value = true

      let data = await $fetch(`${config.public.API_BASE_URL}/auth/login`, {
        method: 'POST',
        body: { phone: phone.value }
      })

      toast.success('کد ورود به شماره موبایل شما ارسال شد')
      emit('showCheckOtp', phone.value)
    } catch (error) {
      if (error.data.error) toast.error('اطلاعات ارسالی نا معتبر است')
      toast.error(error.data.message)
    } finally {
      loading.value = false
    }
  }
}
</script>
