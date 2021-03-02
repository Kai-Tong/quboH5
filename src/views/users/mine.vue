<template>
  <div class="base-content">
      <div class="header">
          <p>
              <van-icon name="back" class="back-icon" @click="goBack" />
          </p>
          <a href="./avatar"><img class="avatar" :src="avatar || current" alt=""></a>
          <p class="name">
                {{username}}
                <van-tag color="rgb(247,180,23)">LV.1</van-tag>
          </p>
          <span>用户账号：{{username}}</span>
      </div>
        <van-cell-group>
            <van-cell is-link @click="gobase">
                <template #title>
                    <img class="list-icon" src="../../assets/img/user/grzl-icon@2x.png" alt="">
                    <span class="custom-title">个人资料</span>
                </template>
            </van-cell>
            <van-cell is-link @click="gosafe">
                <template #title>
                    <img class="list-icon" src="../../assets/img/user/aqzx-icon@2x.png" alt="">
                    <span class="custom-title">安全中心</span>
                </template>
            </van-cell>
            <van-cell is-link @click="goprivacyset">
                <template #title>
                    <img class="list-icon" src="../../assets/img/user/sz1@2x.png" alt="">
                    <span class="custom-title">隐私设置</span>
                </template>
            </van-cell>
            <van-cell is-link @click="goaboutus">
                <template #title>
                    <img class="list-icon" src="../../assets/img/user/gywm-icon@2x.png" alt="">
                    <span class="custom-title">关于我们</span>
                </template>
            </van-cell>
            <van-cell is-link @click="goonline">
                <template #title>
                    <img class="list-icon" src="../../assets/img/user/zxkf-icon@2x.png" alt="">
                    <span class="custom-title">在线客服</span>
                </template>
            </van-cell>
            <van-cell is-link @click="gouser">
                <template #title>
                    <img class="list-icon" src="../../assets/img/user/bbxx-icon@2x.png" alt="">
                    <span class="custom-title">个人中心</span>
                </template>
            </van-cell>
        </van-cell-group>

        <img class="zx-btn" @click="exit" src="../../assets/img/user/zx-1@2x.png" alt="">
  </div>
</template>

<script>
// import mixin from '@/utils/mixin'

export default {
  name: 'HomePage',
//   mixins: [mixin],
  data() {
      return {
          current:"https://img01.yzcdn.cn/vant/tree.jpg",
          avatar:localStorage.getItem("user_pic"),
          username:""
      }
  },
  methods:{
    exit() {
      this.$api.loginout
        .useLoginout()
        .then((res) => {
          console.log(res);
          if (res.data.code == 1) {
            this.$toast({
                message: res.data.msg
            });
          } else if (res.data.code == 0) {
            this.$toast({
                message: '登出成功'
            });
            localStorage.setItem("h5token", "");
            localStorage.setItem("user_name", "");
            localStorage.setItem("user_uid", "");
            localStorage.setItem("user_pic", "");
            localStorage.setItem("user_info", "");
            window.location.href = this.JuheHOST
          } else if (res.data.code == -1) {
            window.location.href = this.JuheHOST
          }
        })
        .catch((error) => {
          console.log(error);
          this.$toast("参数错误");
        });
    },
    gobase(){
        this.$router.push('/base')
    },
    gosafe(){
        this.$router.push('/safe')
    },
    goprivacyset(){
        this.$router.push('/privacyset')
    },
    goaboutus(){
        this.$router.push('/aboutus')
    },
    goonline(){
        this.$router.push('/online')
    },
    gouser(){
        let uid = localStorage.getItem("user_uid")
        this.$router.push({
            name: "userinfo",
            params: { user_uid: uid }
        });
    },
    goBack(){
        window.location.href = this.JuheHOST
    }
  },
  mounted(){
      this.$api.getbasicInfo
    .getbasic()
    .then((res) => {
        console.log(res);
        if (res.data.code == 1) {
        this.$toast({
            message: res.data.msg,
        });
        } else if (res.data.code == 0) {
            this.avatar = res.data.params.user_pic
            this.username = res.data.params.user_name
        } else if (res.data.code == -1) {
            window.location.href = this.JuheHOST
        }
    })
    .catch((error) => {
        console.log(error);
    });
  }
}
</script>

<style scoped lang="less">
.base-content {
    width: 100%;
    height: calc(110%);
    background: #10151E url('../../assets/img/user/bg@2x.png') no-repeat top left;
    background-size: 100% 110%;
    position: absolute;
    top: 0;
    overflow: hidden;
    .header {
        background: #10151E url('../../assets/img/user/bg-header@2x.png') no-repeat top left;
        background-size: 100%;
        text-align: center;
        color: #fff;
        padding-bottom: 28px;
        box-sizing: border-box;
        p {
            height: 50px;
            .back-icon {
                width: 35px;
                height: 35px;
                background: url('../../assets/img/icon/back.png') no-repeat center center;
                background-size: 100%;
                position: absolute;
                top: 50px;
                left: 40px;
            }
        }
        .avatar {
            width: 132px;
            height: 132px;
            border-radius: 50%;
            overflow: hidden;
            // background-color: peru;
            display: block;
            margin: 0 auto 20px;
        }
        .name {
            font-size: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            .edit-icon {
                width: 25px;
                height: 25px;
                margin-left: 10px;
            }
            .van-tag {
                height: 24px;
                margin-left: 10px;
            }
        }
        span {
            font-size: 22px;
        }
    }
    .van-cell-group {
        background-color: transparent;
        padding: 60px 30px;
        box-sizing: border-box;
        &::after {
            border: 0;
        }
    }
    .van-cell {
        background-color: transparent;
        padding: 1rem 20px;
        box-sizing: border-box;
        background: url('../../assets/img/user/list-bg.png') no-repeat bottom left;
        background-size: 100%;
        &::after {
            border-bottom: 2px solid #40657f;
        }
        ::v-deep .van-cell__title {
            display: flex;
            align-items: center;
            height: auto;
            padding-left: 0;
            .list-icon {
                width: 34px;
                height: 34px;
                margin-right: 20px;
            }
            .custom-title {
                color: #fff;
                font-size: 28px;
            }
        }
    }
    .zx-btn {
        width: 584px;
        margin: auto;
        display: block;
    }
}
</style>
