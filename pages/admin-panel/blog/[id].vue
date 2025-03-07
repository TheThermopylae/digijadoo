<template>
  <div>
    <h1 class="text-3xl">ویرایش بلاگ {{ blog.blog.title }}</h1>
    <p class="text-gray-600 my-4">وبلاگ خود را ویرایش کنید و آن را اضافه کنید</p>
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
          :content="blogData.text"
        ></AdminDashboardAddProductDes>
      </div>
      <div class="grid md:grid-cols-2 gap-5">
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
          class="file-input file-input-ghost w-full max-w-xs mt-2 block border"
        />
      </div>
      <img
        :src="showImage"
        alt="blog image"
        class="mt-4 rounded-lg w-96 h-52"
        v-if="showImage.length != 0"
      />
      <button
        class="btn-c mt-5 w-36 flex justify-center"
        v-if="!loading"
        @click="addBlog"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-6 inline-block ml-1"
        >
          <path
            d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z"
          />
        </svg>
        ویرایش بلاگ
      </button>
      <button class="btn-c mt-5 w-36 flex justify-center" v-else>
        <LoadingSpinner></LoadingSpinner>
      </button>
    </form>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

let route = useRoute()

let { data: blog } = await useAsyncData(() =>
  $fetch(`/api/admin/blog/getBlogForm`, {
    method: 'POST',
    headers: {
      credentials: 'include'
    },
    body: { id: route.params.id }
  })
)

// console.log(blog.value)

let blogData = reactive({
  title: blog.value.blog.title,
  href: blog.value.blog.href,
  dec: blog.value.blog.dec,
  text: blog.value.blog.text,
  MetaTitle: blog.value.blog.MetaTitle,
  MetaDescription: blog.value.blog.MetaDescription,
  keywords: blog.value.blog.keywords,
  alt: blog.value.blog.alt,
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
      formData.append('id', route.params.id)
      formData.append('img', blogData.img)

      let data = await $fetch('/api/admin/blog/editBlog', {
        method: 'POST',
        headers: {
          credentials: 'include'
        },
        body: formData
      })

      toast.success(data.message)
      return navigateTo('/admin-panel/blog')
    } catch (error) {
      toast.error('خطا در انجام عملیات. لطفا دوباره تلاش کنید')
    } finally {
      loading.value = false
    }
  }
}

useHead({
  title: `ویرایش بلاگ ${blogData.title}`
})
</script>
