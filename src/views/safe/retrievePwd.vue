<template>
    <div class="retrieve-content">
      <Header />
        <van-form @submit="onSubmit">
            <van-field
                v-model="phone"
                name="phone"
                clearable
                left-icon="phone"
                placeholder="请输入手机号"
                :rules="[{ validator: phoneValidator, message: '请输入11位手机号码' }]"
            />
            <van-field
                v-model="code"
                name="code"
                clearable
                center
                left-icon="code"
                placeholder="请输入验证码 "
                maxlength="6"
                :rules="[{ required: true, message: '请填写验证码' }]"
            >
                <template #button>
                  <van-button size="small" class="send-code" @click="getVerify" native-type="button" v-show="show" type="code" >获取验证码</van-button>
                  <van-button size="small" class="send-code" v-show="!show" type="code" >{{count}} s</van-button>
                </template>
            </van-field>
            <van-field
                v-model="password"
                clearable
                left-icon="pwd"
                placeholder="请输入6-20位密码"
                maxlength="20"
                :rules="[{ validator: passValidator, message: '请输入6-20位数字和字母' }]"
            />
            <van-field
                v-model="repassword"
                clearable
                left-icon="pwd"
                placeholder="请再次输入密码"
                maxlength="20"
                :rules="[{ validator: confirmpass, message: '两次输入的密码不一致' }]"
            />
            <van-button type="primary">确  认</van-button>
        </van-form>
    </div>
</template>

<script>
import Header from '@/components/common/header'
export default {
  name: 'Retrieve',
  components:{
    Header,
  },
  data () {
    return {
      //倒计时
      show: true,
      timer:null,
      count:"",
      //表单
      password:'',
      repassword:'',
      phone:'',
      code:'',
    }
  },
  methods: {
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
    encode(str) {
      return str == null ? null : btoa(encodeURIComponent(str));
    },
    getVerify() {
      let regphone = /^1[3456789]\d{9}$/;
      if(this.phone != '' && regphone.test(this.phone)){
          this.$axios({
              url:`${this.$api.getCode}/${this.phone}/2`,
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
    onSubmit() {
      this.$api.fogetpwd
        .changePwd({
          mobile: this.$inHTMLData(this.phone),
          vcode: this.$inHTMLData(this.code),
          pwd: this.$inHTMLData(this.encode(this.password)),
        })
        .then((res) => {
          // console.log(res);
          if (res.data.code == 1) {
            this.$toast({
              message: res.data.msg,
            });
          } else if (res.data.code == 0) {
            this.$toast({
              message: "重置成功",
            });
          } else if (res.data.code == -1) {
            this.$toast({
              message: res.data.msg,
            });
            window.location.href = this.JuheHOST
          }
        })
        .catch((error) => {
          this.$toast({
              message: "服务器响应失败",
            });
        });
    },
    //移除表单
    resetForm() {
      this.phone = '';
      this.code = '';
      this.password = '';
      this.repassword = '';
    },
  }
}
</script>
<style lang="less" scope>
.retrieve-content {
    // padding-top: 40px;
    .van-icon-phone {
       width: 24px;
       height: 36px;
       .base-icon();
       &::before {
         background-image: url('../../assets/img/icon/phone.png');
       }
    }
    .van-icon-code {
       width: 28px;
       height: 21px;
       .base-icon();
       &::before {
         background-image: url('../../assets/img/icon/email.png');
       }
    }
    .van-icon-pwd {
       width: 24px;
       height: 32px;
       .base-icon();
       &::before {
         background-image: url('../../assets/img/icon/pwd.png');
       }
    }
    .van-field__left-icon {
      padding-left: 20px;
    }
    
    .van-cell-group::after {
      border-bottom: 3px solid @border-color;
    }
    .van-button {
      margin-top: 140px;
    }
    .send-code {
        color: rgb(124,112,95);
        font-size: 26px;
        width: 180px;
        height: 60px;
        margin: 0;
        background: rgb(216,216,216);
        border-radius: 5px;
    }
}
// .van-button--code {
//     width: 183px;
//     height: 62px;
//     color: #8A7B68;
//     background:#202020;
//     font-size: 26px;
//     position: absolute; 
//     right: 3px; 
//     top: -35px;
//   }
</style>