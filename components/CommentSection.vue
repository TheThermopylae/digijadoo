<template>
  <section class="mb-10">
    <h2 class="title">نظرات</h2>
    <div
      class="mt-5 flex justify-between items-start gap-5 flex-col md:flex-row"
    >
      <form
        @submit.prevent="addComment"
        class="w-full md:w-1/2 bg-white dark:bg-dark-s p-3 rounded-lg shadow"
      >
        <p class="mb-5 text-gray-700 dark:text-gray-400" v-if="approvedComments.length == 0">
          اولین نفری باشید که نظر میدهید!
        </p>
        <p class="text-gray-600 dark:text-gray-300 mb-5">دیدگاه خود را بنویسید</p>
        <label for="comment-text" class="block mb-2 req-inp">دیدگاه شما</label>
        <textarea
          id="comment-text"
          class="w-full border rounded-lg mb-2 outline-none set-ring p-2 dark:bg-dark-s dark:border-[#303030]"
          rows="5"
          v-model="commentText"
        ></textarea>
        <button class="btn-c h-12" v-if="!loading">افزودن نظر</button>
        <button class="btn-c h-12" v-else :disabled="loading">
          <LoadingSpinner></LoadingSpinner>
        </button>
      </form>
      <div
        class="w-full md:w-1/2 bg-white dark:bg-dark-s shadow rounded-lg p-3"
        v-if="approvedComments.length > 0"
      >
        <p class="mb-3">
          {{ approvedComments.length }} دیدگاه برای محصول {{ props.data.title }}
        </p>
        <CommentCard
          v-for="item in approvedComments"
          :key="item._id"
          :comment="item"
          :product="data"
        ></CommentCard>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useToast } from 'vue-toastification'

let config = useRuntimeConfig()
let { userData } = userAuth()

let props = defineProps(['data'])
let loading = ref(false)

let commentText = ref('')

let toast = useToast()

let approvedComments = computed(() => {
  return props.data.comments.filter(comment => comment.approved)
})

async function addComment () {
  if (!userData.value) {
    toast.warning('برای ارسال نظر باید اول وارد حساب خود شوید')
  } else if (!commentText.value) toast.error('لطفا دیدگاه خود را بنویسید')
  else {
    try {
      loading.value = true

      let data = await $fetch(
        `${config.public.API_BASE_URL}/product/${props.data._id}/comment`,
        {
          method: 'POST',
          body: { text: commentText.value, userid: userData.value.username }
        }
      )

      toast.success('کامنت شما ثبت شد و در انتظار تایید مدیر است')
      commentText.value = ''
      console.log(data);
      
    } catch (error) {
      toast.error('مشکلی پیش آمده است. لطفا دوباره امتحان کنید')
    } finally {
      loading.value = false
    }
  }
}
</script>
