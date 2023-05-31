<template>
  <LoadIng :active="isLoading"></LoadIng>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-lg-6 col-md-10">
        <img
          :src="product.imageUrl"
          alt=""
          class="img-fluid mb-3"
          style="height: 400px; width: 400px; object-fit: cover"
        />
      </div>
      <div
        class="col-lg-6 col-md-10 py-3 text-primary d-flex flex-column align-content-between"
      >
        <h2 class="fw-bold">{{ product.title }}</h2>
        <hr />
        <p>商品描述：{{ product.description }}</p>
        <p>商品規格：{{ product.content }}</p>
        <div class="h5" v-if="!product.price">
          {{ product.origin_price }} 元
        </div>
        <div class="d-flex justify-content-between">
          <del class="h6" v-if="product.price"
            >原價 {{ product.origin_price }} 元</del
          >
          <div class="h4 text-danger" v-if="product.price">
            現在只要 {{ product.price }}元 / {{ product.unit }}
          </div>
        </div>
        <!--  -->
        <div class="d-flex justify-content-between my-3">
          <label class="fs-5 align-middle">數量</label>
          <select class="form-control" style="width: 70%;"  v-model="product.num">
            <option value="0" disabled selected>請選擇數量</option>
            <option :value="num" v-for="num in 10" :key="num">
              {{ num }} {{ product.unit }}
            </option>
          </select>
        </div>
        <!--  -->
        <button
          type="button"
          class="btn btn-outline-danger my-3"
          @click="addToCart(product.id, product.num)"
        >
          加到購物車
        </button>
      </div>
    </div>
    <Question class="my-5"/>
  </div>
</template>
<script>
import emitter from "@/methods/emitter";
import Question from "@/components/front/Question.vue";

export default {
  data() {
    return {
      product: {},
      id: "",
      isLoading: false,
    };
  },
  components:{
    Question
  },
  methods: {
    getProduct() {
      // [API]: /api/:api_path/product/:id [方法]: get
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`;
      this.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        this.isLoading = false;
        if (response.data.success) {
          this.product = response.data.product;
        }
      });
    },
    addToCart(id, qty = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      this.isLoading = true;
      this.$http.post(url, { data: cart }).then((response) => {
        this.isLoading = false;
        this.$httpMessageState(response, "加入購物車");
        // this.$router.push('/cart');
        emitter.emit("sendCart", this.cart);
      });
    },
  },
  created() {
    this.id = this.$route.params.productId;
    this.getProduct();
  },
};
</script>
