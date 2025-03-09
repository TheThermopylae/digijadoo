<template>
  <div>
    <NuxtLoadingIndicator
      :color="'#8c00b6'"
      :error-color="'red'"
    ></NuxtLoadingIndicator>
    <NuxtLayout>
      <div>
        <NuxtPage />
      </div>
    </NuxtLayout>
    <Transition>
      <LoadingComp class="z-10" v-if="showLoading"></LoadingComp>
    </Transition>
  </div>
</template>

<script setup>
let showLoading = ref(true)

let darkmode = ref(false)

function setDarkMode () {
  darkmode.value = true
}

function unSetDarkMode () {
  darkmode.value = false
}

provide('darkmode', darkmode)
provide('setDarkMode', setDarkMode)
provide('unSetDarkMode', unSetDarkMode)

function checkDarkModeOn () {
  if (localStorage.getItem('darkmode') == true) {
    document.querySelector('html').classList.add('dark')
    document.body.classList.add('bg-dark')
  } else {
    document.querySelector('html').classList.remove('dark')
    document.body.classList.remove('bg-dark')
  }

  darkmode.value = JSON.parse(localStorage.getItem('darkmode'))
}

watch(darkmode, () => {
  if (darkmode.value) {
    document.querySelector('html').classList.add('dark')
    localStorage.setItem('darkmode', true)
    document.body.classList.add('bg-dark-c')
  } else {
    document.querySelector('html').classList.remove('dark')
    localStorage.setItem('darkmode', false)
    document.body.classList.remove('bg-dark-c')
  }
})

useHead({
  titleTemplate: '%s | Digi Jadoo'
})
onMounted(() => {
  showLoading.value = false
  checkDarkModeOn()
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
body {
  overflow-x: hidden;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.fade-enter-active {
  animation-name: fadeIn;
  animation-duration: 0.3s;
  animation-fill-mode: both;
}
.fade-leave-active {
  animation-name: fadeOut;
  animation-duration: 0.3s;
  animation-fill-mode: both;
}
.fade-move {
  transition-timing-function: ease-in-out;
  transition-property: all;
  transition-duration: 0.3s;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

#blureffect {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 0;
  background: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  transition: 0.3s;
}
input[type='number'] {
  appearance: textfield;
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
