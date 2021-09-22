<template>
  <div class="text">
    <mobile-swiper :imageList="imageList">
  
    </mobile-swiper>
  </div>
</template>

<script>
import MobileSwiper from "./testcomps/MobileSwiper.vue";
export default {
  name: "",
  components: {
    MobileSwiper,
  },
  data() {
    return {
      imageList: [
        // require("../../../public/image/a.jpg"),
        // require("../../../public/image/b.jpg"),
        // require("../../../public/image/c.jpg"),
        // require("../../../public/image/d.jpg"),
        // require("../../../public/image/e.jpg")
      ],
    };
  },

  created() {
    this.asyncImg();
  },

  computed: {},

  methods: {
    asyncImg() {
      setTimeout(() => {
        this.imageList = [
          require("../../../public/image/a.jpg"),
          require("../../../public/image/b.jpg"),
          require("../../../public/image/c.jpg"),
          require("../../../public/image/d.jpg"),
          require("../../../public/image/e.jpg"),
        ];
      }, 1000);
    },
  },

  mounted() {},

  watch: {},
};
</script>
<style scoped>
.text{
  width: 100vw;
  height: 300px;
  /* margin: 30px; */
}
</style>