<template>
  <div class="md:w-2/3">
    <div
      class="mt-4 bg-white dark:bg-dark-s shadow p-3 rounded-xl text-sm md:text-[16px]"
      v-if="props.products.length > 0"
    >
      <table class="w-full">
        <thead>
          <tr>
            <th class="w-[120px]">عکس محصول</th>
            <th class="w-[200px]">نام محصول</th>
            <th class="w-[150px]">تعداد</th>
            <th class="w-[150px]">قیمت</th>
          </tr>
        </thead>
        <transition-group name="fade" tag="tbody" class="text-center">
          <tr
            class="border-b last:border-none relative"
            v-for="(item, index) in products"
            :key="index"
          >
            <td class="flex justify-center mt-2">
              <img
                :src="$config.public.API_BASE_URL + item.image"
                alt=""
                class="w-20 rounded-lg"
              />
            </td>
            <td>{{ item.title }}</td>
            <td>
              <div class="flex justify-center gap-5 min-w-[100px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-6 text-green-500 cursor-pointer"
                  @click="increaseCount(item)"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="w-[30px] text-center">
                  {{ item.count }}
                </span>
                <div>
                  <svg
                    v-if="item.count == 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-6 text-red-500 cursor-pointer"
                    @click="$emit('showDeleteModal', index)"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-6 text-red-500 cursor-pointer"
                    @click="decreaseCount(item)"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </td>
            <td class="w-[150px]">{{ item.price.toLocaleString() }} تومان</td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>

<script setup>
let props = defineProps(['products'])
let emit = defineEmits(['updateProducts', 'showDeleteModal'])

function increaseCount (item) {
  let index = props.products.findIndex(product => product._id == item._id)

  // قیمت اولیه محصول را ذخیره می‌کنیم
  let originalPrice = props.products[index].price / props.products[index].count

  // افزایش تعداد
  props.products[index].count++

  // محاسبه قیمت جدید با تعداد جدید
  props.products[index].price = originalPrice * props.products[index].count

  // ذخیره تغییرات در localStorage
  localStorage.setItem('products', JSON.stringify(props.products))

  emit('updateProducts', props.products)
}

function decreaseCount (item) {
  let index = props.products.findIndex(product => product._id == item._id)

  // قیمت اولیه محصول را ذخیره می‌کنیم
  let originalPrice = props.products[index].price / props.products[index].count

  // کاهش تعداد
  props.products[index].count--

  // محاسبه قیمت جدید با تعداد جدید
  props.products[index].price = originalPrice * props.products[index].count

  // ذخیره تغییرات در localStorage
  localStorage.setItem('products', JSON.stringify(props.products))

  emit('updateProducts', props.products)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
