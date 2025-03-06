<template>
  <div>
    <h1 class="text-3xl">افزودن آدرس</h1>
    <form @submit.prevent="addAddressFunc">
      <div class="mt-4">
        <label for="address-title">عنوان</label>
        <input
          type="text"
          id="address-title"
          class="cinput mt-2"
          v-model="addressData.title"
        />
      </div>
      <div class="mt-4">
        <label for="address-street">خیابان</label>
        <input
          type="text"
          id="address-street"
          class="cinput mt-2"
          v-model="addressData.street"
        />
      </div>
      <div class="grid grid-cols-2 gap-5 mt-4">
        <div>
          <label for="state">استان</label>
          <select
            id="state"
            class="set-ring w-full p-2 rounded-lg mt-2"
            v-model="addressData.province"
          >
            <option value="" disabled selected>استان خود را وارد کنید</option>
            <option :value="item" v-for="item in states" :key="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>
        <div>
          <label for="city">شهرستان</label>
          <select
            v-model="addressData.city"
            id="city"
            class="set-ring w-full p-2 rounded-lg mt-2 border"
            :disabled="!cities && !addressData.province"
            :class="{ 'cursor-not-allowed': !cities && !addressData.province }"
          >
            <option v-for="item in cities" :value="item.name" :key="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="mt-4">
        <label for="postal-code">کد پستی</label>
        <input
          type="text"
          id="postal-code"
          class="cinput mt-2"
          v-model="addressData.postalCode"
        />
      </div>
      <Transition>
        <div
          v-if="loading || pending"
          class="fixed right-0 top-0 bg-white w-full h-full flex justify-center items-center flex-col"
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
      <button class="btn-c mt-4 w-32 flex justify-center" v-if="!addLoading">
        افزودن آدرس
      </button>
      <button class="btn-c mt-4 w-32 flex justify-center" v-else>
        <LoadingSpinner></LoadingSpinner>
      </button>
    </form>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

let { userData } = userAuth()

useHead({
  title: 'افزودن آدرس'
})
let toast = useToast()

let { data: states, pending, error } = await useFetch('/api/address/getStates')

error.value && toast.error('خطا در دریافت اطلاعات')

let loading = ref(false)
let addLoading = ref(false)

let addressData = reactive({
  title: '',
  street: '',
  province: '',
  city: '',
  postalCode: ''
})

let provinceId = ref('')

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

async function addAddressFunc () {
  let newData = userData.value
  newData.address.push({ ...addressData, province: addressData.province.name })

  console.log(addressData);
  

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
        body: newData
      })

      toast.success('آدرس شما با موفقیت اضافه شد')
      return navigateTo('/user-panel/addresses')
    } catch (error) {
      toast.error('خطا در انجام عملیات')
    } finally {
      addLoading.value = false
    }
  }
}
</script>
