<template>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="text-2xl">دسته بندی ها</h1>
      <NuxtLink to="/admin-panel/categories/add-categories-page" class="btn-c">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 inline-block"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        افزودن دسته بندی
      </NuxtLink>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-5 mt-5" v-if="categories && categories.categories.length > 0">
      <AdminDashboardCategoryCardDash
        v-for="item in categories.categories"
        :category="item"
        @showDeleteModal="showDeleteModalFunc(item)"
      ></AdminDashboardCategoryCardDash>
    </div>
    <p v-else class="text-gray-600 dark:text-gray-400 text-center">دسته بندی وجود ندارد</p>
    <Transition>
      <AdminDashboardDeleteCategoryModal
        :category="targetCategory"
        @acceptDelete="refresh"
        @closeModal="showDeleteModal = false"
        v-if="showDeleteModal"
      ></AdminDashboardDeleteCategoryModal>
    </Transition>
    <Transition>
      <AdminDashboardDeleteSubCategoryModal
        v-if="showDeleteSubCatModal"
        @closeModal="showDeleteSubCatModal = false"
        :data="categorySubCategoryId"
        @acceptDelete="refresh"
      >
      </AdminDashboardDeleteSubCategoryModal>
    </Transition>
  </div>
</template>

<script setup>
let { data: categories, refresh } = await useAsyncData(() =>
  $fetch('/api/admin/categories/getCategory')
)

let showDeleteModal = ref(false)
let targetCategory = ref('')

let showDeleteModalFunc = item => {
  showDeleteModal.value = true
  targetCategory.value = item
}

useHead({
  title: 'دسته بندی ها'
})

let showDeleteSubCatModal = ref(false)

let categorySubCategoryId = ref('')

function showDeleteSubCatFunc (categoryid, subcategoryid) {
  categorySubCategoryId.value = [categoryid, subcategoryid]
  showDeleteSubCatModal.value = true
}
</script>
