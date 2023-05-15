<template>
  <!-- 11-3.加入讀取效果頁面 -->
  <!-- 11-3-2用props傳入狀態isLoading -->
  <LoadIng :active="isLoading"></LoadIng>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarText">
        <div class="navbar-nav me-auto mb-2 mb-lg-0">
          <router-link to="/products" class="nav-link">前台</router-link>
          <router-link to="/dashboard/products" class="nav-link">產品</router-link>
          <router-link to="/dashboard/orders" class="nav-link">訂單</router-link>
          <router-link to="/dashboard/coupons" class="nav-link">優惠卷</router-link>
        </div>
            <button type="button" class="btn btn-outline-info" @click.prevent="logout">
              登出
            </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      // <!-- 11-3-2用props傳入狀態isLoading -->
      isLoading: false,
    }
  },
  methods: {
    logout () {
      const api = `${process.env.VUE_APP_API}logout`;
      // console.log(api);
      // 11-4 資料尚未讀取完成
      this.isLoading = true;
      this.$http.post(api, this.user)
        .then((res) => {
          // 11-4 資料讀取完成
          this.isLoading = false;
          if (res.data.success) {
            this.$router.push('/login');
          }
        })
    }
  }
}
</script>