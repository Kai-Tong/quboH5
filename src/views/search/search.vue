<template>
  <div id="search">
    <searchHeader></searchHeader>
    <div class="history_record cl">
      <div class="left">历史搜索</div>
      <img
        src="../../assets/img/search/dele.png"
        alt=""
        @click="deleteHistory()"
        class="right"
      />
    </div>
    <div class="history_data cl">
      <div
        v-for="(item, index) in historyList"
        :key="index + item"
        @click="historySearch()"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
const searchHeader = () => import("./searchHeader");
export default {
  data() {
    return {
      historyList: [],
    };
  },
  methods: {
    historySearch() {
      //历史记录搜索
    },
    deleteHistory() {
      //删除历史搜索记录
      localStorage.removeItem("searchHistory");
    },
  },
  components: {
    searchHeader,
  },
  created() {
    this.historyList = JSON.parse(localStorage.getItem("searchHistory"));
  },
};
</script>

<style lang="less" scoped>
#search {
}
.centerimg {
  display: flex;
  align-items: center;
  justify-content: center;
}

.history_record {
  margin: 38px 31px;
  font-size: 32px;
  color: #666;
  img {
    width: 48px;
    height: 48px;
  }
}
.history_data {
  margin: 0 31px;
  div {
    background-color: #eeeeee;
    color: #666666;
    float: left;
    font-size: 24px;
    padding: 14px 28px;
    margin-right: 10px;
    margin-top: 10px;
    border-radius: 26px;
  }
}
.left {
  float: left;
}
.right {
  float: right;
}
.cl:after {
  content: "";
  display: block;
  clear: both;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}

.cl {
  zoom: 1;
}
</style>