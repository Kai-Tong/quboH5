<template>
  <div class="searchnews">
    <div
      class="searchnews_data"
      v-for="(item, index) in searchList"
      :key="index"
      @click="gotoNews()"
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
          {{item.ch_name}}
        </div>
        <div class="left">
          {{item.forum_addtime | formDate}}
        </div>
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
    gotoNews() {
      //跳转新闻详情页面
    },
    searchdata() {
      //搜索新闻
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
.post_xinxi{
  font-size: 20px;
  color: #666;
  margin-top: 40px;
  line-height: 40px ;
  height: 40px;
  div{
    margin-right: 10px;
  }
}
</style>