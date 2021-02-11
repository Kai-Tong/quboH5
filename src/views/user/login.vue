<template>
    <div class="login-content">
        <img class="logo" src="../../assets/img/user/logo@2x.png" alt="">

        <div class="query-nav flex-between">
          <div @click="navActive1">
            <img v-if="navActive === 1" class="code-login" src="../../assets/img/user/dxdl@2x.png" />
            <p class="ppp" v-else>短信登录</p>
          </div>
          <div @click="navActive2">
            <img v-if="navActive === 2" class="pwd-login" src="../../assets/img/user/zhmdl@2x.png" />
            <p class="ppp" v-else>账户密码登录 <img class="right-login" src="../../assets/img/icon/in-ic@2x.png" /></p>
          </div>
        </div>
        <!-- 手机号登录 -->
        <van-form @submit="onSubmit" ref="phoneform" :key="formKey" v-if="navActive == 1">
          <van-field
            v-model="phone"
            name="phone"
            clearable
            label="+86"
            placeholder="请输入11位手机号码"
            maxlength="20"
            :rules="[{ validator: phoneValidator, message: '请输入正确的手机号' }]"
          />
          <van-field
            v-model="code"
            name="code"
            center
            clearable
            left-icon="code"
            placeholder="请输入验证码"
            maxlength="6"
            :rules="[{ required: true, message: '请填写验证码' }]"
          >
            <template #button v-if="navActive == 1">
              <van-button size="small" @click="getVerify" native-type="button" v-show="show" type="code">获取验证码</van-button>
              <van-button size="small" v-show="!show" type="code">{{count}} s</van-button>
            </template>
          </van-field>
          <van-button type="game-primary" native-type="submit">登  录</van-button>
        </van-form>
        <!-- 用户名登录 -->
        <van-form class="passbtn" @submit="onSubmit" v-if="navActive == 2" :key="formKey" ref="userform">
          <van-field
            v-model="username"
            name="username"
            clearable
            left-icon="user"
            placeholder="请输入用户名"
            maxlength="20"
            :rules="[{ validator: userValidator, message: '请输入4-20位数字和字母' }]"
          />
          <van-field
            v-model="password"
            :type="nowtype"
            name="password"
            center
            left-icon="pwd"
            placeholder="请输入密码"
            :rules="[{ validator: passValidator, message: '请输入6-20位数字和字母' }]"
          >
          <template #button>
              <van-button class="showpass" size="small" @click="showpass" native-type="button" v-if="nowtype == 'text'" type="code"></van-button>
              <van-button class="showpass" size="small" @click="noshowpass" native-type="button" v-else type="code"></van-button>
          </template>
          </van-field>
          <van-button type="game-primary" native-type="submit">登  录</van-button>
        </van-form>
        <div class="flex-between flex-between2">
          <van-checkbox class="agree-service" v-model="checked" shape="square" v-if="navActive == 2" @change="checkedchange">
            记住密码
            <template #icon="props">
              <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
            </template>
          </van-checkbox>
          <p class="reg-left">找回密码 / <a href="./register" class="register-href">注册账户</a></p>
        </div>
        <div class="other-login">
          <p>其他登录方式</p>
          <ul class="flex-between">
            <li
              v-for="(item, index) in otherLogins"
              :key="index"
              @click="otherActive=index"
            >
              <img :src="otherActive === index ? item.imgActive : item.img" alt="">
              <span>{{ item.txt }}</span>
            </li>
          </ul>
        </div>
    </div>
</template>

