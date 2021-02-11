<template>
    <div class="userinfo-review-content">
        <dl>
            <dt>评论（共1256条）</dt>
            <dd>
                <div>
                    <van-row>
                        <van-col span="3">
                            <img class="avatar" src="" alt="">
                        </van-col>
                        <van-col span="17">
                            <p class="name">电竞迷糊大王</p>
                            <span class="time">昨天14：20</span>
                        </van-col>
                        <van-col span="4">
                            <em class="like">1234</em>
                        </van-col>
                    </van-row>
                    <div class="reviews">
                        <p>支开一张浪漫的网，定理支持</p>
                    </div>
                </div><div>
                    <van-row>
                        <van-col span="3">
                            <img class="avatar" src="" alt="">
                        </van-col>
                        <van-col span="17">
                            <p class="name">电竞迷糊大王</p>
                            <span class="time">昨天14：20</span>
                        </van-col>
                        <van-col span="4">
                            <em class="like">1234</em>
                        </van-col>
                    </van-row>
                    <div class="reviews">
                        <p>支开一张浪漫的网，定理支持</p>
                    </div>
                </div>
                <div>
                    <van-row>
                        <van-col span="3">
                            <img class="avatar" src="" alt="">
                        </van-col>
                        <van-col span="17">
                            <p class="name">电竞迷糊大王</p>
                            <span class="time">昨天14：20</span>
                        </van-col>
                        <van-col span="4">
                            <em class="like">1234</em>
                        </van-col>
                    </van-row>
                    <div class="reviews">
                        <p>支开一张浪漫的网，定理支持</p>
                    </div>
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
    }
  },
  methods: {
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
        }
    }
}
</style>