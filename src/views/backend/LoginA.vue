<template>
    <!-- 11-3.加入讀取效果頁面 -->
  <!-- 11-3-2用props傳入狀態isLoading -->
  <LoadIng :active="isLoading"></LoadIng>
    <div class="container mt-5">
        <div class="row justify-content-center">

            <form class="col-8 bg-primary text-white p-5 rounded-3 opacity-70 " @submit.prevent="signIn">
                <h2 class="text-center">管理員登入</h2>
                <div class="mb-3">
                    <label for="inputEmail1" class="form-label">帳號</label>
                    <input type="email" class="form-control" id="inputEmail1" placeholder="帳號" required autofocus
                        aria-describedby="emailHelp" v-model="user.username">
                    
                </div>
                <div class="mb-3">
                    <label for="inputPassword" class="form-label">密碼</label>
                    <input type="password" class="form-control" id="inputPassword" placeholder="密碼" required autofocus
                        v-model="user.password">
                </div>
                <button type="submit" class="btn btn-success w-100">登入</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            user: {
                username: '',
                password: ''
            },
            // <!-- 11-3-2用props傳入狀態isLoading -->
            isLoading: false,
        };
    },
    methods: {
        signIn () {
            // console.log('login');
            const api = `${process.env.VUE_APP_API}admin/signin`;
            console.log(api);
            // 11-4 資料尚未讀取完成
            this.isLoading = true;
            this.$http.post(api, this.user)
                .then((res) => {
                // 假設登入成功轉入dash
                // 11-4 資料讀取完成
                this.isLoading = false;
                if (res.data.success) {
                    // console.log(res);
                    const { token, expired } = res.data;
                    // console.log(token, expired);
                    document.cookie = `hexToken=${token}; expired=${new Date(expired)}`;
                    // 跳轉入dash
                    this.$router.push('/dashboard/products');
                }
                });
        },
    },
};
</script>