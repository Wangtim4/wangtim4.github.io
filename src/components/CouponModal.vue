<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
        ref="modal">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="title">標題</label>
                        <input type="text" class="form-control" id="title" v-model="tempCoupon.title" placeholder="請輸入標題">
                    </div>
                    <div class="mb-3">
                        <label for="coupon_code">優惠碼</label>
                        <input type="text" class="form-control" id="coupon_code" v-model="tempCoupon.code"
                            placeholder="請輸入優惠碼">
                    </div>
                    <div class="mb-3">
                        <label for="due_date">到期日</label>
                        <input type="date" class="form-control" id="due_date" v-model="due_date">
                    </div>
                    <div class="mb-3">
                        <label for="price">折扣百分比</label>
                        <input type="number" class="form-control" id="price" v-model.number="tempCoupon.percent"
                            placeholder="請輸入折扣百分比">
                    </div>
                    <div class="mb-3">
                        <div class="form-check">
                            <input type="checkbox" :true-value="1" :false-value="0" v-model="tempCoupon.is_enabled"
                                id="is_enable">
                            <label for="is_enable" class="form-check-label">是否啟用</label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="$emit('update-coupon', tempCoupon)">確定</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import modalMixin from '@/mixins/modalMixin';

export default {
    data() {
        return {
            // 2.建立內層暫存
            tempCoupon: {},
            due_date: '',
        }
    },
    // 1.接收外層傳入的資料
    props: {
        coupon: {},
    },
    // 3.監聽外層coupon資料變動並存入內層暫存，因為單向傳輸，所以要用emit傳出去
    watch: {
        coupon() {
            this.tempCoupon = this.coupon;
            console.log(this.tempCoupon.due_date);
            // 將時間格式改為 YYYY-MM-DD
            const dateAndTime = new Date(this.tempCoupon.due_date * 1000)
                .toISOString().split('T');
            [this.due_date] = dateAndTime;
        },
        due_date() {
            this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000);
        },
    },
    emits: ['update-coupon'],
    mixins: [modalMixin],
}
</script>