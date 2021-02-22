<template>
    <div class="auth-content">
      <Header />
        <div class="tips">
            <p>请设置您的个人隐私；</p>
        </div>
        <div class="radio_box">
            <van-form @submit="onSubmit">
                <van-field name="basic" label="个人信息">
                    <template #input>
                        <van-radio-group v-model="basic" direction="horizontal">
                        <van-radio name="1">公开</van-radio>
                        <van-radio name="2">仅自己可见</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field name="attention" label="粉丝">
                    <template #input>
                        <van-radio-group v-model="attention" direction="horizontal">
                        <van-radio name="1">公开</van-radio>
                        <van-radio name="2">仅自己可见</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field name="fans" label="关注">
                    <template #input>
                        <van-radio-group v-model="fans" direction="horizontal">
                        <van-radio name="1">公开</van-radio>
                        <van-radio name="2">仅自己可见</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
            <van-button round block type="primary" native-type="submit">确  认</van-button>
            </van-form>
        </div>
        
    </div>
</template>

<script>
import Header from '@/components/common/header'
export default {
  name: 'Privacyset',
  components: {
    Header
  },
  data () {
    return {
        basic: '1',
        attention:'',
        fans:""
    }
  },
  methods: {
    //获取设置状态
    getPristatus(){
        this.$api.getprivacy.useGetprivacy(          
        ).then(res => {
            console.log(res);
            if (res.data.code == 1) {
                this.$toast({
                  message: res.data.msg
                }); 
            } else if (res.data.code == 0) {
                // console.log(res.data.params[0].uPAccount,res.data.params[0].uPFollow,res.data.params[0].uPFans);
                if(res.data.params.length > 0){
                    this.basic = String(res.data.params[0].u_p_account);                             
                    this.attention = String(res.data.params[0].u_p_follow);                             
                    this.fans = String(res.data.params[0].u_p_fans); 
                }
                                            
            } else if (res.data.code == -1) {
                this.$toast({
                  message: res.data.msg
                });
                window.location.href = this.JuheHOST
            }
        })
        .catch(error => {
            console.log(error);
            this.$toast({
                  message: "服务器链接中断，请稍后重试"
                });
        })
    },
    onSubmit(){
        this.$api.privacy.usePrivacy({
            account:this.basic,
            fllow:this.attention,
            fans:this.fans,
        }).then(res => {
            console.log(res);
            if (res.data.code == 1) {
                this.$toast({
                  message: res.data.msg
                });
            } else if (res.data.code == 0) {
                this.$toast({
                  message: "设置成功"
                });                       
            } else if (res.data.code == -1) {

            }
        })
        .catch(error => {
            console.log(error);
            this.$toast("服务器链接中断，请稍后重试")
        })

    }
  },
  mounted(){
      this.getPristatus()
  }
}
</script>
<style lang="less">
.auth-content {
    .tips {
      color: rgb(62,77,123);
      font-size: 24px;
      text-align: left;
      margin-left: 25px;
    }
    .van-radio__icon--checked .van-icon{
        background-color: #FBDA5E;
        border-color: #FBDA5E;
    }
    .van-button {
      margin-top: 140px;
    }
}
</style>
<style lang="less">
.auth-content .radio_box .van-radio__label{
    line-height: 100px;
}
.auth-content .radio_box .van-radio__icon .van-icon{
    width: 32px;
    height: 32px;
    line-height: 32px;
    top: -5px;
}
.auth-content .radio_box .van-cell{
    height: 100px;
    line-height: 100px;
    padding: 10px 16px;
}
</style>