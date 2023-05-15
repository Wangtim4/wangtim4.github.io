<template>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <!-- 13.2 顯示全部分頁 pages 為props: ['pages'], -->
        <li class="page-item" v-for="page in pages.total_pages" :key="page"
        :class="{'active':page === pages.current_page}">
        <!-- 13.4 判斷當前頁數:class="{'active':page === pages.current_page}" -->
          <!-- 13.3 建立分頁連結導向 -->
          <a class="page-link" href="#" @click.prevent="updatePage(page)">{{ page }}</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </template>
  <script>
  // 13.2 :pages="{ 頁碼資訊 }"
  // 13.3 @emitPages="更新頁面事件"
  export default {
    props: ['pages'],
    methods: {
      // 13.3-2 點擊事件後，將頁碼送出
      updatePage (page) {
        this.$emit('emit-pages', page);
      },
    },
  };
  </script>