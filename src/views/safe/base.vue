<template>
    <div class="base-content">
      <Header />
            <van-field
              v-model="username"
              label="用户名"
              readonly
            />
            <!-- 性别 -->
            <van-field
              readonly
              clickable
              name="picker"
              :value="sex"
              label="性别"
              placeholder="点击选择性别"
              @click="showPicker = true"
            />
            <van-popup v-model="showPicker" position="bottom">
              <van-picker
                show-toolbar
                :columns="columns"
                @confirm="onSex"
                @cancel="showPicker = false"
              />
            </van-popup>
            <!-- 生日 -->
            <van-field label="生日" :value="date" @click="show = true" />
            <van-calendar :min-date="minDate" v-model="show" @confirm="onbrithday" />
            <van-field label="星座" :value="constellation" readonly/>
            <!-- 地区 -->
            <van-field
              v-model="area"
              rows="1"
              autosize
              maxlength="16"
              show-word-limit
              label="地址"
              type="textarea"
              placeholder="请输入地址"
            />
            <!-- <van-field
              readonly
              clickable
              name="area"
              :value="Areavalue"
              label="地区选择"
              placeholder="点击选择省市区"
              @click="showArea = true"
            />
            <van-popup v-model="showArea" position="bottom">
              <van-area
                :area-list="areaList"
                @confirm="onConfirm"
                @cancel="showArea = false"
              />
            </van-popup> -->
            <!-- 爱好 -->
            <van-field
              v-model="hobby"
              rows="1"
              autosize
              maxlength="8"
              show-word-limit
              label="爱好"
              type="textarea"
              placeholder="请输入爱好"
            />
            <!-- 签名 -->
            <van-field
              v-model="desc"
              rows="2"
              autosize
              label="个性签名"
              type="textarea"
              maxlength="50"
              placeholder="请输入签名"
              show-word-limit
            />
            <van-button type="primary" size="small" @click="submitForm">保存修改</van-button>
    </div>
</template>

<script>
import Header from '@/components/common/header'
// import myMinix from '@/utils/mixin.js'
export default {
  name: 'Base',
  components:{
    Header,
  },
  data(){
    return{
      username:'',
      // 性别
      sex: '',
      columns: ['男', '女', '保密'],
      minDate: new Date(1960, 0, 1),
      showPicker: false,
      // 生日
      date: '',
      show: false,
      area:'',
      hobby:'',
      desc:"",
      // Areavalue: '我在哪',
      // showArea: false,
      // areaList: {}
    }
  },
  // mixins: [myMinix],
  methods: {
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
        if (strBirthdayArr.length>0 && this.date) {
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
    onSex(value) {//性别
      this.sex = value;
      console.log(this.sex);
      this.showPicker = false;
    },
    // onConfirm(values) {
    //   this.Areavalue = values
    //     .filter((item) => !!item)
    //     .map((item) => item.name)
    //     .join('/');
    //   console.log(this.Areavalue);
    //   this.showArea = false;
    // },
    // 生日选择
    onbrithday(date) {
      this.show = false;
      this.date = this.dateFormat(date);
      console.log(this.date);
    },
    //获取个人信息
      getInfo(){
          this.$axios({
              url:`${this.$api.myprofile}/0`,
              method: "get",
              timeout: 3000
          })
          .then(res => {
              console.log(res);
              if (res.data.code == 1) {
                this.$toast({
                  message: res.data.msg
                });
              } else if (res.data.code == 0) {
                  if(res.data.params.profile){
                      if(res.data.params.profile.user_sex == 1){
                          this.sex = '男'
                      }else if(res.data.params.profile.user_sex == 2){
                          this.sex = '女'
                      }else{
                          this.sex = '保密'
                      }
                      if(res.data.params.profile.user_birthday){
                          this.date = res.data.params.profile.user_birthday;
                      }
                      this.username = res.data.params.profile.user_name;
                      this.area = res.data.params.profile.user_location;
                      this.hobby = res.data.params.profile.user_hobby;
                      this.desc = res.data.params.profile.user_desc;
                  }
                  // let {} = 
                  // this.profile = res.data.params.profile;
              } else if (res.data.code == -1) {
                  this.$toast({
                  message: '身份验证过期，请重新登录'
                });
                  window.location.href = this.JuheHOST
              }
          })
          .catch(error => {
              console.log(error);
          });
      },
      //修改个人信息
      submitForm() {
        let sex = '';
        if(this.sex == '男'){
          sex = '1'
        }else if(this.sex == '女'){
          sex = '2'
        }else{
          sex = '3'
        }
        this.$api.basic.basicInfo({
            sex:sex,
            birthday:this.$inHTMLData(this.dateFormat(this.date)),
            location:this.$inHTMLData(this.area),
            hobby:this.$inHTMLData(this.hobby),
            desc:this.$inHTMLData(this.desc)
        }).then(res => {
            console.log(res);
            if (res.data.code == 1) {
                this.$toast({
                  message: res.data.msg
                }); 
            } else if (res.data.code == 0) {
                this.$toast({
                  message: '设置成功'
                });
                // this.$refs[formName].resetFields();                            
            } else if (res.data.code == -1) {
                this.$toast({
                  message: res.data.msg
                }); 
            }
        })
        .catch(error => {
            this.$toast({
                  message: '服务中断，请稍后再试'
                });
        })

      },
  },
  computed:{
    constellation(){
        return this.getAstro(this.dateFormat(this.date));
    }
  },
  mounted(){
    this.getInfo()
    // this.areaList = this.cityLists
  }
}
</script>
<style lang="less" scope>
.base-content {
    span {
      font-size: 30px;
    }
    .van-cell-group {
        width: 710px;
        margin: 30px auto;
        // box-shadow: 0 0 20px .3rem #eee;
        padding: 20px 0;
    }
}
</style>