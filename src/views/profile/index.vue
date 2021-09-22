<template>
  <div class="profile-contairner">
    <van-cell-group v-if="user" class="profile-info">
      <van-cell  
        class="base-info"
        title="单元格" 
        value="内容"
        :border="false"
        center
      >
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          :src="currentUser.photo"
        />
        <div class="name" slot="title">{{currentUser.name}}</div>   
        <van-button
          class="updata"
          size="small"
          round  
        >编辑资料
        </van-button>
      </van-cell>

      <van-grid  class="data-info" :border="false">
        <van-grid-item class="data-info-item" v-for="(text,index) in gridItemText" :key="index">
          <div class="icon" slot="icon">{{mathToFixd[index]}}</div> <!--mathToFixd[index]-->
          <div class="text" slot="text">{{text}}</div>
        </van-grid-item>
        <!-- <van-grid-item class="data-info-item">
          <div class="icon" slot="icon">1232</div>
          <div class="text" slot="text">关注</div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="icon" slot="icon">141144</div>
          <div class="text" slot="text">粉丝</div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="icon" slot="icon">3141</div>
          <div class="text" slot="text">获赞</div>
        </van-grid-item> -->
      </van-grid>
    </van-cell-group>
    <div v-else class="not-login">
      <img @click="$router.push('/login')" class="not-login-img" src="./touxian.png" alt="">
      <div class="not-login-text">登入/注册</div>
    </div>


    <van-grid class="nav-grid" clickable :column-num="2">
      <van-grid-item class="nav-grid-item" to="" >
        <van-icon size="0.75rem" name="star-o" color="red" />
        <div class="nav-grid-text">收藏</div>
        </van-grid-item>
      <van-grid-item class="nav-grid-item" to="" >
        <van-icon size="0.75rem" name="browsing-history-o" color="#07c160" />
        <div class="nav-grid-text">历史</div>
        </van-grid-item>
    </van-grid> 

    <van-cell v-if="user" title="消息通知" is-link to=""/>
    <van-cell title="小智同学" is-link to="" />
    <van-cell @click="exit" v-if="user" class="exit" title="退出登入" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '../../api/user/user'
export default {
    name: 'ProfileIndex',
    data () {
      return {
        gridItemText: ['头条', '关注', '粉丝', '获赞'],
        currentUser: {}
      }
    },
    computed: {
      ...mapState({
        user: 'user' 
      }),
      mathToFixd () {
        let user = this.currentUser
        let userArr = [user.art_count, user.fans_count, user.follow_count, user.like_count]
        let count = userArr.map( item => {
          if(item>10000){
            return (item/10000).toFixed(2) + '万'
          }else{
            return item
          }
        })
        return count
      }
    },
    created() {
        this.CurrentUserData()
    },
    methods: {
      async CurrentUserData () {
        try {
          if(this.$store.state.user !== null){
            const { data } = await getCurrentUser()
            // console.log(data);
            this.currentUser = data.data
          }
        } catch (error) {
           this.$toast('网络错误');
        }                 
      },
      exit () {
        this.$dialog.confirm({
          title: '退出提示',
          message: '确认退出吗'
        }).then(() => {
          this.$store.dispatch('getData', null)
        }).catch(() => {
        });
       
      }
    }
}
</script>

<style lang="less" scoped>
  .profile-contairner{
    height: 100vh;
    background-color: rgb(245, 245, 245);
    .profile-info{
      background: url("../../../public/image/a.jpg");
      background-size: cover;
    }
    .not-login{
      height: 180px;
      background: url('../../../public/image/a.jpg');
      background-size: cover;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .not-login-img{
        width: 66px;
        height: 66px;
      }
      .not-login-text{
        font-size: 15px;
        color: #fff;
        margin-top: 5px;
      }
    }
    .base-info{
      height: 115px;
      box-sizing: border-box;
      padding-top:38px;
      padding-bottom: 11px;
      background-color: unset;
      .avatar{
        border: 1px solid #fff;
        box-sizing: border-box;
        width: 66px;
        height: 66px;    
        margin-right: 11px;  
      }
      .name{
        color:#fff;
        font-size:16px;
      }
      .updata{
        height: 22px;
        color: #666666;
      }
          
    }
    .data-info{
      .data-info-item{
        height: 80px;
        color: #fff;
        .icon{
          font-size: 18px;
        }
        .text{
          font-size: 11px;
        }
        
      }
    }
    .nav-grid{
      background-color: #fff;
      margin-bottom: 10px;
      .nav-grid-item{
        height: 70px;
        .nav-grid-text{
          font-size: 14px;
          color: #333333;
          margin-top: 8px;
        }
      }
    }
    .exit{
      text-align: center;
      color: red;
      margin-top: 4px;
    }
    /deep/ .van-grid-item__content{
      background-color: unset;
    }
  }
</style>>

</style>