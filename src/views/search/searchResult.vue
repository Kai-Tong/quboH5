<template>
  <div class="searchResult">
    <searchHeader
      :fatherindex="searchMenuClick"
      @childIndex="getChildIndex"
      @childKeywords="getChildKeywords"
    ></searchHeader>
    <div class="searchMenu">
      <div
        :class="index == searchMenuClick ? 'searchMenuData' : ''"
        v-for="(item, index) in searchMenuList"
        :key="index"
        @click="changeSearchMenu(index)"
      >
        {{ item.name }}
      </div>
    </div>
    <component
      :is="searchComponent"
      :fatherkeywords="fatherkeywords"
    ></component>
  </div>
</template>

<script>
const searchHeader = () => import("./searchHeader");
const Searchnews = () => import("./searchnews");
const searchPost = () => import("./searchPost");
const searchUser = () => import("./searchUser");
export default {
  data() {
    return {
      searchComponent: "Searchnews",
      searchMenuList: [
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
      searchMenuClick: 0,
      fatherkeywords: "",
    };
  },
  methods: {
    changeSearchMenu(index) {
      //菜单切换
      this.searchMenuClick = index;
      switch (index*=1) {
        case 0:
          this.searchComponent = "Searchnews";
          break;
        case 1:
          this.searchComponent = "searchPost";
          break;
        case 2:
          this.searchComponent = "searchUser";
          break;
      }
    },
    getChildIndex(name) {
      //接受子组件传过来的值
      this.searchMenuList.map((item, index) => {
        if (item.name == name) {
          this.changeSearchMenu(index);
        }
      });
    },
    getChildKeywords(keywords) {
      this.fatherkeywords = keywords;
    },
  },
  created() {
    let searchtype = sessionStorage.getItem("searchtype");
    let searchinput = sessionStorage.getItem("searchinput");
    if (searchtype != null && searchtype.length > 0) {
      this.changeSearchMenu(searchtype);
      if (searchinput != null && searchinput.length > 0) {
        this.getChildKeywords(searchinput);
      }
    }
  },
  components: {
    searchHeader,
    Searchnews,
    searchPost,
    searchUser,
  },
};
</script>

<style lang="less" scoped>
.searchMenu {
  display: flex;
  align-items: center;
  height: 80px;
  line-height: 80px;
  padding-left: 50px;
  border-bottom: 1px solid #d8d8d8;
  div {
    width: 120px;
    font-size: 28px;
    color: #6c6c6c;
    text-align: center;
  }
  .searchMenuData {
    color: #ffc94c;
    border-bottom: 2px solid #ffc94c;
  }
}
</style>