<template>
  <div class="container-fuild">
    <Banner></Banner>
    <About></About>
    <ProductPage></ProductPage>
    <Question class="my-5"></Question>
    <ToastMessages></ToastMessages>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import ToastMessages from '@/components/ToastMessages.vue';

import Question from '@/components/front/Question.vue';
import NavBarUser from '@/components/front/NavBarUser.vue';
import Banner from  '@/components/front/Banner2.vue';
import News from  '@/components/front/News.vue';
import ProductPage from  '@/components/front/ProductPage.vue';
import About from  '@/components/front/About.vue';
import Footer from  '@/components/front/Footer.vue';


export default {
  components: {
    NavBarUser,
    Banner,
    News,
    ProductPage,
    ToastMessages,
    About,
    Footer,
    Question,
    emitter
  },
  // 12.最外層加上 provide()
  provide () {
    return {
      emitter,
    };
  },
}
</script>
