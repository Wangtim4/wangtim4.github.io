<template>
  <div class="container-fluid" id="qa">
    <h2 class="title">常見問題</h2>
    <div class="row text-white m-2">
      <div class="col-12 bg-primary rounded-2 ">
        <div class="py-2" @click="isOpenA = !isOpenA">
          <h4><i class="bi bi-question-circle-fill mx-2"></i>退換貨說明？</h4>
        </div>
        <div
          class="bg-white text-primary fs-5 fw-bold rounded-2 p-2 my-2"
          v-show="isOpenA"
        >
          網路購物的消費者，享有商品貨到日起七天猶豫期。
          但猶豫期並非試用期，所以，您所退回的商品必須是全新的狀態。
        </div>
      </div>
      <div class="col-12 bg-primary rounded-2 mt-2">
        <div class="py-2" @click="isOpenB = !isOpenB">
          <h4><i class="bi bi-question-circle-fill mx-2"></i>運送方式？</h4>
        </div>
        <div
          class="bg-white text-primary fs-5 fw-bold rounded-2 p-2 my-2"
          v-show="isOpenB"
        >
          7-11店到店：運費為60元，滿400元皆可免運，<br />
          宅配運送：運費為100元，滿500元皆可免運，外島運費另計。
        </div>
      </div>
      <div class="col-12 bg-primary rounded-2 mt-2">
        <div class="py-2" @click="isOpenC = !isOpenC">
          <h4><i class="bi bi-question-circle-fill mx-2"></i>運送規格限制？</h4>
        </div>
        <div
          class="bg-white text-primary fs-5 fw-bold rounded-2 p-2 my-2"
          v-show="isOpenC"
        >
          因超商取貨有體積及重量的限制，物品大小長+寬+高總和≦90公分，且最長邊需≦40公分<br />
          重量需低於5公斤，若單筆超過體積及重量的限制無法使用超商取貨服務
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpenA: false,
      isOpenB: false,
      isOpenC: false,
    };
  },
};
</script>