<script>
let params;
export default {
  name: 'Login',
  data () {
    return {
      //倒计时
      show: true,
      timer:null,
      count:"",
      //用户名登录
      username: '',
      password: '',
      //手机号登录
      phone:'',
      code:'',
      passwordShow:true,
      //手机号，账号登录切换
      navActive: 1,
      //清除表单错误提示
      formKey: 0,
      // 密码显示与隐藏
      nowtype:'text',
      otherActive: 0,
      otherLogins: [{
        img: require('../../assets/img/user/qq1@2x.png'),
        imgActive: require('../../assets/img/user/qq2@2x.png'),
        txt: 'QQ'
      }, {
        img: require('../../assets/img/user/wx1@2x.png'),
        imgActive: require('../../assets/img/user/wx2@2x.png'),
        txt: '微信'
      }, {
        img: require('../../assets/img/user/wb1@2x.png'),
        imgActive: require('../../assets/img/user/wb2@2x.png'),
        txt: '微博'
      }],
      checked: false,
      activeIcon: require('../../assets/img/user/check.png'),
      inactiveIcon: require('../../assets/img/user/check-active.png'),
      
    }
  },
  methods: {
    checkedchange(value){
      console.log(value);
    },
    navActive1(){
      this.navActive = 1;
      this.formKey ++
    },
    navActive2(){
      this.navActive = 2;
      this.formKey ++
    },
    showpass(){
      this.nowtype = 'password'
    },
    noshowpass(){
      this.nowtype = 'text'
    },
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
    //校验手机号
    phoneValidator(val) {
      return /^1[3456789]\d{9}$/.test(val);
    },
    //获取验证码
    getVerify() {
      let regphone = /^1[3456789]\d{9}$/;
      if(this.phone != '' && regphone.test(this.phone)){
          this.$axios({
              url:`${this.$api.getCode}/${this.phone}/1`,
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
    //base64转码
    encode(str){
      return  str == null ? null : btoa(encodeURIComponent(str));
    },
    //用户名登录
    login(){
        this.$api.login.useLogin(
        params
        ).then(res => {
            console.log(res);
            if (res.data.code == 1) {
                this.$message({
                  type: 'error', // warning、success
                  message: res.data.msg 
                }) 
            } else if (res.data.code == 0) {
                this.$toast({
                  message: '登录成功'
                });
                //登录成功获取用户基本信息
                this.getUid()
                localStorage.setItem("h5token", res.data.params.token);
                localStorage.setItem("user_name", res.data.params.user_info.user_name);
                localStorage.setItem("user_pic", res.data.params.user_info.user_pic);
                localStorage.setItem("user_info", JSON.stringify(res.data.params.user_info));
                this.$router.push("/mine");                                             
            } else if (res.data.code == -1) {
                this.$toast({
                  message: res.data.msg
                });
            }
        })
        .catch(error => {
          this.$toast("服务器响应失败，请稍后重试");
        })
    },
    onSubmit(values) {
      if(this.navActive == 2){
        // 判断复选框是否被勾选; 勾选则调用配置Cookie方法
        if (!this.checked) { // 记住密码
            this.setCookie(this.username, this.password, 7); // 保存期限为7天
        } else {
            this.clearCookie(); // 清空 Cookie
        }
        params = {
          name:this.$inHTMLData(this.username),
          mobile:"",
          vcode:"",
          pwd:this.$inHTMLData(this.encode(this.password)),
          type:1,
        }
        this.login();
      }else{
        params = {
          name:"",
          mobile:this.$inHTMLData(this.phone),
          vcode:this.$inHTMLData(this.code),
          pwd:"",
          type:2,
        }
        this.login();
      } 
    },
    //记住密码
      setCookie (name, pwd, exdays) {
        var exdate = new Date()// 获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)// 保存的天数
        // 字符串拼接cookie
        window.document.cookie = 'userName' + '=' + name + ';path=/;expires=' + exdate.toGMTString()
        window.document.cookie = 'userPwd' + '=' + pwd + ';path=/;expires=' + exdate.toGMTString()
      },
      // 读取cookie 将用户名和密码回显到input框中
      getCookie () {
        if (document.cookie.length > 0) {
          var arr = document.cookie.split('; ')
          for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('=')// 再次切割
            if (arr2[0] === 'userName') {
              this.username = arr2[1]
            } else if (arr2[0] === 'userPwd') {
              this.password = arr2[1]
            }
          }
        }
      },
      // 清除Cookie
      clearCookie() {
          this.setCookie('', '', -1);
      },
      //获取userid
      getUid(){
        this.$api.getbasicInfo
        .getbasic()
        .then((res) => {
            console.log(res);
            if (res.data.code == 1) {
            this.$message({
                type: "error", // warning、success
                message: res.data.msg,
            });
            } else if (res.data.code == 0) {
                localStorage.setItem("user_uid", res.data.params.user_uid);
            } else if (res.data.code == -1) {
            // this.$router.push("/");
            }
        })
        .catch((error) => {
            console.log(error);
        });
      }
  },
  mounted(){
    this.getCookie();
  }
}
</script>
<style lang="less" scope>
.login-content {
  background: url('../../assets/img/user/login-bg.png') no-repeat top left 100%;
  color: rgb(172,172,172);
  width: 100%;
  height: 100%;
  padding-top: 66px;
  box-sizing: border-box;
  text-align: center;
  .logo {
    width: 150px;
    height: 150px;
  }
  .query-nav {
    height: 35px;
    padding: 66px 74px 0;
    .code-login {
      width: 150px;
    }
    .pwd-login {
      width: 227px;
    }
      .ppp{
        margin: 0;
      }
  }
  .van-checkbox__icon {
    width: 29px;
    height: 29px;
    padding-right: 10px;
  }
  .van-form {
    margin-top: 100px;
    padding: 0 74px;
    .flex-between {
      padding: 0 30px;
    }
  }
  .flex-between2{
    padding: 0 100px !important;
  }
  .reg-left{
    float: right;
  }
  .van-cell {
    background-color: transparent;
    height: 106px;
    padding: 1rem 10px;
    .van-field__label {
      color: #acacac;
      padding-left: 0;
      width: 60px;
      text-align: center;
      margin-right: 0;
    }
    .van-field__left-icon {
      width: 60px;
    }
    .van-icon-user,
    .van-icon-pwd,
    .van-icon-code {
      width: 30px;
      height: 24px;
      margin: auto;
      .base-icon ();
      &::before {
        background-image: url('../../assets/img/user/yzm@2x.png');
      }
    }
    .van-icon-user {
      height: 34px;
      &::before {
        background-image: url('../../assets/img/icon/zh@2x.png');
      }
    }
    .van-icon-pwd {
      height: 35px;
      &::before {
        background-image: url('../../assets/img/icon/mm@2x.png');
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
    border: 2px solid rgb(116,116,116);
    background-color: rgb(13,18,25);
    color: rgb(172,172,172);
    width: 570px;
    margin-top: 55px;
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
  }
  .register-href {
    color: rgb(62,77,123);
  }
  .other-login {
    position: fixed;
    bottom: 48px;
    left: 50%;
    margin-left: -250px;
    p {
      width: 500px;
      height: 50px;
      line-height: 50px;
      background: url('../../assets/img/user/line@2x.png') no-repeat center center;
      background-size: 100%;
      margin: auto;
    }
    ul {
      width: 500px;
      margin: 25px auto; 
      justify-content: space-around;
    }
    span {
      color: #acacac;
      font-size: 22px;
      margin-top: 5px;
    }
    img {
      width: 76px;
      height: 76px;
      display: block;
    }
  }
}
.showpass{
  width: 30px !important;
  height: 24px !important;
  margin-left: 10px;
  margin: 0;
  background: url('../../assets/img/user/no-look@2x.png') no-repeat !important;
  background-size: 100% !important;
  position: absolute; 
  right: 3px; 
  top: 5px !important;
  // background: none !important;
}
</style>