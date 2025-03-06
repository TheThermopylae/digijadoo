<template>
  <div v-if="blog" class="mt-5">
    <LazyTargetBlogTitleSection
      :title="blog.title"
    ></LazyTargetBlogTitleSection>
    <h1 class="text-3xl">{{ blog.title }}</h1>
    <p class=" my-5">{{ blog.dec }}</p>
    <img
      :src="`${$config.public.API_BASE_URL}${blog.img}`"
      :alt="blog.alt"
      class="w-full rounded-lg"
    />
    <div
      v-html="blog.text"
      class="mt-9  bg-blue-500 p-4 rounded-lg shadow"
    ></div>
  </div>
</template>

<script setup>
let config = useRuntimeConfig()
let route = useRoute()
let { data: blogs } = await useFetch(`${config.public.API_BASE_URL}/blog`)
let blog = computed(() => {
  return blogs.value.find(blog => blog.title == route.params.title)
})


useHead({
  title: blog.value.MetaTitle,
  meta: [
    { name: 'description', content: blog.value.MetaDescription },
    { name: 'keywords', content: blog.value.keywords },
    { property: 'og:title', content: blog.value.MetaTitle },
    { property: 'og:description', content: blog.value.MetaDescription },
    {
      property: 'og:image',
      content: `${config.public.API_BASE_URL}${blog.value.img}`
    },
    {
      property: 'og:url',
      content: `https://digijadoo.ir/blog/${route.params.title}`
    }
  ]
})
</script>
