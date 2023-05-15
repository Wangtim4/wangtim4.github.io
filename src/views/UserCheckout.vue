<template>
    <Loading :active="isLoading"></Loading>
    <div class="row text-center my-3">
        <ul class="d-flex justify-content-around gap-3 fs-4 my-3">
            <li class="border p-3 bg-primary text-white border-r-20 ">Step1<br />購物清單</li>
            <li class="border p-3 bg-primary border-r-20 text-white">Step2<br />填寫資料</li>
            <li class="border p-3 border-r-20  bg-primary text-white">Step3<br />結帳流程</li>
        </ul>
    </div>
    <div class="my-5 row justify-content-center text-center">
        <form class="col-md-10 " @submit.prevent="payOrder">
            <h2 class="text-primary fw-bold">訂單資料</h2>
            <table class=" mb-5 table align-middle border fs-5 ">
                <thead class="bg-primary text-white fs-4">
                    <tr>
                        <th>品名</th>
                        <th>數量</th>
                        <th>單價</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in order.products" :key="item.id">
                        <td>{{ item.product.title }}</td>
                        <td>{{ item.qty }}/{{ item.product.unit }}</td>
                        <td>{{ item.final_total }}</td>
                    </tr>
                </tbody>
                <tfoot class="bg-primary text-white fs-4">
                    <tr>
                        <td colspan="3" class="text-end">總計NT$ {{ order.total }}</td>
                    </tr>
                </tfoot>
            </table>
            <h2 class="text-primary fw-bold">收件人資訊</h2>
            <table class="table border fs-5 border-w">
                <tbody>
                    <tr>
                        <th class="bg-primary text-white ">Email</th>
                        <td class="text-primary fw-bold">{{ order.user.email }}</td>
                    </tr>
                    <tr>
                        <th class="bg-primary text-white ">姓名</th>
                        <td class="text-primary fw-bold">{{ order.user.name }}</td>
                    </tr>
                    <tr>
                        <th class="bg-primary text-white ">收件人電話</th>
                        <td class="text-primary fw-bold">{{ order.user.tel }}</td>
                    </tr>
                    <tr>
                        <th class="bg-primary text-white ">收件人地址</th>
                        <td class="text-primary fw-bold">{{ order.user.address }}</td>
                    </tr>
                    <tr>
                        <th class="bg-primary text-white ">付款狀態</th>
                        <td class="fw-bold">
                            <span v-if="!order.is_paid" class="text-danger">尚未付款</span>
                            <span v-else class="text-success">
                                <h3>付款完成</h3>
                                <p>感謝您的購買，成立訂單後約 3 - 5 的工作天出貨。</p>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="text-center" v-if="order.is_paid === false">
                <button class="btn btn-outline-danger btn-lg" style="width: 50%;">前往付款</button>
            </div>
            <div class="text-center" v-else>
                <router-link to="/products">
                <button class="btn btn-outline-success btn-lg" style="width: 50%;">返回首頁</button>
                </router-link>
            </div>
        </form>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            order: {
                user: {},
            },
            orderId: '',
            isLoading: false,
        };
    },
    methods: {
        getOrder() {
            const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`;
            this.$http.get(url)
                .then((res) => {
                    if (res.data.success) {
                        this.order = res.data.order;
                        console.log(this.order);
                    }
                });
        },
        payOrder() {
            const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`;
            this.$http.post(url)
                .then((res) => {
                    console.log(res);
                    if (res.data.success) {
                        this.getOrder();
                    }
                });
        },
    },
    created() {
        this.orderId = this.$route.params.orderId;
        console.log(this.orderId);
        this.getOrder();
    },
};
</script>
