<template>
  <div>
    <NuxtLayout name="admin-panel">
      <NuxtPage
        class="lg:w-3/4 xl:w-4/5 p-5 lg:p-8 lg:absolute lg:left-0 lg:top-0 bg-purple-c min-h-screen text-black"
      />
    </NuxtLayout>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
  layoutTransition: { name: 'layout', mode: 'out-in' },
  redirect: '/admin-panel/orders',
  middleware: ['auth', 'admin-check']
})
useHead({
  titleTemplate: 'پنل مدیریت | %s'
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
