<template>
  <div>
    <div class="flex justify-between">
      <h2 class="title">بلاگ</h2>
      <NuxtLink class="hover:text-purple-c" to="/blogs">بیشتر...</NuxtLink>
    </div>
    <swiper
      :breakpoints="{
        320: { slidesPerView: 1, spaceBetween: 10 },
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 30 }
      }"
      :pagination="{
        clickable: true
      }"
      :modules="modules"
      class="mySwiper mt-4"
    >
      <swiper-slide
        v-for="(item, index) in blogs.slice(0, 6)"
        :key="index"
        :data="item"
        ><BlogCard :data="item"></BlogCard
      ></swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'

export default {
  props: ['blogs'],
  components: {
    Swiper,
    SwiperSlide
  },
  setup () {
    return {
      modules: [Pagination]
    }
  }
}
</script>
