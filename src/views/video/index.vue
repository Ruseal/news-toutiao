<template>
  <div class="video-contairner">
    <swiper :imageList="imageList"></swiper>
    <!-- <button @click="getImg">1111111</button> -->
  </div>
</template>

<script>
import Swiper from 'components/common/sw/Swiper.vue'
export default {
 
  name: 'VideoIndex',
   components: { 
    Swiper 
  },
  data () {
    return {
      imageList:[]
    }
  },
   mounted () {
    setTimeout(()=>{
        this.imageList = [
          require('../../../public/image/a.jpg'),
          require('../../../public/image/b.jpg'),
          require('../../../public/image/c.jpg'),
          require('../../../public/image/d.jpg'),
          require('../../../public/image/e.jpg')
        ]
    },1000)
  },
  methods: {

  }
}
</script>

<style>
.video-contairner{
  width: 70px;
  height: 40px;
  /* margin-left: -50px; */
  margin: 10px;
}
</style>