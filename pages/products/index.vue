<template>
  <div>
    <div
      v-if="
        (route.query.title || route.query.category) &&
        products &&
        !searchPending
      "
    >
      <p class="text-2xl mb-2">نتایج جست و جو</p>
      <div v-if="slicedSearchProducts.length > 0">
        <p>محصولات یافت شده : {{ products.products.length }} محصول</p>
        <CategorySlider class="mt-7"></CategorySlider>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-5">
          <ProductCard
            v-for="item in slicedSearchProducts"
            :data="item"
            :key="item._id"
          />
        </div>
        <button
          @click="selectShowSearchProducts += 12"
          v-if="
            selectShowSearchProducts < products.products.length &&
            products.products.length > 0
          "
          class="m-auto block mt-5 btn-c"
        >
          بارگزاری بیشتر
        </button>
      </div>
      <div v-else>
        <CategorySlider class="mt-7"></CategorySlider>
        <p class="text-center text-lg dark:text-white-dark">محصولی یافت نشد!</p>
      </div>
    </div>
    <div
      v-else
      class="flex flex-col lg:flex-row items-end justify-between lg:items-start gap-5"
    >
      <SortMenu class="lg:hidden" @changeType="setQuery" />
      <SortProducts class="w-1/4" @changeType="setQuery" />
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5 lg:w-3/4">
        <ProductCard
          v-for="item in slicedFilterProducts"
          :data="item"
          :key="item._id"
        />
      </div>
      <p
        v-if="filterProducts.length == 0"
        class="absolute left-1/2 -translate-x-1/2 text-xl"
      >
        محصولی یافت نشد!
      </p>
    </div>
    <button
      @click="selectShowFilterProducts += 12"
      v-if="
        selectShowFilterProducts < filterProducts.length &&
        !route.query.title &&
        filterProducts.length > 0
      "
      class="m-auto block mt-5 btn-c"
    >
      بارگزاری بیشتر
    </button>
    <Transition>
      <div
        v-if="filterPending || searchPending"
        class="fixed bg-white dark:bg-dark-c z-10 w-full h-full top-0 right-0 flex justify-center items-center"
      >
        <LoadingSpinner class="w-16 h-16 text-purple-c text-center" />
      </div>
    </Transition>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()

useHead({
  title: route.query.title
    ? `جست و جوی محصول ${route.query.title}`
    : route.query.category
    ? `جست و جوی محصولات دسته بندی`
    : 'محصولات'
})

watch(route, () => {
  if (route.query.title || route.query.category)
    useHead({
      title: `جست و جوی محصول "${Object.values(route.query)[0]}"`
    })
  else
    useHead({
      title: 'محصولات'
    })
})

const {
  data: products,
  refresh: refreshSearch,
  pending: searchPending
} = await useAsyncData('products', () =>
  $fetch(`${config.public.API_BASE_URL}/search`, {
    query: route.query
  })
)

let selectShowSearchProducts = ref(12)

let slicedSearchProducts = computed(() => {
  return products.value.products.slice(0, selectShowSearchProducts.value)
})

const {
  data: filterProducts,
  refresh: refreshFilter,
  pending: filterPending
} = await useAsyncData('filterProducts', () =>
  !route.query.title
    ? $fetch(`${config.public.API_BASE_URL}/filterProduct`, {
        params: route.query
      })
    : Promise.resolve([])
)

let selectShowFilterProducts = ref(12)

let slicedFilterProducts = computed(() =>
  filterProducts.value.slice(0, selectShowFilterProducts.value)
)

function setQuery (item) {
  router.push({ path: '/products', query: { sort: item } })
}

// watch(
//   () => route.query,
//   (newQuery, oldQuery) => {
//     if (newQuery.title && newQuery.title !== oldQuery.title) {
//       refreshSearch()
//     } else if (newQuery.category && newQuery.category !== oldQuery.category) {
//       refreshSearch() // حالا برای category هم رفرش انجام می‌شود
//     } else if (!newQuery.title && newQuery.sort !== oldQuery.sort) {
//       refreshFilter()
//     }
//   },
//   { deep: true }
// )
watch(
  () => route.query,
  (newQuery, oldQuery) => {
    if (
      newQuery.title !== oldQuery.title ||
      newQuery.category !== oldQuery.category
    ) {
      refreshSearch()
    }
    if (newQuery.sort !== oldQuery.sort) {
      refreshFilter()
    }
  },
  { deep: true }
)
</script>
