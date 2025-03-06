<template>
  <div
    class="lg:grid lg:grid-cols-3 gap-5 bg-white rounded-xl px10 p-5 shadow"
  >
    <div class="breadcrumbs text-sm mb-5 lg:hidden">
      <ul>
        <li><nuxtLink to="/">فروشگاه اینترنتی دیجی جادو</nuxtLink></li>
        <li class="font-bold">
          <a>{{ props.data.title }}</a>
        </li>
      </ul>
    </div>
    <ProductDetailImages
      :data="props.data.images"
      class="w-full"
    ></ProductDetailImages>
    <div class="place-content-center lg:text-center">
      <div class="hidden lg:block breadcrumbs text-sm mb3">
        <ul class="justify-center">
          <li><nuxtLink to="/">فروشگاه اینترنتی دیجی جادو</nuxtLink></li>
          <li class="font-bold">
            <a>{{ props.data.title }}</a>
          </li>
        </ul>
      </div>
      <h4 class="my-3">
        دسته بندی :
        <nuxtLink
          :to="{
            path: '/products',
            query: { category: props.data.categoryid.name }
          }"
          class="font-bold hover:underline"
          >{{ props.data.categoryid.name }}</nuxtLink
        >
      </h4>
      <div>
        <h4 class="flex lg:justify-center mb-3 gap-2 items-center">رنگ : <div class="w-5 h-5 rounded-full border" :style="{background : props.data.color}"></div></h4>
      </div>
      <h1 class="text-2xl mt-5 lg:mt-0">
        {{ props.data.title }}
      </h1>
      <ClientOnly>
        <LikeDislike :product="props.data"></LikeDislike>
      </ClientOnly>
    </div>
    <div class="place-content-center">
      <div class="mt-5 lg:m-0 bg-white-c p-3 rounded-lg">
        <div>
          <h4 class="inline-block ml-1 text-xl">موجود در فروشگاه</h4>
          <h4 class="my-2">
            قیمت محصول :
            <span class="text-purple-c"
              >{{ props.data.price.toLocaleString() }} تومان</span
            >
          </h4>
          <h4 class="my-2">تعداد : {{ count }} عدد</h4>
          <h4 :class="{ 'border-b pb-2': isInBasket }">
            قیمت نهایی :
            <span class="text-green-500"
              >{{ (count * props.data.price).toLocaleString() }} تومان</span
            >
          </h4>
        </div>
        <button
          v-if="!isInBasket"
          @click="addToBasket"
          class="btn-c p-2 mt-2 w-full"
        >
          افزودن به سبد خرید
        </button>
        <div class="flex justify-cener gap-5 mt-2" v-else>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6 text-green-500 cursor-pointer"
            @click="increaseCount"
          >
            <path
              fill-rule="evenodd"
              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
              clip-rule="evenodd"
            />
          </svg>
          <span>{{ count }} </span>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6 text-red-500 cursor-pointer"
              v-if="count == 1"
              @click="removeAsBasket"
            >
              <path
                fill-rule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6 text-red-500 cursor-pointer"
              v-else
              @click="decreaseCount"
            >
              <path
                fill-rule="evenodd"
                d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <p>در سبد خرید شما</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

let props = defineProps(['data'])

let { userData } = userAuth()

let count = ref(1)

let products = ref('')
let isInBasket = ref(null)

function checkInYourBasket () {
  isInBasket.value = products.value.some(
    product => product.id == props.data._id
  )
}

onMounted(() => {
  products.value = JSON.parse(localStorage.getItem('products')) || []

  checkInYourBasket()
})

let toast = useToast()

function addToBasket () {
  if (!userData.value) {
    toast.warning('برای افزودن به سبد خرید باید اول وارد حساب خود شوید')
    setTimeout(() => {
      return navigateTo('/auth/login')
    }, 1000)

    return
  }
  products.value.push({
    title: props.data.title,
    image: props.data.images[0],
    price: props.data.price * count.value,
    id: props.data._id,
    count: count.value
  })

  localStorage.setItem('products', JSON.stringify(products.value))
  isInBasket.value = true
}

function removeAsBasket () {
  let findProduct = products.value.findIndex(
    product => product.id === props.data._id
  )

  products.value.splice(findProduct, 1)

  localStorage.setItem('products', JSON.stringify(products.value))

  isInBasket.value = false
}

function updateBasket () {
  let productIndex = products.value.findIndex(
    product => product.id === props.data._id
  )

  if (productIndex !== -1) {
    products.value[productIndex].count = count.value
    products.value[productIndex].price = props.data.price * count.value
    localStorage.setItem('products', JSON.stringify(products.value))
  }
}

function increaseCount () {
  count.value++
  updateBasket()
}

function decreaseCount () {
  if (count.value > 1) {
    count.value--
    updateBasket()
  }
}
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}
</style>
