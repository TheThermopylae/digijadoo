<template>
  <div class="flex flex-col min-h-screen bg-white-c dark:bg-dark-c dark:text-text-dark">
    <ClientOnly>
      <AdminDashboardSideBar></AdminDashboardSideBar>
      <AdminDashboardTheDrawer class="lg:hidden"></AdminDashboardTheDrawer>
      <div class="flex-grow container m-auto py-5 lg:pt-5">
        <slot />
      </div>
    </ClientOnly>
  </div>
</template>
