<template>
  <div class="think">
      <van-cell @click="clickThinkList(item)" v-for="(item, index) in thinkList" icon="search" :key="index">
        <div slot="title" v-html="itemSplice(item)"></div>
      </van-cell>
  </div>
</template>

<script>
import { getSearchThinks } from '../../../api/home/home'
export default {
    name: 'Think',
    data () {
      return {
        thinkList: [],
        timer: null
      }
    },
    props: {
      searchValue: {
        type: String,
        required: true
      }
    },
    computed: {

    },
    watch: {
      searchValue:{
        handler () {
          this.shake()
        },
        immediate: true
      }
    },
    methods: {
      itemSplice (item) {
          return item.replace(new RegExp(this.searchValue,'gi'), `<span style="color: red;">${this.searchValue}</span>`)
      },
      clickThinkList (item) {
        // console.log('pppp');
        this.$emit('changevalue',item)
      },
      shake () {
        if(this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.methodSearchThinks(this.searchValue)
        },200)  
      },
      async methodSearchThinks (q) {
        const {data} = await getSearchThinks(q)
        this.thinkList = data.data.options
      }
    }
}
</script>
<style lang="less" scoped>

</style>