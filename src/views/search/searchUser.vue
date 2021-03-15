<template>
  <div class="searchnews">
    <div
      class="searchnews_data"
      v-for="(item, index) in searchList"
      :key="index"
      @click="gotoNews(item.id)"
    >
      <div class="user_pic">
        <img
          :src="item.user_pic != '' ? item.user_pic : imgList.wuimg"
          alt=""
        />
      </div>
      <div class="name">
        {{ item.user_nickname }}
      </div>
      <div
        :class="item.is_followed == 0 ? 'is_followed1' : 'is_followed12'"
        @click.stop="user_follow(item)"
      >
        {{ item.is_followed == 0 ? "关注" : "已关注" }}
      </div>
    </div>
    <div v-show="searchList == false" class="none1">暂无用户</div>
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
        wuimg: require("../../assets/img/search/221 x146.png"),
      },
    };
  },
  methods: {
    user_follow(item) {
      //关注
      //关注用户
      let type = 1;
      if (item.is_followed == 0) {
        type = 1;
      } else {
        type = 2;
      }
      let url1 = `${this.$api.httppost.follow()}/${type}/${item.id}`;
      console.log(url1);
      this.$axios({
        method: "post",
        url: url1,
      }).then((res) => {
        let { code } = res.data;
        if (code == 0) {
          this.searchdata();
        }
      });
    },
    gotoNews(value) {
      //跳转新闻详情页面  userinfo
      this.$router.push({ name: "userinfo", params: { user_uid: value } });
    },
    searchdata() {
      //搜索新闻
      if (this.keywords != "") {
        this.$api.homeindex
          .search({
            search_type: 3,
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
    _this.searchdata();
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
    let searchtype = sessionStorage.getItem("searchtype");
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
  display: flex;
  align-items: center;
  .user_pic img {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    margin: 14px 20px;
  }
  .name {
    font-size: 24px;
    width: 490px;
  }
  .is_followed1 {
    font-size: 20px;
    background: #ffbc33;
    color: #fff;
    width: 94px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    border-radius: 17px;
  }
  .is_followed12 {
    font-size: 20px;
    width: 94px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    color: #fff;
    background-color: #c2c2c2;
    border-radius: 17px;
  }
}
</style>