<template>
  <div>
    <h1 class="text-2xl xl:text-3xl mb-5">
      ویرایش دسته بندی "{{ category.category.name }}"
    </h1>
    <form @submit.prevent="editCategoryFunc">
      <div class="my-2 grid grid-cols-2 gap-5">
        <div>
          <label for="category-name">نام دسته بندی</label>
          <input
            type="text"
            class="cinput set-ring mt-3"
            id="category-name"
            v-model="categoryData.name"
          />
        </div>
        <div>
          <label for="category-link">لینک دسته بندی</label>
          <input
            type="text"
            class="cinput set-ring mt-3"
            id="category-link"
            v-model="categoryData.href"
          />
        </div>
      </div>
      <div>
        <label for="category-des">توضیح دسته بندی</label>
        <textarea
          id="category-des"
          class="w-full mt-3 set-ring rounded-lg outline-none p-2 border bg-white dark:bg-dark-s dark:border-b-dark"
          rows="5"
          v-model="categoryData.description"
        ></textarea>
      </div>
      <div class="mt-2">
        <label for="category-images">تصویر دسته بندی</label>
        <input
          id="category-images"
          accept="image/*"
          type="file"
          class="file-input file-input-ghost w-full max-w-xs my-4 block border border-purple-c"
          @change="handleImageUpload"
        />
      </div>
      <img
        v-if="showImage"
        :src="showImage"
        class="rounded-full my-4 w-40 h-40"
        alt="تصویر دسته بندی"
      />
      <button class="btn-c h-12 w-42 flex gap-2 items-center" v-if="!loading">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-6"
        >
          <path
            d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z"
          />
        </svg>
        ویرایش دسته بندی
      </button>
      <button
        class="btn-c h-12 w-42 flex gap-2 items-center justify-center"
        v-else="!loading"
      >
        <LoadingSpinner></LoadingSpinner>
      </button>
    </form>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

let route = useRoute()

let category = await $fetch('/api/admin/categories/getCategoryForm', {
  headers: {
    credentials: 'include'
  },
  method: 'POST',
  body: { id: route.params.id }
})

let showImage = ref('')

let categoryData = reactive({
  name: category.category.name,
  description: category.category.description,
  href: category.category.href,
  image: null,
  categoryid: route.params.id
})

let loading = ref(false)

let toast = useToast()

function handleImageUpload (event) {
  const file = event.target.files[0]

  showImage.value = URL.createObjectURL(file)
  categoryData.image = file
}

async function editCategoryFunc () {
  if (
    !categoryData.name ||
    !categoryData.href ||
    !categoryData.description ||
    !categoryData.image
  )
    toast.warning('تمامی فیلد هارا پر کنید')
  else {
    try {
      loading.value = true

      let formData = new FormData()

      formData.append('name', categoryData.name)
      formData.append('description', categoryData.description)
      formData.append('href', categoryData.href)
      formData.append('categoryid', route.params.id)
      formData.append('image', categoryData.image)

      let data = await $fetch('/api/admin/categories/editCategory', {
        method: 'POST',
        headers: {
          credentials: 'include'
        },
        body: formData
      })

      toast.success('دسته بندی با موفقیت ویرایش  شد')
      return navigateTo('/admin-panel/categories')
    } catch (error) {
      let errorMessage =
        error?.data?.message || 'مشکلی پیش آمد، دوباره امتحان کنید'
      toast.error(errorMessage)
    } finally {
      loading.value = false
    }
  }
}

useHead({
  title: `ویرایش دسته بندی ${categoryData.name}`
})
</script>
