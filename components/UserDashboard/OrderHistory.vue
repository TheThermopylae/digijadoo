<template>
  <div class="my-8">
    <h2 class="mb-5 text-xl">وضعیت سفارش ها</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
      <div
        class="flex items-center gap-3 bg-yellow-500 text-white p-3 rounded-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M15 16.69V13h1.5v2.82l2.44 1.41l-.75 1.3zM19.5 3.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2L7.5 3.5L6 2L4.5 3.5L3 2v20l1.5-1.5L6 22l1.5-1.5L9 22l1.58-1.58c.14.19.3.36.47.53A7.001 7.001 0 0 0 21 11.1V2zM11.1 11c-.6.57-1.07 1.25-1.43 2H6v-2zm-2.03 4c-.07.33-.07.66-.07 1s0 .67.07 1H6v-2zM18 9H6V7h12zm2.85 7c0 .64-.12 1.27-.35 1.86c-.26.58-.62 1.14-1.07 1.57c-.43.45-.99.81-1.57 1.07c-.59.23-1.22.35-1.86.35c-2.68 0-4.85-2.17-4.85-4.85c0-1.29.51-2.5 1.42-3.43c.93-.91 2.14-1.42 3.43-1.42c2.67 0 4.85 2.17 4.85 4.85"
          />
        </svg>
        <div>
          <p class="font-bold">در انتظار</p>
          <div>{{ pendingOrders.length }} سفارش</div>
        </div>
      </div>
      <div
        class="flex items-center gap-3 bg-blue-500 text-white p-3 rounded-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2em"
          height="2em"
          viewBox="0 0 2048 2048"
        >
          <path
            fill="currentColor"
            d="M837 844q-23 37-53 67t-68 54l51 124l-118 48l-51-123q-40 10-86 10t-86-10l-51 123l-118-48l51-124q-37-23-67-53t-54-68L63 895L15 777l123-51q-10-40-10-86t10-86L15 503l48-118l124 51q46-75 121-121l-51-124l118-48l51 123q40-10 86-10t86 10l51-123l118 48l-51 124q75 46 121 121l124-51l48 118l-123 51q10 40 10 86t-10 86l123 51l-48 118zm-325 52q53 0 99-20t82-55t55-81t20-100q0-53-20-99t-55-82t-81-55t-100-20q-53 0-99 20t-82 55t-55 81t-20 100q0 53 20 99t55 82t81 55t100 20m1408 448q0 55-14 111l137 56l-48 119l-138-57q-59 98-156 156l57 137l-119 49l-56-137q-56 14-111 14t-111-14l-56 137l-119-49l57-137q-98-58-156-156l-138 57l-48-119l137-56q-14-56-14-111t14-111l-137-56l48-119l138 57q58-97 156-156l-57-138l119-48l56 137q56-14 111-14t111 14l56-137l119 48l-57 138q97 59 156 156l138-57l48 119l-137 56q14 56 14 111m-448 320q66 0 124-25t101-68t69-102t26-125t-25-124t-69-101t-102-69t-124-26t-124 25t-102 69t-69 102t-25 124t25 124t68 102t102 69t125 25"
          />
        </svg>
        <div>
          <p class="font-bold">در حال پردازش</p>
          <div>{{ processingOrders.length }} سفارش</div>
        </div>
      </div>
      <div
        class="flex items-center gap-3 bg-purple-c text-white p-3 rounded-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2em"
          height="2em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m.5 13.325l.5-2h5.5l-.5 2zM7 20q-1.25 0-2.125-.875T4 17H1.5l.5-2.175h5.175l.9-3.65h2.1l1.25-5H4.5l.15-.6q.15-.7.688-1.137T6.6 4H18l-.925 4H20l3 4l-1 5h-2q0 1.25-.875 2.125T17 20t-2.125-.875T14 17h-4q0 1.25-.875 2.125T7 20M2.5 9.675l.5-2h6.5l-.5 2zM7 18q.425 0 .713-.288T8 17t-.288-.712T7 16t-.712.288T6 17t.288.713T7 18m10 0q.425 0 .713-.288T18 17t-.288-.712T17 16t-.712.288T16 17t.288.713T17 18m-1.075-5h4.825l.1-.525L19 10h-2.375z"
          />
        </svg>
        <div>
          <p class="font-bold">ارسال شده</p>
          <div>{{ shippedOrders.length }} سفارش</div>
        </div>
      </div>
      <div
        class="flex items-center gap-3 bg-green-500 text-white p-3 rounded-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2em"
          height="2em"
          viewBox="0 0 16 16"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="m2.75 8.75l3.5 3.5l7-7.5"
          />
        </svg>
        <div>
          <p class="font-bold">تحویل داده شده</p>
          <div>{{ deliveredOrders.length }} سفارش</div>
        </div>
      </div>
      <div class="flex items-center gap-3 bg-red-500 text-white p-3 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
          />
        </svg>
        <div>
          <p class="font-bold">لغو شده</p>
          <div>{{ canceledOrders.length }} سفارش</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let props = defineProps(['orders'])
// console.log(props.orders)

let pendingOrders = computed(() => {
  return props.orders.filter(order => order.status === 'pending')
})

let processingOrders = computed(() => {
  return props.orders.filter(order => order.status === 'processing')
})

let shippedOrders = computed(() => {
  return props.orders.filter(order => order.status === 'shipped')
})

let deliveredOrders = computed(() => {
  return props.orders.filter(order => order.status === 'delivered')
})

let canceledOrders = computed(() => {
  return props.orders.filter(order => order.status === 'canceled')
})
</script>
