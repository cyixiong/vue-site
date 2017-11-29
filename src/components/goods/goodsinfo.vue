<template>
  <div class="tmpl">

    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a>
        <a href="/goods/42/1.html">商品详情</a>

      </div>
    </div>

    <!-- 商品详情 -->
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <!--页面左边-->
          <div class="left-925">
            <div class="goods-box clearfix">
              <!--商品图片-->
              <div class="pic-box">
                <div class="magnifier" id="magnifier1">
                  <div class="magnifier-container">
                    <div class="images-cover"></div>
                    <!--当前图片显示容器-->
                    <div class="move-view"></div>
                    <!--跟随鼠标移动的盒子-->
                  </div>
                  <div class="magnifier-assembly">
                    <div class="magnifier-btn">
                      <span class="magnifier-btn-left">&lt;</span>
                      <span class="magnifier-btn-right">&gt;</span>
                    </div>
                    <!--按钮组-->
                    <div class="magnifier-line">
                      <ul class="clearfix animation03">
                        <li v-for="item in info.imglist" :key="item.id">
                          <div class="small-img">
                            <img :src="item.original_path" />
                          </div>
                        </li>
                      </ul>
                    </div>
                    <!--缩略图-->
                  </div>
                  <div class="magnifier-view"></div>
                  <!--经过放大的图片显示容器-->
                </div>

              </div>
              <!--/商品图片-->

              <!--商品信息-->
              <div class="goods-spec" v-if="info.goodsinfo">
                <h1 v-text="info.goodsinfo.title"></h1>
                <p class="subtitle">{{info.goodsinfo.sub_title}}</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">{{info.goodsinfo.goods_no}}</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">¥{{info.goodsinfo.market_price}}</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em class="price" id="commoditySellPrice">¥{{info.goodsinfo.sell_price}}</em>
                    </dd>
                  </dl>
                </div>

                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <el-input-number v-model="num1" @change="buyCount" :min="1" :max="info.goodsinfo.stock_quantity"></el-input-number>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{info.goodsinfo.stock_quantity}}</em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div class="btn-buy" id="buyButton">
                        <button class="buy">立即购买</button>
                        <button class="add" @click="addCar" ref="btnaddcar">加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>

              </div>
              <!--/商品信息-->
            </div>

            <div id="goodsTabs" class="goods-tab bg-wrap" v-if="info.goodsinfo">
              <!--选项卡-->
              <Affix>
                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                  <ul>
                    <li @click="istabShow  = true">
                      <a v-bind="{class:(istabShow?'selected':'')}" href="javascript:;">商品介绍</a>
                    </li>
                    <li @click="istabShow  = false">
                      <a v-bind="{class:(!istabShow?'selected':'')}" href="javascript:;" class="">商品评论</a>
                    </li>
                  </ul>
                </div>
              </Affix>

              <!--/选项卡-->

              <!--选项内容-->
              <div class="tab-content entry" v-show="istabShow" v-html="info.goodsinfo.content">

              </div>

              <div class="tab-content" v-show="!istabShow">
                <!--网友评论-->
                <div class="comment-box">
                  <!--取得评论总数-->
                  <form id="commentForm" name="commentForm" class="form-box" url="/tools/submit_ajax.ashx?action=comment_add&amp;channel_id=2&amp;article_id=98">
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" v-model="commentTxt" nullmsg="请填写评论内容！"></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon">
                        <input id="btnSubmit" @click="postComment" name="submit" type="buttom" value="提交评论" class="submit">
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </form>

                  <!-- 评论区域 -->
                  <ul id="commentList" class="list-box">
                    <p v-show="commentList.length<=0" style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
                    <li v-for="item in commentList">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>{{item.user_name}}</span>
                          <span>{{item.reply_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</span>
                        </div>
                        <p>{{item.content}}</p>
                      </div>
                    </li>
                  </ul>
                  <!--放置页码-->
                  <div class="page-box" style="margin:5px 0 0 62px">
                    <el-pagination @size-change="sizeChang" @current-change="pageChange" :current-page="pageIndex" :page-sizes="[2,5,10,20,30]"
                      :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalcount">
                    </el-pagination>
                  </div>
                  <!--/放置页码-->
                </div>

                <!--/网友评论-->
              </div>

            </div>

          </div>
          <!--/页面左边-->

          <!--页面右边-->
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">

                  <li v-for="item in info.hotgoodslist" :key="item.id">
                    <div class="img-box">
                      <a href="/goods/show-98.html">
                        <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                          <img :src="item.img_url">
                        </router-link>
                      </a>
                    </div>
                    <div class="txt-box">
                      <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                        <a href="/goods/show-98.html">{{item.title}}</a>
                      </router-link>
                      <span>{{item.add_time | datefmt}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!--/页面右边-->
        </div>
      </div>
    </div>
    <!-- 定义一个div是用来展示图片 -->
    <transition @before-enter="benter" @enter="enter" @after-enter="aenter">
      <div v-if="info.imglist" class="img" ref="img" v-show="isshow">
        <img width="50" height="50" :src="info.imglist[0].thumb_path" alt="">
      </div>
    </transition>
  </div>
</template>

<script>
  import '../../../statics/jqplugins/jqimgzoom/js/magnifier.js';

  //导入事件总线的相关数据
  import { vm, KEY } from '../../kits/bus.js';

  //导入localstoragehelper.js
  import { setItem } from '../../kits/localStoragehelper.js'
  export default {
    data() {
      return {
        offsetObj: {},
        lbcOffSet: {},
        currentBuyCount: 1,
        pageIndex: 1,
        pageSize: 2,
        totalcount: 0,
        info: {},//负责存储服务器响应回来的商品的相关数据
        istabShow: true,
        pageIndex: 1,
        commentTxt: '',
        commentList: [],
        num1: 1,
        isshow: false,
      }
    },
    mounted() {
      this.getinfo();
      this.getCommentList();
      //利用jq获取这个对象的offset
      setTimeout(() => {
        var offsetObj = $(this.$refs.btnaddcar).offset();
        this.offsetObj = offsetObj;

        //将加入购物车按钮的位置赋值给图片的div
        $(this.$refs.img).css("left", offsetObj.left).css("top", offsetObj.top);

        var lbcOffSet = $("#layoutbuycar").offset();
        this.lbcOffSet = lbcOffSet
      }, 200);

    },
    watch: {
      '$route': function () {
        this.getinfo();
      },

    },
    methods: {
      //定义方法去根据URL传入的商品id获取到商品的详情数据
      getinfo() {
        var url = '/site/goods/getgoodsinfo/' + this.$route.params.goodsid;
        this.$ajax.get(url).then(res => {
          this.info = res.data.message;
          if (!this.info.goodsinfo) {
            this.$message.error('传入的商品id非法');
          }

          //延迟200毫秒初始化
          setTimeout(() => {
            $('#magnifier1').imgzoon({ magnifier: '#magnifier1' });
          }, 200);
        })
      },
      buyCount(val) {
        this.currentByCount = val;
      },
      getCommentList() {
        var url = `/site/comment/getbypage/goods/${this.$route.params.goodsid}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;
        this.$ajax.get(url).then(res => {
          this.commentList = res.data.message;

          //获取到评论的总数
          this.totalcount = res.data.totalcount;
        })
      },
      pageChange(index) {
        this.pageIndex = index;
        this.getCommentList();
      },
      sizeChang(size) {
        this.pageSize = size;
        this.getCommentList();
      },
      //评论提交
      postComment() {
        var url = '/site/validate/comment/post/goods/' + this.$route.params.goodsid;

        this.$ajax.post(url, { commenttxt: this.commentTxt }).then(res => {
          if (res.data.stauts == 1) {
            this.$message.error(res.data.message);
            return;
          }
          //提交成功以后的处理
          this.getCommentList();

          //清空文本框
          this.commentTxt = '';
        })
      },
      addCar() {
        //利用vm.$emit()触发事件，将购买数量传入layout.vue组件
        // vm.$emit(KEY, this.currentByCount);

        //获取到当前商品id和购买的数量调用localstroagehelper.js这个文件中的setItem方法存储值
       var goodsobj = { gid: this.$route.params.goodsid, count: this.currentBuyCount };
        // // 将当前购买商品的数量存储到localStroage中
        setItem(goodsobj);

        this.$store.dispatch('changeCount', goodsobj);

        // 将isshow设置为true，显示出图片
        this.isshow = true;
      },
      benter(el) {
        el.style.left = this.offsetObj.left + 'px';
        el.style.top = this.offsetObj.top + 'px';
      },
      enter(el, done) {
        el.offsetWidth;
        el.style.left = this.lbcOffSet.left + 'px';
        el.style.top = this.lbcOffSet.top + 'px';
        done();
      },
      aenter(el) {
        this.isshow = false;
      }
    }
  }
</script>
<style scoped>
  @import url('../../../statics/jqplugins/jqimgzoom/css/magnifier.css');
  .img{
    width: 50px;
    height: 50px;
    position: absolute;
    transition:all 0.5s;
    border: 1px solid red;
  }
</style>