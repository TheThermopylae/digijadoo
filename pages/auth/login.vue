<template>
  <div>
    <AuthCheckOtp
      v-if="showCheckOtp"
      :phone="userPhone"
      :showText="showText"
    ></AuthCheckOtp>
    <AuthUserLogin @showCheckOtp="showCheckOtpFunc" v-else></AuthUserLogin>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
  middleware: 'logged-in'
})
useHead({
  title: 'ورود'
})

let showCheckOtp = ref(false)
let userPhone = ref('')
let showText = ref('با موفقیت وارد حساب خود شدید')

function showCheckOtpFunc (phone, text) {
  showCheckOtp.value = true
  userPhone.value = phone
}
</script>
