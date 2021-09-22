<template>
 <div class='details-comments-list'>
    <van-cell title="全部评论" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
    >
      <van-cell v-for="(item, index) in commentsList" :key="index">
        <van-image
          class="comments-img"
          slot="icon"
          fit="cover"
          round
          :src="item.aut_photo"
        />
        <div slot="title">
          <van-cell class="comments-title">
            <div slot="title">{{item.aut_name}}</div>
            <div class="comments-title-like">
              <van-icon @click="isLike = !isLike" :class="isLike?'color:red':''" :name="isLike?'good-job':'good-job-o'" />
              <div v-if="item.like_count">{{item.like_count}}</div>
              <div v-else>赞</div>
            </div>
          </van-cell>
          <div>{{item.content}}</div>
        </div>
        <div slot="label" class="comments-bottom">
          <div>{{item.pubdate}}</div>
          <van-button class="comments-btn" type="default" size="mini">回复{{item.reply_count}}</van-button>
        </div>
      </van-cell>
    </van-list>
 </div>
</template>

<script>
import { getComments } from '../../../api/home/home'
export default {
  name: 'DetailsCommentsList',
  components: {},
  data () {
    return {
      commentsList: [],
      loading: false,
      finished: false,
      offset: null,

























































      
      isLike: false
    };
  },
  props: {
    detailsId: {
      type: [Number,String,Object],
      required:true
    },
     
  },
  created () {
    this.methodComments()
  },

  computed: {},

  methods: {
    async methodComments () {
      const { data } = await getComments({
        type: 'a',
        source: this.detailsId,
        offset:this.offset,
        limit: 10
      })
      this.commentsList = data.data.results
      console.log(data);
      this.loading = false;
      if(data.data.results.length){
        this.offset = data.data.last_id
      }else{
        this.finished = true;
      }
    },
  },

  mounted () {},

  watch: {},
}
</script>
<style lang='less' scoped>
  .comments-img{
    margin-right: 10px;
    width: 36px;
    height: 36px;
  }
  .comments-title{
    padding-top: 0px;
    padding-left: 0px;
    .comments-title-like{
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
  .comments-bottom{
    display: flex;
    align-items: center;
    .comments-btn{
      margin-left: 20px;
    }
  }
</style>