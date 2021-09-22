<template>
 <div class='details-bottom'>
     <van-button class="bottom-button" :hairline="true" size="small" round>写评论</van-button>
     <van-icon size="0.6rem" name="comment-o" info="99+"/>
     <van-icon @click="isCollectionClick" :color="isCollection? 'rgb(247, 223, 14)':''" size="0.6rem" :name="isCollection? 'star':'star-o'" />
     <van-icon @click="isLikeClick" :color="isLike? 'red':''" size="0.6rem" :name="isLike? 'good-job':'good-job-o'" />
     <van-icon size="0.6rem" name="share-o" />
 </div>
</template>

<script>
export default {
  name: 'DetailsButtom',
  components: {},
  data () {
    return {
      isCollection: false,
      isLike: false
    };
  },

  created () {},

  computed: {},

  methods: {
    isCollectionClick () { 
      this.isCollection = !this.isCollection
      if(this.isCollection){
        this.$toast.success({
          message:'收藏成功',
          forbidClick: true,
          duration:600
        });
      }else{
        this.$toast.success({
          message:'取消收藏成功',
          forbidClick: true,
          duration:600
        });
      }
    },
    isLikeClick () {
      this.isLike = !this.isLike
      if(this.isLike){
        this.$toast.success({
          message:'点赞成功',
          forbidClick: true,
          duration:600
        });
      }else{
        this.$toast.success({
          message:'取消点赞成功',
          forbidClick: true,
          duration:600
        });
      }
    }
  },

  mounted () {},

  watch: {},
}
</script>
<style lang='less' scoped>
.details-bottom{
    position: fixed;
    padding: 0 5px;
    left: 0;
    right: 0;
    bottom: 0;
    height: 40px;
    display: flex;
    border-top: 1px solid rgb(228, 228, 226);
    justify-content: space-around;
    align-items: center;
    background-color: rgb(255, 255, 253);
    /deep/ .van-button--small{
        padding: 0 65px;
    }
    /deep/ .van-button--hairline{
        border-width: unset;
    }
}
</style>