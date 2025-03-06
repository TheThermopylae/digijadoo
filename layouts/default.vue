<template>
  <div class="flex flex-col min-h-screen bg-white-c">
    <HeaderTheHeader></HeaderTheHeader>
    <div class="flex-grow container m-auto py-5 lg:pt-5">
      <slot />
    </div>
    <TheFooter />
  </div>
</template>
