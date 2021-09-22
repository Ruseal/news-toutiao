<template>
  <div class="login-contairner">
    <van-nav-bar title="注册/登入" @click-left="$router.back()" left-arrow/>
    <van-form @submit="Login" :show-error="false" :show-error-message="false" @failed="onFailed" ref="form" validate-first>
      <van-field v-model="user.mobile" name="moble" center label="手机号" left-icon="phone-o" placeholder="请输入手机号" :rules="fromRules.mobile"/>
      <van-field v-model="user.code" center label="验证码" left-icon="award-o" placeholder="请输入短信验证码" :rules="fromRules.code" clearable>
        <van-button :disabled="isDisabled" @click.prevent="onSend" class="send-btn" slot="button" size="small" round><van-count-down v-if="isShowTime" format="ss秒后重新获取" :time="time" @finish="timeFinish"/><div v-else>获取验证码</div></van-button>
      </van-field>
      <div class="btn-login-wrap"><van-button class="btn-login" type="info" size="large">登入</van-button></div>
    </van-form>
    
  </div>
</template>

<script>
import { getUserLogin } from '@/api/user/user'

export default {
    name: 'LoginIndex',
    data() {
      return {
        user: {
          mobile: '13911111111',
          code: '246810'
        },
        fromRules: {
          mobile: [
            {required: true, message: '请输入手机号'},
            {pattern: /^1[3|5|7|9]\d{9}$/, message: '手机号格式错误'}
          ],
          code: [
            {required: true, message: '请输入验证码'},
            {pattern: /^\d{6}$/, message: '验证码格式错误'}
          ]

        },
        time: 15*1000,
        isShowTime: false,
        isSendLoading: false,
        isDisabled: false
      }
    },

    methods:{
      Login () {   
        this.$toast.loading({
          message: '登入中...',
          forbidClick: true,
          duration: 0
        });  
        getUserLogin(this.user).then(res => {        
          if(res === undefined) throws
          this.$toast.success('登入成功');
          // console.log(res);
          this.$store.dispatch('getData', res.data.data)
          this.$router.back()
          // console.log(this.$store.state.user);
        }).catch(err => {
         this.$toast.fail('登入失败，手机号或者验证码不正确');
        })            
      },
      onFailed (error) {
        // this.isMoble = false
        if(error.errors[0]){
          this.$toast({
            message: error.errors[0].message,
            position: 'top'
          })
        }
        
      },
      async onSend () {
        this.isDisabled = true
        try {
          await this.$refs.form.validate('moble')
          this.isShowTime = true
        } catch (err) {
           this.isDisabled = false
          // console.log(err);
          this.$toast({
            message: err.message,
            position: 'top'
          })
        }
      },
      timeFinish () {
        this.isShowTime = false
        this.isDisabled = false
      }
   }
}
</script>
 
<style lang="less" scoped>
.login-contairner{
  .btn-login-wrap{
     padding: 26px 16px;
     .btn-login{
       background-color: #6db4fb;
       border: none;
       .van-button__text{
          font-size: 15px;        
       }
       
     }
  }
  .send-btn{
    background-color:#ededed;
}
}


</style>
 
