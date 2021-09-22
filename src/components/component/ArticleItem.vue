<template>
  <div class="article-item">
      <van-cell :to="{name: 'details', params: {detailsId: articleItem.art_id}}">
          <div class="title" slot="title">{{articleItem.title}}</div>         
          <div slot="label">
              <div v-if="articleItem.cover.type === 3" class="thired-wrap">
                  <div class="img-item" v-for="(image, index) in articleItem.cover.images" :key="index">
                      <van-image
                        class="thired-img-item"                 
                        fit="cover"
                        :src="image"
                      />
                  </div>
              </div>
              <div class="buttom-wrap">
                  <span>{{articleItem.aut_name}}</span>
                  <span>评论:{{articleItem.comm_count}}</span>
                  <span>{{articleItem.aut_name}}</span>
              </div>
          </div>
          <van-image
            class="rigth-image"
            v-if="articleItem.cover.type === 1"
            fit="cover"
            :src="articleItem.cover.images[0]"
          />
          
      </van-cell>
  </div>
</template>

<script>
export default {
    name: 'ArticleItem',
    props: {
      articleItem:{
        type: Object,
        required: true
      }
    }
}
</script>

<style lang="less" scoped>
    .article-item{
      .title{
        font-size: 16px;
        color: #3a3a3a;
      }
      /deep/ .van-cell__value{
        margin-left: 12px;
        flex: unset;
      }
      .rigth-image{
        width: 116px;
        height: 72px;
      }
      .thired-wrap{
        padding: 15px 0px;
        display: flex;
        .img-item{
          flex: 1;
          height: 73px;
          &:not(:last-child) {
            padding-right: 4px;
          }
          .thired-img-item{
            width: 100%;
            height: 73px;
          }
        }
      }
      .buttom-wrap span{
        margin-right: 10px;
        // top: 10px;
        // background-color:blue;
      }
    }
</style>

    
