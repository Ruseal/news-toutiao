<template>
  <div class="main-tabbar">
    <keep-alive><router-view /></keep-alive>
    <van-tabbar v-show="isShow()" route>
        <van-tabbar-item replace to="/home" icon="wap-home-o">
            首页
        </van-tabbar-item>
        <van-tabbar-item replace to="/questions" icon="more-o">
            问答
        </van-tabbar-item>
        <van-tabbar-item replace to="/video" icon="video-o">
            视频
        </van-tabbar-item>
        <van-tabbar-item replace to="/profile" icon="contact">
            我的
        </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
    methods: {
        isShow () {
            // console.log();
            return this.$route.path !== '/login' && this.$route.path !== '/search' && this.$route.path !=='/details/'+this.$route.params.detailsId
        }
        // console.log('sss');
    }

}
</script>

<style>

</style>