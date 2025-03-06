<template>
  <div>
    <div
      class="overflow-x-auto bg-blue-500 py-2 px-4 rounded-lg shadow"
      v-if="products && products.length > 0"
    >
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th class="p-0">
              <td class="mr-2">نام</td>
            </th>
            <th class="text-center">شناسه محصول</th>
            <th class="text-center">قیمت</th>
            <th class="text-center">رنگ</th>
            <th class="text-center">دسته بندی</th>
            <th class="absolute left-0 px-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                  clip-rule="evenodd"
                />
              </svg>
            </th>
          </tr>
        </thead>
        <tbody>
          <AdminDashboardProductCard
            v-if="products"
            v-for="item in props.products"
            :key="item._id"
            :product="item"
            @deletedProduct="$emit('acceptDelete')"
          ></AdminDashboardProductCard>
        </tbody>
      </table>
    </div>
    <p v-else class="text-gray-500 text-center">محصولی وجود ندارد</p>
  </div>
</template>

<script setup>
let props = defineProps(['products'])
</script>