<template>
  <div @mouseenter="showAndstop" @mouseleave="hiddenAndplay" v-if="imgList.length" class='swiper'>
    <div class="slide">
      <a class="a-img" v-for="(img,index) in imgList" :key="index" href="javascript:viod">
        <img class="slideItem" :src="img"/>
      </a>
    </div>
    <div v-show="isShow" class="arrow">
      <div class="arrow-left" @click="clickLeft" v-text="'<'"></div>
      <div class="arrow-right" @click="clickRight" v-text="'>'"></div>
      </div>
    <div v-if="imgList.length>1" class="indicator">
      <div class="indicatorItem"
        :class="{'indicator-style': isHighLight(index)}" 
        @click="clickIdt(index)" 
        v-for="(item, index) in imgList" 
        :key="index" 
      ></div>
    </div>
 </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {
       imgList: this.imageList,
       imgWidth: 0,
       slide: {},
       slideChildCount: 0,
       slideItems: [],
       imgIndex: 0,
       currentIndex: 1,
       isStillPlayed: true,
       timer: null,
       isShow: false,
       aslObj: {stepLength: 0},
       annimateTimer: null,
       swiper: null
    };
  },
  props:{
    imageList: {
      type: Array,
      default () {
        return [
          require('../../../../public/image/a.jpg'),
          require('../../../../public/image/b.jpg'),
          require('../../../../public/image/c.jpg'),
          require('../../../../public/image/d.jpg'),
          require('../../../../public/image/e.jpg')
        ]
      }
    },
    delay: {
      type: Number,
      default () {
        return 2000
      }
    },
    indicatorLocation: {
      type: String,
      default () {
        return 'center'
      }
    }
  },
  created () {},

  computed: {},

  methods: {
    handleDom () {
      this.$nextTick(()=>{
        this.swiper = document.querySelector('.swiper')
        this.slide = document.querySelector('.slide')
        this.slideItems = document.querySelectorAll('.a-img')
        this.slide.appendChild(this.slideItems[0].cloneNode(true))
        this.slide.insertBefore(this.slideItems[this.slideItems.length-1].cloneNode(true),this.slideItems[0])
        this.slideChildCount = this.slide.children.length
        this.imgWidth = this.swiper.offsetWidth
        this.slide.style.width = this.slideChildCount+'00%'
        this.slide.style.left = -this.imgWidth + 'px'
        this.setIndicatorLocation()
      })
    },
    showAndstop () {
      this.isShow = true
      clearInterval(this.timer)
    },
    hiddenAndplay () {
      this.isShow = false
      this.automaticallyPlay()
    },
    clickIdt (index) {  
      this.currentIndex = index+1
      this.annimate(this.slide,- this.imgWidth*this.currentIndex)
    }, 
    clickLeft (){
      if(this.isStillPlayed){
        this.isStillPlayed = false
        if(this.currentIndex <= 0){
        this.currentIndex = this.slideChildCount - 2
        this.slide.style.left = -this.imgWidth*this.currentIndex + 'px'  
        }
        this.currentIndex--  
        this.annimate(this.slide, - this.imgWidth*this.currentIndex, this.completeAnimation)
      } 
    },
    clickRight () {
      if(this.isStillPlayed) {
        this.isStillPlayed = false
        if(this.currentIndex >= this.slideChildCount-1){
          this.currentIndex = 1
          this.slide.style.left = -this.imgWidth + 'px'
        }
        this.currentIndex++      
        this.annimate(this.slide,- this.imgWidth*this.currentIndex, this.completeAnimation)
      }     
    },
    completeAnimation () {
      this.isStillPlayed = true
    },
    isHighLight (index) {
      if(this.currentIndex===this.slideChildCount-1){
        return index === 0
      }
      if(this.currentIndex===0){
        return index === this.slideItems.length - 1
      }
      return this.currentIndex - 1===index
    },
    annimate (nodeObj, distance, callback) {
      this.annimateTimer = setInterval(() => {
          this.aslObj.stepLength = (distance - nodeObj.offsetLeft)/10
          if(distance===nodeObj.offsetLeft){
              clearInterval(this.annimateTimer)
              callback && callback()
          }
          this.aslObj.stepLength = this.aslObj.stepLength > 0? Math.ceil(this.aslObj.stepLength): Math.floor(this.aslObj.stepLength)
          nodeObj.style.left = this.aslObj.stepLength+nodeObj.offsetLeft+'px'
      }, 15);
    },
    automaticallyPlay () {
      this.timer = setInterval(()=>{
        this.clickRight()
      },this.delay)
    },
    setIndicatorLocation () {
      let indicator = document.querySelector('.indicator')
      switch (this.indicatorLocation) {
        case 'left':
          indicator.style.left = 0
          break;
        case 'center':
          indicator.style.left = '25%'
          break;
        case 'right':
          indicator.style.right = 0
          break;
        default:
          console.error("Error: Passing in invalid 'props'");
      }
    },
  },
  mounted () {

  },
  watch: {
    imageList(updataValue){
      this.imgList = updataValue
      this.handleDom()
      this.automaticallyPlay()
     
    }
  },
}
</script>
<style scoped>
.swiper{
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
}
.slide{
  position: absolute;
  display: flex;
  height: 100%;
  background-color: rgb(53, 42, 42);
}
.a-img{
  width: 100%;
  height: 100%;
}
.slideItem{
  width: 100%;
  height: 100%;
}
.arrow{
  position: absolute;
  width: 100%;
  top: 40%;
  display: flex;
  color: white;
  justify-content: space-between;
}
.arrow-left, .arrow-right{
  width: 5px;
  height: 10px;
  text-align: center;
  line-height: 10px;
  background-color: rgb(29, 14, 14);
  opacity: 0.5;
  cursor: pointer;
}
.indicator{
  width: 50%;
  height: 5%;
  display: flex;
  position: absolute;
  bottom: 3%;
  /* left: 25%; */
  justify-content: space-evenly;
}
.indicatorItem{
  width: 10%;
  height: 100%;
  background-color: rgb(27, 23, 23);
}
.indicator-style{
  background-color: rgb(248, 6, 6);
}
</style>