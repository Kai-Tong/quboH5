<template>
    <div class="sign-content">
        <van-form @submit="onSubmit" v-if="isSubmit">
          <van-field
              v-model="dataForm.pwd"
              clearable
              left-icon="pwd"
              placeholder="请输入2-14个字，只支持数字，字母，汉字"
          />
          <p class="tips">*昵称仅可创建一次，创建后不能修改</p>
          <van-button round block type="primary" native-type="submit">确  认</van-button>
        </van-form>
    </div>
</template>

<script>

export default {
  name: 'Sign',
  data () {
    return {
      dataForm: {},
      isSubmit: true
    }
  },
  methods: {
    onSubmit: () => {
        
    }
  }
}
</script>
<style lang="less" scope>
.sign-content {
    padding: 100px 30px 0;
    .van-icon-pwd {
       width: 30px;
       height: 30px;
       .base-icon();
       &::before {
         background-image: url('../../assets/img/icon/edit.png');
       }
    }
    .van-button {
      margin-top: 140px;
    }
    .tips {
      color: rgb(62,77,123);
      font-size: 22px;
      text-align: left;
      padding-top: 15px;
      padding-left: 30px;
    }
}
</style>