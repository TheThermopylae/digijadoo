<template>
  <header class="drawer lg:container m-auto lg:mt-5">
    <input
      id="my-drawer-3"
      type="checkbox"
      class="drawer-toggle"
      ref="drawerCheckbox"
    />
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div
        class="navbar bg-white dark:bg-dark-s m-auto lg:rounded-xl transition-all shadow py-0"
      >
        <div class="flex-none lg:hidden">
          <label
            for="my-drawer-3"
            aria-label="open sidebar"
            class="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block h-6 w-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div
          class="mx-2 flex-1 px-2 gap10 justify-between lg:justify-start mr-0"
        >
          <nuxtLink class="text-2xl" to="/">
            <img src="../../public/logo.png" class="w-20 h-20" alt="" />
          </nuxtLink>
          <div class="flex items-center lg:hidden">
            <div
            @click="setDarkMode"
            v-if="!darkmode"
            class="w-12 h-12 bg-white-c dark:bg-dark-c mr-3 flex justify-center items-center hover:ring-2 ring-purple-c transition-all cursor-pointer rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div
            @click="unSetDarkMode"
            v-else
            class="w-12 h-12 bg-white-c dark:bg-dark-c mr-3 flex justify-center items-center hover:ring-2 ring-purple-c transition-all cursor-pointer rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
            >
              <path
                d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z"
              />
            </svg>
          </div>
            <NuxtLink to="/user-cart">
              <div
                v-if="userData"
                class="w-12 h-12 bg-white-c dark:bg-dark-c mx-3 flex items-center justify-center rounded-full hover:ring-2 ring-purple-c transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-7"
                >
                  <path
                    d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                  />
                </svg>
              </div>
            </NuxtLink>
            <HeaderDropDown v-if="userData"></HeaderDropDown>
            <NuxtLink
              v-else
              to="/auth/login"
              class="w-12 h-12 bg-white-c dark:bg-dark-c rounded-full flex justify-center items-center hover:ring-2 ring-purple-c transition-all mr-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M13 21q-.425 0-.712-.288T12 20t.288-.712T13 19h6V5h-6q-.425 0-.712-.288T12 4t.288-.712T13 3h6q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm-1.825-8H4q-.425 0-.712-.288T3 12t.288-.712T4 11h7.175L9.3 9.125q-.275-.275-.275-.675t.275-.7t.7-.313t.725.288L14.3 11.3q.3.3.3.7t-.3.7l-3.575 3.575q-.3.3-.712.288T9.3 16.25q-.275-.3-.262-.712t.287-.688z"
                />
              </svg>
            </NuxtLink>
          </div>
          <ul class="gap-3 hidden lg:flex">
            <li>
              <div class="dropdown dropdown-hover z-10">
                <div
                  tabindex="0"
                  role="button"
                  class="hover:text-purple-c transition-all"
                >
                  دسته بندی ها
                </div>
                <ul
                  v-if="categories"
                  tabindex="0"
                  class="dropdown-content bg-white dark:bg-dark-s rounded-box z-[1] w-52 max-h-[330px] overflow-auto p-2 shadow flex flex-col justify-between"
                >
                  <li
                    v-for="item in categories"
                    :key="item._id"
                    class="hover:bg-purple-c p-2 rounded-lg hover:text-white transition-all"
                  >
                    <!-- Category Links -->
                    <NuxtLink
                      class="block"
                      :to="{
                        path: '/products',
                        query: { ...route.query, category: item._id }
                      }"
                    >
                      {{ item.name }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <nuxtLink
                active-class="text-purple-c"
                :to="{ path: '/products' }"
                class="hover:text-purple-c px-3 py-2 rounded-lg transition-all"
                >فروشگاه</nuxtLink
              >
            </li>
            <li>
              <nuxtLink
                active-class="text-purple-c"
                :to="{ path: '/blogs' }"
                class="hover:text-purple-c px-3 py-2 rounded-lg transition-all"
                >بلاگ</nuxtLink
              >
            </li>
            <li>
              <nuxtLink
                active-class="text-purple-c"
                to="/contact-me"
                class="hover:text-purple-c px-3 py-2 rounded-lg transition-all"
                >ارتباط با ما</nuxtLink
              >
            </li>
            <li>
              <nuxtLink
                active-class="text-purple-c"
                to="/about-me"
                class="hover:text-purple-c px-3 py-2 rounded-lg transition-all"
                >درباره ما</nuxtLink
              >
            </li>
          </ul>
        </div>
        <div class="hidden flex-none lg:flex items-center">
          <!-- Search Input -->
          <div class="relative">
            <input
              @keyup.enter="searchHandler"
              v-model="searchValue"
              type="text"
              class="set-ring h-12 p-3 xl:w-72 bg-white"
              placeholder="دنبال چی میگردی؟"
            />
            <svg
              @click="searchHandler"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-5 absolute top-1/2 -translate-y-1/2 left-3 cursor-pointer"
            >
              <path
                fill-rule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <!-- dark light -->
          <div
            @click="setDarkMode"
            v-if="!darkmode"
            class="w-12 h-12 bg-white-c dark:bg-dark-c mr-3 flex justify-center items-center hover:ring-2 ring-purple-c transition-all cursor-pointer rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div
            @click="unSetDarkMode"
            v-else
            class="w-12 h-12 bg-white-c dark:bg-dark-c mr-3 flex justify-center items-center hover:ring-2 ring-purple-c transition-all cursor-pointer rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
            >
              <path
                d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z"
              />
            </svg>
          </div>
          <NuxtLink to="/user-cart">
            <div
              v-if="userData"
              class="w-12 h-12 bg-white-c dark:bg-dark-c mx-3 flex items-center justify-center rounded-full hover:ring-2 ring-purple-c transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-7"
              >
                <path
                  d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                />
              </svg>
            </div>
          </NuxtLink>
          <HeaderDropDown v-if="userData"></HeaderDropDown>
          <NuxtLink
            v-else
            to="/auth/login"
            class="w-12 h-12 bg-white-c dark:bg-dark-c rounded-full flex justify-center items-center hover:ring-2 ring-purple-c transition-all mr-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M13 21q-.425 0-.712-.288T12 20t.288-.712T13 19h6V5h-6q-.425 0-.712-.288T12 4t.288-.712T13 3h6q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm-1.825-8H4q-.425 0-.712-.288T3 12t.288-.712T4 11h7.175L9.3 9.125q-.275-.275-.275-.675t.275-.7t.7-.313t.725.288L14.3 11.3q.3.3.3.7t-.3.7l-3.575 3.575q-.3.3-.712.288T9.3 16.25q-.275-.3-.262-.712t.287-.688z"
              />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="drawer-side z-10">
      <label
        for="my-drawer-3"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="bg-white-c dark:bg-dark-s min-h-full w-80 p-5 z-10">
        <li class="mb-3">
          <svg
            @click="closeDrawer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </li>
        <li>
          <div class="relative">
            <input
              type="text"
              id="search-product"
              v-model="searchValue"
              class="w-full p-2 set-ring bg-white"
              placeholder="دنبال چی میگردی؟"
              @keyup.enter="searchHandler"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 absolute left-2 top-1/2 -translate-y-1/2"
              @click="searchHandler"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
        </li>
        <li>
          <ul
            class="menu bg-bse-200 rounded-box w-full mt-4 mb-2.5 text-[16px]"
          >
            <li>
              <details>
                <summary>دسته بندی ها</summary>
                <ul>
                  <li v-for="item in categories" :key="item._id">
                    <NuxtLink
                      @click="closeDrawer"
                      class="block"
                      :to="{
                        path: '/products',
                        query: { ...route.query, category: item._id }
                      }"
                      >{{ item.name }}</NuxtLink
                    >
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </li>
        <li class="pr-6">
          <NuxtLink @click="closeDrawer" to="/products">فروشگاه</NuxtLink>
        </li>
        <li class="pr-6 mt-6">
          <NuxtLink @click="closeDrawer" to="/blogs">بلاگ</NuxtLink>
        </li>
        <li class="pr-6 mt-6">
          <NuxtLink @click="closeDrawer" to="/contact-me"
            >ارتباط با ما</NuxtLink
          >
        </li>
        <li class="pr-6 mt-6">
          <NuxtLink @click="closeDrawer" to="/about-me">درباره ما</NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
let route = useRoute()
let router = useRouter()

let { userData } = userAuth()

let searchValue = ref('')

function searchHandler () {
  let quereis = { ...route.query }

  if (searchValue.value) {
    if (quereis.sort) delete quereis.sort

    router.push({
      query: {},
      path: '/products',
      query: { ...quereis, title: searchValue.value }
    })
  } else {
    if (route.path == '/products') {
      router.push({
        path: route.path,
        query: { sort: 'newest' }
      })
    }
  }
  searchValue.value = ''
  closeDrawer()
}

const drawerCheckbox = ref(null)

const closeDrawer = () => {
  if (drawerCheckbox.value) {
    drawerCheckbox.value.checked = false
  }
}
let props = defineProps(['categories'])

let darkmode = inject('darkmode')
let setDarkMode = inject('setDarkMode')
let unSetDarkMode = inject('unSetDarkMode')
</script>
