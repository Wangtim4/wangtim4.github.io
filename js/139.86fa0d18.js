"use strict";(self["webpackChunk_0418"]=self["webpackChunk_0418"]||[]).push([[139],{9139:function(t,e,l){l.r(e),l.d(e,{default:function(){return O}});var r=l(3396),s=l(7139);const o={class:"container"},d=(0,r._)("h3",{class:"text-center mt-3"},"訂單資訊",-1),n={class:"my-5 row justify-content-center"},u={class:"col-lg-6"},a={class:"table border"},c=(0,r._)("thead",null,[(0,r._)("tr",null,[(0,r._)("th",null,"品名"),(0,r._)("th",null,"數量"),(0,r._)("th",null,"單價")])],-1),i=(0,r._)("td",{colspan:"2",class:"text-end"},"總計",-1),_={class:"table border col-lg-6"},h=(0,r._)("th",{width:"100"},"Email",-1),p=(0,r._)("th",null,"姓名",-1),w=(0,r._)("th",null,"收件人電話",-1),g=(0,r._)("th",null,"收件人地址",-1),f=(0,r._)("th",null,"付款狀態",-1),b={key:0},m={key:1,class:"text-success"},y={key:0,class:"text-end"},z=(0,r._)("button",{class:"btn btn-danger"},"確認付款去",-1),k=[z];function v(t,e,l,z,v,x){return(0,r.wg)(),(0,r.iD)("div",o,[d,(0,r._)("div",n,[(0,r._)("form",u,[(0,r._)("table",a,[c,(0,r._)("tbody",null,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(v.order.products,(t=>((0,r.wg)(),(0,r.iD)("tr",null,[(0,r._)("td",null,(0,s.zw)(t.product.title),1),(0,r._)("td",null,(0,s.zw)(t.qty)+" / "+(0,s.zw)(t.product.unit),1),(0,r._)("td",null,(0,s.zw)(t.final_total),1)])))),256))]),(0,r._)("tfoot",null,[(0,r._)("tr",null,[i,(0,r._)("td",null,(0,s.zw)(v.order.total),1)])])])]),(0,r._)("form",{class:"col-lg-6",onSubmit:e[0]||(e[0]=(...e)=>t.createOrder&&t.createOrder(...e))},[(0,r._)("table",_,[(0,r._)("tbody",null,[(0,r._)("tr",null,[h,(0,r._)("td",null,(0,s.zw)(v.order.user.email),1)]),(0,r._)("tr",null,[p,(0,r._)("td",null,(0,s.zw)(v.order.user.name),1)]),(0,r._)("tr",null,[w,(0,r._)("td",null,(0,s.zw)(v.order.user.tel),1)]),(0,r._)("tr",null,[g,(0,r._)("td",null,(0,s.zw)(v.order.user.address),1)]),(0,r._)("tr",null,[f,(0,r._)("td",null,[v.order.is_paid?((0,r.wg)(),(0,r.iD)("span",m,"付款完成")):((0,r.wg)(),(0,r.iD)("span",b,"尚未付款"))])])])]),!1===v.order.is_paid?((0,r.wg)(),(0,r.iD)("div",y,k)):(0,r.kq)("",!0)],32)])])}var x={data(){return{order:{user:{}},orderId:"",isLoading:!1}},methods:{getOrder(){const t=`https://vue3-course-api.hexschool.io/api/coffee-api/order/${this.orderId}`;this.$http.get(t).then((t=>{t.data.success&&(this.order=t.data.order,console.log(this.order))}))}},payOrder(){const t=`https://vue3-course-api.hexschool.io/api/coffee-api/pay/${this.orderId}`;this.$http.post(t).then((t=>{console.log(t),t.data.success&&this.getOrder()}))},created(){this.orderId=this.$route.params.orderId,console.log(this.orderId),this.getOrder()}},D=l(89);const I=(0,D.Z)(x,[["render",v]]);var O=I}}]);
//# sourceMappingURL=139.86fa0d18.js.map