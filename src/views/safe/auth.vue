<template>
    <div class="auth-content">
      <Header />
        <div class="tips">
            <p>实名认证资料将作为领奖的唯一凭证；</p>
            <p>请如实填写，提交后不可更改。</p>
        </div>
        
        <van-form @submit="onSubmit" v-if="isSubmit">
          <van-field
              v-model="password"
              clearable
              left-icon="pwd"
              placeholder="请输入登录密码"
              :rules="[{ validator: passValidator, message: '请输入6-20位数字和字母' }]"
          />
          <van-field
              v-model="name"
              clearable
              left-icon="name"
              placeholder="请输入真实姓名"
              :rules="[{ validator: checkChinese, message: '请输入中文姓名' }]"
          />
          <van-field
              v-model="authid"
              clearable
              left-icon="card"
              placeholder="请输入身份证号码"
              :rules="[{ validator: checkAuth, message: '请输入正确的身份证号' }]"
          />
          <van-button round block type="primary" native-type="submit">确  认</van-button>
        </van-form>

        <div class="ready-info" v-else>
          <p>
            真实姓名：<span>林**</span>
          </p>
          <p>
            身份证号：<span>42122***********2366</span>
          </p>
        </div>
    </div>
</template>

<script>
import Header from '@/components/common/header'
export default {
  name: 'Auth',
  components: {
    Header
  },
  data () {
    return {
      password:'',
      name:'',
      authid:'',
      isSubmit: true
    }
  },
  methods: {
    // [\u4e00-\u9fa5]
    //校验密码
    passValidator(val) {
      return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(val);
    },
    //校验汉字
    checkChinese(val) {
      return /[\u4E00-\u9FA5\uF900-\uFA2D]/.test(val);
    },
    //校验身份证号
    checkAuth(val){
      return /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/.test(val);
    },
    encode(str){
      return  str == null ? null : btoa(encodeURIComponent(str));
    },
    onSubmit(){
      this.$api.checkreal.checkrealPerson({
          pwd:this.$inHTMLData(this.encode(this.password)),
          real_name:this.$inHTMLData(this.name),
          id_no:this.$inHTMLData(this.authid)
      }).then(res => {
          // console.log(res);
          if (res.data.code == 1) {
              this.$toast({
                message: res.data.msg,
              }); 
          } else if (res.data.code == 0) {
              this.$toast({
                message: "身份认证成功",
              });
              this.$router.push('/safe')                            
          } else if (res.data.code == -1) {
              this.$toast({
                message: res.data.msg,
              });
              window.location.href = this.JuheHOST
          }
      })
      .catch(error => {
          this.$message("设置失败")
      })
    }
  }
}
</script>
<style lang="less" scope>
.auth-content {
    .tips {
      color: rgb(62,77,123);
      font-size: 24px;
      text-align: left;
      margin-left: 25px;
    }
    .van-icon-pwd {
       width: 26px;
       height: 34px;
       .base-icon();
       &::before {
         background-image: url('../../assets/img/icon/pwd.png');
       }
    }
    .van-icon-name {
       width: 26px;
       height: 34px;
       .base-icon();
       &::before {
         background-image: url('../../assets/img/icon/realname.png');
       }
    }
    .van-icon-card {
       width: 26px;
       height: 34px;
       .base-icon();
       &::before {
         background-image: url('../../assets/img/icon/idcard.png');
       }
    }
    .van-button {
      margin-top: 140px;
    }
    .ready-info {
      text-align: left;
      color: rgb(51,51,51);
      p {
        line-height: 98px;
        border-bottom: 2px solid @border-color;
      }
      span {
        color: rgb(122,122,122);
      }
    }
}
</style>