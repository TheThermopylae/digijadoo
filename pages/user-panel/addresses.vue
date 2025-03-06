<template>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="text-3xl">آدرس ها</h1>
      <nuxtLink to="/user-panel/add-address" class="btn-c">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 inline-block ml-1"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        افزودن آدرس
      </nuxtLink>
    </div>
    <h2 class="mt-5">آدرس های شما :</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
      <UserDashboardAdressCard
        v-for="(item, index) in userData.address"
        :key="index"
        :address="item"
        @showEditModal="showEditModalFunc(item, index)"
        @showDeleteModal="showDeleteModalFunc(item, idnex)"
        @setDefaultAddress="setDefaultAddressFunc(index)"
      ></UserDashboardAdressCard>
    </div>
    <Transition>
      <UserDashboardEditAddressModal
        v-if="showEditMdoal"
        @closeModal="showEditMdoal = false"
        :address="targetAddress"
        :index="indexAddress"
      ></UserDashboardEditAddressModal>
    </Transition>
    <Transition>
      <UserDashboardDeleteAddressModal
        v-if="showDeleteModal"
        @closeModal="showDeleteModal = false"
        :index="indexAddress"
      ></UserDashboardDeleteAddressModal>
    </Transition>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

useHead({
  title: 'آدرس ها'
})

let { userData } = userAuth()

let showEditMdoal = ref(false)
let targetAddress = ref(null)
let indexAddress = ref(null)

let showDeleteModal = ref(false)

function showEditModalFunc (item, index) {
  indexAddress.value = index
  showEditMdoal.value = true
  targetAddress.value = item
}

function showDeleteModalFunc (item, index) {
  indexAddress.value = index
  showDeleteModal.value = true
  targetAddress.value = item
}

let toast = useToast()

async function setDefaultAddressFunc (index) {
  try {
    userData.value.address.forEach(address => (address.default = false))

    let addresses = userData.value.address

    let setDefault = (addresses[index].default = true)

    let data = await $fetch("/api/address/addAddress", {
      credentials: 'include',
      method: 'POST',
      body: { ...userData.value, address: addresses }
    })

    toast.success('آدرس پیشفرض شما عوض شد')
  } catch (err) {
    toast.error(err.data.message)
  }
}
</script>
