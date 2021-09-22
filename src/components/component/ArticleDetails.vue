<template>
 <div class='article-details'>
   <van-nav-bar
    title="详情"
    left-arrow
    @click-left="$router.back()"
  />
  <div class="scroll">
    <div>
      <h1 class="title">{{datailMessage.title}}</h1>
    </div>
    <van-cell center>
      <van-image
        class="title-img"
        slot="icon"     
        :src="datailMessage.aut_photo"
        fit="cover"
        round
      />
      <div class="title-name" slot="title">{{datailMessage.aut_name}}</div>
      <div class="title-bottom" slot="label">{{datailMessage.pubdate}}</div>
      <van-button @click="isFocusClick" class="title-focuse" size="small" :icon="isFocus?'success':'plus'" :type="isFocus?'default':'primary'" round>{{isFocus?'已关注':'关注'}}</van-button>
    </van-cell>
    <div class="detail-content" v-html="datailMessage.content" ref="detailContent"></div>
    <details-comments-list :detailsId="$route.params.detailsId"/>
  </div>
  <details-buttom/>
 </div>
</template>

<script>
import { getDetails } from '../../api/home/home'

import { ImagePreview } from 'vant';
import DetailsButtom from '../component/DetailsButtom'
import DetailsCommentsList from 'views/home/childCopms/DetailsCommentsList'
export default {
  name: 'ArticleDetails',
  components: {
    DetailsButtom,
    DetailsCommentsList
  },
  data () {
    return {
      datailMessage: {},
      isFocus: false
      
    };
  },

  created () {
    this.methodDetails()
  },

  computed: {},

  methods: {
    isFocusClick () {
      if(this.isFocus){
        this.$toast.success('成功取消关注');
      }else{
        this.$toast.success('关注成功');
      }
      
      this.isFocus = !this.isFocus
      
    },
    async methodDetails () {
      const {data} = await getDetails(this.$route.params.detailsId)
      this.datailMessage = data.data
      this.priview()
      
    },
    priview () {
      this.$nextTick(() => {
        const detailsImg = []
        const img = this.$refs.detailContent.querySelectorAll('img')
        img.forEach((imgItem, index) => {
          detailsImg.push(imgItem.src)
          imgItem.onclick=function(){
            ImagePreview({
              images: detailsImg,
              startPosition: index,
            });
          }
        })
      }) 
    }
  },

  mounted () {},

  watch: {},
}
</script>
<style lang='less' scoped>
.article-details{
  .scroll{
    position: fixed;
    left: 0;
    right: 0;
    top: 40px;
    bottom: 40px;
    overflow-x: hidden;
    overflow-y: auto;
    .title{
      font-size: 22px;
      color: #3a3a3a;
      padding: 14px;
    }
    .title-img{
      width: 35px;
      height: 35px;
      margin-right: 8px;
    }
    .title-name{
      font-size: 16px;
      color: #333333;
    }
    .title-bottom{
      font-size: 11px;
      color: #b4b4b4;
    }
    .title-focuse{
      width: 85px;
      height: 29px;
    }
    .detail-content{
      font-size: 15px;
      padding: 14px;
    }
  }
  
}

</style>