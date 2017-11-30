//1.0导入vue.js
import Vue from 'vue';
//2.0导入app.vue组件对象
import App from './App.vue';//当前目录下面查找app.vue这个组件
//导入vue-router这个包
import VueRouter from 'vue-router';
//将VueRouter对象通过Vue.usr()使用一下
Vue.use(VueRouter);
//导入组件对象
import layout from './components/layout.vue';
import goodslist from './components/goods/goodslist.vue';
import goodsinfo from './components/goods/goodsinfo.vue';
import car from './components/goods/car.vue';
import shopping from './components/goods/shopping.vue';
import pay from './components/goods/pay.vue';
import login from './components/account/login.vue';
import payamount from './components/pay/payamount.vue';
import paysuccess from './components/pay/paysuccess.vue';
import vuelive from './components/vuelive.vue';
import vipcenter from './components/vip/vipcenter.vue';
import myorders from './components//vip/myorders.vue';

//实例化对象并且定义路由规则
var router = new VueRouter({
  routes: [
    //默认跳转的路由规则
    { name: 'default', path: '/', redirect: '/site/goodslist' },
    //由于payamount.vue 是被手机打开的，所以不需要头部导航，所以路由规则注册在此处
    {name:'payamount' , path:'/payamount/:orderid',component:payamount},
    //不用头部导航
    { name: 'paysuccess', path: '/paysuccess/', component: paysuccess},
    //布局
    {
      name: 'layout', path: '/site', component: layout,
      children: [
        //登录页面
        { name: 'login', path: 'login', component: login, meta: { nosave: "true" } },
        //商品列表
        { name: 'goodslist', path: 'goodslist', component: goodslist },
        //商品详情页面
        { name: 'goodsinfo', path: 'goodsinfo/:goodsid', component: goodsinfo },
        //购物车页面
        { name: 'car', path: 'car', component: car },
        // 下单页
        { name: 'shopping', path: 'shopping/:ids', component: shopping, meta: { checklogin: true } },
        //支付页面
        { name: 'pay', path: 'pay/:orderid', component: pay, meta: { checklogin: true } },
        //支付成功的页面
        { name: 'pcpaysuccess', path: 'pcpaysuccess', component: paysuccess},
        //vue的生命周期钩子函数的作用演示
        { name: 'pcpaysuccess', path: 'vuelive', component: vuelive},
        //会员中心
        { name: 'vipcenter', path: 'vipcenter', component: vipcenter, meta: { checklogin: true }},
        { name: 'myorders', path: 'myorders', component: myorders, meta: { checklogin: true }},
      ]
    }
  ]
});

//导入vue的一个组件库
import elementUI from 'element-ui';
//导入默认样式
import '../statics/elementuiCss/index.css';

//导入自己编写的全局样式
import '../statics/site/css/style.css';

//导入axios
import axios from 'axios';
//设定axios的默认请求域名，将来在真正调用get,post方法的时候传入的url中就不需要带域名的
axios.defaults.baseURL = 'http://127.0.0.1:8899';
//配置axios在请求数据服务接口的时候，允许带cookie（凭证）
axios.defaults.withCredentials = true;
//5.0.2 将axios对象绑定到Vue的原型属性 $ajax上，将来在任何组件中均可以通过this.$ajax中的get(),post() 就可以发出ajax请求了
Vue.prototype.$ajax = axios;

//定义一个全局过滤器
Vue.filter('datefmt', (input, fmtstring) => {
  var date = new Date(input);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  var h = date.getHours();
  var mm = date.getMinutes();
  var ss = date.getSeconds();
  if (fmtstring == "YYYY-MM-DD HH:mm:ss") {
    return y + '-' + m + '-' + d + '  ' + h + ':' + 'mm' + ':' + ss;
  } else {
    return y + '-' + m + '-' + d;
  }
})


//按需导入iview中的affix组件
import { Affix } from 'iview';
Vue.component('Affix', Affix);


//vuex的定义和集成
import vuex from 'vuex';
Vue.use(vuex);
//定义vuex中的四个核心对象
//定义需要全局保存的属性
//在组件中使用 this.$store.state.buycount
var state = {
  buyCount: 0
}

import { setItem, getItem } from './kits/localStoragehelper';

//这个对象中定义的方法要通过actions中的方法触发
var mutations = {
  //顶一个changecount方法来改变state中的buycount值
  //参数state：代表的是上面定义好的state对象
  //参数parmsbuycount:就是从程序员在调养的时候传入的(带业务才知道具体的参数有哪些)
  changeCount(state, goodsobj) {
    //修改state中的buycount这个属性的值
    //获取localstroage中的商品的购买总数数量
    var obj = getItem();

    var tcount = 0;
    for (var key in obj) {
      tcount += obj[key];
    }

    state.buyCount = tcount;
  }
}
//actions在外部可以通过编写:this.$store.dispath('cations定义好的方法名称',传入参数)
var actions = {
  //定义一个changeCount方法来触发mutations中的某个方法
  //参数{commit}：可以用他来触发mutations里面的某个方法
  //参数parmsbuycount:就是从程序员在调养的时候传入的(带业务才知道具体的参数有哪些)
  changeCount({ commit }, goodsobj) {
    //commit()的第一个参数就是mutations里面的某个方法名称
    commit('changeCount', goodsobj);
  }
}

//对state中的某个属性进行封装处理(至于如何封装暗战具体的业务来编写)
var getters = {
  //当state.buyCount的值>0的话，直接返回即可
  //在任何视图上使用的代码如下：this.$store.getters.getbuycount
  getbuyCount(state) {
    if (state.buyCount > 0) {
      return state.buyCount;
    } else {
      //否则从localstorage中统计出总数据返回
      //obj的格式
      var obj = getItem();
      var tcount = 0;
      for (var key in obj) {
        tcount += obj[key];
      }

      //将最终结果赋值回给state.buycount这个属性
      state.buyCount = tcount;

      return tcount;
    }
  }
}

//使用全局守卫检查是否登录
router.beforeEach((to, form, next) => {
  //在localstorage中记录用户访问的最后那个页面（存储一个路由对象),排除登录也
  if (to.meta.nosave != 'true') {
    //保存的是当前路由对象中的path
    localStorage.setItem('currentPath', to.path)
  }

  //进行登录检测
  if (to.meta.checklogin) {
    //发出ajax请求，
    axios.get('/site/account/islogin').then(res => {
      if (res.data.code == "logined") {
        next();
      } else {
        router.push({ name: 'login' });
      }
    })
  } else {
    next();
  }
})
//7.0将上述四个对私想利用 new vuex store()进行实例化
var store = new vuex.Store({
  state, mutations, actions, getters
})
//绑定到vue中
Vue.use(elementUI);
//实例化对象并且定义路由规则
new Vue({
  el: '#app',
  store,
  router,//绑定路由对象使他生效
  //将app组件编译将这个组件中的内容填充到el：指向的app这个div中
  render: create => create(App)
})
