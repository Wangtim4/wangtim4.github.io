<template>
    <div>
        <i class="bi bi-cart-fill fs-3"></i>
        <span class="badge badge-pill badge-danger" style="transform: translateX(-7px) translateY(-2px)">
            {{ cartTotal }}
        </span>
    </div>
</template>
<script>
import emitter from '@/methods/emitter';
export default {
    data() {
        return {
            data: [],
            cart: {},
            cartTotal: 0,
        };
    },
    created() {
        emitter.on("sendCart", (data) => {
            this.cart = data;
            this.getCart();
        });
    },
    methods: {
        getCart() {
            const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
            this.$http.get(url).then((res) => {
                console.log('resdata', res);
                console.log('cartTotal', res.data.data.carts.length);
                this.cartTotal = res.data.data.carts.length;
            });
        },
    },
};
</script>