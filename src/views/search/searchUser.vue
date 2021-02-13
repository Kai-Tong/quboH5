<template>
  <div class="searchnews">
    <div
      class="searchnews_data"
      v-for="(item, index) in searchList"
      :key="index"
      @click="gotoNews()"
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
        @click="user_follow(item)"
      >
        {{ item.is_followed == 0 ? "关注" : "已关注" }}
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
    gotoNews() {
      //跳转新闻详情页面
    },
    searchdata() {
      //搜索新闻
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