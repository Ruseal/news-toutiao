<template>
  <div class='observe' 
    @mouseenter="onmouseenter" 
    @mouseleave="onmouseleave"
    @mousemove="onmousemove"
  >
    <div v-show="isShowBox" class="cover-box"></div>
 </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      obs: null,
      coverBox: null,
      obsWidth: 0,
      obsHeight: 0,
      isShowBox: false,
      boxLeft: 0,
      boxTop: 0,
      boxWidth: 0,
      boxHeight: 0
    };
  },
  props:{
    src: {
      type: String,
      default () {
        return require('../../../public/image/a.jpg')
      }
    },
    coverBoxWidth: {
      type: Number,
      default () {
        return 40
      }
    },
    coverBoxHeight: {
      type: Number,
      default () {
        return 40
      }
    },
  },
  created () {},

  computed: {},

  methods: {
    loadDom () {
      this.obs = document.querySelector('.observe')
      this.coverBox = document.querySelector('.cover-box') 
      this.obsWidth = this.obs.offsetWidth
      this.obsHeight = this.obs.offsetHeight
    },
    setCoverBoxSize () {
      let reg = new RegExp("^([1-9]|[1-9]\\d|100)$")
      if(reg.test(this.coverBoxWidth)&&reg.test(this.coverBoxHeight)){
        this.boxWidth = this.obsWidth*(this.coverBoxWidth/100)
        this.boxHeight = this.obsHeight*(this.coverBoxHeight/100)
        this.coverBox.style.width = this.boxWidth+'px'
        this.coverBox.style.height = this.boxHeight+'px'
      }else{
        console.error('Invalid props value,props range only 1 to 100');
      }
       
    },
    onmouseenter () {
      this.isShowBox = true
      
       
    },
    onmouseleave () {
      
      this.isShowBox = false
    },
    onmousemove (e) {
       
      this.boxLeft = e.pageX - this.obs.offsetLeft - this.boxWidth/2
      this.boxTop = e.pageY - this.obs.offsetTop - this.boxHeight/2
      this.adjustPosition()
      this.setStyle () 
    },
    adjustPosition () {
      if(this.boxLeft <= 0){
        this.boxLeft = 0
      }else if(this.boxLeft >= this.obsWidth - this.boxWidth){
        this.boxLeft = this.obsWidth - this.boxWidth
      }
      if(this.boxTop <= 0){
        this.boxTop = 0
      }else if(this.boxTop >= this.obsHeight - this.boxHeight){
        this.boxTop = this.obsHeight - this.boxHeight
      }
    },
    setStyle () {
      this.coverBox.style.left = this.boxLeft + 'px'
      this.coverBox.style.top = this.boxTop + 'px'

    },
    setImage () {     
      this.obs.style.backgroundImage = 'url('+this.src+')'
    },
    proportion () {
      let proWidth = this.obsWidth/this.boxWidth
      let proHeight = this.obsHeight/this.boxHeight
      this.$emit('proportion',{obsWidth: this.obsWidth, obsHeight: this.obsHeight, proWidth,proHeight,})
    }
  },

  mounted () {

    this.loadDom()
    this.setImage()
    this.setCoverBoxSize()
    this.proportion()
    // console.log(this.TdragBlockWidth);
    
    
    
  },

  watch: {},
}
</script>
<style scoped>
  .observe{
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    /* background-image: url('../../../public/image/a.jpg'); */
    background-size: cover;
    position: relative;
  }
  .cover-box{
    background-color: rgb(253, 126, 7);
    position: absolute;
    opacity: 0.5;
  }
</style>