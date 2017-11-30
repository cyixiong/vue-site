<template>
  <div class="tmpl">
      {{msg}}<br>
      <el-button type="success" @click="update">更新msg的值</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg:'hello vuelive'
      }
    },
    beforeCreate(){
      console.log('1--->beforeCreate',this.msg);
    },
    created(){
      console.log('2-->created',this.msg);
    },
    beforeMount(){
      console.log('3-->beforeMount' ,this.msg);
    },
    mounted(){
      console.log('4-->mounted' ,this.msg);
    },
    beforeUpdate(){
      console.log('5-->beforeUpdate',this.msg);
    },
    updated(){
      console.log('6-->updated',this.msg);
    },
    beforeDestroy(){
      console.log('7>>>beforeDestroy',this.msg);
    },
    destroyed(){
      console.log('8-->destroyed',this.msg);
    },
    methods: {
      update(){
        this.msg +='1';
      }
    }
  }
</script>
<style scoped>
</style>