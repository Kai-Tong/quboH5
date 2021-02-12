<template>
  <div class="searchnews">
    <div
      class="searchnews_data"
      v-for="(item, index) in searchList"
      :key="index"
      @click="gotoNews()"
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
  </div>
</template>

<script>
export default {
  props: ["fatherkeywords"],
  data() {
    return {
      keywords: "",
      page: 1,
      searchList: [],
      imgList: {
        plimg: require("../../assets/img/search/pl.png"),
      },
    };
  },
  methods: {
    gotoNews(){
      //跳转新闻详情页面
    },
    searchdata() {
      //搜索新闻
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
            this.searchList = data;
            console.log(data);
          } else {
            this.$toast({
              message: msg,
            });
          }
          // let { page_size, total } = pagination;
          // this.page_size = page_size;
          // this.totalArtcle = total;
        });
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
      console.log(this.keywords);
    },
  },
  created() {
    this.searchdata();
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/commonuse");

.searchnews_data {
  border-bottom: 1px solid #d8d8d8;
  padding: 30px;
  display: flex;
  align-items: center;
  .searchnews_left {
    width: 475px;
    .searchnews_title {
      font-size: 22px;
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