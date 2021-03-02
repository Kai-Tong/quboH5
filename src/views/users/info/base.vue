<template>
    <div class="userinfo-base-content">
        <p>个人信息:</p>
        <van-row>
            <van-col span="12">
                生日<span>{{profile.user_birthday}}</span>
            </van-col>
            <van-col span="12">
                性别<span>{{profile.user_sex ==1 ? '男' : '女'}}</span>
            </van-col>
        </van-row>
        <van-row>
            <van-col span="12">
                星座<span>{{constellation}}</span>
            </van-col>
            <van-col span="12">
                地区<span>{{profile.user_location}}</span>
            </van-col>
        </van-row>
        <van-row>
            <van-col span="24">
                爱好<span>{{profile.user_hobby}}</span>
            </van-col>
        </van-row>
    </div>
</template>

<script>

export default {
  name: 'UserInfo',
  data () {
    return {
      profile:{},
    }
  },
  props:["userid"],
  methods: {
      //获取个人信息
    getInfo(){
        this.$axios({
            url:`${this.$api.myprofile}/${this.$route.params.user_uid}`,
            method: "get",
            timeout: 3000
        })
        .then(res => {
            if (res.data.code == 1) {
                this.profile = {}
            } else if (res.data.code == 0) {
                this.profile = res.data.params.profile;
            } else if (res.data.code == -1) {
                this.$toast({
                    message: '身份验证过期，请重新登录' ,
                });
                window.location.href = this.JuheHOST
            }
        })
        .catch(error => {
            console.log(error);
        });
    },
    //时间转换
    dateFormat(dateData) {
        var date = new Date(dateData)
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? ('0' + m) : m
        var d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        const time = y + '-' + m + '-' + d
        return time
    },
    //星座函数
    getAstro(strBirthday){
        let birthYear,birthMonth,birthDay; 
        let strBirthdayArr=strBirthday.split("-");
        // console.log(strBirthdayArr);
        if (strBirthdayArr.length>0 && this.profile.user_birthday) {
            birthYear = strBirthdayArr[0];  
            birthMonth = strBirthdayArr[1];  
            birthDay = strBirthdayArr[2];  
        }else{
            return;
        }
        let s="魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
        let arr=[20,19,21,21,21,22,23,23,23,23,22,22];
        return s.substr(birthMonth*2-(birthDay< arr[birthMonth-1]?2:0),2);//12  21
    },
  },
  computed:{
    constellation(){
        return this.getAstro(this.dateFormat(this.profile.user_birthday));
    }
},
  mounted(){
      this.getInfo()
      console.log(this.userid);
  }
}
</script>
<style lang="less" scoped>
.userinfo-base-content {
    padding: 50px;
    text-align: left;
    color: #7c7c7c;
    line-height: 60px;
    p, span {
        color: #fefefe;
        font-size: 30px;
    }
    span {
        margin-left: 20px;
    }
}
</style>