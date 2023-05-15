<template>
  <!-- 11-3.加入讀取效果頁面 -->
  <!-- 11-3-2用props傳入狀態isLoading -->
  <LoadIng :active="isLoading"></LoadIng>
  <h1 class="text-center">產品列表</h1>
  <div class="text-end">
    <!--  @click="$refs.productModal"指向 下方<ProductModal ref="productModal"></ProductModal>-->
    <!-- <button class="btn btn-primary" type="button" @click="$refs.productModal.showModal()"> 改為-->
    <button class="btn btn-primary" type="button" @click="openModal(true)">
      新增產品
    </button>
  </div>
  <table class="table mt-4 border border-2 ">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <!-- 14.3套用全域的千分號方法 -->
        <td class="text-right">
          {{ $filter.currency(item.price) }}
        </td>
        <td class="text-right">
          {{ $filter.currency(item.origin_price) }}
        </td>
        <td>
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm"
            @click="openModal(false,item)">編輯</button>
            <!-- @click="openModal(false,item)"的item為v-for="item in products" -->
            <button class="btn btn-outline-danger btn-sm"
            @click="openDelModal(item)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <PaginaTion :pages = pagination
  @emit-pages="getProducts"></PaginaTion>
  <!--13.3-1 :pages = pagination 前內props後外pagination -->
  <!-- 13.3-2 @emit-pages="getProducts" 前內emit後外getProducts觸發事件 -->
  <ProductModal ref="productModal" :product="tempProduct" @update-product="updateProduct">
    <!-- :product="tempProduct"前內後外 -->
    <!-- @update-product="updateProduct"
      ##1##
      @update-product用來接收$emit('update-product', tempProduct)
      ##2##
      updateProduct觸發事件tempProduct = item
     -->
  </ProductModal>
  <DelModal :item="tempProduct"
  ref="delModal"
  @del-item="delProduct"></DelModal>
</template>
<!-- 回傳資料 -->
<script>
import ProductModal from '@/components/ProductModal.vue';
import DelModal from '@/components/DelModal.vue';
import PaginaTion from '@/components/PaginaTion.vue';
export default {
  data () {
    return {
      products: [],
      pagination: {},
      //  tempProduct: {}外層傳送
      tempProduct: {},
      // #7-1判斷是否為新增
      isNew: false,
      // <!-- 11-3-2用props傳入狀態isLoading -->
      isLoading: false,
    };
  },
  components: {
    ProductModal,
    DelModal,
    PaginaTion,
  },
  inject: ['emitter'],
  methods: {
    // 13.製作分頁
    // [API]: /api/:api_path/admin/products?page=:page [方法]: get
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      // 11-3-3傳入狀態isLoading
      // 11-4 資料尚未讀取完成
      this.isLoading = true;
      this.$http.get(api)
        .then((res) => {
          // 11-4 資料讀取完成
          this.isLoading = false;
          if (res.data.success) {
            console.log(res.data);
            this.products = res.data.products;
            // 13.分頁資訊
            this.pagination = res.data.pagination;
          }
        }).catch((err) => {
          console.log(err);
        })
    },
    // #7-1判斷是否為新增
    openModal (isNew, item) {
      // 7-2用openModal (isNew, item)傳入的值檢查isNew是否為新增, item為this.tempProduct
      // console.log(isNew, item);
      // 7-3判斷是否為新增
      if (isNew) {
        // 7-3新增-每次打開清空
        this.tempProduct = {};
      } else {
        // 7-3更改-解構API取得item
        this.tempProduct = { ...item };
      }
      // 7-3將上方isNew狀態存入
      this.isNew = isNew;
      // 6.productModal傳入的值
      const productComponent = this.$refs.productModal;
      productComponent.showModal();
    },
    updateProduct (item) {
      // console.log(item);
      this.tempProduct = item;
      // 7-5新增 [API]: /api/:api_path/admin/product [方法]: post
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      // 7-5編輯[API]: /api/:api_path/admin/product/:id  [方法]: put
      if (!this.isNew) {
      api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
      httpMethod = 'put';
      }
      const productComponent = this.$refs.productModal;
      // 7-5-3判斷路徑
      this.$http[httpMethod](api, { data: this.tempProduct }).then((response) => {
        console.log(response);
        // 關閉視窗
        productComponent.hideModal();
        // 重新讀取列表
        this.getProducts();
        this.$httpMessageState(response);
        // Toast emitter
        // if (response.data.success) {
        //   this.getProducts();
        //   this.emitter.emit('push-message', {
        //     style: 'success',
        //     title: '更新成功',
        //   });
        // } else {
        //   this.emitter.emit('push-message', {
        //     style: 'danger',
        //     title: '更新失敗',
        //     content: response.data.message.join('、'),
        //   });
        // }
      });
    },
    // 9-1開啟刪除
    openDelModal (item) {
      // console.log("delete");
      this.tempProduct = { ...item };
      // console.log(this.tempProduct);
      // this.$refs.delModal獲取資料
      const delComponent = this.$refs.delModal;
      // 顯示資料
      delComponent.showModal();
    },
    // 9-2刪除功能
    delProduct () {
      // 串接API路徑和方法 [API]: /api/:api_path/admin/product/:product_id [方法]: delete
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      // console.log(url);
      // API路徑和方法
      this.$http.delete(url)
      .then((res) => {
        // console.log(res.data);
        const delComponent = this.$refs.delModal;
        // 關閉視窗
        delComponent.hideModal();
        // 從新獲取資料
        this.getProducts();
      });
    },
  },
  // 觸發
  created () {
    this.getProducts();
  }
}
</script>