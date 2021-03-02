<template>
<div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <ul class="userinfo-post-content">
            <div class="noarticle" v-if="articleList.length == 0">
                暂未发帖
            </div>
            <li
                v-for="(item, index) in articleList"
                :key="index"
                @click="toPostDetail(item)"
            >
                <span>{{item.addtime_format}} 发布于 <em>{{item.ch_columnm_key}}</em>-板块</span>
                <p><van-tag type="primary" size="large">TOP</van-tag>{{item.forum_title}}</p>
                <div class="post_detail" v-html="item.forum_body">

                </div>
                <div class="article_img" v-if="item.imgList.length != 0">
                    <img :src="imgsrc" alt="" v-for="(imgsrc,index) in item.imgList" :key="index">
                </div>
            </li>        
        </ul>
    </van-pull-refresh>
</div>
</template>

<script>
export default {
  name: 'post',
  data () {
    return {
      isLoading: false,
      articleList:[]
    }
  },
  methods: {
    onRefresh() {
        setTimeout(() => {
            this.$toast('刷新成功');
            this.isLoading = false;
        }, 1000);
        this.getaAticle()
    },
    //新的帖子
        getaAticle(){
            this.$axios({
                url:`${this.$api.myprofile}/${this.$route.params.user_uid}`,
                method: "get",
                timeout: 3000
            })
            .then(res => {
                console.log(res);
                if (res.data.code == 1) {
                } else if (res.data.code == 0) {
                    let receiveList = res.data.params.my_forum;
                    for(var i in receiveList){
                        let dataList = [];
                        dataList[i] = [];
                        receiveList[i].forum_body.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, function (match, capture) {                           
                            return dataList[i].push(capture);
                        })
                        this.$set(receiveList[i],'imgList',
                            dataList[i].slice(-3)
                        )
                        receiveList[i].forum_body = receiveList[i].forum_body.replace(/<[^>]+>/g, '')
                    }
                    this.articleList = receiveList;
                } else if (res.data.code == -1) {
                    window.location.href = this.JuheHOST 
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
    toPostDetail(item){
        window.location.href = this.JuheHOST+ '/forum/' + item.ch_columnm_key + '/' + item.ch_key + '/' + item.id + '.html'
    }
  },
  mounted(){
      this.getaAticle()
      console.log(this.$route.params.user_uid);
  }
}
</script>
<style lang="less" scoped>
.userinfo-post-content {
    text-align: left;
    color: #7c7c7c;
    padding: 0 30px;
    height: 23rem;
    overflow-y: auto;
    li {
        border-bottom: 2px solid #40657e;
        padding: 20px 0;
        em {
            font-style: normal;
            color: #fff;
        }
        p {
            color: #fff;
            line-height: 50px;
        }
        div span {
            color: #404b7f;
            font-size: 24px;
            margin-right: 20px;
        }
        .van-tag {
            padding: 10px 6px; 
            margin-right: 10px;
            font-weight: bold;
        }
        .post_detail{
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
        .article_img{
            width: 100%;
            height: 120px;
            margin: auto;
        }
        .article_img img{
            width: 32%;
            height: 120px;
            float: left;
            border-radius: 5px;
            margin-right: 10px;
        }
        .article_img img:last-child{
            margin-right: 0;
        }
    }
    .noarticle{
        color: #fff;
        text-align: center;
        margin-top: 25px;
    }
}
</style>