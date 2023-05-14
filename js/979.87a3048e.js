"use strict";(self["webpackChunk_0418"]=self["webpackChunk_0418"]||[]).push([[979],{6979:function(t,r,e){e.r(r),e.d(r,{default:function(){return M}});var s=e(3396),l=e(9242),a=e(7139);const d=(0,s.uE)('<div class="row text-center my-3"><ul class="d-flex justify-content-around gap-3 fs-4 my-3"><li class="border p-3 bg-primary text-white border-r-20">Step1<br>購物清單</li><li class="border p-3 bg-primary border-r-20 text-white">Step2<br>填寫資料</li><li class="border p-3 border-r-20 bg-primary text-white">Step3<br>結帳流程</li></ul></div>',1),i={class:"my-5 row justify-content-center text-center"},o=(0,s._)("h2",{class:"text-primary fw-bold"},"訂單資料",-1),n={class:"mb-5 table align-middle border fs-5"},c=(0,s._)("thead",{class:"bg-primary text-white fs-4"},[(0,s._)("tr",null,[(0,s._)("th",null,"品名"),(0,s._)("th",null,"數量"),(0,s._)("th",null,"單價")])],-1),u={class:"bg-primary text-white fs-4"},p={colspan:"3",class:"text-end"},h=(0,s._)("h2",{class:"text-primary fw-bold"},"收件人資訊",-1),b={class:"table border fs-5 border-w"},_=(0,s._)("th",{class:"bg-primary text-white"},"Email",-1),w={class:"text-primary fw-bold"},y=(0,s._)("th",{class:"bg-primary text-white"},"姓名",-1),g={class:"text-primary fw-bold"},m=(0,s._)("th",{class:"bg-primary text-white"},"收件人電話",-1),f={class:"text-primary fw-bold"},x=(0,s._)("th",{class:"bg-primary text-white"},"收件人地址",-1),v={class:"text-primary fw-bold"},k=(0,s._)("th",{class:"bg-primary text-white"},"付款狀態",-1),z={class:"fw-bold"},D={key:0,class:"text-danger"},I={key:1,class:"text-success"},O=(0,s._)("h3",null,"付款完成",-1),$=(0,s._)("p",null,"感謝您的購買，成立訂單後約 3 - 5 的工作天出貨。",-1),S=[O,$],L={key:0,class:"text-center"},j=(0,s._)("button",{class:"btn btn-outline-danger btn-lg",style:{width:"50%"}},"前往付款",-1),C=[j],E={key:1,class:"text-center"},H=(0,s._)("button",{class:"btn btn-outline-success btn-lg",style:{width:"50%"}},"返回首頁",-1);function W(t,r,e,O,$,j){const W=(0,s.up)("Loading"),Y=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s.Wm)(W,{active:$.isLoading},null,8,["active"]),d,(0,s._)("div",i,[(0,s._)("form",{class:"col-md-10",onSubmit:r[0]||(r[0]=(0,l.iM)(((...t)=>j.payOrder&&j.payOrder(...t)),["prevent"]))},[o,(0,s._)("table",n,[c,(0,s._)("tbody",null,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)($.order.products,(t=>((0,s.wg)(),(0,s.iD)("tr",{key:t.id},[(0,s._)("td",null,(0,a.zw)(t.product.title),1),(0,s._)("td",null,(0,a.zw)(t.qty)+"/"+(0,a.zw)(t.product.unit),1),(0,s._)("td",null,(0,a.zw)(t.final_total),1)])))),128))]),(0,s._)("tfoot",u,[(0,s._)("tr",null,[(0,s._)("td",p,"總計NT$ "+(0,a.zw)($.order.total),1)])])]),h,(0,s._)("table",b,[(0,s._)("tbody",null,[(0,s._)("tr",null,[_,(0,s._)("td",w,(0,a.zw)($.order.user.email),1)]),(0,s._)("tr",null,[y,(0,s._)("td",g,(0,a.zw)($.order.user.name),1)]),(0,s._)("tr",null,[m,(0,s._)("td",f,(0,a.zw)($.order.user.tel),1)]),(0,s._)("tr",null,[x,(0,s._)("td",v,(0,a.zw)($.order.user.address),1)]),(0,s._)("tr",null,[k,(0,s._)("td",z,[$.order.is_paid?((0,s.wg)(),(0,s.iD)("span",I,S)):((0,s.wg)(),(0,s.iD)("span",D,"尚未付款"))])])])]),!1===$.order.is_paid?((0,s.wg)(),(0,s.iD)("div",L,C)):((0,s.wg)(),(0,s.iD)("div",E,[(0,s.Wm)(Y,{to:"/products"},{default:(0,s.w5)((()=>[H])),_:1})]))],32)])],64)}var Y={data(){return{order:{user:{}},orderId:"",isLoading:!1}},methods:{getOrder(){const t=`https://vue3-course-api.hexschool.io/api/coffee-api/order/${this.orderId}`;this.$http.get(t).then((t=>{t.data.success&&(this.order=t.data.order,console.log(this.order))}))},payOrder(){const t=`https://vue3-course-api.hexschool.io/api/coffee-api/pay/${this.orderId}`;this.$http.post(t).then((t=>{console.log(t),t.data.success&&this.getOrder()}))}},created(){this.orderId=this.$route.params.orderId,console.log(this.orderId),this.getOrder()}},q=e(89);const K=(0,q.Z)(Y,[["render",W]]);var M=K}}]);
//# sourceMappingURL=979.87a3048e.js.map