<template>
  <div>
    <h1 class="text-2xl xl:text-3xl mb-5">افزودن دسته بندی</h1>
    <form @submit.prevent="addCategoryFunc" enctype="multipart/form-data">
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
          name="images"
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
      <button
        class="btn-c h-12 w-42 flex gap-2 items-center"
        @click=""
        v-if="!loading"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        افزودن دسته بندی
      </button>
      <button class="btn-c h-12 w-42 flex gap-2 items-center" v-else="!loading">
        <LoadingSpinner></LoadingSpinner>
      </button>
    </form>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

useHead({
  title:'افزودن دسته بندی'
})

let categoryData = ref({
  name: '',
  description: '',
  href: '',
  image: ''
})

let showImage = ref('')

let loading = ref(false)

let toast = useToast()

function handleImageUpload (event) {
  const files = event.target.files

  const file = files[0]
  if (file) {
    const imageUrl = URL.createObjectURL(file)
    showImage.value = imageUrl
    categoryData.value.image = file
  }
}

async function addCategoryFunc () {
  if (
    !categoryData.value.name ||
    !categoryData.value.href ||
    !categoryData.value.description ||
    !categoryData.value.image
  )
    toast.error('تمامی فیلد هارا پر کنید')
  else {
    try {
      loading.value = true
      let formData = new FormData()

      formData.append('name', categoryData.value.name)
      formData.append('href', categoryData.value.href)
      formData.append('description', categoryData.value.description)
      formData.append('image', categoryData.value.image)

      let data = await $fetch('/api/admin/categories/addCategory', {
        method: 'POST',
        headers: {
          credentials: 'include'
        },
        body: formData
      })

      toast.success('دسته بندی با موفقیت اضافه شد')
      return navigateTo('/admin-panel/categories')
    } catch (error) {
      toast.error('مشکلی پیش آمده لطفا دوباره تلاش کنید')
    } finally {
      loading.value = false
    }
  }
}
</script>
