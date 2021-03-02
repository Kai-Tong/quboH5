<template>
    <div class="pwd-content">
      <Header />
        <van-form @submit="onSubmit">
            <van-field
                v-model="oldpass"
                clearable
                left-icon="pwd-icon"
                placeholder="请输入原密码"
                maxlength="20"
                :rules="[{ validator: passValidator, message: '请输入6-20位数字和字母' }]"
            />
            <van-field
                v-model="pass"
                clearable
                left-icon="pwd-icon"
                maxlength="20"
                placeholder="请设置6—20位新的登录密码 "
                :rules="[{ validator: passValidator, message: '请输入6-20位数字和字母' }]"
            />
            <van-field
                v-model="checkPass"
                clearable
                left-icon="pwd-icon"
                maxlength="20"
                placeholder="请再次输入新的登录密码"
                :rules="[{ validator: confirmpass, message: '两次输入的密码不一致' }]"
            />
            <van-button type="primary">确  认</van-button>
        </van-form>
    </div>
</template>

<script>
import Header from '@/components/common/header'
export default {
  name: 'Password',
  components:{
    Header
  },
  data () {
    return {
      oldpass:'',
      pass: '',
      checkPass: ''
    }
  },
  methods: {
    //校验密码
    passValidator(val) {
      return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(val);
    },
    //确认密码
    confirmpass(val){
      if(val == this.pass){
        return
      }else{
        return false
      }
    },
    //base64转码
    encode(str) {
      return str == null ? null : btoa(encodeURIComponent(str));
    },
    onSubmit(){
      this.$api.setpassword.setPwd({
          new_pwd:this.$inHTMLData(this.encode(this.pass)),
          old_pwd:this.$inHTMLData(this.encode(this.oldpass))
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
              window.location.href = this.JuheHOST
          }
      })
      .catch(error => {
          this.$message("设置失败")
      })
    },
    //移除表单
    resetForm() {
      this.oldpass = '';
      this.pass = '';
      this.checkPass = '';
    },
  }
}
</script>
<style lang="less" scope>
.pwd-content {
    .van-icon-pwd-icon {
       width: 26px;
       height: 34px;
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
}
</style>