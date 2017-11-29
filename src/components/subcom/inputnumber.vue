<template>
  <div class="subtmpl">
      <ul>
        <li @click="substract">-</li>
        <li>{{count}}</li>
        <li @click="add">+</li>
      </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        count:1
      }
    },
    //obj的格式
    props:['obj'],
    mounted(){
      console.log(this.obj);
      //将传入的商品购买数量赋值给this.count
      this.count = this.obj.count;
    },
    methods: {
      //加
      add(){
        this.count++;
        //将最新的数量传递给父组件
        this.notice();
      },
      //减
      substract(){
        if (this.count<=1) {
          this.count =1;
          return;
        }
        this.count--;
        //将最新的数量传递给父组件
        this.notice();
      },
      notice(){
        //调用$emit触发事件
        this.$emit('msg',{gid:this.obj.gid,count:this.count});
      }
    }
  }
</script>
<style scoped>
  .subtmpl ul{
        width: 120px;
    }

    .subtmpl li{
        list-style: none;
        display:inline-block;
        width: 30px;
        border: 1px solid rgba(0,0,0,0.3);
        text-align: center;
        padding: 2px;
        cursor: pointer;
    }
</style>