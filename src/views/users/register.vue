<template>
    <div class="login-content">
      <div class="logodiv">
        <img class="logo" src="../../assets/img/user/logo@2x.png" alt="">
      </div>
        <img class="code-login" src="../../assets/img/user/zc@2x.png" />

        <van-form @submit="onSubmit">
          <van-field
            v-model="username"
            name="username"
            left-icon="user"
            placeholder="请输入用户名、手机号或邮箱"
            maxlength="20"
            :rules="[{ validator: userValidator, message: '请输入6-20位数字和字母,11位手机号或邮箱' }]"
          />
          <van-field
            v-model="password"
            name="password"
            left-icon="pwd"
            placeholder="请输入6-16位密码"
            maxlength="16"
            :rules="[{ validator: passValidator, message: '请输入6-16位数字和字母' }]"
          />
          <van-field
            v-model="repassword"
            name="repassword"
            left-icon="pwd"
            placeholder="请再次输入密码"
            maxlength="20"
            :rules="[{ validator: confirmpass, message: '两次输入的密码不一致' }]"
          />
          <van-field
            v-model="phone"
            name="phone"
            left-icon="phone"
            placeholder="请输入11位手机号码"
            maxlength="20"
            :rules="[{ validator: phoneValidator, message: '请输入11位手机号码' }]"
          />
          <van-field
            v-model="code"
            name="code"
            center
            left-icon="code"
            placeholder="请输入验证码"
            maxlength="6"
            :rules="[{ required: true, message: '请填写验证码' }]"
          >
            <template #button>
              <van-button size="small" @click="getVerify" native-type="button" v-show="show" type="code" >获取验证码</van-button>
              <van-button size="small" v-show="!show" type="code" >{{count}} s</van-button>
            </template>
          </van-field>
          
          <van-checkbox class="agree-service" v-model="checked" disabled shape="square">
            已阅读并同意 <a @click="toagreement">《电竞用户协议》</a>
            <template #icon="props">
              <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
            </template>
          </van-checkbox>
          <van-button type="game-primary">注  册</van-button>
        </van-form>
        <p>已有账户  <a href="./login" class="register-href">立即登录</a></p>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      //倒计时
      show: true,
      timer:null,
      count:"",
      //表单
      username: '',
      password:'',
      repassword:'',
      phone:'',
      code:'',
      navActive: 1,
      checked: false,
      activeIcon: require('../../assets/img/user/check.png'),
      inactiveIcon: require('../../assets/img/user/check-active.png'),
    }
  },
  methods: {
    //校验用户名
    userValidator(val) {
      let regphone = /^1[3456789]\d{9}$/;
      let regmail = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
      let regname = /^(?!\d+$)[\da-zA-Z-_]{4,20}$/;
      if(regname.test(val) || regphone.test(val) || regmail.test(val)){
        return
      }else{
        return false;
      } 
    },
    //校验密码
    passValidator(val) {
      return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(val);
    },
    //确认密码
    confirmpass(val){
      if(val == this.password){
        return
      }else{
        return false
      }
    },
    //校验手机号
    phoneValidator(val) {
      return /^1[3456789]\d{9}$/.test(val);
    },
    //base64转码
    encode(str){
      return  str == null ? null : btoa(encodeURIComponent(str));
    },
    //获取验证码
    getVerify() {
      let regphone = /^1[3456789]\d{9}$/;
      if(this.phone != '' && regphone.test(this.phone)){
          this.$axios({
              url:`${this.$api.getCode}/${this.phone}/0`,
              method: "post",
              timeout: 3000
          })
          .then(res => {
            console.log(res);
              if(res.data.code == 1) {
                  this.$toast('请一分钟后再试');
              } else if (res.data.code == 0) {
                this.$toast('验证码已发送');
                const TIME_COUNT = 60; //更改倒计时时间
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.show = true;
                            clearInterval(this.timer); // 清除定时器
                            this.timer = null;
                        }
                    }, 1000);
                }                             
              } else if (res.data.code == -1) {
                  this.$toast(res.data.msg);
              }
          })
          .catch(error => {
              this.$toast('请求频繁，请稍后再试');
          });
      }else{
        this.$toast({
          message: '请注意手机号格式和不能为空'
        });
      }    
    },
    onSubmit(values){
      console.log(values,'1');
      this.$api.registered.useRegister({
        mobile:this.$inHTMLData(this.phone),
        name:this.$inHTMLData(this.username),
        vcode:this.$inHTMLData(this.code),
        pwd:this.$inHTMLData(this.encode(this.password))
      }).then(res => {
          console.log(res);
          if (res.data.code == 1) {
              this.$toast({
                message: res.data.msg 
              }) 
          } else if (res.data.code == 0) {
              this.$toast({
                message: '注册成功，请登录！'
              })
              this.$router.push('/login')                           
          } else if (res.data.code == -1) {

          }
      })
      .catch(error => {
        this.$toast("服务器响应错误，注册失败")
      })
    },
    toagreement(){
      this.$router.push('./agreement')
    }
  },
  mounted(){
    
  }
}
</script>
<style lang="less" scope>
.login-content {
  background: url('../../assets/img/user/login-bg.png') no-repeat;
  color: rgb(172,172,172);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  box-sizing: border-box;
  text-align: center;
  .logo, .code-login {
    margin: auto;
    display: block;
  }
  .logodiv{
    margin-top: 66px;
  }
  .logo {
    width: 150px;
    height: 150px;
    
  }
  .code-login {
    height: 35px;
    width: 74px;
    margin: 20px auto;
  }
  .van-form {
    margin-top: 30px;
    padding: 0 74px;
    .flex-between {
      padding: 0 30px;
    }
    .agree-service {
      margin-top: 30px;
      margin-left: 40px;
      a {
        color: #f0d58e;
      }
    }
  }
  .van-checkbox__icon {
    width: 29px;
    height: 29px;
    padding-right: 10px;
  }
  .van-cell {
    background-color: transparent;
    height: 106px;
    padding: 1rem 10px;
    box-sizing: border-box;
    .van-field__label {
      color: #acacac;
      padding-left: 0;
      width: 60px;
      text-align: center;
      margin-right: 0;
    }
    .van-field__left-icon {
      width: 40px;
      margin-right: 0;
      display: flex;
    }
    .van-icon-user,
    .van-icon-pwd,
    .van-icon-phone,
    .van-icon-code {
      width: 30px;
      margin: auto;
      .base-icon ();
    }
    .van-icon-code {
      height: 24px;
      &::before {
        background-image: url('../../assets/img/user/yzm@2x.png');
      }
    }
    .van-icon-pwd {
      height: 35px;
      &::before {
        background-image: url('../../assets/img/icon/mm@2x.png');
      }
    }
    .van-icon-phone {
      height: 36px;
      &::before {
        background-image: url('../../assets/img/icon/sji@2x.png');
      }
    }
    .van-icon-user {
      height: 34px;
      &::before {
        background-image: url('../../assets/img/icon/zh@2x.png');
      }
    }
    .van-field__control {
      color: #fff;
      &::placeholder {
        color: #acacac;
      }
    }
  }
  .right-login {
    width: 20px;
    height: 16px;
  }
  .van-button--game-primary {
    border: 2px solid #f0d58e;
    background-color: rgb(13,18,25);
    color: #f0d58e;
    width: 570px;
    margin-top: 55px;
    font-weight: bold;
  }
  .van-button--code {
    width: 183px;
    height: 62px;
    color: #8A7B68;
    background:#202020;
    font-size: 26px;
    position: absolute; 
    right: 3px; 
    top: -35px;
  }
  .van-checkbox__label {
    color: rgb(172,172,172);
    line-height: 50px;
  }
  .register-href {
    color: rgb(62,77,123);
  }
}
</style>