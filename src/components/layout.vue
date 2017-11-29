<template>
  <div class="tmpl">
    <div id="header" class="header">
      <div class="head-top">
        <div class="section">
          <div class="left-box">
            <span>vue2.0单页应用</span>
            <a target="_blank" href="#"></a>
            <a target="_blank" href="#"></a>
          </div>
          <div id="menu" class="right-box">
            <router-link v-if="!islogin" to="/site/login">登录</router-link>
            <a v-if="!islogin" href="/register.html">注册</a>
            <strong>|</strong>
            <a v-if="islogin" href="javascript:;">会员中心</a>
            <a v-if="islogin" @click="logout" href="javascript:void(0)" >注销</a>
            <router-link to="/site/car">
              <i class="iconfont icon-cart"></i>
              购物车(
              <span id="layoutbuycar">{{this.$store.getters.getbuyCount}}</span>)
            </router-link>
            <!--<a href="/content/contact.html"><i class="iconfont icon-phone"></i>联系我们</a>
                             <a href="/cart.html"><i class="iconfont icon-cart"></i>购物车(<span id="shoppingCartCount"><script type="text/javascript" src="/tools/submit_ajax.ashx?action=view_cart_count"></script></span>)</a>-->
          </div>
        </div>
      </div>
      <div class="head-nav">
        <div class="section">
          <!-- <div class="logo">
                             <a href="/index.html"><img width="230px" height="70px" src="/templates/main/images/logo.png" /></a>
                         </div>-->
          <div id="menu2" class="nav-box menuhd">
            <ul>
              <li class="index">
                <a href="/index.html">
                  首页
                </a>
              </li>
              <li class="news">
                <a href="/news.html">
                  学员问题汇总
                </a>
              </li>
              <li class="photo">
                <a href="/photo.html">
                  重难点专区
                </a>
              </li>
              <!--<li class="goods"><a href="">就业阶段</a></li>-->
              <li class="video">
                <a href="/video.html">
                  前端常用功能
                </a>
              </li>
              <li class="down">
                <a href="/down.html">
                  资源下载
                </a>
              </li>
              <li>
                <router-link to="/site/goodslist">
                  购物商城
                </router-link>
              </li>
            </ul>
          </div>
          <div class="search-box">
            <div class="input-box">
              <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){SiteSearch('/search.html', '#keywords');return false};"
                placeholder="输入关健字" x-webkit-speech="">
            </div>
            <a href="javascript:;" onclick="SiteSearch('/search.html', '#keywords');">
              <i class="iconfont icon-search"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

  import {vm,KEY} from '../kits/bus.js'
  export default {
    data() {
      return {
        buyTotalCount:0,
        islogin:false
      }
    },
   mounted() {
        // jquery的实现应该要能够找到dom对象     

        $("#menu2 li a").wrapInner('<span class="out"></span>');
        $("#menu2 li a").each(function () {
          $('<span class="over">' + $(this).text() + '</span>').appendTo(this);
        });

        $("#menu2 li a").hover(function () {
          $(".out", this).stop().animate({ 'top': '48px' }, 300); // move down - hide
          $(".over", this).stop().animate({ 'top': '0px' }, 300); // move down - show

        }, function () {
          $(".out", this).stop().animate({ 'top': '0px' }, 300); // move up - show
          $(".over", this).stop().animate({ 'top': '-48px' }, 300); // move up - hide
        });

        //将曾经购买的总数加载回来
        var countStr = localStorage.getItem("buyTotalCount");
        if (countStr !='NaN') {
          this.buyTotalCount = parseInt(countStr);
        }
        //利用vm找那个的$on 方法完成事件的监听
        vm.$on(KEY,(buycount)=>{
          this.buyTotalCount +=buycount;
          //将总数存储起来
          localStorage.setItem('buyTotalCount',this.buyTotalCount);
        })
      
        this.checkLogin();
        //利用vm的￥on注册登录状态的改变
        vm.$on('changelogin',(val)=>{
          this.checkLogin();
        })
      },
    methods: {
      //注销
      logout(){
        this.$ajax.get('/site/account/logout').then(res=>{
          if (res.data.status == 0) {
            this.islogin = false;
            localStorage.setItem('logined','false');
            //跳转到商品列表
            this.$router.push({name:'goodslist'});
          }
        })
      },
      checkLogin(){
        var res = localStorage.getItem('logined');
        if (res == 'true') {
          this.islogin  = true;
        }else{
          //已经注销
          this.islogin = false;
        }
      }
    }
  }
</script>
<style scoped>

  @import url('../../statics/jqplugins/jqhovernav/jqhoverNav.css')
</style>