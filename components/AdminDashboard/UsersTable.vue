<template>
  <div
    class="overflow-x-auto bg-white mt-5 rounded-lg shadow p-5"
  >
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>آیدی</th>
          <th>نام</th>
          <th>تاریخ عضویت</th>
          <th>ایمیل</th>
          <th>کد ملی</th>
          <th>شماره تلفن</th>
          <th>نقش</th>
        </tr>
      </thead>
      <tbody>
        <AdminDashboardUserCard
          @editUser="refresh"
          v-for="item in users"
          :user="item"
        ></AdminDashboardUserCard>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

let {
  data: users,
  error,
  refresh
} = await useAsyncData(() =>
  $fetch('/api/admin/userlist', {
    credentials: 'include'
  })
)

let toast = useToast()

if (error.value) toast.error(error.value.data.message)
</script>
