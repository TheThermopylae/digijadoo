<template>
  <div class="dropdown dropdown-bottom dropdown-end" v-if="userData">
    <div
      v-if="!userData.avatar"
      tabindex="0"
      role="button"
      class="w-12 h-12 bg-white rounded-full flex justify-center items-center hover-ring"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="size-7"
      >
        <path
          fill-rule="evenodd"
          d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <img
      v-else
      tabindex="0"
      role="button"
      :src="$config.public.API_BASE_URL + userData.avatar"
      class="w-12 h-12 rounded-full hover:ring-2 ring-purple-c transition-all cursor-pointer"
      alt="avatar"
    />
    <ul
      v-if="userData && userData.role == 'ADMIN'"
      tabindex="0"
      class="dropdown-content bg-white rounded-box z-10 w-64 p-2 shadow-lg mt-3"
    >
      <li class="flex items-center gap-3 mb-3 border-b pb-3">
        <div
          v-if="!userData.avatar"
          class="w-16 h-16 bg-white-c flex justify-center items-center rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-10"
          >
            <path
              fill-rule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <img
          v-else
          :src="$config.public.API_BASE_URL + userData.avatar"
          alt="avatar"
          class="w-16 h-16 rounded-full"
        />
        <div>
          <strong class="text-lg">{{ userData.username }}</strong>
          <span class="block">مدیر</span>
        </div>
      </li>
      <li class="mb-1">
        <NuxtLink
          class="hover:bg-purple-c hover:text-white transition-all block p-2 rounded-lg"
          to="/admin-panel/orders"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-5 inline-block ml-1"
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
      <li class="mb-1">
        <NuxtLink
          class="hover:bg-purple-c hover:text-white transition-all block p-2 rounded-lg"
          to="/admin-panel/categories/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            class="inline-block ml-1"
          >
            <path fill="currentColor" d="M5 7h13v10H2V4h7l2 2H4v9h1z" />
          </svg>
          دسته بندی ها</NuxtLink
        >
      </li>
      <li class="mb-1">
        <NuxtLink
          class="hover:bg-purple-c hover:text-white transition-all block p-2 rounded-lg"
          to="/admin-panel/products"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-5 inline-block ml-1"
          >
            <path
              d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 0 0 7.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 0 0 4.902-5.652l-1.3-1.299a1.875 1.875 0 0 0-1.325-.549H5.223Z"
            />
            <path
              fill-rule="evenodd"
              d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 0 0 9.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 0 0 2.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3Zm3-6a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-3Zm8.25-.75a.75.75 0 0 0-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-5.25a.75.75 0 0 0-.75-.75h-3Z"
              clip-rule="evenodd"
            />
          </svg>
          محصولات</NuxtLink
        >
      </li>
      <!-- <li class="mb-1">
        <NuxtLink
          class="hover:bg-purple-c hover:text-white transition-all block p-2 rounded-lg"
          to="/admin-panel/blog"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-5 inline-block ml-1"
          >
            <path
              fill-rule="evenodd"
              d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z"
              clip-rule="evenodd"
            />
            <path
              d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z"
            />
          </svg>
          وبلاگ</NuxtLink
        >
      </li> -->
      <li class="mb-1">
        <NuxtLink
          class="hover:bg-purple-c hover:text-white transition-all block p-2 rounded-lg"
          to="/user-panel/profile"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6 inline-block ml-1"
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
      <li
        class="block bg-red-500 hover:bg-red-600 rounded-lg p-2 transition-all text-white"
      >
        <button
          class="w-full flex items-start"
          @click="logout"
          :disabled="loading"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-5 inline-block ml-1"
          >
            <path
              fill-rule="evenodd"
              d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm5.03 4.72a.75.75 0 0 1 0 1.06l-1.72 1.72h10.94a.75.75 0 0 1 0 1.5H10.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06l3-3a.75.75 0 0 1 1.06 0Z"
              clip-rule="evenodd"
            />
          </svg>
          خروج از حساب
          <LoadingSpinner class="mr-2" v-if="loading"></LoadingSpinner>
        </button>
      </li>
    </ul>
    <ul
      v-else
      tabindex="0"
      class="dropdown-content bg-white rounded-box z-10 w-64 p-2 shadow-lg mt-3"
    >
      <li class="flex items-center gap-3 mb-3 border-b pb-3">
        <div
          v-if="!userData.avatar"
          class="w-16 h-16 bg-white flex justify-center items-center rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-10"
          >
            <path
              fill-rule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <img
          v-else
          :src="$config.public.API_BASE_URL + userData.avatar"
          alt="avatar"
          class="w-16 h-16 rounded-full"
        />
        <div>
          <strong class="text-lg">{{ userData.username }}</strong>
          <span class="block">کاربر</span>
        </div>
      </li>
      <li class="mb-1">
        <NuxtLink
          class="hover:bg-purple-c hover:text-white transition-all block p-2 rounded-lg"
          to="/user-panel/orders"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-5 inline-block ml-1"
          >
            <path
              d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z"
            />
          </svg>
          سفارشات
        </NuxtLink>
      </li>
      <li class="mb-1">
        <NuxtLink
          class="hover:bg-purple-c hover:text-white transition-all block p-2 rounded-lg"
          to="/user-panel/addresses"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="inline-block ml-1"
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
      <li class="mb-1">
        <NuxtLink
          class="hover:bg-purple-c hover:text-white transition-all block p-2 rounded-lg"
          to="/user-panel/profile"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6 inline-block ml-1"
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
      <li
        class="block bg-red-500 hover:bg-red-600 rounded-lg p-2 transition-all text-white"
      >
        <button
          class="w-full flex items-start"
          @click="logout"
          :disabled="loading"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-5 inline-block ml-1"
          >
            <path
              fill-rule="evenodd"
              d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm5.03 4.72a.75.75 0 0 1 0 1.06l-1.72 1.72h10.94a.75.75 0 0 1 0 1.5H10.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06l3-3a.75.75 0 0 1 1.06 0Z"
              clip-rule="evenodd"
            />
          </svg>
          خروج از حساب
          <LoadingSpinner class="mr-2" v-if="loading"></LoadingSpinner>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
let { userData } = userAuth()

let loading = ref(false)

let toast = useToast()

async function logout () {
  try {
    loading.value = true

    let data = await $fetch('/api/auth/logout')
    toast.success(data.message)
    userData.value = null
    return navigateTo('/')
  } catch (error) {
    toast.error(error.data.message)
  } finally {
    loading.value = false
  }
}
</script>
