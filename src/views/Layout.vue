<template>
    <NavBarUser />
    <emitter></emitter>
    <ToastMessages></ToastMessages>
    <router-view></router-view>
    <Footer />
</template>
<script>
import NavBarUser from '@/components/front/NavBarUser.vue';
import Footer from '@/components/front/Footer.vue';
import emitter from "@/methods/emitter";
import ToastMessages from '@/components/ToastMessages.vue';

export default {
    data() {
        return {};
    },
    components: {
        NavBarUser,
        Footer,
        emitter,
        ToastMessages
    },
    provide() { //內層元件都能用外層的功能+inject
        return {
            emitter,
        };
    },
}
</script>