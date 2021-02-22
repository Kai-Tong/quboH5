<template>
    <div class="retrieve-content">
        <Header />
        <div class="step-nav">
            <span class="step-1" :class="{'active': active === 1}">验证手机号</span>
            <span class="step-2" :class="{'active': active === 2}">设置新手机</span>
        </div>

        <van-form @submit="onSubmit" v-if="active === 2">
            <van-field
                v-model="newphone"
                clearable
                left-icon="phone"
                placeholder="请输入新的手机号"
                :rules="[{ validator: phoneValidator, message: '请输入11位手机号码' }]"
            />
            <van-field
                v-model="code"
                clearable
                center
                left-icon="code"
                placeholder="请输入短信验证码 "
                maxlength="6"
                :rules="[{ required: true, message: '请填写验证码' }]"
            >
                <template #button>
                  <van-button size="small" class="send-code" @click="getVerify" native-type="button" v-show="show" type="code" >获取验证码</van-button>
                  <van-button size="small" class="send-code" v-show="!show" type="code" >{{count}} s</van-button>
                </template>
            </van-field>
            <van-button type="primary">确  认</van-button>
        </van-form>

        <van-form @submit="onNext" v-else>
            <van-field
                v-model="phone"
                clearable
                left-icon="phone"
                placeholder="请输入当前手机号"
                :rules="[{ validator: phoneValidator, message: '请输入11位手机号码' }]"
            />
            <van-field
                v-model="password"
                clearable
                center
                left-icon="pwd"
                placeholder="请输入登录密码 "
                :rules="[{ validator: passValidator, message: '请输入6-20位数字和字母' }]"
            />
            <van-button type="primary">下一步</van-button>
        </van-form>
    </div>
</template>

<script>
import Header from '@/components/common/header'
export default {
  name: 'Retrieve',
  components:{
      Header
  },
  data () {
    return {
      //倒计时
      show: true,
      timer:null,
      count:"",
      //表单
      password:'',
      newphone:'',
      phone:'',
      code:'',
      active: 1
    }
  },
  methods: {
    //校验密码
    passValidator(val) {
      return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(val);
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
              url:`${this.$api.getCode}/${this.phone}/3`,
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
                  window.location.href = this.JuheHOST
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
    onNext(){
        this.active = 2
    },
    onSubmit(){
        this.$api.changephone.changemobile({
            pwd:this.encode(this.password),
            old_mobile:this.$inHTMLData(this.phone),
            new_mobile:this.$inHTMLData(this.newphone),
            vcode:this.$inHTMLData(this.code)
        }).then(res => {
            // console.log(res);
            if (res.data.code == 1) {
                this.$toast({
                  message: res.data.msg
                }); 
            } else if (res.data.code == 0) {
                this.$toast({
                  message: "修改成功"
                });
                this.resetForm();                            
            } else if (res.data.code == -1) {
                this.$toast({
                  message: res.data.msg
                });
                // window.location.href = this.JuheHOST
            }
        })
        .catch(error => {
            this.$message("设置失败")
        })
    },
    //移除表单
    resetForm() {
      this.phone = '';
      this.code = '';
    },
  }
}
</script>
<style lang="less" scope>
.retrieve-content {
    .step-nav {
        display: flex;
        margin-bottom: 40px;
        text-align: center;
        span {
            height: 88px;
            line-height: 88px;
            flex: 1;
            font-size: 32px;
            color: #333;
            background-size: 100%;
            background-repeat: no-repeat;
            &.step-1 {
                background-image: url('../../assets/img/other/step1.png');
            }
            &.step-1.active {
                background-image: url('../../assets/img/other/step1-active.png');
            }
            &.step-2 {
                background-image: url('../../assets/img/other/step2.png');
            }
            &.step-2.active {
                background-image: url('../../assets/img/other/step2-active.png');
            }
        }
    }
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
</style>