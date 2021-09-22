<template>
  <div class="channels-popup">
    <div class="scroll">
      <van-cell :border="false">
        <div class="popup-titlt" slot="title">我的频道<span class="popup-titlt-span">点击进入频道</span></div>
        <van-button @click="editClick" class="popup-bj" plain type="primary" color=red size="mini" round>{{isEdit?'完成':'编辑'}}</van-button>
      </van-cell>
      <van-grid :gutter="10">
        <van-grid-item         
          :class="{heightItem: active === index}"
          class="popup-item"
          v-for="(item, index) in channelsList"
          @click="enterClick(item)"
          :key="index"
          to="/home"
        >
          <div slot="text">
             <van-icon @click="clearClick(item)" size="0.5rem" v-if="(item!==channelsList[0])&&isEdit" :class="{clear:isEdit }" name="clear"/>    <!--v-if="isEdit" :class="{clear:isEdit }" -->
            <div class="grid-text" >{{item.name}}</div>
          </div>
          
        </van-grid-item>
      </van-grid>

      <van-cell :border="false">
        <div class="popup-titlt" slot="title">频道推举<span class="popup-titlt-span">点击添加频道</span></div>
      </van-cell>
      <van-grid :gutter="10">
        <van-grid-item
          class="popup-item"
          v-for="(item, index) in computedAllChannels"
          :key="index"
          @click="addItem(item)"
        >
          <div class="grid-text" slot="text">{{item.name}}</div>
        </van-grid-item>
      </van-grid>
    </div>
      
  </div>
</template>

<script>
import { getAllChannels } from '../../../api/home/home'
export default {
    name: 'ChannelsPopup',
    data () {
      return {
        allChannels: [],
        isEdit: false,
        channels: [],
        currmentItemIndex: 0
      }
    },
    props: {
      channelsList:{
        type: Array,
        required: true
      },
      active:{
        type: Number,
        required:true
      }
    },
     created () {
      this.methodAllChannels()
    },
    computed: {
      computedAllChannels () {
        return this.channels.filter(item => !this.channelsList.find(itemList => item.name===itemList.name))
      },
    },
    methods: {
      
      addItem (item) {
        this.channelsList.push(item)
        // this.getAllChannels()
      },
      enterClick (item) {
        if(!this.isEdit){
          this.$emit("changeactive", this.channelsList.indexOf(item))
        }
      },
      clearClick (item) {
        if(this.active > this.channelsList.indexOf(item)){
          this.$emit('updataactive')
        }
        this.channelsList.splice(this.channelsList.indexOf(item),1)
      },
      editClick () {
        this.isEdit = !this.isEdit
      },
      async methodAllChannels () {
        const { data } = await getAllChannels()
        this.channels = data.data.channels
      },
    }

}
</script>

<style lang="less" scoped>
  .channels-popup{
    padding-top: 60px;
    .scroll{
      top: 80px;
      left: 0;
      right: 0;
      bottom: 20px;
      position: fixed;
      overflow-y: auto;
      .popup-titlt{
        font-size: 16px;
        .popup-titlt-span{
          margin-left: 10px;
          font-size: 6px;
          color: rgb(226, 224, 224);
        }
      }
      .popup-bj{
        padding: 0px 15px;
      }
      .popup-item{
        width: 80px;
        height: 43px;
        /deep/ .van-grid-item__content {
          background-color:#f4f5f6;
        }
        .clear{
          color: rgb(165, 165, 164);
          position: absolute;
          top: 0;
          right: 0;
        }
      }
      .heightItem{
        color: red;
      }
      .grid-text{
        font-size: 13px;
      }
    }
  }
</style>