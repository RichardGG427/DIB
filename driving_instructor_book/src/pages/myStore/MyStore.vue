<template>
  <div class="storeDetails">
    <Header title="Course Selection" />
    <div class="content">
      <div class="img" />
      <div class="courseClassify">
        <div class="name">
          {{ title }}
          <img :src="img" class="store_img" alt="" />
        </div>
        <div class="classify">
          <van-tabs color="#ffc400">
            <van-tab v-for="(i, index) in storeData" :title="i.name">
              <CourseList :index="index" :courseData="i.data" />
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </div>
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="Contact" @click="service" />
      <van-action-bar-icon
        icon="cart-o"
        text="Cart"
        :badge="store.state.cartList.length"
        @click="toCart"
      />
      <van-action-bar-button type="warning" text="Add" @click="handleAddCart" />
      <van-action-bar-button type="danger" text="Buy" @click="clickBuy" />
    </van-action-bar>
  </div>
</template>

<script>
// import { makeRequiredProp } from 'vant/lib/utils';
import { onMounted, reactive, toRefs } from 'vue';
import Header from '../../components/Header.vue';
import CourseList from './components/CourseList';
import { Toast } from 'vant';
import { useStore } from 'vuex';
// import router from '../../router';
import { useRouter, useRoute } from 'vue-router';
import { getStoreData } from '../../request/api';

export default {
  components: {
    Header,
    CourseList,
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    let data = reactive({
      storeData: [],
      title: '',
      img: '',
    });

    //data request
    const getStore = () => {
      getStoreData().then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          res.data.data.forEach((i) => {
            if (i.title === route.query.title) {
              data.title = i.title;
              data.img = i.img;
              data.storeData = i.storeData;
            }
          });
        }
      });
    };

    onMounted(() => {
      getStore();
    });

    const service = () => {
      Toast.fail('Coming Later...');
    };

    //jump to cart
    const toCart = () => {
      router.push('./cart');
    };

    // add to cart
    const handleAddCart = (type) => {
      let newList = [];
      data.storeData.forEach((item) => {
        item.data.items?.forEach((items) => {
          items.children.forEach((itemss) => {
            if (itemss.num > 0) {
              newList.push(itemss);
            }
          });
        });
      });

      if (newList.length === 0) {
        Toast('Please select');
        return;
      }

      store.commit('ADDCART', newList);
      type === 'buy' ? toCart() : '';
    };

    //buy click
    const clickBuy = () => {
      handleAddCart('buy');
    };

    return {
      ...toRefs(data),
      service,
      handleAddCart,
      store,
      clickBuy,
      toCart,
    };
  },
};
</script>
<style lang="less" scoped>
/deep/ .van-tab__text--ellipsis {
  font-size: 9px;
}
/deep/ .van-action-bar-button {
  height: 25px;
  font-size: 10px;
}
/deep/ .van-action-bar {
  height: 30px;
}
/deep/ .van-badge {
  font-size: 7px;
  min-width: 8px;
}

/deep/ .van-action-bar-icon {
  font-size: 8px;
  min-width: 30px;
}

.storeDetails {
  height: 100%;
  display: flex;
  flex-flow: column;
  .content {
    flex: 1;
    overflow-y: auto;
    .img {
      background: url('../../assets/seden.jpeg') no-repeat center/cover;
      width: 100%;
      height: 80px;
    }
    .courseClassify {
      height: 300px;
      background-color: #fff;
      margin-top: -20px;
      border-radius: 10px 10px 0px 0px;

      .classify {
        margin-top: 10px;
      }
      .name {
        display: flex;
        padding: 5px;
        justify-content: space-between;
        .store_img {
          width: 50px;
          height: 50px;
          border-radius: 5px;
          margin-top: -10px;
        }
      }
    }
  }
}
</style>
