<template>
  <div>
    <NuxtLayout name="user-panel">
      <ClientOnly>
        <NuxtPage
          class="lg:w-3/4 xl:w-4/5 p-5 lg:p-8 lg:absolute bg-white-c lg:left-0 lg:top-0 min-h-screen"
        />
      </ClientOnly>
    </NuxtLayout>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
  layoutTransition: { name: 'layout', mode: 'out-in' },
  redirect: '/user-panel/orders',
  middleware: ['auth', 'user-check']
})
useHead({
  titleTemplate: 'پنل کاربری | %s'
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
</style>
