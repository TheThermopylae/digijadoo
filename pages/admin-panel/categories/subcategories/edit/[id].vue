<template>
  <div>
    <h1 class="text-2xl xl:text-3xl mb-5" v-if="targetSubCategory">
      ویرایش زیر دسته بندی ({{ targetSubCategory.subcategory.name }})
    </h1>
    <form @submit.prevent="editSubCategoryFunc" enctype="multipart/form-data">
      <div class="my-2 grid grid-cols-2 gap-5">
        <div>
          <label for="category-name">نام زیر دسته بندی</label>
          <input
            type="text"
            class="cinput set-ring mt-3"
            id="category-name"
            v-model="subCategoryData.name"
          />
        </div>
        <div>
          <label for="category-link">لینک زیر دسته بندی</label>
          <input
            type="text"
            class="cinput set-ring mt-3"
            id="category-link"
            v-model="subCategoryData.href"
          />
        </div>
      </div>
      <div>
        <label for="category-des">توضیح زیر دسته بندی</label>
        <textarea
          id="category-des"
          class="w-full mt-3 set-ring rounded-lg outline-none p-2 border"
          rows="5"
          v-model="subCategoryData.description"
        ></textarea>
      </div>
      <div class="mt-2">
        <label for="category-images">تصویر زیر دسته بندی</label>
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
        alt="تصویر زیر دسته بندی"
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
        افزودن زیر دسته بندی
      </button>
      <button class="btn-c h-12 w-42 flex gap-2 items-center" v-else="!loading">
        <LoadingSpinner></LoadingSpinner>
      </button>
    </form>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

let route = useRoute()

let { data: targetSubCategory } = await useFetch(
  '/api/admin/categories/getSubCategoryForm',
  {
    method: 'POST',
    body: { categoryid: route.query.categoryid, subId: route.params.id },
    haeders: {
      credentials: 'include'
    }
  }
)

console.log(targetSubCategory.value);


let subCategoryData = ref({
  name: targetSubCategory.value?.subcategory.name,
  description: targetSubCategory?.value.subcategory.description,
  href: targetSubCategory.value?.subcategory.href,
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
    subCategoryData.value.image = file
  }
}

async function editSubCategoryFunc () {
  if (
    !subCategoryData.value.name ||
    !subCategoryData.value.href ||
    !subCategoryData.value.description ||
    !subCategoryData.value.image
  )
    toast.error('تمامی فیلد هارا پر کنید')
  else {
    try {
      loading.value = true
      let formData = new FormData()

      formData.append('name', subCategoryData.value.name)
      formData.append('href', subCategoryData.value.href)
      formData.append('description', subCategoryData.value.description)
      formData.append('subId', route.params.id)
      formData.append('image', subCategoryData.value.image)

      let data = await $fetch('/api/admin/categories/editSubCategory', {
        method: 'POST',
        headers: {
          credentials: 'include'
        },
        body: formData
      })

      toast.success('زیر دسته بندی با موفقیت ویرایش شد')
      return navigateTo('/admin-panel/categories')
    } catch (error) {
      toast.error(error.data.message)
    } finally {
      loading.value = false
    }
  }
}

useHead({
  title:`ویرایش زیر دسته بندی (${subCategoryData.value.name})`
})
</script>
