<template>
  <div class="cart">
    <Header title="Cart" :edit="true" />
    <CartDetails v-if="isShow" :changeShow="changeShow" />
    <Blank v-else />
    <Footer />
  </div>
</template>

<script>
import Footer from '../../components/Footer.vue';
import Blank from '../../components/Blank.vue';
import Header from '../../components/Header.vue';
import CartDetails from './components/CartDetails.vue';
import { onMounted, ref } from 'vue';
import store from '../../store';
import { useStore } from 'vuex';
export default {
  components: {
    Footer,
    Blank,
    Header,
    CartDetails,
  },
  setup() {
    const store = useStore();
    let isShow = ref(true);
    const init = () => {
      if (store.state.cartList.length === 0) {
        isShow.value = false;
      }
    };

    const changeShow = () => {
      isShow.value = false;
    };

    onMounted(() => {
      init();
    });

    return {
      isShow,
      changeShow,
    };
  },
};
</script>
<style lang="less" scoped>
.cart {
  display: flex;
  flex-flow: column;
  height: 100%;
  .content {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
