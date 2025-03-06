<template>
  <div>
    <ClientOnly>
      <div>
        <AdminDashboardSideBar></AdminDashboardSideBar>
        <AdminDashboardTheDrawer class="lg:hidden"></AdminDashboardTheDrawer>
        <slot></slot>
      </div>
    </ClientOnly>
  </div>
</template>
