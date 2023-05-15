<template>
  <div>
    <LoadIng :active="isLoading"></LoadIng>
    <div class="container-fluid">
      <div class="row mt-4" v-if="products.length > 0">
        <div class="col-lg-2 col-md-3 mb-2">
          <ul class="list-group rounded-0">
            <a href="#"
               class="list-group-item list-group-item-action"
               @click.prevent="filterCategory = ''"
               :class="{ active: filterCategory === '' }">
              全部商品
            </a>
            <a class="list-group-item list-group-item-action"
               href="#"
               @click.prevent="filterCategory = item"
               :class="{ active: item === filterCategory }"
               v-for="item in categories"
               :key="item">
              {{ item }}
            </a>
          </ul>
        </div>
        <div class="col-lg-10 col-md-9">
          <div class="row d-flex justify-content-between">
            <template v-for="item in products" :key="item.id">
              <div class="col-lg-4 col-sm-6 mb-4">
                <div class="card h-100 ">
                  <router-link :to="`/product/${item.id}`">
                    <!-- <div style="height: 200px; background-size: cover; background-position: center"
                      :style="{ backgroundImage: `url(${item.imageUrl})` }"></div> -->
                      <img :src="item.imageUrl" alt="" class="img-fluid mb-3 " style="height: 200px; width: 400px; object-fit: cover;">                    
                  </router-link>
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <a href="#" class="fs-4 fw-bold" @click.prevent="getProduct(item.id)"> {{ item.title }}
                      </a>

                      <p class="badge bg-secondary fs-6 ">{{ item.category }}
                      </p>
                    </div>
                    <p class="card-text">{{ item.content }}</p>
                    <div class="d-flex justify-content-between align-items-center my-2">
                      <span class="fs-6 text-secondary text-decoration-line-through">原價 : {{ item.origin_price }} </span>
                      <span class="fs-4 fw-bold text-danger text-end">特價 : {{ item.price }} </span>
                    </div>
                    <div class="d-grid mx-auto">
                      <!-- :disabled="this.status.loadingItem === item.id"避免重複點選 當id=loadingItem不能點 -->
                    </div>
                  </div>
                  <button class="btn btn-outline-primary fs-5 fw-bold border-2 rounded-0" @click="addCart(item.id)"
                    :disabled="this.status.loadingItem === item.id">
                    
                    <div v-if="this.status.loadingItem === item.id" class="spinner-grow spinner-grow-sm"
                      role="status">
                    </div>
                    <i v-else class="bi bi-cart-fill"></i> 
                    加入購物車 
                  </button>
                </div>
              </div>
            </template>
          </div>
          <!-- 購物車列表 -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Sweet from '@/components/unit/Sweet';
export default {
  data() {
    return {
      products: [],
      // pagination: {},
      status: {
        // 2對應品項id
        loadingItem: '',
      },
      categories: ['中焙咖啡豆', '淺焙咖啡豆', '周邊商品'],
      filterCategory: '',
      isLoading: false,
    };
  },
  components: {
    Sweet,
  },
  computed: {
    filterCategories() {
      if (this.filterCategory) {
        return this.products.filter((item) => {
          const data = item.category
            .toLowerCase()
            .includes(this.filterCategory.toLowerCase());
          return data;
        });
      }
      return this.products;
    },
  },
  methods: {
    getProducts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products`;
      this.isLoading = true;
      console.log(this.isLoading);
      this.$http.get(url)
      .then((response) => {
        console.log('res',response);
        this.isLoading = false;
        this.products = response.data.products;
        const { categoryName } = this.$route.params;
        if (categoryName) {
            this.filterCategory = categoryName;
          }
        // console.log('products:', products);       
      });
    },
    getProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    addCart(id) {
      console.log(id);
      // [API]: /api/:api_path/cart [方法]: post [說明]: product_id(String)、qty(Number) 為必填欄位 [參數]: { "data": { "product_id":"-L9tH8jxVb2Ka_DYPwng","qty":1 } }
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      console.log(url);
      this.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty: 1,
      };
      this.$http.post(url, { data: cart })
        .then((res) => {
          Sweet.fire({
            title: '已加入購物車',
            icon: 'success',
          });
          this.status.loadingItem = '';
          console.log(res);
        })
    }
  },
  created() {
    this.getProducts();
  },
};
</script>