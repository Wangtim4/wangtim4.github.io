<template>
    <div class="container my-5">
        <!-- <div class="row text-center my-3">
            <h3>購物清單</h3>
            <ul class="d-flex justify-content-around gap-5 ">
                <li class="border p-3 bg-gray-400">Step1<br />購物清單</li>
                <li class="border p-3">Step2<br />填寫資訊</li>
                <li class="border p-3">Step3<br />確認訂單</li>
                <li class="border p-3">Step4<br />完成付款</li>
            </ul>
        </div> -->
        <div class="row mt-5 ">
            <div class="col-lg-6">
                <table class="table border text-center">
                    <thead>
                        <tr>
                            <th>圖片</th>
                            <th>品名</th>
                            <th style="width: 200px;">數量</th>
                            <th>單價</th>
                            <th>小計</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="cart.carts">
                            <tr v-for="item in cart.carts" :key="item.id">
                                <td>
                                    <img :src="item.product.imageUrl" style="width: 80px;" alt="">
                                </td>
                                <td>{{ item.product.title }}</td>
                                <td>
                                    <div class="input-group">
                                        <input type="number" class="form-control" min="1"
                                            :disabled="item.id === status.loadingItem" v-model.number="item.qty"
                                            @change="updateCart(item)">
                                        <div class="input-group-text">/{{ item.product.unit }}
                                        </div>
                                    </div>
                                </td>
                                <td>{{ item.product.price }}</td>
                                <td>{{ item.total }}</td>
                                <td><button type="button" class="btn btn-outline-danger"
                                        :disabled="status.loadingItem === item.id" @click="removeCartItem(item.id)"><i
                                            class="bi bi-x-lg"></i></button></td>
                            </tr>
                        </template>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="5" class="text-end">總計 共 NT$ {{ cart.final_total }}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div class="col-lg-6 border p-3 border-radius-10">
                <Form v-slot="{ errors }" @submit="createOrder">
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <Field id="email" name="email" type="email" class="form-control"
                            :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email" rules="email|required"
                            v-model="form.user.email">
                        </Field>
                    </div>

                    <div class="mb-3">
                        <label for="name" class="form-label">收件人姓名</label>
                        <Field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
                            placeholder="請輸入姓名" rules="required" v-model="form.user.name"></Field>
                        <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
                    </div>

                    <div class="mb-3">
                        <label for="tel" class="form-label">收件人電話</label>
                        <Field id="tel" name="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
                            placeholder="請輸入電話" rules="required" v-model="form.user.tel"></Field>
                        <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
                    </div>

                    <div class="mb-3">
                        <label for="address" class="form-label">收件人地址</label>
                        <Field id="address" name="地址" type="text" class="form-control"
                            :class="{ 'is-invalid': errors['地址'] }" placeholder="請輸入地址" rules="required"
                            v-model="form.user.address"></Field>
                        <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
                    </div>

                    <div class="mb-3">
                        <label for="message" class="form-label">留言</label>
                        <textarea name="" id="message" class="form-control" cols="30" rows="10"
                            v-model="form.message"></textarea>
                    </div>
                    <div class="text-end">
                        <button class="btn btn-danger">送出訂單</button>
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
        removeCartItem(id) {
            // console.log(id);
            this.status.loadingItem = id;
            // [API]: /api/:api_path/cart/:id[方法]: delete
            const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
            console.log(url);
            this.$http.delete(url)
                .then((response) => {
                    // console.log(res);
                    this.$httpMessageState(response, '移除購物車品項');
                    this.status.loadingItem = '';
                    this.getCart();
                })
        },
        updateCart(item) {
            console.log(item);
            // [API]: /api/:api_path/cart/:id[方法]: put[說明]: product_id(String)、qty(Number) 為必填欄位、[參數]: { "data": { "product_id":"-L9tH8jxVb2Ka_DYPwng","qty":1 } }
            const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
            const cart = {
                product_id: item.product_id,
                qty: item.qty,
            };
            this.$http.put(url, { data: cart })
                .then((res) => {
                    console.log(res);
                    this.status.loadingItem = '';
                    this.getCart();
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
ul {
    list-style: none;
}
</style>
