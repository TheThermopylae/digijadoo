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
    <div
      class="mt-5 border-b border-b-purple-c pb-4"
      v-if="categories && categories.categories.length > 0"
      v-for="item in categories.categories"
      :key="item._id"
    >
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5"
      >
        <AdminDashboardCategoryCardDash
          :category="item"
          @showDeleteModal="showDeleteModalFunc(item)"
        ></AdminDashboardCategoryCardDash>
      </div>
      <h4 v-if="item.subcategories.length > 0" class="my-4 text-xl">
        زیر دسته بندی های {{ item.name }}
      </h4>
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5"
      >
        <AdminDashboardSubCategoryCardDash
          class=""
          v-for="subCat in item.subcategories"
          :subcategory="subCat"
          :categoryid="item._id"
          :key="subCat._id"
          @showDeleteSubCatModal="showDeleteSubCatFunc(item._id, subCat._id)"
        ></AdminDashboardSubCategoryCardDash>
      </div>
    </div>
    <p v-else class="text-center text-gray-600">دسته بندی وجود ندارد</p>
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
