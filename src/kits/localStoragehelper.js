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
export function setItem(gobj) {

  // 1.0 从localStorage中获取购买商品的对象
  var obj = getItem();

  // 2.0 判断gobj.gid的值在obj中是否存在，
  // 如果存在将gobj.count的值叠加上去即可
  if (obj[gobj.gid]) {
    // obj.91 = obj.91 + 1;
    obj[gobj.gid] = obj[gobj.gid] + gobj.count;
  } else {
    // 如果不存在，则动态向ob对象中添加一个商品的购买数量
    // 等价于  obj.91 = 1;
    obj[gobj.gid] = gobj.count;
  }

  // 3.0 将obj存储会loacalStorage中
  localStorage.setItem(KEY, JSON.stringify(obj));
}
//覆盖一个值
export function setItemReplace(gobj){
  //1.0 从localstorage中获取购买商品的对象
  var obj = getItem();
  obj[gobj.gid] = gobj.count;

  //将objArr存储回loacastorage中
  localStorage.setItem(KEY,JSON.stringify(obj));
}

//删除loacalstorage数据
export function remoteItem(goodsid){
  var obj = getIem();
  //删除objArr中对应的属性即可
  delete obj[goodsid];
  //写回localstorage
  localStorage.setItem(KEY,JSON.stringify(obj));
}