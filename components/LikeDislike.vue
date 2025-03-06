<template>
  <div class="mt-2 flex lg:justify-center gap-5">
    <p>
      {{ props.product.likes }}
      <svg
        v-if="!likeLoading"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="size-6 inline-block hover:text-green-500 transition-all cursor-pointer"
        @click="likeProduct"
        :class="{ 'text-green-500': someProductLike }"
      >
        <path
          d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z"
        />
      </svg>
      <LoadingSpinner v-else class="w-5"></LoadingSpinner>
    </p>
    <p>
      {{ props.product.dislikes }}
      <svg
        v-if="!dislikeLoading"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="size-6 inline-block hover:text-red-500 transition-all cursor-pointer"
        @click="dislikeProduct"
        :class="{ 'text-red-500': someProductDislike }"
      >
        <path
          d="M15.73 5.5h1.035A7.465 7.465 0 0 1 18 9.625a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.499 4.499 0 0 0-.322 1.672v.633A.75.75 0 0 1 9 22a2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 1.5 12.25c0-2.848.992-5.464 2.649-7.521C4.537 4.247 5.136 4 5.754 4H9.77a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23ZM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z"
        />
      </svg>
      <LoadingSpinner v-else class="w-5"></LoadingSpinner>
    </p>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

let toast = useToast()

let props = defineProps(['product'])
let emit = defineEmits(['likeProduct', 'disLikeProduct'])

let likeLoading = ref(false)
let dislikeLoading = ref(false)

let refresh = inject('refresh')

let likes = ref(JSON.parse(localStorage.getItem('likes')) || [])
let dislikes = ref(JSON.parse(localStorage.getItem('dislikes')) || [])

let someProductLike = computed(() => {
  return likes.value.some(product => product == props.product._id)
})

let someProductDislike = computed(() => {
  return dislikes.value.some(product => product == props.product._id)
})

let config = useRuntimeConfig()

async function likeProduct () {
  dislikes.value = dislikes.value.filter(
    product => product !== props.product._id
  )

  localStorage.setItem('dislikes', JSON.stringify(dislikes.value))

  if (!someProductLike.value) {
    try {
      likeLoading.value = true

      let data = await $fetch(
        `${config.public.API_BASE_URL}/product/${props.product._id}/like`,
        {
          method: 'POST'
        }
      )

      await refresh()
      likes.value.push(props.product._id)

      localStorage.setItem('likes', JSON.stringify(likes.value))
    } catch (error) {
      toast.error('خطا در انجام عملیات')
    } finally {
      likeLoading.value = false
    }
  } else {
    likes.value = likes.value.filter(product => product !== props.product._id)

    localStorage.setItem('likes', JSON.stringify(likes.value))
  }
}

async function dislikeProduct () {
  likes.value = likes.value.filter(product => product !== props.product._id)

  localStorage.setItem('likes', JSON.stringify(likes.value))

  if (!someProductDislike.value) {
    try {
      dislikeLoading.value = true

      let data = await $fetch(
        `${config.public.API_BASE_URL}/product/${props.product._id}/dislike`,
        {
          method: 'POST'
        }
      )

      await refresh()
      dislikes.value.push(props.product._id)

      localStorage.setItem('dislikes', JSON.stringify(dislikes.value))
    } catch (error) {
      toast.error('خطا در انجام عملیات')
    } finally {
      dislikeLoading.value = false
    }
  } else {
    dislikes.value = dislikes.value.filter(
      product => product !== props.product._id
    )

    localStorage.setItem('dislikes', JSON.stringify(dislikes.value))
  }
}
</script>
