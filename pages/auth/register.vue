<template>
  <div>
    <AuthCheckOtp
      v-if="showCheckOtp"
      :phone="userPhone"
      :showText="showText"
    ></AuthCheckOtp>
    <AuthUserRegister
      @showCheckOtp="showCheckOtpFunc"
      v-else
    ></AuthUserRegister>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
  middleware: 'logged-in'
})
useHead({
  title: 'عضویت'
})

let showCheckOtp = ref(false)
let userPhone = ref('')

let showText = ref('حساب شما با موفقیت ساخته شد')

function showCheckOtpFunc (phone) {
  showCheckOtp.value = true
  userPhone.value = phone
}
</script>
