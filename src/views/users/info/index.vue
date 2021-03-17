<template>
    <div class="userinfo-content">
        <header class="flex-between">
            <van-icon name="back" class="back-icon" @click="goBack" />
            <van-icon name="wap-home-o" class="home-icon" @click="goHome" />
        </header>
        <div class="base-info">
            <div class="avatar-box">
                <img :src="profile.user_pic || current" alt="">
            </div>
            <h3>{{profile.user_name}}</h3>
            <p class="text-overflow">个性签名：{{profile.user_desc}}</p>
            <div class="flex-between">
                <ul>
                    <li>
                        <span>{{profile.user_follow_num}}</span>
                        <small>关注</small>
                    </li>
                    <li>
                        <span>{{profile.user_fans_num}}</span>
                        <small>粉丝</small>
                    </li>
                </ul>
                <div v-if="!isme">
                    <img v-if="flag == 1" @click="follow" src="../../../assets/img/user/follow.png" alt="">
                    <img v-if="flag == 2" @click="follow" src="../../../assets/img/user/nofollow.png" alt="">
                </div>
            </div>
        </div>

        <!-- 选择模块 -->
        <ul class="query-nav">
            <li
                v-for="(item, index) in tabList"
                :key="index"
                @click="navActive = index"
            >
                <img :src="navActive === index ? item.imgActive : item.img" alt="">
            </li>
        </ul>

        <Post v-if="navActive === 1" />
        <Review v-else-if="navActive === 2" :userpic="profile.user_pic" />
        <Follow v-else-if="navActive === 3" />
        <Base v-else :userid = "userid" />
    </div>
</template>

<script>
import Base from './base'
import Post from './post'
import Review from './review'
import Follow from './follow'

export default {
  name: 'userInfo',
  data () {
    return {
      current:"https://img01.yzcdn.cn/vant/tree.jpg",
      navActive: 3,
      isme:'',
      flag:'',//关注1,取消关注2
      profile:{},
      userid:this.$route.params.user_uid,
      tabList: [{
          img: require('../../../assets/img/user/home.png'),
          imgActive: require('../../../assets/img/user/home-active.png')
      }, {
          img: require('../../../assets/img/user/post.png'),
          imgActive: require('../../../assets/img/user/post-active.png')
      }, {
          img: require('../../../assets/img/user/review.png'),
          imgActive: require('../../../assets/img/user/review-active.png')
      }, {
          img: require('../../../assets/img/user/gz.png'),
          imgActive: require('../../../assets/img/user/gz-active.png')
      }]
    }
  },
  components: {
    Base,
    Post,
    Review,
    Follow
  },
  methods: {
    //获取个人信息
    getInfo(){
        this.$axios({
            url:`${this.$api.myprofile}/${this.$route.params.user_uid}`,
            method: "get",
            timeout: 3000
        })
        .then(res => {
        console.log(res);
            if (res.data.code == 1) {
                this.profile = {}
            } else if (res.data.code == 0) {
                this.profile = res.data.params.profile;
                if(res.data.params.profile.is_followed == 1){
                    this.flag = 2;
                }else{
                    this.flag = 1;
                }
            } else if (res.data.code == -1) {
                this.$toast({
                    message: '身份验证过期，请重新登录' ,
                });
                // window.location.href = this.JuheHOST
            }
        })
        .catch(error => {
            console.log(error);
        });
    },
    // 是否关注
    follow(){
        this.$axios({
            url:`${this.$api.httppost.follow()}/${this.flag}/${this.$route.params.user_uid}`,
            method: "post",
            data: {
                uid: this.$route.params.user_uid,
                type: this.flag,
            },
            timeout: 3000
        })
        .then(res => {
            console.log(res);
                if (res.data.code == 1) {
                    this.$toast({
                        message: res.data.msg
                    });
                } else if (res.data.code == 0) {
                    if(this.flag == 1){
                        this.flag = 2
                        this.$toast({
                            message: "关注成功"
                        });
                    }else if(this.flag == 2){
                        this.flag = 1
                        this.$toast({
                            message: "取消成功"
                        });
                    }
                    // console.log(this.flag);                
                } else if (res.data.code == -1) {
                    this.$toast({
                        message: "登录过期请重新登录"
                    });
                    window.location.href = this.JuheHOST
                }
        })
        .catch(error => {
            console.log(error);
        });
    },
    goBack(){
        this.$router.go(-1)
    },
    goHome(){
        window.location.href = this.JuheHOST
    }
  },
  mounted(){
      this.getInfo();
    console.log(this.$route.params.user_uid);
    if(this.$route.params.user_uid == localStorage.getItem("user_uid")){
        this.isme = true
    }else{
        this.isme = false
    }
  }
}
</script>
<style lang="less" scope>
.userinfo-content {
    background: url('../../../assets/img/user/bg@2x.png') no-repeat top left;
    background-size: 100% 100%;
    background-attachment: fixed;
    width: 100%;
    height: 100%;
    header {
        background: url('../../../assets/img/user/info-header.png') no-repeat top left 100%;
        height: 160px;
        .back-icon {
            width: 35px;
            height: 35px;
            background: url('../../../assets/img/icon/back.png') no-repeat center center;
            background-size: 100%;
            position: absolute;
            top: 50px;
            left: 20px;
        }
        .home-icon{
            width: 35px;
            height: 35px;
            color: #e9e3e3;
            font-size: 40px;
            position: absolute;
            top: 50px;
            right: 20px;
        }
    }
    .base-info {
        height: 229px;
        color: rgb(203,203,203);
        background-color: #10141E;
        text-align: center;
        position: relative;
        padding-top: 64px;
        .avatar-box {
            width: 102px;
            height: 102px;
            position: absolute;
            top: -51px;
            left: 50%;
            margin-left: -51px;
            &::before {
                content: '';
                position: absolute;
                background: url('../../../assets/img/user/bg-avatar@2x.png') no-repeat center center;
                background-size: 100% 100%;
                width: 105%;
                height: 105%;
                display: block;
            }
            img {
                height: 100%;
                overflow: hidden;
                border-radius: 50%;
            }
            h3 {
                font-size: 34px;
            }
            p {
                color: #6a87df;
                font-size: 22px;
            }
        }
        .flex-between {
            padding: 25px 68px;
            align-items: center;
            img {
                width: 113px;
                height: 43px;
            }
            ul li {
                display: inline-block;
                text-align: center;
                margin-right: 20px;
                span {
                    display: block;
                }
            }
        }
    }
    .query-nav {
        display: flex;
        justify-content: space-around;
        width: 689px;
        margin: auto;
        padding-top: 20px;
        padding-bottom: 20px;
        border-top: 2px solid #40657e;
        border-bottom: 2px solid #40657e;
        li {
            width: 50px;
            height: 80px;
        }
    }
}
</style>