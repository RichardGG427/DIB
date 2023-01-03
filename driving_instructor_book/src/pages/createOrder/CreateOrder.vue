<template>
  <div class="create_order">
    <Header title="Create Order" />
    <van-contact-card
      type="edit"
      :tel="currentContact.tel"
      :name="currentContact.name"
      @click="onEdit"
    />
    <div class="content">
      <div v-for="i in store.state.orderList">
        <van-card
          :num="i.num"
          :price="i.price"
          :title="i.title"
          :thumb="i.pic"
          currency="$"
        />
      </div>
    </div>
    <div class="pay-wrap">
      <div class="price">
        <span>Price</span>
        <span>$ {{ allPrice }}</span>
      </div>
      <van-button
        class="pay-btn"
        type="primary"
        @click="handleCreateOrder"
        color="#ffc400"
        block
        >Confirm</van-button
      >
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header.vue';
import { toRefs, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { Dialog } from 'vant';
export default {
  components: {
    Header,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    let data = reactive({
      currentContact: {
        name: '',
        tel: '',
      },
      allPrice: 0,
    });

    //user data initialization
    const initUser = () => {
      store.state.userAddress.forEach((item) => {
        if (item.isDefault) {
          data.currentContact.name = item.name;
          data.currentContact.tel = item.tel;
        }
      });
    };

    //price in total initialization
    const initPrice = () => {
      let price = 0;
      if (store.state.orderList.length) {
        store.state.orderList.forEach((item) => {
          price += item.num * item.price;
        });
        data.allPrice = price;
      }
    };

    onMounted(() => {
      initPrice();
      initUser();
    });

    //address edit button
    const onEdit = () => {
      router.push('./address');
    };

    //create order button
    const handleCreateOrder = () => {
      Dialog.alert({
        title: 'Thanks!',
        message: 'We have received your order.',
      }).then(() => {
        let newList = store.state.cartList.filter((item) => {
          return !route.query.list.includes(item.id + '');
        });
        store.commit('DELETE', newList);
        store.commit('UPDATEORDER');
        router.push('./order');
      });
    };

    return {
      ...toRefs(data),
      onEdit,
      store,
      handleCreateOrder,
    };
  },
};
</script>
<style>
:root {
  --van-card-padding: 5px;
  --van-card-font-size: 10px;
  --van-card-thumb-size: 50px;
  --van-card-thumb-border-radius: 5px;
  --van-card-title-line-height: 10px;
  --van-card-origin-price-font-size: 10px;
  --van-card-price-font-size: 10px;
  --van-card-price-integer-font-size: 10px;
  --van-dialog-width: 150px;
  --van-dialog-confirm-button-text-color: #ffc400;
  --van-dialog-message-padding: 0px;
  --van-dialog-button-height: 35px;
}
</style>

<style lang="less" scoped>
/deep/ .van-cell {
  font-size: 8px;
}

/deep/ .van-contact-card {
  padding: 10px;
}

// /deep/ .van-dialog__message {
//     padding:1px;
// }

.create_order {
  display: flex;
  flex-flow: column;
  height: 100%;
  .content {
    flex: 1;
    overflow-y: auto;
  }
  .pay-wrap {
    padding: 5px 0;
    width: 100%;

    background: #fff;
    border-top: 1px solid #e9e9e9;
    > div {
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
      margin: 5px 0;
      font-size: 9px;
      span:nth-child(2) {
        color: red;
        font-size: 10px;
      }
    }
    .pay-btn {
      width: 90%;
      margin: 0 auto;
      height: 20px;
      border-radius: 20px;
    }
  }
}
</style>
