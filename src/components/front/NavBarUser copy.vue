<template>
  <header >
    <div class="header">
      <router-link to="/" class="nav-link">
        <h1><span class="logo">coffee</span></h1>
      </router-link>
      <div class="menu">
        <router-link to="/products">產品介紹</router-link>
        <router-link to="/cart">購物車</router-link>
      </div>
    </div>
  </header>
  
</template>
<script>
import CartIcon from './CartIcon.vue';
export default {
  data() {
    return {
      cart: {},
    };
  },
  methods: {
    getCart() {
      // [API]: /api/:api_path/cart[方法]: get
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      console.log(url);
      this.$http.get(url).then((res) => {
        console.log(res.data.data);
        this.isLoading = false;
        this.cart = res.data.data;
        this.messages = res.messages;
      });
    },
  },
  created() {
    this.getCart();
  },
};
</script>