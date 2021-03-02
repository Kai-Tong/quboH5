<template>
    <div class="safe-content">
      <Header />
        <van-cell-group>
            <van-cell title="登录密码" value="去修改" icon="password" is-link @click="gopassword"/>
            <van-cell title="修改手机" value="去修改" icon="mobile" is-link @click="gomodifyPhone"/>
            <van-cell title="邮箱验证" value="未绑定" v-if="!infoList.user_email" icon="email" @click="goemail" is-link />
            <van-cell title="邮箱验证" :value="infoList.user_email" v-else icon="email" is-link @click="goemail" />
            <van-cell title="身份验证" value="未实名" v-if="!infoList.user_id" icon="user"  @click="goauth" is-link />
            <van-cell title="身份验证" value="已实名" v-else icon="user" />
        </van-cell-group>
    </div>
</template>

<script>
import Header from '@/components/common/header'
export default {
  name: 'Home',
  components: {
    Header
  },
  data(){
    return{
      infoList:{}
    }
  },
  methods: {
    //获取用户信息
      getbasic(){
          this.$api.getbasicInfo.getbasic(
          ).then(res => {
              console.log(res);
              if (res.data.code == 1) {
                  this.$toast({
                  message: res.data.msg
                });
              } else if (res.data.code == 0) {
                  this.infoList = res.data.params;                        
              } else if (res.data.code == -1) {
                  this.$toast({
                    message: '身份验证过期，请重新登录'
                  });
                  window.location.href = this.JuheHOST
              }
          })
          .catch(error => {
              this.$toast("服务器响应失败，请稍后~");
          })
      },
      gopassword(){
        this.$router.push('/password')
      },
      gomodifyPhone(){
        this.$router.push('/modifyPhone')
      },
      goemail(){
        this.$router.push('/email')
      },
      goauth(){
        this.$router.push('/auth')
      }
  },
  mounted(){
    this.getbasic()
  }
}
</script>
<style lang="less" scope>
.safe-content {
    span {
      font-size: 30px;
    }
    .van-icon-user,
    .van-icon-mobile,
    .van-icon-email,
    .van-icon-password {
        &::before {
          content: '';
          background-repeat: no-repeat;
          background-size: 100%;
          width: 30px;
          height: 50px;
      }
    }
    .van-icon-user::before {
      background-image: url('../../assets/img/icon/user.png');
    }
    .van-icon-mobile::before {
      background-image: url('../../assets/img/icon/phone.png');
    }
    .van-icon-password::before {
      background-image: url('../../assets/img/icon/pwd.png');
    }
    .van-icon-email::before {
      background-image: url('../../assets/img/icon/email.png');
    }
}
</style>