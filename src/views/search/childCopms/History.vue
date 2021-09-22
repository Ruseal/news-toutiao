<template>
  <div class="histroy">
    <van-cell title="历史记录">
      <div v-if="!hitoryShow">
        <van-icon @click="isDelete" name="delete-o" />
      </div>
      <div v-else>
        <span @click="deleteAll">全部删除</span>
        &nbsp;
        &nbsp;
        <span @click="isComplete">完成</span>
      </div>
      </van-cell>

      <van-cell v-for="(item, index) in historyValue" :title="item" :key="index">
        <div @click="deleteHistroy(item)" v-if="hitoryShow">
          <van-icon name="close" />
        </div>
      </van-cell>
  </div>
</template>

<script>
import {mapState}  from 'vuex'

// import { Dialog } from 'vant';
export default {
    name: 'Histroy',
    data () {
      return {
        hitoryShow: false
      }
    },
    computed: {
      ...mapState({
         historyValue: 'historyValue'
      })
    },
    methods: {
      deleteAll () {
        this.$dialog.confirm({
          // title: '标题',
          message: '是否清空搜索历史记录'
        }).then(() => {
          this.$store.commit('deleteAll')
        }).catch(() => {
          // on cancel
        });
        
      },
      deleteHistroy (item) {
        this.$store.commit('deleteHistory',item)
      },
      isDelete () {
        if(this.historyValue.length){        
          this.hitoryShow = true
        }       
      },
      isComplete () {
        this.hitoryShow = false
      }
    }
}
</script>

<style lang="less" scoped>

</style>