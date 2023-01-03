<template>
  <div class="header">
    <van-icon name="arrow-left" class="icon" @click="toBack" />
    <div>{{ title }}</div>
    <div class="edit" v-if="edit" @click="editClick">
      {{ store.state.edit ? 'Edit' : 'Complete' }}
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { useRouter } from 'vue-router';
import emitter from '../common/js/eventbus.js';
import store from '../store';

export default {
  props: ['title', 'edit'],
  setup() {
    const router = useRouter();
    const toBack = () => {
      router.back();
    };

    //edit button
    const editClick = () => {
      if (store.state.cartList.length) {
        store.commit('EDIT');
        emitter.emit('edit');
      } else {
        Toast.fail('Cart is empty');
      }
    };
    return {
      toBack,
      editClick,
      store,
    };
  },
};
</script>
<style lang="less" scoped>
.header {
  background-color: #fff;
  height: 20px;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #d7d7d7;
  .edit {
    font-size: 8px;
    position: absolute;
    right: 15px;
    font-weight: normal;
  }
  .icon {
    position: absolute;
    left: 5px;
  }
}
</style>
