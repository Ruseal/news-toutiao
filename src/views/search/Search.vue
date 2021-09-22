<template>
  <div class="search-content">
        <form action="/">
          <van-search
            class="search"
            v-model="value"
            @focus="isShowSearchList=false"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
            background="#5babfb"
          />
        </form>
        <div class="scroll">
          <search-list :search-value="value" v-if="isShowSearchList"/>
          <think @changevalue="changeValue" :search-value="value" v-else-if="value"/>
          <history v-else/>
        </div>
  </div>
</template>

<script>
import History from '../search/childCopms/History'
import SearchList from '../search/childCopms/SearchList'
import Think from '../search/childCopms/Think'
import { mapState } from 'vuex'
export default {
  name: 'Search',
  components: {
    History,
    SearchList,
    Think
  },
  data() {
    return {
      value: '',
      isShowSearchList: false,
    };
  },
  computed: {
    ...mapState({
      historyValue: 'historyValue'
    })
  },
  methods: {
    changeValue (item) {
      this.value = item
      this.onSearch() 
    },
    onSearch() {
      const index = this.historyValue.indexOf(this.value)
      if(index!==-1){
        this.historyValue.splice(index,1)
      }
      // this.historyValue.push(this.value)
      this.$store.commit('addHistory',this.value)
      this.isShowSearchList = true
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
  .search-content{
    .search{
      /deep/ .van-search__action{
          color: #fff;
      }
    }
    .scroll{
      position: fixed;
      overflow-y: auto;
      left: 0;
      right: 0;
      top: 54px;
      bottom: 0;
    }
  }
</style>