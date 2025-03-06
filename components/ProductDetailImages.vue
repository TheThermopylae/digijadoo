<template>
  <div>
    <swiper
      :style="{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff'
      }"
      :spaceBetween="10"
      :navigation="true"
      :thumbs="{ swiper: thumbsSwiper }"
      :modules="modules"
      class="mySwiper2 border-b"
    >
      <swiper-slide v-for="item in data"><img :src="$config.public.API_BASE_URL + item" class="w-full rounded-xl" /></swiper-slide>
    </swiper>
    <swiper
      @swiper="setThumbsSwiper"
      :spaceBetween="20"
      :slidesPerView="3"
      :freeMode="true"
      :watchSlidesProgress="true"
      :modules="modules"
      class="mySwiper mt-5 [&_.swiper-wrapper]:p-0"
    >
      <swiper-slide v-for="item in data">
        <img :src="$config.public.API_BASE_URL + item" class="w-full rounded-xl" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  props: ['data'],
  setup () {
    const thumbsSwiper = ref(null)
    const setThumbsSwiper = swiper => {
      thumbsSwiper.value = swiper
    }
    return {
      thumbsSwiper,
      setThumbsSwiper,
      modules: [FreeMode, Navigation, Thumbs]
    }
  }
}
</script>