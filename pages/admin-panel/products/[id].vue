<template>
  <div v-if="products">
    <h1 class="text-3xl mb-5">ویرایش محصول {{ targetProduct.title }}</h1>
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
              v-model="productData.categoryid.name"
              class="w-full rounded-lg set-ring p-2 mt-2 border"
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
            class="w-full my-2 set-ring rounded-lg outline-none p-2 border dark:bg-dark-s dark:border-b-dark"
            rows="5"
            v-model="productData.Shortdescription"
          ></textarea>
        </div>
        <div>
          <h2>توضیح بلند کالا</h2>
          <AdminDashboardAddProductDes
            :content="productData.longdescription"
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
              :alt="'تصویر  ' + (index + 1)"
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
          class="btn-c px-4 py-3 h-12 w-42 flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6 inline-block"
          >
            <path
              d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z"
            />
          </svg>

          ویرایش محصول
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

let route = useRoute()

let { data: products } = await useAsyncData(() =>
  $fetch('/api/admin/products/getProducts', {
    headers: {
      credentials: 'include'
    }
  })
)

let targetProduct = computed(() => {
  return products.value
    ? products.value.all.find(product => product._id === route.params.id)
    : []
})

let productData = reactive({
  title: targetProduct.value.title || '',
  color: targetProduct.value.color || '#000000',
  price: targetProduct.value.price || '',
  categoryid: targetProduct.value || '',
  Shortdescription: targetProduct.value.Shortdescription || '',
  longdescription: targetProduct.value.longdescription || '',
  images: []
})

useHead({
  title: `ویرایش محصول ${productData.title}`
})

const showImages = ref([])

watch(
  targetProduct,
  newVal => {
    if (newVal) {
      productData.title = newVal.title || ''
      productData.color = newVal.color || '#000000'
      productData.price = newVal.price || ''
      productData.categoryid = newVal.categoryid || ''
      productData.Shortdescription = newVal.Shortdescription || ''
      productData.longdescription = newVal.longdescription || ''
    }

    useHead({
      title: `ویرایش محصول ${productData.title}`
    })
  },
  { immediate: true }
)

let toast = useToast()
let loading = ref(false)

function setEditorContent (des) {
  productData.longdescription = des.getHTML()
}

let { data: categories } = await useFetch('/api/admin/categories/getCategory', {
  headers: {
    credentials: 'include'
  }
})

function handleImageUpload (event) {
  const files = event.target.files
  if (files.length + showImages.value.length > 10) {
    toast.warning('تعداد تصاویر نباید بیشتر از 10 عدد باشد')
    return
  }

  Array.from(files).forEach(file => {
    const imageUrl = URL.createObjectURL(file)
    showImages.value.push(imageUrl)
    productData.images.push(file)
  })
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
  ) {
    toast.error('لطفا تمامی فیلد ها را پر کنید و حداقل یک عکس انتخاب کنید')
  } else {
    try {
      loading.value = true

      let formData = new FormData()

      formData.append('id', route.params.id)

      formData.append('title', productData.title)
      formData.append('color', productData.color)
      formData.append('price', productData.price)
      formData.append('categoryid', productData.categoryid._id)
      formData.append('Shortdescription', productData.Shortdescription)
      formData.append('longdescription', productData.longdescription)

      productData.images.forEach(image => {
        formData.append('images', image, image.name)
      })

      let data = await $fetch('/api/admin/products/updateProduct', {
        method: 'POST',
        headers: {
          credentials: 'include'
        },
        body: formData
      })

      toast.success('محصول با موفقیت بروزرسانی شد')
      console.log(data);
      
      return navigateTo('/admin-panel/products')
    } catch (error) {
      toast.error('مشکلی پیش آمده است. لطفا دوباره تلاش کنید')
    } finally {
      loading.value = false
    }
  }
}
</script>
