<template>
  <div class="search_header">
    <div class="centerimg" @click="gotoback()">
      <img :src="backimg" alt="" class="back_img" />
    </div>
    <div class="search_header_div">
      <div class="search_input_div">
        <div class="searchtype">
          <div>
            {{ searchType }}
          </div>
          <img
            src="../../assets/img/search/down@2x.png"
            alt=""
            class="seledown"
            @click="showsearch()"
          />
        </div>
        <input
          type="text"
          maxlength="20"
          placeholder="请输入关键字"
          v-model="searchkeywordk"
          class="search_input"
        />
        <div class="centerimg">
          <img
            :src="searchimg"
            alt=""
            class="search_img"
            @click="gotosearch()"
          />
        </div>
      </div>
      <div class="search_sele" v-show="showsearchtyoeList">
        <div
          v-for="(item, index) in searchTypeList"
          :key="index"
          @click="changeSearchType(item, index)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["fatherindex", "fatherkeywords"],
  data() {
    return {
      backimg: require("../../assets/img/search/back@2x.png"),
      searchimg: require("../../assets/img/search/search2@2x.png"),
      searchkeywordk: "",
      searchType: "资讯",
      searchTypeList: [
        {
          name: "资讯",
          type: 1,
        },
        {
          name: "贴子",
          type: 2,
        },
        {
          name: "用户",
          type: 3,
        },
      ],
      showsearchtyoeList: false,
    };
  },
  methods: {
    gotoback() {
      sessionStorage.removeItem("searchinput")
      //返回上一个页面
      window.history.go(-1);
    },
    gotosearch() {
      // 搜索查询
      if (this.$route.name != "Searchresult") {
        this.$router.push("/searchresult");
      } else {
        this.$emit("childKeywords", this.searchkeywordk);
      }
        this.storage();
      sessionStorage.setItem("searchinput", this.searchkeywordk);
    },
    storage() {
      let KW = localStorage.getItem("searchHistory");
      let KWdata = [];
      if (this.searchkeywordk != "" && this.searchkeywordk.length > 0) {
        //   console.log(KW.length)
        if (KW != null && KW.length > 0) {
          KWdata = JSON.parse(KW);
          KWdata.unshift(this.searchkeywordk);
          this.historyList = KWdata;
          let newsList = [...new Set(KWdata)];
          localStorage.setItem("searchHistory", JSON.stringify(newsList));
        } else {
          KWdata.push(this.searchkeywordk);
          this.historyList = KWdata;
           let newsList = [...new Set(KWdata)];
          localStorage.setItem("searchHistory", JSON.stringify(newsList));
        }
      }
    },
    showsearch() {
      //显示搜索类型
      this.showsearchtyoeList = !this.showsearchtyoeList;
    },
    changeSearchType(type, index) {
      //切换搜索类型
      this.showsearchtyoeList = false;
      this.searchType = type.name;
      this.$emit("childIndex", type.name);
      sessionStorage.setItem("searchtype", index);
    },
  },
  created() {
    this.historyList = JSON.parse(localStorage.getItem("searchHistory"));
    let searchtype = sessionStorage.getItem("searchtype");
    let searchinput = sessionStorage.getItem("searchinput");
    if (searchtype != null && searchtype.length > 0) {
      this.searchTypeList.map((item, index) => {
        if (index == searchtype) {
          this.searchType = item.name;
        }
      });
    }
    if (searchinput != null && searchinput.length > 0) {
      this.searchkeywordk = searchinput;
    }
  },
  computed: {
    fatherindexfn() {
      return this.fatherindex;
    },
    fatherkeywordsfn() {
      return this.fatherkeywords;
    },
  },
  watch: {
    fatherindexfn(newValue) {
      this.searchTypeList.map((item, index) => {
        if (index == newValue) {
          this.searchType = item.name;
        }
      });
    },
    fatherkeywordsfn(newValue) {
      this.searchkeywordk = newValue;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/commonuse");
.search_sele {
  position: absolute;
  top: 50px;
  left: 20px;
  color: #fff;
  font-size: 18px;
  background-color: #666;
  div {
    padding: 5px 10px;
    border: 1px solid #999;
  }
}
.search_header {
  display: flex;
  align-items: center;
  height: 88px;
  background-color: #505050;
  .back_img {
    width: 30px;
    height: 28px;
    margin: 0 30px;
  }
  .search_header_div {
    display: flex;
    align-items: center;
    margin-left: 25px;
    position: relative;
  }
  .search_img {
    width: 46px;
    height: 46px;
  }
  .search_input_div {
    display: flex;
    align-items: center;
    color: #fff;
    border: 1px solid #666;
    height: 58px;
    padding: 0 27px;
    border-radius: 27px;
    background-color: #6a6a6a;
  }
  .searchtype {
    display: flex;
    align-items: center;
    border-right: 1px solid #fff;
    font-size: 18px;
  }
  .search_input {
    color: #fff;
    background: transparent;
    border: none;
    margin-left: 10px;
    font-size: 20px;
  }
  .search_input input::-webkit-input-placeholder {
    color: #c6c6c6;
    font-size: 12px;
  }
  .seledown {
    width: 21px;
    height: 12px;
    margin: 0 10px;
  }
}
</style>