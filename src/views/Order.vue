<template>
    <div class="container ">
        <div class="row text-center my-3">
            <ul class="d-flex justify-content-around gap-3 fs-4 my-3">
                <li class="border p-3 bg-primary text-white border-r-20 ">Step1<br />購物清單</li>
                <li class="border p-3 bg-primary border-r-20 text-white">Step2<br />填寫資料</li>
                <li class="border p-3 border-r-20 text-secondary">Step3<br />結帳流程</li>
            </ul>
        </div>

        <div class="row d-flex justify-content-between">

            <div class="col-lg-5 col-md-12 p-0 my-3">
                <table class="table shadow order-card">
                    <thead class="bg-primary text-white   text-center ">
                        <tr>
                            <td colspan="4">
                                <h3>訂單資訊</h3>
                            </td>
                        </tr>

                    </thead>
                    <tbody>
                        <tr>
                            <th>品名</th>
                            <th>單價</th>
                            <th>數量</th>
                            <th>小計</th>
                        </tr>
                        <template v-if="cart.carts">
                            <tr v-for="item in cart.carts" :key="item.id">
                                <td>{{ item.product.title }}</td>
                                <td>{{ item.product.price }}</td>
                                <td>{{ item.qty }} / {{ item.product.unit }}</td>
                                <td>NT$ {{ item.product.price * item.qty }}</td>
                            </tr>
                        </template>
                    </tbody>
                    <tfoot class="bg-primary text-white  text-center ">
                        <tr class="fs-4">
                            <td colspan="4">總計 NT$ {{ cart.final_total }}</td>
                        </tr>
                    </tfoot>
                </table>

            </div>

            <div class="col-lg-6 col-md-12 border p-3 my-3 bg-primary text-white fs-5 shadow">
                <div class="text-center">
                    <h3 class="fw-bold">客戶資料</h3>
                </div>
                <hr>
                <Form v-slot="{ errors }" @submit="createOrder">
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <Field id="email" name="email" type="email" class="form-control"
                            :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email" rules="email|required"
                            v-model="form.user.email">
                        </Field>
                    </div>

                    <div class="mb-3">
                        <label for="name" class="form-label">姓名</label>
                        <Field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
                            placeholder="請輸入姓名" rules="required" v-model="form.user.name"></Field>
                        <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
                    </div>

                    <div class="mb-3">
                        <label for="tel" class="form-label">電話</label>
                        <Field id="tel" name="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
                            placeholder="請輸入電話" rules="required" v-model="form.user.tel"></Field>
                        <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
                    </div>

                    <div class="mb-3">
                        <label for="address" class="form-label">地址</label>
                        <Field id="address" name="地址" type="text" class="form-control"
                            :class="{ 'is-invalid': errors['地址'] }" placeholder="請輸入地址" rules="required"
                            v-model="form.user.address"></Field>
                        <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
                    </div>

                    <div class="mb-3">
                        <label for="message" class="form-label">留言</label>
                        <textarea name="" id="message" class="form-control" cols="20" rows="3"
                            v-model="form.message"></textarea>
                    </div>
                    <div class="d-flex justify-content-between my-3 ">
                        <router-link to="/cart">
                            <button class="btn btn-lg btn-outline-secondary "><i
                                    class="bi bi-caret-left-fill"></i>上一步</button>
                        </router-link>
                        <button class="btn btn-lg btn-outline-danger ">送出訂單<i class="bi bi-caret-right-fill"></i></button>
                    </div>
                </Form>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            products: [],
            product: {},
            status: {
                loadingItem: '', // 對應品項 id
            },
            form: {
                user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: '',
                },
                message: '',
            },
            cart: {},
            messages: '',
            coupon_code: '',
        };
    },
    methods: {
        getCart() {
            // [API]: /api/:api_path/cart[方法]: get
            const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
            this.isLoading = true;
            console.log(url);
            this.$http.get(url)
                .then((res) => {
                    console.log(res.data.data);
                    this.cart = res.data.data;
                    this.messages = res.messages;
                })
        },
        createOrder() {
            const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
            const order = this.form;
            this.$http.post(url, { data: order })
                .then((res) => {
                    console.log(res);
                    this.$httpMessageState(res, "送出訂單");
                    const orderId = res.data.orderId;
                    this.$router.push(`./checkout/${orderId}`);
                });
        },
    },
    created() {
        this.getCart()
    },
}
</script>
<style lang="scss">
@media screen and (min-width: 769px) {
    .order-card {
        position: sticky;
        top: 85px;
    }
}
</style>
