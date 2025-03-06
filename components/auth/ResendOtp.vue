<template>
  <div class="mb-4 flex items-end justify-between relative">
    <p>ارسال دوباره کد ورود</p>
    <div>
      <vue-countdown
        v-if="showTimer"
        @end="showTimer = false"
        :transform="transformSlotProps"
        :time="60 * 1000"
        v-slot="{ minutes, seconds }"
      >
        {{ seconds }} : {{ minutes }}
      </vue-countdown>
      <button v-else-if="!showTimer && !loading" @click="resendOtp">
        ارسال دوباره
      </button>
      <LoadingSpinner v-else class="w-5 absolute left-0 top-0"></LoadingSpinner>
    </div>
  </div>
</template>

<script setup>
import VueCountdown from '@chenfengyuan/vue-countdown'
import { useToast } from 'vue-toastification'

let props = defineProps(['phone'])

let showTimer = ref(true)

function transformSlotProps (props) {
  const formattedProps = {}

  Object.entries(props).forEach(([key, value]) => {
    formattedProps[key] = value < 10 ? `0${value}` : String(value)
  })

  return formattedProps
}

let config = useRuntimeConfig()

let toast = useToast()
let loading = ref(false)

async function resendOtp () {
  loading.value = true
  try {
    let data = await $fetch(`${config.public.API_BASE_URL}/auth/login`, {
      method: 'POST',
      body: { phone: props.phone }
    })

    toast.success('کد ورود دوباره برای شما ارسال شد')
  } catch (error) {
    toast.error(error.data.message)
  } finally {
    loading.value = false
    showTimer.value = true
  }
}
</script>
