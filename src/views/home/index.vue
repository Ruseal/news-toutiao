<template>
  <div class="home-contairner">
    <van-nav-bar>
      <van-button class="search-button" slot="title" size="small" icon="search" to="/search" type="primary" round>
        搜索
      </van-button>
    </van-nav-bar>
    <!-- <div @click="showPopup">展示弹出层</div>s -->
    <van-popup
      round
      closeable
      close-icon-position="top-left"
      v-model="show"
      @close="closePopup"
      position="bottom"
      :style="{ height: '97%' }"
      get-container="body"
    >
      <channels-popup ref="channelspopup" @updataactive="updataActive" :active="active" @changeactive="changeActive" :channels-list="channelsList"/>
    </van-popup>
    <van-tabs v-model="active">
      <van-tab  v-for="(item, index) in channelsList" :title="item.name" :key="index">
        <article-list :channel="item"></article-list>
      </van-tab>
      <div @click="showPopup" slot="nav-right" class="tab-right"><van-icon class="tab-right-icon" name="wap-nav" /></div>
      <div   slot="nav-right" class="tab-right-none"></div>
      
    </van-tabs>
  </div>
</template>

<script>
import { getChannels } from '../../api/home/home'

import ArticleList from 'views/home/childCopms/ArticleList'
import ChannelsPopup from 'views/home/childCopms/ChannelsPopup'
export default {
    name: 'HomeIndex',
    components: {
      ArticleList,
      ChannelsPopup
    },
    data() {
      return {
          show: false,
          active: 0,
          channelsList: []
      }
    },
    created () {
      this.loadChannels()
    },
    methods: {
      updataActive () {
        this.active--
      },
      closePopup () {
        if(this.$refs.channelspopup.isEdit){
          this.$toast({
            message: '请完成编辑',
            position: top
            // icon: 'like-o'
          });
          this.show = true
        }
        
      },
      changeActive (activeNumebr) {
        this.show = false
        this.active = activeNumebr
        // console.log(activeNumebr);

      },
      showPopup() {
        this.show = true;
      },
      loadChannels () {
        getChannels().then(res => {
          console.log(res);
          this.channelsList = res.data.data.channels
        }).catch(err=> {
          // this.$toast('网络错误');
          this.channelsList = [{name: '当前网络不可用'}]
        })
      }
    }
}
</script>

<style lang="less" scoped>
  .home-contairner{
    .search-button{
      width: 277px;
      background-color:#5babfb;
      border: unset;
    }
    /deep/ .van-nav-bar__title{
      max-width: unset;
    }
    /deep/ .van-tab{
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    .tab-right{
      position: fixed;
      background-color:#fff;
      width: 33px;
      height: 43px;
      display: flex;
      border-left: 1px solid #edeff3;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #edeff3;
      z-index: 1;
      opacity: .9;
      right: 0px;
      .tab-right-icon{
        font-size: 24px;
      }
    }
    .tab-right-none{
      width: 33px;
      flex-shrink: 0;
    }
  }
  
</style>