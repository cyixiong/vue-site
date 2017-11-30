<template>
  <div class="tmpl">
    {{orderid}}
    <input type="text" v-model="amount">
    <el-button type="success" size="small">支付</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        orderid:this.$route.params.orderid,
        amount:0
      }
    },
    methods: {
      getorderInfo(){
        this.$ajax.get('/site/validate/order/getorderdetial/'+this.orderid)
        .then(res=>{
          this,amount = res.data.message.orderinfo.order_amount;
        })
      },
      pay(){
        var url = '/site/validate/order/pay/'+this.orderid;
        this.$ajax.get(url).then(res=>{
          if (res.data.status == 1) {
            this.$message.error(res.data.message);
            return;
          }
          //支付成功跳转到成功页面提示用户
          this.$router.push({name:'paysuccess'});
        })
      }
    }
  }
</script>
<style scoped>
</style>