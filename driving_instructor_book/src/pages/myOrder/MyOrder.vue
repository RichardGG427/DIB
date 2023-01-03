<template>
  <div class="order">
    <Header title="Orders" />
    <div class="content">
      <van-tabs color="#ffc400">
        <van-tab v-for="i in navData" :title="i">
          <div
            v-for="i in store.state.orderListed"
            v-if="i === 'All' && store.state.orderListed.length"
          >
            <van-card
              :num="i.num"
              :price="i.price"
              :title="i.title"
              :thumb="i.pic"
            />
          </div>
          <Blank v-else />
        </van-tab>
      </van-tabs>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import Blank from '../../components/Blank.vue';
import { useStore } from 'vuex';
import { reactive, toRefs } from 'vue';
export default {
  components: {
    Footer,
    Header,
    Blank,
  },
  setup() {
    const store = useStore();
    let data = reactive({
      navData: ['All', 'Purchased', 'Unpaid', 'Unshiped'],
    });
    return {
      ...toRefs(data),
      store,
    };
  },
};
</script>
<style lang="less" scoped>
.order {
  display: flex;
  flex-flow: column;
  height: 100%;
  .content {
    flex: 1;
    overflow-y: auto;
  }

  // /deep/ .van-tab {
  //   font-size: 10px;
  //   height:20px
  //   line-height: 20px;
  // }
  // /deep/ .van-tabs {
  //   height:20px;
  //   line-height: 20px;
  // }
}
</style>
<style>
:root {
  --van-tab-font-size: 10px;
  --van-tabs-line-height: 30px;
}
</style>
