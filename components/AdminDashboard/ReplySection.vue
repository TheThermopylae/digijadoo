<template>
  <div v-if="notApprovedReplies.length > 0">
    <div
      v-for="product in notApprovedReplies"
      :key="product._id"
      class="mb-5 last:m-0"
    >
      <h4 class="mb-2 text-lg">{{ product.title }}</h4>
      <div v-if="product.comments && product.comments.length > 0">
        <div v-for="comment in product.comments" :key="comment._id">
          <div v-if="comment.replies && comment.replies.length > 0">
            <div v-for="reply in comment.replies" :key="reply._id">
              <AdminDashboardReplyCardDash
                v-if="!reply.approved"
                :comment="comment"
                :reply="reply"
                :product="product"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p v-else class="text-center text-gray-600">نظری وجود ندارد</p>
</template>

<script setup>
let props = defineProps(['products'])

let notApprovedReplies = computed(() => {
  return props.products.all.filter(product => {
    if (product.comments && product.comments.length > 0) {
      return product.comments.some(comment => {
        return (
          comment.replies &&
          comment.replies.some(reply => reply.approved === false)
        )
      })
    }
    return false
  })
})
</script>
