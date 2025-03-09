<template>
  <div class="flex justify-center items-center min-h-screen flex-col bg-white-c dark:bg-dark-c dark:text-text-dark">
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
      <h1 class="text-3xl mb-5">عضویت</h1>
      <div>
        <label for="user-nickname" class="text-xl">نام کاربری</label>
        <input
          type="text"
          name="user-nickname"
          id="user-nickname"
          class="cinput set-ring mt-2 mb-4"
          v-model="userData.username"
        />
      </div>
      <div>
        <label for="user-email" class="text-xl">ایمیل</label>
        <input
          type="email"
          name="user-email"
          id="user-email"
          class="cinput set-ring mt-2 mb-4"
          v-model="userData.email"
        />
      </div>
      <div>
        <label for="phone-number" class="text-xl">شماره تلفن</label>
        <input
          type="text"
          name="phone-number"
          id="phone-number"
          class="cinput set-ring mt-2 mb-4"
          v-model="userData.phone"
        />
      </div>
      <div>
        <label for="user-code" class="text-xl">کد ملی</label>
        <input
          type="number"
          name="user-code"
          id="user-code"
          class="cinput set-ring mt-2 mb-4"
          v-model="userData.codemeli"
        />
      </div>
      <button
        v-if="!loading"
        class="btn-c transition-all p-2 rounded-lg text-white w-full"
      >
        ادامه
      </button>
      <button
        v-else
        class="btn-c transition-all p-2 rounded-lg text-white w-full flex justify-center items-center"
      >
        <LoadingSpinner></LoadingSpinner>
      </button>
      <p class="text-right mt-3">
        حساب کاربری دارید؟
        <NuxtLink to="/auth/login" class="text-purple-c underline"
          >وارد شوید</NuxtLink
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

let userData = reactive({
  username: '',
  email: '',
  phone: '',
  codemeli: ''
})

async function sendData () {
  const usernameRegex = /^[a-zA-Z0-9_]{8,16}$/

  if (
    !userData.username ||
    !userData.email ||
    !userData.phone ||
    !userData.codemeli
  )
    toast.warning('لطفا تمامی فیلد هارا پر کنید')
  else if (!usernameRegex.test(userData.username))
    toast.warning(
      'نام کاربری باید بین ۸ تا ۱۶ کاراکتر و فقط شامل حروف، اعداد و زیرخط باشد'
    )
  else {
    try {
      loading.value = true
      let data = await $fetch(`${config.public.API_BASE_URL}/auth/register`, {
        method: 'POST',
        body: userData
      })
      toast.success('کد ورود به شماره موبایل شما ارسال شد')
      emit('showCheckOtp', userData.phone)
    } catch (error) {
      if (error.data.error) toast.error('اطلاعات ارسالی نا معتبر است')
      toast.error(error.data.message)
    } finally {
      loading.value = false
    }
  }
}
</script>
