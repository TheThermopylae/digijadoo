<template>
  <div class="border border-purple-c rounded-lg p-2 mb-3 last:m-0">
    <strong>{{ props.comment.userid }}</strong>
    <div class="flex justify-between items-center">
      <p class="my-2">{{ props.comment.text }}</p>
      <svg
        v-if="userData && userData.role == 'ADMIN'"
        xmlns="http://www.w3.org/2000/svg"
        width="2em"
        height="2em"
        viewBox="0 0 24 24"
        class="cursor-pointer"
        @click="replyMode = true"
      >
        <path
          fill="currentColor"
          d="m5.921 11.5l3.746 3.746q.147.146.153.344q.007.199-.158.364q-.166.16-.354.162q-.189.003-.354-.162l-4.389-4.389q-.242-.242-.242-.565t.243-.565l4.388-4.389q.14-.14.341-.15t.366.15q.166.165.166.357t-.165.357l-3.74 3.74H15.5q1.864 0 3.182 1.318T20 15v2.5q0 .214-.143.357T19.5 18t-.357-.143T19 17.5V15q0-1.442-1.029-2.471T15.5 11.5z"
        />
      </svg>
    </div>
    <div class="mt-2" v-if="replyMode">
      <textarea
        id="reply"
        class="w-full bg-white border rounded-lg p-2 set-ring outline-none"
        placeholder="متن ریپلای خود را وارد کنید..."
        v-model="replyText"
      ></textarea>
      <div class="mt-1">
        <button
          class="bg-white-c p-3 rounded-lg ml-2 hover:bg-gray-200 transition-all"
          @click="replyMode = false"
        >
          لغو
        </button>
        <button class="btn-c h-12" @click="addReply" v-if="!loading">
          افزودن ریپلای
        </button>
        <button class="btn-c h-12" v-else :disabled="loading">
          <LoadingSpinner class="w-5 h-5"></LoadingSpinner>
        </button>
      </div>
    </div>
    <div
      class="bg-white-c rounded-lg p-2 my-2 last:mb-0"
      v-for="item in repliesApproved"
      :key="item._id"
    >
      <strong>مدیر</strong>
      <p class="mt-2">{{ item.text }}</p>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

let { userData } = userAuth()
let config = useRuntimeConfig()

let props = defineProps(['comment', 'product'])

let toast = useToast()

let loading = ref(false)

let replyMode = ref(false)
let replyText = ref('')

let repliesApproved = computed(() =>
  props.comment.replies.filter(reply => reply.approved)
)

async function addReply () {
  if (!userData.value) toast.warning('برای ریپلای زدن باید وارد حساب خود بشوید')
  else if (!replyText.value) toast.error('متن ریپلای خود را وارد کنید')
  else {
    loading.value = true

    try {
      let data = await $fetch(
        `${config.public.API_BASE_URL}/product/${props.product._id}/comment/${props.comment._id}/reply`,
        {
          method: 'POST',
          body: { text: replyText.value }
        }
      )

      toast.success('پاسخ شما ثبت شد و در انتظار تایید است')
      replyMode.value = false
    } catch (error) {
    } finally {
      loading.value = false
    }
  }
}
</script>
