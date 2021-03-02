<template>
    <div class="userinfo-review-content">
        <dl>
            <dt>评论（共{{commentlist.length}}条）</dt>
            <dd>
                <div v-for="(item,index) in commentlist" :key="index" @click="toPostDetail(item)">
                    <van-row>
                        <van-col span="3">
                            <img class="avatar" :src="userpic || current" alt="">
                        </van-col>
                        <van-col span="17">
                            <!-- <p class="name">电竞迷糊大王</p> -->
                            <span class="time">{{item.c_addtime}}</span>
                            <span class="time">-来自：{{item.forum_title}}</span>
                        </van-col>
                        <van-col span="4">
                            <van-icon class="goodjob" name="good-job" />
                            <em class="like">{{item.c_good_count}}</em>
                        </van-col>
                    </van-row>
                    <div class="reviews">
                        <p>{{item.c_body}}</p>
                    </div>
                </div>
                <van-loading type="spinner" class="load" v-if="loading" />
                <div class="noarticle" v-if="commentlist.length == 0">
                    暂无评论
                </div>
            </dd>
        </dl>
        
    </div>
</template>

<script>
export default {
  name: 'UserInfoReview',
  data () {
    return {
        current:"https://img01.yzcdn.cn/vant/tree.jpg",
        loading:false,
        commentlist:[]
    }
  },
  props:["userpic"],
  methods: {
    toPostDetail(item){
        window.location.href = this.JuheHOST+ '/forum/' + item.ch_columnm_key + '/' + item.ch_key + '/' + item.forum_id + '.html'
    },
    //时间转换
    dateFormat(date) {
        var date = new Date(date * 1000);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y + M + D + h + m + s;
    },
    getCommentList(){
        this.loading = true;
        this.$axios({
            url:`${this.$api.commentlist}/${this.$route.params.user_uid}`,
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
                for(var index in res.data.params){
                    res.data.params[index].c_addtime = this.dateFormat(res.data.params[index].c_addtime)
                }
                this.commentlist = res.data.params;
                this.loading = false;
            } else if (res.data.code == -1) {
                this.$toast({
                    message: '身份验证过期，请重新登录'
                });
                window.location.href = this.JuheHOST
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
  },
  mounted(){
      this.getCommentList()
  }
}
</script>
<style lang="less" scope>
.userinfo-review-content {
    background: url('../../../assets/img/other/2bg@2x.png') no-repeat top left;
    background-size: 100% 100%;
    height: calc(100% - 560px);
    overflow-y: auto;
    padding-top: 20px;
    box-sizing: border-box;
    dl {
        dt {
            color: rgb(201,177,123);
            border-left: 9px solid rgb(201,177,123);
            line-height: 35px;
            padding-left: 40px;
        }
        dd {
            margin-top: 20px;
            padding-left: 30px;
            &>div {
                padding-top: 20px;
                padding-bottom: 20px;
                border-top: 2px solid rgb(201,177,123);
            }
            .avatar {
                width: 55px;
                height: 55px;
                border-radius: 50%;
                overflow: hidden;
                display: block;
            }
            .name {
                color: rgb(26,144,252);
                font-size: 28px;
            }
            .like {
                color: rgb(1,70,129);
                font-style: normal;
                font-size: 24px;
                position: relative;
                top: -5px;
            }
            .time {
                color: rgb(160,160,160);
                font-size: 20px;
            }
            .reviews {
                color: #fff;
                padding-left: 90px;
                margin-top: 10px;
            }
            .goodjob{
                color: rgb(1,70,129);
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
    }
}
</style>