<template>
  <div>
    <div class="mb-5">
      <h1 class="text-3xl">محصول جدید</h1>
      <p class="mt-3">محصول جدید و اطلاعات آن را اضافه کنید</p>
    </div>
    <div>
      <form @submit.prevent="addProductFunc">
        <div class="grid grid-cols-2 gap-5 mt-4">
          <div>
            <label for="product-title">عنوان محصول</label>
            <input
              type="text"
              id="product-title"
              class="cinput set-ring mt-2"
              v-model="productData.title"
            />
          </div>
          <div>
            <label for="product-price">قیمت محصول</label>
            <input
              type="number"
              id="product-price"
              class="cinput set-ring mt-2"
              v-model="productData.price"
            />
          </div>
          <div>
            <label for="product-color">رنگ محصول</label>
            <input
              type="color"
              id="product-color"
              class="w-full set-ring mt-2"
              v-model="productData.color"
            />
          </div>
          <div>
            <label for="add-product-category">دسته بندی</label>
            <select
              v-if="categories"
              id="add-product-category"
              v-model="productData.categoryid"
              class="w-full rounded-lg set-ring p-2 mt-2 border bg-white"
            >
              <option
                v-for="item in categories.categories"
                :value="item._id"
                :key="item._id"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <label for="product-shortdes">توضیح کوتاه</label>
          <textarea
            id="product-shortdes"
            class="w-full my-2 set-ring rounded-lg outline-none p-2 border bg-white dark:bg-dark-s dark:border-b-dark" 
            rows="5"
            v-model="productData.Shortdescription"
          ></textarea>
        </div>
        <div>
          <h2>توضیح بلند کالا</h2>
          <AdminDashboardAddProductDes
            @editorContent="setEditorContent"
          ></AdminDashboardAddProductDes>
        </div>
        <div>
          <label for="product-images">تصاویر</label>
          <input
            id="product-images"
            name="image"
            accept="image/*"
            type="file"
            class="file-input file-input-ghost w-full max-w-xs my-4 block border border-purple-c"
            @change="handleImageUpload"
            multiple
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-3">
          <div v-for="(item, index) in showImages" class="relative">
            <img
              class="w-full rounded-lg"
              :key="index"
              :src="item"
              :alt="'تصویر' + index"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 absolute cursor-pointer text-red-500 top-3 left-3"
              @click="removeImage(index)"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <button
          v-if="!loading"
          class="btn-c px-4 py-3 h-12 w-36 flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6 inline-block"
          >
            <path
              fill-rule="evenodd"
              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
              clip-rule="evenodd"
            />
          </svg>
          افزودن جدید
        </button>
        <button
          v-else
          class="btn-c px-4 py-3 h-12 w-36 flex items-center justify-center"
          :disabled="loading"
        >
          <LoadingSpinner></LoadingSpinner>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

useHead({
  title: 'افزودن محصول'
})

let productData = reactive({
  title: '',
  color: '#000000',
  price: '',
  categoryid: '',
  Shortdescription: '',
  longdescription: '',
  images: []
})

const showImages = ref([])

let toast = useToast()
let loading = ref(false)

function setEditorContent (des) {
  productData.longdescription = des.getHTML()
}

let { data: categories } = await useAsyncData(() =>
  $fetch('/api/admin/categories/getCategory', {
    headers: {
      credentials: 'include'
    }
  })
)

function handleImageUpload (event) {
  const files = event.target.files
  if (files.length <= 10) {
    Array.from(files).forEach(file => {
      const imageUrl = URL.createObjectURL(file)
      showImages.value.push(imageUrl)
      productData.images.push(file)
    })
  } else {
    toast.warning('تصاویر محصول نباید بیشتر از 10 عدد باشد')
  }
}

function removeImage (index) {
  showImages.value.splice(index, 1)
  productData.images.splice(index, 1)
}

async function addProductFunc () {
  if (
    !productData.title ||
    !productData.price ||
    !productData.color ||
    !productData.categoryid ||
    !productData.Shortdescription ||
    !productData.longdescription ||
    productData.images.length === 0
  )
    toast.error('لطفا تمامی فیلد هارا پر کنید و حداقل یک عکس انتخاب کنید')
  else {
    try {
      loading.value = true

      let formData = new FormData()

      formData.append('title', productData.title)
      formData.append('color', productData.color)
      formData.append('price', productData.price)
      formData.append('categoryid', productData.categoryid)
      formData.append('Shortdescription', productData.Shortdescription)
      formData.append('longdescription', productData.longdescription)

      productData.images.forEach(image => {
        formData.append('images', image, image.name)
      })

      let data = await $fetch('/api/admin/products/addProduct', {
        method: 'POST',
        headers: {
          credentials: 'include'
        },
        body: formData
      })

      toast.success(data.message)
      return navigateTo('/admin-panel/products')
    } catch (error) {
      toast.error(error?.data?.message || 'خطایی رخ داده است')
    } finally {
      loading.value = false
    }
  }
}
</script>
