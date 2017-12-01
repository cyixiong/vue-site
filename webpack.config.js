//导入nodejs的path这个核心包
 var path = require('path');
//导入html-webpack-plugin
var htmlwp = require('html-webpack-plugin');

//导入webpack
var webpack = require("webpack");

//分离css的第一步配置
var csstck = require('extract-text-webpack-plugin');
 module.exports ={
   //指定webpack的打包的入口文件
  //  entry:'./src/main.js',
  //打包分离公共组件的第一步
  entry:{
    build:'./src/main.js',
    vendor1:['vue','vue-router','vuex','axios'],
    vendor2:['element-ui'],
    vendor3:['v-distpicker'],
    vendor4:['jquery']
  },
   //输出文件
   output:{
     path:path.join(__dirname,"/dist"),
    //  filename:"build.js"
    //打包分离公共组件的第三步要将filename的名字改成[name].js
    filename:'[name].js'
   },
   //导入jQuery
   resolve:{
     alias:{
       'jquery':'jquery'
     }
   },

  //  配置webpack相对与的loader包
  module:{
    //在这里配置的是哭啼的某一个的loader
    loaders:[
      {
        test:/\.css$/,
        // loader:'style-loader!css-loader'
        loader:csstck.extract({fallback:"style-loader",use:"css-loader"})
      }, {
        test: /\.less$/,
        loader: csstck.extract({ fallback: "style-loader", use: "css-loader!less-loader" })
      }, {
        test: /\.scss$/,
        loader: csstck.extract({ fallback: "style-loader", use: "css-loader!sass-loader" })
      }, {
        test: /\.(png|jpg|gif|woff|ttf|svg|eot)$/,
        loader: 'url-loader?limit=10240'
      }, {
        test: /\.js$/,//  用正则匹配当前访问的文件的后缀名是.js
        loader: 'babel-loader',
        //node_modules文件夹的所有，js文件应该排除
        exclude:/node_modules/
      }, 
      //配置的是用来解析.vue文件的loader(vue-loader)
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  //webpack需要使用的插件配置在这里
  plugins:[
    new htmlwp({
      filename:'index.html',//内存中生成的html的文件名称
      //通过script标签加载到index.html的底部
      template:'index1.html'
    }),
    //将jqeruy对象映射为￥和jquery
    new webpack.ProvidePlugin({
      $:'jquery',
      jQuery:'jquery'
    }),
    //打包分离公共组件的第2步
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor4", "vendor3", "vendor2","vendor1"],//调用的地方要和定义的地方相反
      minChunks:Infinity
    }),
    new csstck("[name].css")
  ]
 }