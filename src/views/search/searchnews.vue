<template>
  <div class="searchnews" ref="searchnews">
    <div
      class="searchnews_data"
      v-for="(item, index) in searchList"
      :key="index"
      @click="gotoNews(item)"
    >
      <div class="searchnews_left">
        <div class="cl">
          <img src="" alt="" class="searchnews_icon left" />
          <div class="searchnews_title left">
            {{ item.news_title }}
          </div>
        </div>
        <div class="searchnews_xinxi cl">
          <div class="centerimg left">
            <img :src="imgList.plimg" alt="" />
            <div>{{ item.news_comments }}</div>
          </div>
          <div class="right">
            {{ item.news_addtime | formDate }}
          </div>
        </div>
      </div>
      <div class="searchnews_right">
        <img :src="item.news_cover_url" alt="" />
      </div>
    </div>
    <div v-show="searchList == false" class="none1">暂无新闻</div>
  </div>
</template>

<script>
export default {
  props: ["fatherkeywords"],
  data() {
    return {
      keywords: "",
      page: 1,
      pagesize: 0,
      searchList: [],
      imgList: {
        plimg: require("../../assets/img/search/pl.png"),
      },
    };
  },
  methods: {
    gotoNews(item) {
      //跳转新闻详情页面
      let url = `http://m.qubodianjing.com/news/${item.ch_columnm_key}/${item.ch_key}/${item.id}.html`;
      window.location.href = url;
    },
    searchdata() {
      //搜索新闻
      if (this.keywords != "") {
        this.$api.homeindex
          .search({
            search_type: 1,
            keywords: this.keywords,
            order: 1,
            p: this.page,
          })
          .then((res) => {
            let { code, msg, params } = res.data;
            let { data, pagination } = params;
            if (code == 0) {
              let { page_size, total } = pagination;
              let pagesize = Math.ceil(total / page_size);
              this.pagesize = pagesize;
              if (this.page == 1) {
                this.searchList = data;
              } else {
                let List = this.searchList;
                let pipi = List.concat(data);
                this.searchList = pipi;
              }
            } else {
              if (msg == "token过期") {
                this.$toast({
                  message: "请重新登录",
                });
              } else if (msg == "token无效") {
                this.$toast({
                  message: "请先登录",
                });
              } else {
                this.$toast({
                  message: msg,
                });
              }
            }
          });
      } else {
        this.$toast({
          message: "请输入关键字",
        });
      }
    },
  },
  computed: {
    fatherkeywordsFn() {
      return this.fatherkeywords;
    },
  },
  watch: {
    fatherkeywordsFn(newValue) {
      this.keywords = newValue;
      this.searchdata();
    },
  },
  created() {
    let searchinput = sessionStorage.getItem("searchinput");
    if (searchinput != null && searchinput.length > 0) {
      this.keywords = searchinput;
    }
    this.searchdata();
  },
  mounted() {
    let _this = this;
    window.onscroll = function () {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      //变量windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      //滚动条到底部的条件
      if (scrollTop + windowHeight == scrollHeight) {
        if (_this.pagesize > _this.page) {
          _this.page += 1;
          _this.searchdata();
        } else {
          _this.$toast({
            message: "这是全部的内容",
          });
        }
      }
    };
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/commonuse");
.none1 {
  text-align: center;
}
.searchnews_data {
  border-bottom: 1px solid #d8d8d8;
  padding: 30px;
  display: flex;
  align-items: center;
  .searchnews_left {
    width: 475px;
    .searchnews_title {
      font-size: 28px;
    }
  }
  .searchnews_xinxi {
    font-size: 18px;
    margin-top: 20px;
    height: 40px;
    line-height: 40px;
    img {
      width: 36px;
      height: 36px;
    }
    div {
      margin: auto 0;
    }
  }
  .searchnews_right {
    margin-left: 35px;
    img {
      width: 230px;
      height: 130px;
      border-radius: 7px;
    }
  }
}
</style>