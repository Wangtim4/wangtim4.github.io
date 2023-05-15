<template>
    <div class="container">
        <div class="text-end">
            <button type="button" class="btn btn-primary" @click="openModal(true)">新增</button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>名稱</th>
                    <th>折扣百分比</th>
                    <th>到期日</th>
                    <th>是否啟用</th>
                    <th>編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, key) in coupons " :key="key">
                    <td>{{ item.title }}</td>
                    <td>{{ item.percent }}</td>
                    <td>{{ item.due_date }}</td>
                    <td>
                        <span class="text-info" v-if="item.is_enable === 1">啟用</span>
                        <span class="text-danger" v-else>未啟用</span>
                    </td>
                    <td>
                        <button class="btn btn-primary" @click="openModal(false, item)">編輯</button>
                        <button class="btn btn-danger">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <CouponModal ref="couponModal" :coupon="tempCoupon" @update-coupon="updateCoupon"></CouponModal>
    </div>
</template>
<script>
import CouponModal from '@/components/CouponModal.vue';
export default {
    data () {
        return {
            coupons: {},
            tempCoupon: {
                title: '',
                is_enable: 0,
                percent: 100,
                code: '',
            },
            isNew: false,
        };
    },
    components: {
        CouponModal,
    },
    methods: {
        getCoupons () {
            // [API]: /api/:api_path/admin/coupons?page=:page[方法]: get
            const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons`;
            this.$http.get(url)
                .then((res) => {
                    console.log(res);
                    this.coupons = res.data.coupons;
                })
        },
        openModal (isNew, item) {
            console.log(isNew, item);
            if (isNew) {
                this.tempCoupon = {};
            } else {
                this.tempCoupon = { ...item };
            }
            this.isNew = isNew;
            const couponComponent = this.$refs.couponModal;
            couponComponent.showModal();
        },
        updateCoupon (tempCoupon) {
            if (this.isNew) {
                const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
                this.$http.post(url, { data: tempCoupon }).then((response) => {
                    console.log(response, tempCoupon);
                    this.$httpMessageState(response, '新增優惠券');
                    this.getCoupons();
                    this.$refs.couponModal.hideModal();
                });
            } else {
                const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
                this.$http.put(url, { data: this.tempCoupon }).then((response) => {
                    console.log(response);
                    this.$httpMessageState(response, '新增優惠券');
                    this.getCoupons();
                    this.$refs.couponModal.hideModal();
                });
            }
        },
    },
    created () {
        this.getCoupons()
    }
}
</script>