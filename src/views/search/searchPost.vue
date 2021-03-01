<template>
  <div class="searchnews">
    <div
      class="searchnews_data"
      v-for="(item, index) in searchList"
      :key="index"
      @click="gotoNews(item)"
    >
      <div class="forum_owner">
        {{ item.forum_owner }}
      </div>
      <div class="forum_title ov">
        {{ item.forum_title }}
      </div>
      <div class="forum_body">
        {{ item.forum_body | filterTag }}
      </div>
      <div class="cl post_xinxi">
        <div class="left">
          {{ item.ch_name }}
        </div>
        <div class="left">
          {{ item.forum_addtime | formDate }}
        </div>
      </div>
    </div>
    <div v-show="searchList == false" class="none1">暂无贴子</div>
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
      let url = `http://m.qubodianjing.com/forum/${item.ch_columnm_key}/${item.ch_key}/${item.id}.html`;
      window.location.href = url;
    },
    searchdata() {
      //搜索新闻
      if (this.keywords != "") {
        this.$api.homeindex
          .search({
            search_type: 2,
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
  watch: {
    fatherkeywordsFn(newValue) {
      this.keywords = newValue;
      console.log(this.keywords);
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
  .forum_owner {
    font-size: 20px;
    color: #666;
  }
  .forum_title {
    color: #333;
    font-size: 26px;
    width: 560px;
    margin-top: 3px;
  }
  .forum_body {
    margin-top: 20px;
    width: 560px;
    font-size: 24px;
    color: #666;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
.post_xinxi {
  font-size: 20px;
  color: #666;
  margin-top: 40px;
  line-height: 40px;
  height: 40px;
  div {
    margin-right: 10px;
  }
}
</style>