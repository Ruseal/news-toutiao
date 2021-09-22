<template>
 <div class='amplification'>
    <div class="inside-img"></div>
 </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      proObj: {}
    };
  },
  props: {
    proportion: {
      type: Object,
      required:true
    }
  },
  created () {
    this.$nextTick(()=>{
      this.proObj = this.proportion
    })
  },

  computed: {},

  methods: {
    ppp() {
      
      
    }
  },

  mounted () {
    
    
  },

  watch: {},
}
</script>
<style scoped>
  .amplification{
    width: 300px;
    height: 200px;
    background-color: rgb(252, 239, 227);
    /* left: 370px; */
    top: 50px;
    position: relative;
    overflow: hidden;   
  }
  .inside-img{
    /* display: none; */
    width: 600px;
    height: 400px;
    background: url('../../../public/image/a.jpg') no-repeat;
    background-size: cover;
    position: absolute;
  }

</style>