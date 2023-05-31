<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-primary bg-body-tertiary">
      <div class="container-fluid">
        <router-link to="/" class="logo fs-1">coffee</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon text-white"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 fs-5 fw-bold">
            <li class="nav-item">
              <router-link to="/products" class="nav-link text-white"
                >產品介紹</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/cart" class="nav-link text-white"
                >購物車
                
              </router-link>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
<script>
import CartIcon from "./CartIcon.vue";
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
      this.$http.get(url).then((res) => {
        // console.log(res.data.data);
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
