<template>
    <div class="userinfo-follow-content">
        <ul class="lists">
            <li
                v-for="(item, index) in attentionData"
                :key="index"
            >
                <van-row>
                    <van-col span="4" @click="goPerson(item.id)">
                        <img class="avatar" :src="item.user_pic" alt="">
                    </van-col>
                    <van-col span="16">
                        <div class="user van-ellipsis">
                            <strong>{{item.user_name}}</strong>
                        </div>
                        <p class="nums">
                            累计发帖 <em>{{item.forum_count}}</em>
                            关注 <em>{{item.user_follow_num}}</em>
                            粉丝 <em>{{item.user_fans_num}}</em>
                        </p>
                    </van-col>
                    <van-col span="4" @click="cancleAttention(item.id)" v-if="isme">
                        <img :src="followPics.qxgz" alt="" >
                    </van-col>
                    <van-col span="4" v-else>
                        <img :src="followPics.ygz" alt="" >
                    </van-col>
                </van-row>
            </li>
        </ul>
        <van-loading type="spinner" class="load" v-if="loading" />
        <div class="noarticle" v-if="attentionData.length == 0">
            暂未关注
        </div>
    </div>
</template>

<script>
export default {
  name: 'UserInfoFollow',
  data () {
    return {
        isme:'',
        loading:false,
        attentionData:[],
        followPics: {
            qxgz: require('../../../assets/img/user/nofollow.png'),
            ygz: require('../../../assets/img/user/followed.png'),
            gz: require('../../../assets/img/user/follow.png')
        }
    }
  },
  methods: {
    getAttention(){
        this.loading = true;
        this.$axios({
            url:`${this.$api.followfans}/${this.$route.params.user_uid}/1`,
            method: "get",
            timeout: 3000
        })
        .then(res => {
            console.log(res);
            if (res.data.code == 1) {
                this.$toast({
                    message: res.data.msg
                }); 
            } else if (res.data.code == 0) {
                this.attentionData = res.data.params.follow_fans;
                this.loading = false;
            } else if (res.data.code == -1) {
                this.$toast({
                    message: res.data.msg
                });
                window.location.href = this.JuheHOST
            }
        })
        .catch(error => {
            console.log(error);
        });
    },
    cancleAttention(i){
        let id = i;
        this.$axios({
            url:`${this.$api.httppost.follow()}/2/${id}`,
            method: "post",
            data: {
                uid: id,
                type: 2,
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
                    this.$toast({
                        message: "取消关注成功"
                    });
                    this.getAttention()              
                } else if (res.data.code == -1) {
                    this.$toast({
                        message: res.data.msg
                    });
                    window.location.href = this.JuheHOST
                }
        })
        .catch(error => {
            console.log(error);
        });
    },
    //查看关注人个人中心
    goPerson(value) {
        this.$router.push({ name: "userinfo", params: { user_uid: value } });
        this.$router.go(0)
    },
  },
  mounted(){
    this.getAttention();
    if(this.$route.params.user_uid == localStorage.getItem("user_uid")){
        this.isme = true
    }else{
        this.isme = false
    }
  }
}
</script>
<style lang="less" scope>
.userinfo-follow-content {
    background: url('../../../assets/img/user/bg@2x.png') no-repeat top left;
    background-size: 100% 100%;
    // height: calc(100% - 560px);
    // overflow-y: auto;
    .lists {
        padding: 0 30px 30px;
        box-sizing: border-box;
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
    .noarticle{
        color: #fff;
        text-align: center;
    }
    .load{
        width: 30px;
        margin: auto;
    }
}
</style>