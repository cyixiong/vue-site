//负责结合加入购物车这个业务来操作localStorate的数据


//定义一个全局key
const KEY = 'buyGoods'

//从localStorage中获取数据
export function getItem(){
  var jsongString = localStorage.getItem(KEY);

  //如果localStorage中没有这个key对应的数据则返回一个空对象
  if (!jsongString) {
    return {};
  }

  //如果有值，则将这个字符串转换成对象返回
  return JSON.parse(jsongString);
}

//设置localsrotage中的数据
export function setItem(gobj){
  //从localstorage中获取购买商品的对象
  var obj = getItem();

  //判断gobj.gid的值在objArr中是否存在
  //如果存在将obj.count的值叠加上去即可

  if (obj[gobj.gid]) {
    obj[gobj.gid] = obj[gobj.gid] + gobj.count;
  }else{
    //如果不存在。则动态想obj对象中添加一个商品的购买数量
    obj[gobj.gid] = gobj.count;
  }

  //3.0将objArr存储回loacalstorage中
  localStorage.setItem(KEY,JSON.stringify(obj));
}