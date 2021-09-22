

<template>
  <div v-if="imgList.length" class="mobile-swiper">
    <div
      class="slide"
      @touchstart="touchStart"
      @touchmove.prevent="touchMove"
      @touchend="touchEnd"
    >
      <a
        class="slide-a"
        href="javascript:0"
        v-for="(img, index) in imgList"
        :key="index"
      >
        <img class="slideItem" :src="img" alt="" />
      </a>
    </div> 
    <div class="indicator">
      <div
        class="indicatorItem"
        v-for="(img, index) in imgList"
        :key="index"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      imgList: [],
      imgCount: 0,
      slide: {},
      slideImgCount: 0,
      imgWidth: 0,
      currentIndex: 1,
      timer: null,
      idcts: null,
      startX: 0,
      moveX: 0,
      banSliding: false,
    };
  },
  props: {
    imageList: {
      type: Array,
      default() {
        return [
          require("../../../../public/image/a.jpg"),
          require("../../../../public/image/b.jpg"),
          require("../../../../public/image/c.jpg"),
          require("../../../../public/image/d.jpg"),
          require("../../../../public/image/e.jpg"),
        ];
      },
      // required:true
    },
    indicatorLocation: {
      type: String,
      default () {
        return 'center'
      }
    },
    interval: {
      type: Number,
      default() {
        return 2000;
      },
    },
    animDuration: {
      type: Number,
      default() {
        return 400;
      },
    },
    bounceDuration: {
      type: Number,
      default() {
        return 200;
      },
    },

  },
  created() {
    this.asynchronous();
  },
  mounted() {},
  computed: {},
  methods: {
    touchStart(e) {
      //判断动画是否正在执行,如果是则不执行以下代码
      if (this.banSliding) return;
      //按住屏幕触发停止定时器
      clearInterval(this.timer);
      //获取按住瞬间的X轴坐标
      this.startX = e.targetTouches[0].pageX;
    },
    touchMove(e) {
      //判断动画是否正在执行,如果是则不执行以下代码
      if (this.banSliding) return;
      //获取手指移动的距离
      this.moveX = e.targetTouches[0].pageX - this.startX;
      this.setTransition(0);
      //设置移动距离为当前图片的距离加手指移动距离
      this.setTransform(-this.currentIndex * this.imgWidth + this.moveX);
    },
    touchEnd() {
      //判断动画是否正在执行
      if (!this.banSliding) {
        //设置动画正在执行
        this.banSliding = true;
        //判断手指滑动距离是否大于自定义的距离
        if (Math.abs(this.moveX) > 50) {
          this.setTransition();
          //判断是否是向右滑动
          if (this.moveX > 0) {
            this.currentIndex--;
            //设置移动距离
            this.setTransform(-this.currentIndex * this.imgWidth);
          }
          //如果不是向右滑动
          else {
            this.currentIndex++;
            //设置移动距离
            this.setTransform(-this.currentIndex * this.imgWidth);
          }
        }
        //判断手指滑动距离是否小于自定义的距离
        else {
          this.setTransition(this.bounceDuration / 1000);
          this.setTransform(-this.currentIndex * this.imgWidth);
        }
        //操作无缝滚动的判定
        this.seamless();
      }
      //先清除定时器防止多次调用定时器
      clearInterval(this.timer);
      //重新开启定时器
      this.startTimer();
    },
    seamless() {
      //动画执行过度的时间
      setTimeout(() => {
        this.setTransition(0);
        // this.slide.style.transition = "";
        //判断是否滚动到最后一张
        if (this.currentIndex >= this.slideImgCount - 1) {
          //设置瞬间移动到第二张图片
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.imgWidth);
        }
        //判断是否滚动到第一张
        if (this.currentIndex <= 0) {
          //设置瞬间移动到初始图片的最后一张图片，也就是现在图片的倒数第二张
          this.currentIndex = this.slideImgCount - 2;
          this.setTransform(-this.currentIndex * this.imgWidth);
        }
        //移除之前指示器高亮样式
        let currentStyle = document.querySelector(".current-style");
        //处理小Bug
        if (currentStyle) {
          currentStyle.classList.remove("current-style");
        } else {
          console.warn(
            "Warn:please try to refresh the page to solve the current problem(请刷新页面)"
          );
        }
        //添加当前指示器高亮样式
        this.idcts[this.currentIndex - 1].classList.add("current-style");
        //动画执行完毕
        this.banSliding = false;
      }, this.animDuration);
    },
    startTimer() {
      //开启定时器
      this.timer = setInterval(() => {
        this.currentIndex++;
        //是否正在执行动画
        this.banSliding = true;
        this.setTransition();
        this.setTransform(-this.currentIndex * this.imgWidth);
        //操作无缝滚动的判定
        this.seamless();
      }, this.interval);
    },
    setTransition(duration = this.animDuration / 1000) {
      this.slide.style.transition = "all " + duration + "s";
    },
    setTransform(position) {
      this.slide.style.transform = `translate3d(${position}px, 0, 0)`;
    },
    cloneImg() {
      let slides = document.querySelectorAll(".slide-a");
      //克隆图片
      this.slide.appendChild(slides[0].cloneNode(true));
      this.slide.insertBefore(
        slides[this.imgCount - 1].cloneNode(true),
        slides[0]
      );
      //遍历设置每张图片的宽度
      this.slide.children.forEach((element) => {
        element.children[0].style.width = "100%";
      });
      //保存克隆后所有图片的数量
      this.slideImgCount = this.slide.children.length;
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
          console.error("Error: passing in invalid 'props'");
      }
    },
    handleDom() {
      this.$nextTick(() => {
        let mobileSwiper = document.querySelector(".mobile-swiper");
        //获取张图片需设置的宽度
        this.imgWidth = mobileSwiper.offsetWidth;
        //设置指示器位置
        this.setIndicatorLocation()
        //初始未克隆前图片数量
        this.imgCount = this.imgList.length;
        this.slide = document.querySelector(".slide");
        //克隆图片
        this.cloneImg();
        this.idcts = document.querySelectorAll(".indicatorItem");
        //设置当前初始位置指示器样式
        this.idcts[0].classList.add("current-style");
        //设置装载图片容器的宽度
        this.slide.style.width =
          mobileSwiper.offsetWidth * this.slideImgCount + "px";
        //设置初始图片的显示位置
        this.setTransform(-this.imgWidth);
      });
    },
    main() {
      this.handleDom();
      this.startTimer();
    },
    asynchronous() {
      this.imgList = this.imageList;
      if (this.imgList.length) {
        //同步获取数据
        this.main();
      }
    },
  },
  watch: {
    imageList(updataValue) {
      this.imgList = updataValue;
      //异步获取数据
      this.main();
    },
  },
};
</script>
<style scoped>
.mobile-swiper {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.slide {
  position: absolute;
  display: flex;
  height: 100%;
}
.slide-a {
  width: 100%;
}
.slideItem {
  height: 100%;
}
.indicator {
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  bottom: 3%;
  width: 50%;
  height: 3%;
}
.indicatorItem {
  width: 10%;
  height: 100%;
  background-color: #fff;
}
.current-style {
  background-color: rgb(248, 9, 9);
}
</style>