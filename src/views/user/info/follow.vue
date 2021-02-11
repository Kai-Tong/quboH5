<template>
    <div class="userinfo-follow-content">
        <ul class="lists">
            <li
                v-for="(item, index) in 5"
                :key="index"
                @click="navActive = index"
            >
                <van-row>
                    <van-col span="4">
                        <img class="avatar" :src="followPics.qxgz" alt="">
                    </van-col>
                    <van-col span="16">
                        <div class="user van-ellipsis">
                            <strong>来自星星的你</strong>
                            <small>我最专业你最专业！</small>
                        </div>
                        <p class="nums">
                            累计发帖 <em>1234</em>
                            关注 <em>1234</em>
                            粉丝 <em>1234</em>
                        </p>
                    </van-col>
                    <van-col span="4">
                        <img :src="followPics.qxgz" alt="">
                    </van-col>
                </van-row>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'UserInfoFollow',
  data () {
    return {
        followPics: {
            qxgz: require('../../../assets/img/user/nofollow.png'),
            ygz: require('../../../assets/img/user/followed.png'),
            gz: require('../../../assets/img/user/follow.png')
        }
    }
  },
  methods: {
    goBack: () => {
        
    }
  }
}
</script>
<style lang="less" scope>
.userinfo-follow-content {
    background: url('../../../assets/img/user/bg@2x.png') no-repeat top left;
    background-size: 100%;
    height: calc(100% - 560px);
    overflow-y: auto;
    .lists {
        padding: 0 30px 30px;
        li {
            background: url('../../../assets/img/user/bg-frame@2x.png') no-repeat bottom left;
            background-size: 100%;
            margin-top: 10px;
            padding: 10px 30px 0 10px;
            height: 150px;
            display: flex;
            align-items: center;
            .avatar {
                width: 96px;
                height: 96px;
            }
            .user {
                strong {
                    font-size: 28px;
                    color: #fff;
                    margin-right: 20px;
                }
                small {
                    color: rgb(124,124,124);
                    font-size: 20px;
                }
            }
            .nums {
                color: rgb(167,167,168);
                font-size: 20px;
                margin-top: 20px;
                em {
                    font-style: normal;
                    font-weight: bold;
                    color: rgb(240,211,144);
                    margin-right: 15px;
                }
            }
        }
    }
}
</style>