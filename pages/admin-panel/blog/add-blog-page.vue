<template>
  <div>
    <h1 class="text-3xl">افزودن بلاگ</h1>
    <p class="text-gray-600 my-4">وبلاگ خود را بنویسید و آن را اضافه کنید</p>
    <form @submit.prevent="">
      <div class="grid grid-cols-2 gap-5">
        <div>
          <label for="blog-title">عنوان بلاگ</label>
          <input
            type="text"
            id="blog-title"
            class="cinput mt-2"
            v-model="blogData.title"
          />
        </div>
        <div>
          <label for="blog-href">لینک بلاگ</label>
          <input
            type="text"
            id="blog-href"
            class="cinput mt-2"
            v-model="blogData.href"
          />
        </div>
      </div>
      <label for="blog-dec" class="mt-5 block">توضیحات کوتاه</label>
      <textarea
        id="blog-dec"
        class="cinput rounded-lg outline-none border mt-2 dark:bg-dark-s dark:border-b-dark"
        rows="5"
        v-model="blogData.dec"
      ></textarea>
      <div class="mt-4">
        <h2>محتوای بلاگ</h2>
        <AdminDashboardAddProductDes
          @editorContent="setEditorContent"
        ></AdminDashboardAddProductDes>
      </div>
      <div class="grid grid-cols-2 gap-5">
        <div>
          <label for="blog-meta-title">متا تایتل</label>
          <input
            type="text"
            id="blog-meta-title"
            class="cinput mt-2"
            v-model="blogData.MetaTitle"
          />
        </div>
        <div>
          <label for="blog-meta-des">متا دیسکریپشن</label>
          <input
            type="text"
            id="blog-meta-des"
            class="cinput mt-2"
            v-model="blogData.MetaDescription"
          />
        </div>
        <div>
          <label for="blog-meta-keywords">کلمات کلیدی</label>
          <input
            type="text"
            id="blog-meta-keywords"
            class="cinput mt-2"
            v-model="blogData.keywords"
          />
        </div>
        <div>
          <label for="blog-meta-alt">توضیحات عکس</label>
          <input
            type="text"
            id="blog-meta-alt"
            class="cinput mt-2"
            v-model="blogData.alt"
          />
        </div>
      </div>
      <div class="mt-4">
        <label for="blog-img">تصویر</label>
        <input
          id="blog-img"
          name="image"
          accept="image/*"
          @change="handleImageUpload"
          type="file"
          class="file-input file-input-ghost w-full max-w-xs mt-2 block border border-purple-500"
        />
      </div>
      <img
        :src="showImage"
        alt="blog image"
        class="mt-4 rounded-lg w-full h52 md:w-96"
        v-if="showImage.length != 0"
      />
      <button
        class="btn-c mt-5 w-36 flex justify-center"
        v-if="!loading"
        @click="addBlog"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 inline-block ml-1"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        افزودن بلاگ
      </button>
      <button
        class="btn-c mt-5 w-36 flex justify-center"
        v-else
        :disabled="loading"
      >
        <LoadingSpinner></LoadingSpinner>
      </button>
    </form>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

let blogData = reactive({
  title: '',
  href: '',
  dec: '',
  text: '',
  MetaTitle: '',
  MetaDescription: '',
  keywords: '',
  alt: '',
  img: ''
})

let showImage = ref([])

let toast = useToast()
let loading = ref(false)

function setEditorContent (des) {
  blogData.text = des.getHTML()
}

function handleImageUpload (event) {
  const files = event.target.files

  const file = files[0]
  if (file) {
    const imageUrl = URL.createObjectURL(file)
    showImage.value = imageUrl
    blogData.img = file
  }
}

async function addBlog () {
  if (
    !blogData.title ||
    !blogData.href ||
    !blogData.dec ||
    !blogData.text ||
    !blogData.MetaTitle ||
    !blogData.MetaDescription ||
    !blogData.keywords ||
    !blogData.alt ||
    !blogData.img
  )
    toast.error('لطفا تمامی فیلد هارا پر کنید و یک عکس انتخاب کنید')
  else {
    try {
      loading.value = true

      let formData = new FormData()

      formData.append('title', blogData.title)
      formData.append('href', blogData.href)
      formData.append('dec', blogData.dec)
      formData.append('text', blogData.text)
      formData.append('MetaTitle', blogData.MetaTitle)
      formData.append('MetaDescription', blogData.MetaDescription)
      formData.append('keywords', blogData.keywords)
      formData.append('alt', blogData.alt)
      formData.append('img', blogData.img)

      let data = await $fetch('/api/admin/blog/addBlog', {
        method: 'POST',
        headers: {
          credentials: 'include'
        },
        body: formData
      })

      toast.success('بلاگ با موفقیت اضافه شد')
      return navigateTo('/admin-panel/blog')
    } catch (error) {
      toast.error('خطا در انجام عملیات. لطفا دوباره تلاش کنید')
    } finally {
      loading.value = false
    }
  }
}

useHead({
  title: 'افزودن بلاگ'
})
</script>
