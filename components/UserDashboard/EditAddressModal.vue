<template>
  <div>
    <div
      class="fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-11/12 bg-white dark:bg-dark-s z-10 md:w-2/3 lg:w-2/5 p-3 rounded-lg"
    >
      <div class="flex justify-between items-center">
        <svg
          @click="$emit('closeModal')"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-6 cursor-pointer"
        >
          <path
            fill-rule="evenodd"
            d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
            clip-rule="evenodd"
          />
        </svg>
        <h2>ویرایش آدرس</h2>
      </div>
      <form @submit.prevent="editAddress">
        <div class="md:grid grid-cols-2 gap-5 my-3">
          <div>
            <label for="address-title-edit" class="mb-2 block">عنوان</label>
            <input
              type="text"
              id="address-title-edit"
              class="cinput"
              v-model="addressData.title"
            />
          </div>
          <div class="mt-2 md:m-0">
            <label for="address-street-edit" class="mb-2 block">خیابان</label>
            <input
              type="text"
              id="address-street-edit"
              class="cinput"
              v-model="addressData.street"
            />
          </div>
        </div>
        <div>
          <div class="grid grid-cols-2 gap-5 my-4">
            <div>
              <label for="state-edit">استان</label>
              <select
                id="state-edit"
                class="set-ring w-full p-2 rounded-lg mt-2 border"
                v-model="addressData.province"
              >
                <option value="" disabled selected>
                  استان خود را وارد کنید
                </option>
                <option :value="item" v-for="item in states" :key="item.id">
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div>
              <label for="city-edit">شهرستان</label>
              <select
                v-model="addressData.city"
                id="city-edit"
                class="set-ring w-full p-2 rounded-lg mt-2 border"
                :disabled="!cities && addressData.province"
                :class="{
                  'cursor-not-allowed': !cities && !addressData.province
                }"
              >
                <option
                  v-for="item in cities"
                  :value="item.name"
                  :key="item.id"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="my-4">
            <label for="postalcode-edit" class="mb-2 block">کدپستی</label>
            <input
              type="text"
              id="postalcode-edit"
              class="cinput"
              v-model="addressData.postalCode"
            />
          </div>
        </div>
        <div>
          <div>
            <button
              v-if="!addLoading"
              class="btn-c w-full h-12 flex items-center justify-center"
            >
              ویرایش کردن
            </button>
            <button
              v-else
              class="btn-c w-full h-12 flex items-center justify-center"
            >
              <LoadingSpinner></LoadingSpinner>
            </button>
          </div>
        </div>
      </form>
    </div>
    <div @click="$emit('closeModal')" id="blureffect"></div>
    <Transition>
      <div
        v-if="loading || pending"
        class="fixed right-0 top-0 bg-white dark:bg-dark-c w-full h-full flex justify-center items-center flex-col z-20"
      >
        <LoadingSpinner class="w-20 h-20 text-primary"></LoadingSpinner>
        <p
          class="mt-5 text-primary"
          v-text="
            pending ? 'درحال دریافت استان ها...' : 'درحال دریافت شهر ها...'
          "
        ></p>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

let { data: states, pending, error } = useFetch('/api/address/getStates')

let props = defineProps(['address', 'index'])
let emit = defineEmits(['closeModal'])

let toast = useToast()

let { userData } = userAuth()

error.value && toast.error('خطا در دریافت اطلاعات')

let loading = ref(false)
let addLoading = ref(false)

let addressData = reactive({
  title: props.address.title,
  street: props.address.street,
  province: '',
  city: '',
  postalCode: props.address.postalCode
})

let cities = ref('')

async function getCitiesFunc () {
  try {
    loading.value = true

    let data = await $fetch('/api/address/getCities', {
      method: 'POST',
      body: { id: addressData.province.id }
    })

    cities.value = data
    loading.value = false
  } catch (err) {
    toast.error('خطا در دریافت اطلاعات')
  }
}

watch(
  () => addressData.province,
  () => getCitiesFunc()
)

async function editAddress () {
  userData.value.address[props.index] = {
    ...addressData,
    province: addressData.province.name
  }

  if (
    !addressData.title ||
    !addressData.street ||
    !addressData.city ||
    !addressData.province ||
    !addressData.postalCode
  )
    toast.error('تمامی فیلد هارا پر کنید')
  else {
    addLoading.value = true
    try {
      let data = await $fetch('/api/address/addAddress', {
        method: 'POST',
        headers: {
          credentials: 'include'
        },
        body: userData.value
      })

      toast.success('آدرس شما با موفقیت ویرایش شد')
      emit('closeModal')
    } catch (error) {
      toast.success('خطا در انجام عملیات')
    } finally {
      loading.value = false
    }
  }
}
</script>
