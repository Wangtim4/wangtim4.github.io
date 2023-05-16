<template>
  <div class="banner">
    <div class="text-box p-3">
      <h3>獲取優惠卷 </h3>
      <button class="btn btn-outline-primary" @click.prevent="subscription()">點我領取</button>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2';
import Sweet from '@/components/unit/Sweet';

export default {
  components: {
    Sweet,
  },
  methods: {
    subscription() {
        Swal.fire({
          icon: 'success',
          title: '優惠碼: follow08',
        });
    },
  },
}
</script>
<style lang="scss" scoped>
  .banner{
    height: 40vh;
    background-image: url('@/assets/images/coffee_banner.jpg');
    background-position: center;
    background-size: cover;

    position: relative;
    
    .text-box{
      background: rgba($color: #fff, $alpha: .8);
      width: 40%;
      height: 50%;
      border-radius: 16px;
      
      position: absolute;
      top: 50%;
      left: 10%;
      transform: translateY(-50%);
    }
  }
</style>


