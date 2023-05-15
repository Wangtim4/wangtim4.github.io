// 載入node_modules\bootstrap\js\src\modal 使用
import Modal from "bootstrap/js/dist/modal";

export default {
    methods: {
        showModal () {
            this.modal.show();
        },
        hideModal () {
            this.modal.hide();
        },
    },
    // 元件載入完成才會運作
    mounted () {
    // this.$refs.modal指向外部html的ref="modal" 動元素
    // this.modal指向內部data的modal:{}
    this.modal = new Modal(this.$refs.modal);
  }
}