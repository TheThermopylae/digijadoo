<template>
  <div v-if="data">
    <div class="flex justify-between items-center mb-2">
      <h2 class="title mb-2">
        <ClientOnly>
          <slot name="title"></slot>
        </ClientOnly>
      </h2>
      <slot name="link"></slot>
    </div>
    <swiper
      :breakpoints="{
        320: { slidesPerView: 2, spaceBetween: 10 },
        640: { slidesPerView: 3, spaceBetween: 20 },
        1024: { slidesPerView: 4, spaceBetween: 30 }
      }"
      :spaceBetween="30"
      :pagination="{
        clickable: true
      }"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="(item, index) in data" :key="index">
        <ProductCard :data="item"></ProductCard>
      </swiper-slide>
    </swiper>
    <div class="swiper-pagination" slot="pagination"></div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  props: ['data'],
  setup () {
    return {
      modules: [Pagination]
    }
  }
}
</script>
<style>
.swiper-wrapper {
  padding-bottom: 40px;
}

.swiper-container-horizontal > .swiper-pagination-bullets,
.swiper-pagination-custom,
.swiper-pagination-fraction {
  bottom: 0px !important;
}
</style>
