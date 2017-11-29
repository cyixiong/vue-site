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
                <li>
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
          <!--商品列表-->
          <div class="cart-box">
            <input id="jsondata" name="jsondata" type="hidden">
            <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
              <tbody>
                <tr>
                  <th width="48" align="center">
                    <el-button type="success" size="small"  on-color="#0094ff" off-color="#0a0" @click="selectAll">{{selAllBtn}}</el-button>
                  </th>
                  <th align="left" colspan="2">商品信息</th>
                  <th width="84" align="left">单价</th>
                  <th width="104" align="center">数量</th>
                  <th width="104" align="left">金额(元)</th>
                  <th width="54" align="center">操作</th>
                </tr>
                <tr v-show="goodslist.length<=0">
                  <td colspan="10">
                    <div class="msg-tips">
                      <div class="icon warning">
                        <i class="iconfont icon-tip"></i>
                      </div>
                      <div class="info">
                        <strong>购物车没有商品！</strong>
                        <p>您的购物车为空，
                          <a href="/index.html">马上去购物</a>吧！</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-for="(item,index) in goodslist" :key="item.id">
                  <td width="48" align="center">
                    <el-switch v-model="values[index]" on-text="已选" off-text="未选" on-color="#0094ff" off-color="#0a0"></el-switch>
                  </td>
                  <td align="left" colspan="2">
                    <img width="50" height="50" :src="item.img_url" alt="item.title">
                    {{item.title}}
                  </td>
                  <td width="84" align="left">{{item.sell_price}}</td>
                  <td width="104" align="center">
                    <inputnumber @msg="getinputnumber" v-bind:obj="{gid:item.id,count:item.buycount}">
                      
                    </inputnumber>
                  </td>
                  <td width="104" align="left">{{item.sell_price *item.buycount}}</td>
                  <td width="54" align="center">
                    <a href="javascript:void(0)" @click="delData(item.id)">删除</a>
                  </td>
                </tr>
                <tr>
                  <th align="right" colspan="8">
                    已选择商品
                    <b class="red" id="totalQuantity">{{selectedCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                    <span class="red">￥</span>
                    <b class="red" id="totalAmount">{{getAmount}}</b>元
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <!--/商品列表-->
          <!--购物车底部-->
          <div class="cart-foot clearfix">
            <div class="right-box">
              <button class="button" >继续购物</button>
              <button class="submit" @click="shopping">立即结算</button>
            </div>
          </div>
          <!--购物车底部-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getItem,setItemReplace, remoteItem} from '../../kits/localStoragehelper.js';
  //导入子组件
  import inputnumber from '../subcom/inputnumber.vue';
  export default {
     //注册子组件
        components: {
          inputnumber
        },
    data() {
     
      return {
        selAllBtn:'全选',
        isselected:false,
        goodslist:[],
        values:[],
        selectedCount:0,
      }
    },
    
    mounted(){
      this.getgoodslist();
    },
    computed: {
          //计算出当前选中的商品总件数
          //特点：计算属性所依赖的this.values数组中的值发生改变就会自动重新执行
          getAmount(){
            var trueArr = this.values.filter(item=>item);
            this.selectedCount = trueArr.length;
            //2.0统计选中商品的总金额
            var totalcount = 0;
            this.values.forEach((item,index) => {
              //判断item==true才是我要统计的
              if (item) {
                totalcount +=(this.goodslist[index].buycount *  this.goodslist[index].sell_price);
              }
              
            });
            return totalcount;
          }
        },
    methods: {
      //跳转到订单页面
      shopping(){
        //1.0获取当前car。vue中选择的商品id
        var goodsids = [];
        //首先查找this.values中的true所在的索引
        this.values.forEach((item,index)=>{
          //如果item为true的haul，这个index就是选中的商品的索引，那么应该从goodslist中找到商品的索引的id
          if (item == true) {
              goodsids.push(this.goodslist[index].id);
          }
          //2.0判断用户是否有至少选择一个商品
          if (goodsids.length<=0) {
            this.$message.error("请至少选择一个需要购买的商品");
            return;
          }
          //3.0跳转到shopping.vue组件同时将商品id传入
          this.$router.push({name:'shopping',params:{ids:goodsids.join(",")}});
        })
      },
      //删除
      delData(goodsid){
        //根据传入的商品id从this.goodslist中查找出索引
        var index = this.goodslist.findIndex(item=>item.id==goodsid);
        //2.0删除goodslist中年的当前索引的数据
        //delete this.goodslist[index]
        this.goodslist.splice(index,1);

        //3.0删除this.values中的当前索引数据
        this.values.splice(index,1);

        //4.0修改localstroage中的数据
        remoteItem(goodsid);

        //5.0触发vuex的chagncount重新重置layout。vue上面购物车数量的更新
        this.$store.dispatch('changeCount',{});
      },
      getinputnumber(obj){
        //接收子组件中传回值
        //obj的格式，
        setItemReplace(obj);
        //只需要将goodslist中的当前商品对应的buycount值更新即可
        var index = this.goodslist.findIndex(function(item){
          return item.id == obj.gid
        });
        //根据索引修改这个对象中的buycount即可
        this.goodslist[index].buycount = obj.count;
      },
      getgoodslist(){
          var goodsObj = getItem();
          //遍历goodsobj对象中的key，变成一个字符串用逗号分隔
          var idArr = [];
          for(var key in goodsObj){
            idArr.push(key);
          }
          var ids = idArr.join(',');
          var url = '/site/comment/getshopcargoods/'+ids;
          this.$ajax.get(url).then(res=>{
            //发现接口中返回的对象中有一个属性buycount，但是这个值是存储在客户端的
            //所以应该手动的将goodsobj中的对应的商品购买数量赋值过去
            res.data.message.forEach((item,index)=>{
              item.buycount = goodsObj[item.id];
              //将values中的值的个数一一初始化
              this.values[index] = false;
            })
            //赋值
            this.goodslist = res.data.message;
          })
      },
      selectAll(){
        //将isselected取反
        this.isselected = !this.isselected;
        if(this.isselected){
          this.selAllBtn="反选";
        }else{
          this.selAllBtn = '全选';
        }
        //将this.isselected的值赋值飞this.values中的所有的索引的值
        for (let i = 0; i < this.values.length; i++) {
          this.values[i] = this.isselected;
        }
        // this.values.push(false);
        // this.values.pop();
      }
    }
  }
</script>
<style scoped>
</style>