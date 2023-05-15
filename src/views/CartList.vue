<template>
    <div class="container my-5">
            <div class="col-12">
                <div v-if="cart.carts.length > 0">
                    <div class="row text-center my-5">
                        <ul class="d-flex justify-content-around gap-3 fs-4 my-3">
                            <li class="border p-3 bg-primary text-white border-r-20 ">Step1<br />購物清單</li>
                            <li class="border p-3  border-r-20 ">Step2<br />填寫資料</li>
                            <li class="border p-3 border-r-20 text-secondary">Step3<br />結帳流程</li>
                        </ul>
                    </div>
                    <table class="table border fs-5 align-middle text-center">
                        <thead class="bg-primary text-white  ">
                            <!-- <th colspan="6"><h3>購物清單</h3></th> -->
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
                            <tr v-for="item in cart.carts" :key="item.id">
                                <td>
                                    <img :src="item.product.imageUrl" class="img-object-fit-100" alt="">
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
                                <td>NT$ {{ item.product.price }}</td>
                                <td>NT$ {{ item.total }}</td>
                                <td><button type="button" class="btn btn-outline-danger"
                                        :disabled="status.loadingItem === item.id" @click="removeCartItem(item.id)"><i
                                            class="bi bi-x-lg"></i></button></td>
                            </tr>
                        </tbody>
                        <tfoot class="fs-2">
                            <tr>
                                <td colspan="5" class="text-end">總計 共 NT$ {{ cart.final_total }}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <div class="d-flex justify-content-between">
                    <router-link to="/products">
                        <button class="btn btn-lg btn-secondary"><i class="bi bi-caret-left-fill"></i>繼續購物</button>
                    </router-link>
                    <router-link to="/order">
                        <button class="btn btn-lg btn-danger">下一步<i class="bi bi-caret-right-fill"></i></button>
                    </router-link>
                </div>
                </div>
                <div class="mb-3 no-shop-box" v-else>
                    <h3 class="py-5 mt-3">
                        哎呀！您的購物車是空的，趕快去挑選吧！
                    </h3>
                    <router-link to="/products">
                        <button class="btn btn-lg btn-secondary"><i class="bi bi-caret-left-fill"></i>繼續購物</button>
                    </router-link>
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
<style lang="scss" scoped>
.img-object-fit-100 {
    height: 100px;
    object-fit: cover;
}
</style>

