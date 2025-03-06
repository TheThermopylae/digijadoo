<template>
  <div>
    <h1 class="text-3xl">پروفایل</h1>
    <form @submit.prevent="editUserProfile">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
        <div>
          <label for="user-name" class="mb-2 block text-lg">نام</label>
          <input
            type="text"
            class="cinput set-ring"
            id="user-name"
            v-model="editUserData.firstName"
          />
        </div>
        <div>
          <label for="user-family" class="mb-2 block text-lg"
            >نام خانوادگی</label
          >
          <input
            type="text"
            class="cinput set-ring"
            id="user-family"
            v-model="editUserData.lastName"
          />
        </div>
        <div>
          <label for="user-nickname" class="mb-2 block text-lg"
            >نام کاربری</label
          >
          <input
            type="text"
            class="cinput set-ring"
            id="user-nickname"
            v-model="editUserData.username"
          />
        </div>
        <div>
          <label for="user-code" class="mb-2 block text-lg">کد ملی</label>
          <input
            type="text"
            class="cinput set-ring"
            id="user-code"
            v-model="editUserData.codemeli"
          />
        </div>
        <div>
          <label for="email" class="mb-2 block text-lg">ایمیل</label>
          <input
            type="text"
            class="cinput set-ring"
            id="email"
            v-model="editUserData.email"
          />
        </div>
        <div>
          <label for="phone-number" class="mb-2 block text-lg"
            >شماره تلفن</label
          >
          <input
            type="number"
            class="cinput set-ring"
            id="phone-number"
            v-model="editUserData.phone"
          />
        </div>
      </div>
      <div class="mt-4">
        <label for="avatar" class="mb-2 block text-lg">آواتار</label>
        <input
          type="file"
          id="avatar"
          @change="handleImageUpload"
          class="file-input file-input-ghost w-full border border-purple-c bg-white"
        />
      </div>
      <button class="btn-c w-full mt-5 h-12" v-if="!loading">
        ویرایش اطلاعات
      </button>
      <button class="btn-c w-full mt-5 h-12" v-else>
        <LoadingSpinner></LoadingSpinner>
      </button>
    </form>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

useHead({
  title: 'مشخصات کاربری'
})

let loading = ref(false)

let { userData } = userAuth()

let editUserData = reactive({
  firstName: userData.value.firstName || '',
  lastName: userData.value.lastName || '',
  username: userData.value.username || '',
  email: userData.value.email || '',
  phone: userData.value.phone || '',
  codemeli: userData.value.codemeli || '',
  avatar: userData.value.avatar || ''
})

let toast = useToast()

function handleImageUpload (event) {
  const files = event.target.files

  const file = files[0]
  if (file) {
    editUserData.avatar = file
  }
}

async function editUserProfile () {
  if (
    !editUserData.firstName ||
    !editUserData.lastName ||
    !editUserData.username ||
    !editUserData.email ||
    !editUserData.phone ||
    !editUserData.codemeli
  )
    toast.error('تمامی فیلد هارا پر کنید')
  else {
    loading.value = true
    try {
      let formData = new FormData()

      formData.append('firstName', editUserData.firstName)
      formData.append('lastName', editUserData.lastName)
      formData.append('username', editUserData.username)
      formData.append('email', editUserData.email)
      formData.append('phone', editUserData.phone)
      formData.append('codemeli', editUserData.codemeli)

      if (editUserData.avatar instanceof Object)
        formData.append('avatar', editUserData.avatar)

      let data = await $fetch('/api/editProfile', {
        method: 'POST',
        body: formData,
        headers: {
          credentials: 'include'
        }
      })

      toast.success('پروفایل شما بروزرسانی شد')
      userData.value = data.user
    } catch (err) {
      toast.error(err.data.message)
    } finally {
      loading.value = false
    }
  }
}
</script>
