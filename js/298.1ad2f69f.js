"use strict";(self["webpackChunk_0418"]=self["webpackChunk_0418"]||[]).push([[298],{298:function(e,o,t){t.r(o),t.d(o,{default:function(){return W}});var n=t(3396),l=t(7139);const a={class:"container"},s={class:"text-end"},p={class:"table"},d=(0,n._)("thead",null,[(0,n._)("tr",null,[(0,n._)("th",null,"名稱"),(0,n._)("th",null,"折扣百分比"),(0,n._)("th",null,"到期日"),(0,n._)("th",null,"是否啟用"),(0,n._)("th",null,"編輯")])],-1),u={key:0,class:"text-info"},i={key:1,class:"text-danger"},c=["onClick"],r=(0,n._)("button",{class:"btn btn-danger"},"刪除",-1);function m(e,o,t,m,_,h){const b=(0,n.up)("CouponModal");return(0,n.wg)(),(0,n.iD)("div",a,[(0,n._)("div",s,[(0,n._)("button",{type:"button",class:"btn btn-primary",onClick:o[0]||(o[0]=e=>h.openCouponModal(!0))},"新增")]),(0,n._)("table",p,[d,(0,n._)("tbody",null,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(_.coupons,((o,t)=>((0,n.wg)(),(0,n.iD)("tr",{key:t},[(0,n._)("td",null,(0,l.zw)(o.title),1),(0,n._)("td",null,(0,l.zw)(o.percent),1),(0,n._)("td",null,(0,l.zw)(o.due_date),1),(0,n._)("td",null,[1===o.is_enable?((0,n.wg)(),(0,n.iD)("span",u,"啟用")):((0,n.wg)(),(0,n.iD)("span",i,"未啟用"))]),(0,n._)("td",null,[(0,n._)("button",{class:"btn btn-primary",onClick:t=>e.openModal(!1,o)},"編輯",8,c),r])])))),128))])]),(0,n.Wm)(b,{ref:"couponModal",coupon:_.tempCoupon,onUpdateCoupon:h.updateCoupon},null,8,["coupon","onUpdateCoupon"])])}var _=t(9242);const h={class:"modal fade",id:"exampleModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},b={class:"modal-dialog modal-xl"},C={class:"modal-content"},f=(0,n._)("div",{class:"modal-header"},[(0,n._)("h5",{class:"modal-title",id:"exampleModalLabel"},"Modal title"),(0,n._)("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),v={class:"modal-body"},y={class:"mb-3"},w=(0,n._)("label",{for:"title"},"標題",-1),g={class:"mb-3"},M=(0,n._)("label",{for:"coupon_code"},"優惠碼",-1),x={class:"mb-3"},k=(0,n._)("label",{for:"due_date"},"到期日",-1),$={class:"mb-3"},D=(0,n._)("label",{for:"price"},"折扣百分比",-1),U={class:"mb-3"},V={class:"form-check"},S=(0,n._)("label",{for:"is_enable",class:"form-check-label"},"是否啟用",-1),z={class:"modal-footer"},N=(0,n._)("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"},"取消",-1);function Z(e,o,t,l,a,s){return(0,n.wg)(),(0,n.iD)("div",h,[(0,n._)("div",b,[(0,n._)("div",C,[f,(0,n._)("div",v,[(0,n._)("div",y,[w,(0,n.wy)((0,n._)("input",{type:"text",class:"form-control",id:"title","onUpdate:modelValue":o[0]||(o[0]=e=>a.tempCoupon.title=e),placeholder:"請輸入標題"},null,512),[[_.nr,a.tempCoupon.title]])]),(0,n._)("div",g,[M,(0,n.wy)((0,n._)("input",{type:"text",class:"form-control",id:"coupon_code","onUpdate:modelValue":o[1]||(o[1]=e=>a.tempCoupon.code=e),placeholder:"請輸入優惠碼"},null,512),[[_.nr,a.tempCoupon.code]])]),(0,n._)("div",x,[k,(0,n.wy)((0,n._)("input",{type:"date",class:"form-control",id:"due_date","onUpdate:modelValue":o[2]||(o[2]=e=>a.tempCoupon.due_date=e)},null,512),[[_.nr,a.tempCoupon.due_date]])]),(0,n._)("div",$,[D,(0,n.wy)((0,n._)("input",{type:"number",class:"form-control",id:"price","onUpdate:modelValue":o[3]||(o[3]=e=>a.tempCoupon.percent=e),placeholder:"請輸入折扣百分比"},null,512),[[_.nr,a.tempCoupon.percent,void 0,{number:!0}]])]),(0,n._)("div",U,[(0,n._)("div",V,[(0,n.wy)((0,n._)("input",{type:"checkbox","true-value":1,"false-value":0,"onUpdate:modelValue":o[4]||(o[4]=e=>a.tempCoupon.is_enabled=e),id:"is_enable"},null,512),[[_.e8,a.tempCoupon.is_enabled]]),S])])]),(0,n._)("div",z,[N,(0,n._)("button",{type:"button",class:"btn btn-primary",onClick:o[5]||(o[5]=o=>e.$emit("update-coupon",a.tempCoupon))},"確定")])])])],512)}var L=t(1339),O={data(){return{modal:{},tempCoupon:{},due_date:""}},props:{coupon:{type:Object,default(){return{}}}},watch:{coupon(){this.tempCoupon=this.coupon,console.log(this.tempCoupon.due_date);const e=new Date(1e3*this.tempCoupon.due_date).toISOString().split("T");[this.due_date]=e},due_date(){this.tempCoupon.due_date=Math.floor(new Date(this.due_date)/1e3)}},emits:["update-coupon"],mixins:[L.Z]},T=t(89);const j=(0,T.Z)(O,[["render",Z]]);var H=j,I={components:{CouponModal:H},data(){return{coupons:{},tempCoupon:{title:"",is_enable:0,percent:100,code:""},isNew:!1}},methods:{getCoupons(){const e="https://vue3-course-api.hexschool.io/api/coffee-api/admin/coupons";this.$http.get(e).then((e=>{this.coupons=e.data.coupons}))},openCouponModal(e,o){console.log(e,o),this.isNew=e,this.tempCoupon=e?{due_date:(new Date).getTime()/1e3}:{...o};const t=this.$refs.couponModal;t.showModal()},updateCoupon(e){if(this.isNew){const o="https://vue3-course-api.hexschool.io/api/coffee-api/admin/coupon";this.$http.post(o,{data:e}).then((e=>{console.log(e),this.$httpMessageState(e,"新增優惠券"),this.getCoupons(),this.$refs.couponModal.hideModal()}))}else{const e=`https://vue3-course-api.hexschool.io/api/coffee-api/admin/coupon/${this.tempCoupon.id}`;this.$http.put(e,{data:this.tempCoupon}).then((e=>{console.log(e),this.$httpMessageState(e,"更新優惠券"),this.getCoupons(),this.$refs.couponModal.hideModal()}))}}},created(){this.getCoupons()}};const K=(0,T.Z)(I,[["render",m]]);var W=K}}]);
//# sourceMappingURL=298.1ad2f69f.js.map