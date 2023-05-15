<template>
    <Loading :active="isLoading"></Loading>
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-lg-5 col-md-10">
          <img :src="product.imageUrl" alt="" class="img-fluid mb-3 " style="height: 300px; width: 400px; object-fit: cover;">
        </div>
        <div class="col-lg-6 col-md-10 border pt-3 text-primary">
          <h2 class="fw-bold">{{ product.title }}</h2>
          <hr>
          <div>{{ product.content }}</div>
          <div>{{ product.description }}</div>
          <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
          <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
          <div class="h5 " v-if="product.price">現在只要 {{ product.price }} 元</div>
          <hr>
          <button type="button" class="btn btn-outline-danger"
                  @click="addToCart(product.id)">
            加到購物車
          </button>
        </div>
      </div>
    </div>
  </template>
  <script>
  import emitter from "@/methods/emitter";

  export default {
    data () {
      return {
        product: {},
        id: '',
      };
    },
    inject:[emitter],
    methods: {
      getProduct () {
        // [API]: /api/:api_path/product/:id [方法]: get
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`;
        // this.isLoading = true;
        this.$http.get(api).then((response) => {
          console.log(response.data);
          this.isLoading = false;
          if (response.data.success) {
            this.product = response.data.product;
          }
        });
      },
      addToCart (id, qty = 1) {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
        const cart = {
          product_id: id,
          qty,
        };
        this.isLoading = true;
        this.$http.post(url, { data: cart }).then((response) => {
          this.isLoading = false;
          this.$httpMessageState(response, '加入購物車');
          // this.$router.push('/cart');
          emitter.emit('sendCart', this.cart);
        });
      },
    },
    created () {
      this.id = this.$route.params.productId;
      this.getProduct();
    },
  };
  </script>