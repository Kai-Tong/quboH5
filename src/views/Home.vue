<template>
  <div class="home">
      <img src="../assets/img/other/home.png" alt="">
      <div class="gologin" @click="tologin">立即登录</div>
      <div class="bottom_nav">
        <div class="gohome" @click="tohome">随便看看<span>/</span></div>
        <div class="goreg" @click="toreg">马上注册</div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  methods:{
    tologin(){
      this.$router.push('/login')
    },
    tohome(){

    },
    toreg(){
      this.$router.push('/register')
    }
  }
}
</script>
<style lang="less" scoped>
.home{
  height: 100%;
  position: relative;
  img{
    height: 100%;
  }
  .gologin{
    width: 570px;
    height: 90px;
    line-height: 90px;
    border-radius: 10px;
    margin-left: 90px;
    text-align: center;
    border: 1px solid #FFF;
    color: #FFF;
    position: absolute;
    bottom: 100px;
  }
  .bottom_nav{
    width: 100%;
    position: absolute;
    bottom: 25px;
    color: #FFF;
    .gohome{
      text-align: right;
      width: 50%;
      float: left;
      span{
        margin-left: 20px;
      }
    }
    .goreg{
      margin-left: 20px;
      width: 40%;
      float: left;
    }
  }
}

</style>