<template>
<swiper :pagination="true" :modules="modules" 
  :autoplay="{
      delay: 500,
      disableOnInteraction: false,
    }"
    class="mySwiper">
    <swiper-slide><img src="../assets/images/lake1.jpg" alt="banner1" width="100%"></swiper-slide>
    <swiper-slide><img src="../assets/images/banner1-2.png" alt="banner2" width="100%"></swiper-slide>
    <swiper-slide><img src="../assets/images/banner1-3.png" alt="banner3" width="100%"></swiper-slide>
  </swiper>
</template>
<style lang="scss" scoped>
.swiper {
  width: 100%;
  height: 50%; 
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination, Autoplay],
    };
  },
};
</script>