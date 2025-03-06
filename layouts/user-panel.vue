<template>
  <div>
    <UserDashboardSideBar></UserDashboardSideBar>
    <UserDashboardTheDrawer class="lg:hidden"></UserDashboardTheDrawer>
    <div>
      <slot></slot>
    </div>
  </div>
</template>