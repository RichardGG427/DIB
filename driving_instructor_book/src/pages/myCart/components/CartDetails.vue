<template>
  <div class="cartDetails">
    <!-- Goods List -->
    <div class="content">
      <van-checkbox-group v-model="result" @change="groupChange">
        <div v-for="(i, index) in store.state.cartList">
          <CourseAdd :item="i" :showCheckbox="true" :onChange="onChange" />
        </div>
      </van-checkbox-group>
    </div>
    <!-- Settle bill -->
    <van-submit-bar
      :price="allPrice * 100"
      button-text="Checkout"
      @submit="onSubmit"
      class="submit-all"
      button-color="#ffc400"
      currency="$"
      v-if="isDelete"
    >
      <van-checkbox v-model="checked" checked-color="#ffc400" @click="choseAll"
        >All</van-checkbox
      >
    </van-submit-bar>

    <!-- delete -->
    <div class="buy" v-else>
      <div class="left">
        <van-checkbox
          v-model="checked"
          checked-color="#ffc400"
          @click="choseAll"
          >All</van-checkbox
        >
      </div>
      <div class="delete" @click="deleteClick">Delete</div>
    </div>
  </div>
</template>

<script>
import { declareTypeAlias } from '@babel/types';
import { onMounted, reactive, toRefs, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import CourseAdd from '../../../components/CourseAdd.vue';
import emitter from '../../../common/js/eventbus.js';

export default {
  components: { CourseAdd },
  props: ['changeShow'],
  setup(props) {
    const store = useStore();
    const router = useRouter();
    let data = reactive({
      result: [],
      checked: true,
      isDelete: true,
    });

    //goods default selection initialization
    const init = () => {
      data.result = store.state.cartList.map((item) => item.id);
    };

    onMounted(() => {
      init();
    });

    //goods number sycchronization
    const onChange = (value, detail) => {
      store.state.cartList.map((item) => {
        if (item.id === detail.name) {
          item.num = value;
        }
      });
    };

    //select all and unselect all
    const choseAll = () => {
      if (data.result.length !== store.state.cartList.length) {
        init();
      } else {
        data.result = [];
      }
    };

    //update data
    const update = (type) => {
      return store.state.cartList.filter((item) => {
        return type === 2
          ? data.result.includes(item.id)
          : !data.result.includes(item.id);
      });
    };

    //checkout
    const onSubmit = () => {
      if (data.result.length !== 0) {
        store.commit('PAY', update(2));
        router.push({
          path: './createorder',
          query: {
            list: data.result,
          },
        });
      } else {
        Toast.fail('Please select items to checkout');
      }
    };

    //every select trigger
    const groupChange = (result) => {
      if (result.length === store.state.cartList.length) {
        data.checked = true;
      } else {
        data.checked = false;
      }
      data.result = result;
    };

    //price in total
    const allPrice = computed(() => {
      let countList = update(2);
      let sum = 0;
      countList.forEach((item) => {
        sum += item.num * item.price;
      });
      return sum;
    });

    //listen edit click
    emitter.on('edit', () => {
      data.isDelete = !data.isDelete;
    });

    //delete button
    const deleteClick = () => {
      if (data.result.length) {
        //update cart data after delete
        store.commit('DELETE', update(1));

        //select after delete
        data.result = [];

        //cart is empty
        if (store.state.cartList.length === 0) {
          store.commit('EDIT', 'delete');
          props.changeShow();
        }
      } else {
        Toast.fail('Please select');
      }
    };

    return {
      ...toRefs(data),
      store,
      onChange,
      onSubmit,
      choseAll,
      groupChange,
      allPrice,
      deleteClick,
    };
  },
};
</script>
<style lang="less" scoped>
/deep/ .van-button--normal {
  font-size: 10px;
}
/deep/ .van-submit-bar__bar {
  font-size: 8px;
  padding: 5px;
}

.cartDetails {
  font-size: 14px;
  flex: 1;
  position: relative;
  overflow-y: auto;
  padding: 10px 10px 55px;
  .submit-all {
    position: fixed;
    bottom: 20px;
  }

  .buy {
    position: fixed;
    bottom: 20px;
    right: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: #fff;
    border-radius: 5px;
    height: 25px;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;
    .left {
      display: flex;
      align-items: center;
    }
    .delete {
      color: #fff;
      background-color: #ffc400;
      border-radius: 20px;
      font-size: 10px;
      font-weight: 500;
      width: 50px;
      height: 20px;
      text-align: center;
      line-height: 20px;
    }
  }

  .content {
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
  }
}
</style>
<style>
:root {
  --van-checkbox-size: 8px;
  --van-action-bar-icon-size: 13px;
  --van-submit-bar-height: 15px;
  --van-submit-bar-button-width: 55px;
  --van-submit-bar-price-font-size: 8px;
  --van-submit-bar-price-integer-font-size: 8px;
  --van-submit-bar-text-font-size: 10px;
  --van-submit-bar-tip-font-size: 10px;
  --van-submit-bar-tip-icon-size: 6px;
  --van-submit-bar-button-height: 20px;
}
</style>
