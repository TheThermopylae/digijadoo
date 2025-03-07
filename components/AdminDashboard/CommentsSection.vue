<template>
  <div v-if="notApprovedProductsComments.length > 0">
    <div
      v-for="product in notApprovedProductsComments"
      :key="product._id"
      class="mb-5 last:m-0"
    >
      <div v-if="product.comments && product.comments.length > 0">
        <h4 class="mb-2 text-lg">{{ product.title }}</h4>
        <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          <AdminDashboardCommentCardDash
            v-for="comment in product.comments"
            :key="comment._id"
            :comment="comment"
            :product="product"
          ></AdminDashboardCommentCardDash>
        </div>
      </div>
    </div>
  </div>
  <p v-else class="text-center text-gray-600 dark:text-gray-400">نظری وجود ندارد</p>
</template>

<script setup>
import { computed } from 'vue'

let props = defineProps(['products'])

let notApprovedProductsComments = computed(() => {
  return props.products.all.filter(product => {
    return (
      product.comments &&
      product.comments.some(comment => comment.approved === false)
    )
  })
})
</script>
