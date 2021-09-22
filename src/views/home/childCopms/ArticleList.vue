<template>
  <div class="article-list">
    <van-pull-refresh 
      class="list-content" 
      v-model="isRefreshLoading" 
      @refresh="onRefresh" 
      :success-text="successText"
      :success-duration="1500"
    >
      <van-list     
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          >
            <article-item v-for="(item, index) in articleList" :key="index" :articleItem="item"/>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '../../../api/home/home'
import ArticleItem from '../../../components/component/ArticleItem'
export default {
    name: 'ArticleList',
    components: {
      ArticleItem
    },
    data() {
      return {
        articleList: [],
        loading: false,
        finished: false,
        timestamp: null,
        isRefreshLoading: false,
        successText: ''
      }
    },
    props: {
        channel: {
            type: Object,
            required: true,
        }
    },
    methods: {
      async onLoad() {
        try {
          const { data } = await getArticle({
            channel_id: this.channel.id,
            timestamp: this.timestamp || Date.now(),  
            with_top: 1
          })
          console.log(data)                                                                                                                                                                                                   

          
          this.articleList.push(...data.data.results)
          this.loading = false
          if (data.data.results) {
            this.timestamp = data.data.pre_timestamp
          }else{
              this.finished = true;
          }
        } catch (error) {
          this.$toast('网络连接失败，请重新尝试');
        }
        
      },
      async onRefresh () {
        try {
         const { data } = await getArticle({
            channel_id: this.channel.id,
            timestamp: Date.now(),
            with_top: 1
          })
          this.articleList.unshift(...data.data.results)
          this.successText = '刷新成功'
          this.isRefreshLoading = false 
        } catch (error) {
            this.successText = '刷新失败'
            this.$toast('刷新失败，请检查网络是否连接');   
            this.isRefreshLoading = false     
        }
        
      }
    }

}
</script>

<style lang="less" scoped>
    .article-list{
        .list-content{
            position: fixed;
            left: 0;
            right: 0;
            top: 90px;
            bottom: 50px;
            overflow-y: auto;
        }
    }
</style>