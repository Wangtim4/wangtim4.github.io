<template>
  <Navbar></Navbar>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
    <router-view />
  </div>
</template>
<script>
import Navbar from '@/components/NavBar.vue';
// 12.導入mitt
import emitter from '@/methods/emitter';
import ToastMessages from '@/components/ToastMessages.vue';
export default {
  components: {
    Navbar,
    ToastMessages,
  },
  // 12.最外層加上 provide()
  provide () {
    return {
      emitter,
    };
  },
  created () {
    // cookie是否存在
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
    // console.log(token);
    this.$http.defaults.headers.common.Authorization = token;

    const api = `${process.env.VUE_APP_API}api/user/check`;
    // console.log(api);
    this.$http.post(api, this.user)
      .then((res) => {
        // 登入成功
        // console.log(res);
        // 登入失敗
        if (!res.data.success) {
          this.$router.push('/login');
        }
      });
  }
}
</script>