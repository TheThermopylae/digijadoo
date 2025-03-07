<template>
  <div class="flex flex-col min-h-screen bg-white-c dark:bg-dark-c dark:text-text-dark">
    <ClientOnly>
      <div class="flex-grow container m-auto py-5 lg:pt-5">
        <UserDashboardSideBar></UserDashboardSideBar>
        <UserDashboardTheDrawer class="lg:hidden"></UserDashboardTheDrawer>
        <slot />
      </div>
    </ClientOnly>
  </div>
</template>
