<template>
  <div class="search-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <article-item v-for="(item, index) in searchList" :key="index" :articleItem="item"/>
    </van-list>
  </div>
</template>

<script>
import { getSearchList } from '../../../api/home/home'

import ArticleItem from '../../../components/component/ArticleItem'
export default {
  name: 'SearchList',
  components: {
    ArticleItem,
  },
  data() {
    return {
      searchList: [],
      loading: false,
      finished: false,
      listPage: 1
    };
  },
  props: {
    searchValue: {
      type: String,
      required: true
    }
  },
  methods: {
     async onLoad() {
      
      const { data } = await getSearchList({
        q: this.searchValue,
        page: this.listPage
      })
      this.searchList.push(...data.data.results)
      this.listPage = data.data.page+1
      console.log(data);
      this.loading = false;
      if (!data.data.results) {
          this.finished = true;
      }

      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }
      //   // 加载状态结束
      //   this.loading = false;
      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 1000);
    }
  }
}
</script>

<style lang="less" scoped>

</style>