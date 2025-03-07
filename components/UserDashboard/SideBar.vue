<template>
  <div
    class="hidden lg:block w-1/4 xl:w-1/5 fixed h-full top-0 right-0 bg-white dark:bg-dark-s"
  >
    <div class="flex justify-between items-center text-2xl pl-4">
      <NuxtLink to="/">
        <img src="/logo.png" alt="logo" class="w-20" />
      </NuxtLink>
      <h4>پنل کاربری</h4>
    </div>
    <ul class="min-h-full w-full p-4">
      <li class="mb-3 flex items-center gap-5 border-b border-gray-300 pb-3">
        <img
          :src="
            userData.avatar
              ? $config.public.API_BASE_URL + userData.avatar
              : '/profile.png'
          "
          alt="avatar"
          class="w-14 h-14 rounded-full"
        />
        <h4 class="text-xl">{{ userData.username }}</h4>
      </li>
      <li class="mb-2 border-gray-300">
        <NuxtLink
          to="/user-panel/orders"
          class="block p-2 rounded-lg transition-all hover:bg-[#8c00b6] hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
              clip-rule="evenodd"
            />
          </svg>
          سفارشات
        </NuxtLink>
      </li>
      <li class="mb-2 border-gray-300">
        <NuxtLink
          to="/user-panel/addresses"
          class="block p-2 rounded-lg transition-all hover:bg-[#8c00b6] hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M7 2a2 2 0 0 0-2 2v1a1 1 0 0 0 0 2v1a1 1 0 0 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm3 8a3 3 0 1 1 6 0a3 3 0 0 1-6 0m-1 7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1"
              clip-rule="evenodd"
            />
          </svg>
          آدرس ها
        </NuxtLink>
      </li>
      <li class="mb-2 border-gray-300">
        <NuxtLink
          to="/user-panel/profile"
          class="block p-2 rounded-lg transition-all hover:bg-[#8c00b6] hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clip-rule="evenodd"
            />
          </svg>
          پروفایل
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
let { userData } = userAuth()
</script>

<style scoped>
ul li svg {
  display: inline-block;
  margin-left: 5px;
}
ul li .router-link-active {
  background: #8c00b6;
  color: #fff;
}
</style>
