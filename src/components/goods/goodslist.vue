<template>
  <div class="tmpl">
    <!-- 面包屑导航 -->
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="index.html">首页</a>
        <a href="/goods.html">购物商品</a>
      </div>
    </div>
    <!-- 商品列表顶部数据，分类，轮播图，置顶数据 -->
    <div class="section">
      <div class="wrapper">
        <div class="wrap-box">
          <!-- 类别菜单 -->
          <div class="left-220" style="margin:0;">
            <div class="banner-nav">
              <ul>
                <li v-for="item in topinfo.catelist" :key="item.id">
                  <h3>
                    <i class="iconfont icon--arrow-right"></i>
                    <span v-text="item.title"></span>
                    <p>
                      <span v-for="subitem in item.subcates" :key="subitem.id">
                        {{subitem.title}}&nbsp;
                      </span>
                    </p>
                  </h3>
                  <div class="item-box">
                    <!-- 如有三级分类，此处可循环 -->
                    <dl>
                      <dt>
                        <a href="/goods/40.html">{{item.title}}</a>
                      </dt>
                      <dd>
                        <a v-for="subitem1 in item.subcates" :key="subitem1.id" href="/goods/43.html">
                          {{subitem1.title}}
                        </a>
                      </dd>
                    </dl>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- 幻灯片 -->
          <div class="left-705">
            <div class="banner-img">
              <div class="focus-box" id="focus-box">
                <!-- 使用element-ui组件的轮播图 -->
                <el-carousel :interval="5000" arrow="always">
                  <el-carousel-item v-for="item in topinfo.sliderlist" :key="item.id">
                    <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                      <img width="368" height="368" :src="item.img_url" alt="">
                    </router-link>
                    <h3>{{ item.title }}</h3>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
          </div>

          <!-- 推荐商品 -->
          <div class="left-220">
            <ul class="side-img-list">
              <li v-for="(item,index) in topinfo.toplist" :key="item.id">
                <div class="img-box">
                  <label>{{index + 1}}</label>
                  <img :src="item.img_url" alt="">
                </div>
                <div class="txt-box">
                  <a href="/goods/show-98.html">
                    {{item.title}}
                  </a>
                  <span>
                    {{item.add_time | datefmt}}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 分类下面的商品列表展示 -->
    <div v-for="item in grouplist" :key="item.level1cateid" class="section">
      <!-- 子类 -->
      <div class="main-tit">
        <h2 v-text="item.catetitle"></h2>
        <p>
          <a href="/goods/43.html" v-for="subitem in item.level2catelist" :key="subitem.subcateid">
            {{subitem.subcatetitle}}
          </a>
          <a href="/goods/40.html">
            更多
            <i>+</i>
          </a>
        </p>
      </div>
      <!-- 子类 -->
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <ul class="img-list">
            <li v-for="dataitem in item.datas">
              <a href="/goods/show-91.html">
                <div class="img-box">
                  <img :src="dataitem.img_url" alt="">
                </div>
                <div class="info">
                  <h3 v-text="dataitem.artTitle"></h3>
                  <p class="price">
                    <b>￥{{dataitem.sell_price}}元</b>
                  </p>
                  <p>
                    <strong>库存：{{dataitem.stock_quantity}}</strong>
                    <span>市场价：
                      <s>{{dataitem.market_price}}</s>
                    </span>
                  </p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        topinfo: {},
        grouplist: []//用来存储页面底部的分类中的商品数据
      }
    },
    mounted() {
      this.getguolist();
      this.gettoplist();
    },
    methods: {
      getguolist() {
        var url = "/site/goods/getgoodsgroup";
        this.$ajax.get(url).then(res => {
          this.grouplist = res.data.message;
        })
      },
      gettoplist() {
        var url = '/site/goods/gettopdata/goods';
        this.$ajax.get(url).then(res => {
          this.topinfo = res.data.message;
          console.log(this.topinfo);
        })
      }
    }
  }
</script>
<style>
  .banner-img .focus-box .el-carousel .el-carousel__container {
    height: 368px;
  }

  .banner-img .focus-box .el-carousel .el-carousel__container .el-carousel__item h3 {
    color: red;
    font-size: 18px;
    opacity: 0.75;
    line-height: 50px;
    margin: 0;
  }

  .banner-img .focus-box .el-carousel .el-carousel__container .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .banner-img .focus-box .el-carousel .el-carousel__container [9] .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>