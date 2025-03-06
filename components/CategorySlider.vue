<template>
  <div>
    <h2
      class="mb-3 text-xl relative before:content-[''] before:absolute before:w-[5px] before:h-full before:bg-purple-c before:top-0 before:right-0 pr-4 before:rounded-full"
    >
      <slot> </slot>
    </h2>
    <swiper
      :spaceBetween="30"
      :breakpoints="{
        320: { slidesPerView: 3, spaceBetween: 10 },
        640: { slidesPerView: 4, spaceBetween: 15 },
        768: { slidesPerView: 5, spaceBetween: 20 },
        1024: { slidesPerView: 7, spaceBetween: 30 }
      }"
      :modules="modules"
      :pagination="{ clickable: true }"
      class="mySwiper z-0"
    >
      <swiper-slide v-for="item in categories" :key="item._id">
        <CategoryCard :data="item"></CategoryCard>
      </swiper-slide>
    </swiper>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'

import { Pagination } from 'swiper/modules'
import CategoryCard from './CategoryCard.vue'

let config = useRuntimeConfig()

let { data: categories } = await useFetch(
  `${config.public.API_BASE_URL}/category`
)
let modules = [Pagination]
</script>
