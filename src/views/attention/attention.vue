<template>
  <div class="attention">
    <div class="attention_header">
      <img src="../../assets/img/search/back@2x.png" alt="" />
      选择关注圈子
    </div>
    <div class="attention_menu_div">
      <div
        v-for="(item, index) in menuList"
        :key="index"
        :class="
          index == menuSl ? 'attention_menu attention_menu1' : 'attention_menu'
        "
        @click="changeMenu(index)"
      >
        {{ item }}
      </div>
    </div>
    <div class="attention_menu_bottom">
      {{ menuList[menuSl] }}
    </div>
    <div class="cl attention_del_div">
      <div
        v-for="(item, index) in DataList_del"
        :key="index"
        class="left attention_del"
        @click="addguanzhu(item, $event)"
      >
        <div class="centerimg">
          <img :src="item.ch_logo" alt="" />
        </div>
        <div class="ch_name">
          {{ item.ch_name }}
        </div>
        <img
          src="../../assets/img/search/select@2x.png"
          alt=""
          class="selectimg"
        />
      </div>
    </div>
    <div class="keepbtn" @click="saveguanzhu()">保存</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      menuSl: 0,
      DataList: {},
      DataList_del: [],
      followed: [],
      addFollowed: [],
    };
  },
  methods: {
    addguanzhu(item, e) {
      if (this.addFollowed.indexOf(item.id) != -1) {
        e.path[2].children[2].style.display = "none";
        this.addFollowed.splice(this.addFollowed.indexOf(item.id), 1);
      } else {
        e.path[2].children[2].style.display = "block";
        this.addFollowed.push(item.id);
      }
      console.log(this.addFollowed);
    },
    saveguanzhu() {
      let qiqi = this.addFollowed.toString();
      this.$api.editchanel
        .editerchanel({
          type: 3,
          channel: qiqi,
        })
        .then((res) => {
          let { code, msg, params } = res.data;
          if (code == 0) {
            console.log(params);
            this.$toast({
              message: "关注成功",
            });
          } else {
            this.$toast({
              message: msg,
            });
          }
        });
    },
    changeMenu(index) {
      //切换关注列表
      this.menuSl = index;
      let xixi = (index + 1) * 1;
      this.DataList_del = this.DataList[xixi];
    },
    hasfollowed() {
      //是否关注

      for (let i = 0; i < this.DataList_del.length; i++) {
        this.DataList_del[i] == this.followed[i];
      }
    },
    gotoback() {
      //返回上一级
      window.history.go(-1);
    },
    getfollow() {
      //获得关注社区列表
      let params = { type: 3 };
      this.$api.attchanelist.attchanel(params).then((res) => {
        let { code, msg, params } = res.data;
        if (code == 0) {
          let { channel, user_followed_id } = params;
          this.followed = user_followed_id;
          let arr = Object.keys(channel);
          let arrayList = [];
          for (let i = 1; i <= arr.length; i++) {
            //切换的类别
            arrayList.push(channel[i][0].ch_columnm_name);
          }
          this.menuList = arrayList;
          this.DataList = channel;
          this.changeMenu(0);
        } else {
          this.$toast({
            message: msg,
          });
        }
      });
    },
  },
  created() {
    this.getfollow();
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/commonuse");
.attention_header {
  background-color: #505050;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 29px;
  text-align: center;
  position: relative;
  color: #fff;
  img {
    width: 30px;
    height: 28px;
    position: absolute;
    left: 29px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}
.attention_menu_div {
  display: flex;
  align-items: center;
  overflow-x: scroll;
  margin: 0 28px;
  font-size: 24px;
  .attention_menu {
    width: 124px;
    color: #6a6a6a;
    border-bottom: #dcdcdc 1px solid;
    text-align: center;
    height: 56px;
    line-height: 56px;
    margin-right: 7px;
  }
  .attention_menu1 {
    color: #fca321;
    border-bottom: 2px solid #ffa21f;
  }
}
.attention_menu_bottom {
  margin: 30px 57px;
}

.attention_del {
  width: 25%;
  text-align: center;
  position: relative;
  img {
    margin-top: 13px;
    width: 100px;
    height: 100px;
  }
  .selectimg {
    position: absolute;
    width: 34px;
    height: 34px;
    top: -5px;
    right: 25px;
    display: none;
  }
  .ch_name {
    font-size: 22px;
    height: 52px;
    line-height: 52px;
  }
}
.attention_del_div {
  padding-bottom: 170px;
}
.keepbtn {
  background-color: #fee67c;
  color: #642806;
  height: 90px;
  line-height: 90px;
  width: 580px;
  text-align: center;
  border-radius: 10px;
  position: fixed;
  bottom: 58px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>