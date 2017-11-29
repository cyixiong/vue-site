<template>
  <div class="tmpl">
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/cart.html">购物车</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <!--购物车头部-->
          <div class="cart-head clearfix">
            <h2>
              <i class="iconfont icon-cart"></i>我的购物车</h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li class="active">
                  <div class="progress">
                    <span>2</span>
                    填写订单信息
                  </div>
                </li>
                <li class="last">
                  <div class="progress">
                    <span>3</span>
                    支付/确认订单
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--购物车头部-->
          <el-form :model="form1" :rules="rules" ref="form1" label-width="100px" class="demo-ruleForm">
            <div class="cart-box">
              <h2 class="slide-tit">
                <span>1、收货地址</span>
              </h2>
              <form id="orderForm" name="orderForm" url="/tools/submit_ajax.ashx?action=order_save&amp;site_id=1">
                <div class="form-box address-info">
                  <dl class="form-group">
                    <el-form-item label="收货人姓名：" prop="accept_name">
                      <el-row>
                        <el-col :span="12">
                          <el-input v-model="form1.accept_name"></el-input>
                        </el-col>
                      </el-row>
                    </el-form-item>
                  </dl>
                  <dl class="form-group">
                    <el-form-item label="所属地区" prop="address">
                      <el-row>
                        <el-col :span="12">
                          <v-distpicker @selected="onSelected"></v-distpicker>
                        </el-col>
                      </el-row>
                    </el-form-item>
                  </dl>
                  <dl class="form-group">
                    <el-form-item label="详细地址" prop="address">
                      <el-row>
                        <el-col :span="12">
                          <el-input v-model="form1.address"></el-input>
                        </el-col>
                      </el-row>
                    </el-form-item>
                  </dl>
                  <dl class="form-group">
                    <el-form-item label="手机号码" prop="mobile">
                      <el-row>
                        <el-col :span="12">
                          <el-input v-model="form1.mobile"></el-input>
                        </el-col>
                      </el-row>
                    </el-form-item>
                  </dl>
                  <dl class="form-group">
                    <el-form-item label="邮箱地址" prop="email">
                      <el-row>
                        <el-col :span="12">
                          <el-input v-model="form1.email"></el-input>
                        </el-col>
                      </el-row>
                    </el-form-item>
                    </dl>
                  <dl class="form-group">
                    <el-form-item label="邮编" prop="post_code">
                      <el-row>
                        <el-col :span="12">
                          <el-input v-model="form1.post_code"></el-input>
                        </el-col>
                      </el-row>
                    </el-form-item>
                  </dl>
                  
                </div>
                <h2 class="slide-tit">
                  <span>2、支付方式</span>
                </h2>
                <ul class="item-box clearfix">
                  <!--取得一个DataTable-->
                  <li>
                    <el-radio class="radio" v-model="form1.payment_id" label="6">在线支付</el-radio>
                    </label>
                  </li>
                </ul>
                <h2 class="slide-tit">
                  <span>3、配送方式</span>
                </h2>
                <ul class="item-box clearfix">
                  <!--取得一个DataTable-->
                  <li>
                    <el-radio-group v-model="form1.express_id" @change="expressChange">
                      <el-radio :label="1">顺丰(运费20)</el-radio>
                      <el-radio :label="2">中通(运费15)</el-radio>
                      <el-radio :label="3">申通(运费10)</el-radio>
                    </el-radio-group>
                  </li>
                </ul>
                <h2 class="slide-tit">
                  <span>4、商品清单</span>
                </h2>
                <div class="line15"></div>
                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                  <tbody>
                    <tr>
                      <th colspan="2" align="left">商品信息</th>
                      <th width="84" align="left">单价</th>
                      <th width="84" align="center">购买数量</th>
                      <th width="104" align="left">金额(元)</th>
                    </tr>
                    <tr v-for="item in buygoodslist" :key="item.id">
                      <td width="68">
                       <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                         <img :src="item.img_url" alt="" class="img">
                       </router-link>
                      </td>
                      <td>
                        <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">{{item.title}}</router-link>
                      </td>
                      <td>
                        <span class="red">
                          ￥{{item.sell_price}}
                        </span>
                      </td>
                      <td align="center">{{item.buycount}}</td>
                      <td>
                        <span class="red">
                          ￥{{item.buycount * item.sell_price}}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="line15"></div>
                <h2 class="slide-tit">
                  <span>5、结算信息</span>
                </h2>
                <div class="buy-foot clearfix">
                  <div class="left-box">
                    <dl>
                      <dt>订单备注(100字符以内)</dt>
                      <dd>
                        <textarea name="message" class="input" v-model="form1.message" style="height:35px;"></textarea>
                      </dd>
                    </dl>
                  </div>
                  <div class="right-box">
                    <p>
                      商品
                      <label class="price">{{buygoodslist.length}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                      <label id="goodsAmount" class="price">{{goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                    <p>
                      运费：￥
                      <label id="expressFee" class="price">{{currentFee}}</label> 元
                    </p>
                    <p class="txt-box">
                      应付总金额：￥
                      <label id="totalAmount" class="price">{{getOrderAmount}}</label>
                    </p>
                    <p class="btn-box">
                      <a class="btn button" href="/cart.html">返回购物车</a>
                      <input id="btnSubmit"   name="btnSubmit" type="button" value="确认提交" @click="submitdate" class="btn submit">
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import {getItem} from '../../kits/localStoragehelper.js';

  import VDistpicker from 'v-distpicker'
  export default {
    components: { VDistpicker },
    data() {
      //定义手机号码的验证规则
      var checkmobile = (rule,value,callback)=>{
        //定义一个手机号码的正则表达式
        var reg = /^13[0-9]{9}|15[012356789][0-9]{8}|18[0256789][0-9]{8}|147[0-9]{8}$/;
        var regObj = new RegExp(reg);
        if (regObj.test(value) == false) {
          //不合法
          callback(new Error('手机号码不合法'));
        }else{
          callback();
        }
      }
      return {
        expressFee:{
          '1':20,
          '2':15,
          '3':10
        },
        currentFee:20,
        goodsAmount:0,//不算运费的商品总价格
        //购买商品的详情
        buygoodslist:[],
        gids:this.$route.params.ids,
        form1:{
          "goodsAmount": 4099
          , "expressMoment": 20
          , "accept_name": "骁骁"
          , "area": {
            "province": { "code": "140000", "value": "山西省" }
            , "city": { "code": "140100", "value": "太原市" }
            , "area": { "code": "140106", "value": "迎泽区" }
          }
          , "address": "城区"
          , "mobile": "18667654355"
          , "email": "ivanyb@qq.com"
          , "post_code": "516000"
          , "payment_id": "6"
          , "express_id": 1
          , "message": "4K,白色"
          , "goodsids": "97,102"
          , "cargoodsobj": { "97": 1, "102": 1, "103": 1 }
        },
        rules:{
          //针对form1.accept_name 进行非空验证
          accept_name:[
            {required:true,message:"请输入收货人名称",trigger:'blur'}
          ],
          address:[
            { required: true, message: "请输入收货地址", trigger: 'blur' }
          ],
          mobile: [
            { validator:checkmobile,trigger:'blur' }
          ]
        }
      }
    },
    mounted(){
      this.getbuygoodslist();
    },
    computed:{
     getOrderAmount(){
        this.form1.goodsAmount = this.goodsAmount + this.currentFee;
        return this.form1.goodsAmount;
     }
      //
    },
    methods: {
      //验证
      submitdate(){
         this.$refs.form1.validate((valid) => {
          if (valid) {
             this.submit();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submit(){
        this.form1.goodsids = this.gids;
        //从localstorage中获取到赋值的cargoodsobj
        this.form1.cargoodsobj = JSON.stringify(getItem());
        //执行下单操作
        this.$ajax.post("/site/validate/order/setorder",this.form1).then(res=>{
          if (res.data.status == 1) {
            this.$message.error(res.data.message);
            return;
          }
          //提醒用户下单成功，同时跳转到支付页面
          this.$message({
            type:'success',
            message:'下单成功',
            duration:1000,
            onClose:()=>{
              //跳转到支付面
              this.$router.push({
                name:'pay',params:{
                  orderid:res.data.message.orderid
                }
              })
            }
          })
        })
      },
      expressChange(labelvalue){
        this.currentFee = this.expressFee[labelvalue];
        //根据labelvalue从this,expressFee 对象中获取具体的运费价格即可
        this.form1.expressMoment = this.currentFee;
      },
      onSelected(data){
        //将data的值赋值给form1，area
        this.form1.area = data;
      },
      getbuygoodslist(){
          var url="/site/validate/order/getgoodslist/"+this.gids;
          this.$ajax.get(url).then(res=>{
            this.buygoodslist = res.data.message;
            //遍历this.buygoodslist去localstorage中同步商品的购买数据量
            //obj格式
            var obj = getItem();
            this.buygoodslist.forEach((item,index)=>{
              //将当前商品购买的真是数量赋值
              item.buycount = obj[item.id];
              this.goodsAmount +=(item.buycount * item.sell_price);
            })
          })
      }
    }
  }
</script>
<style>
  .el-form-item__label{
    width: 13%!important;
  }
  .el-form-item__content{
    margin-left: 13%!important;
  }
</style>