<template>
  <div class="item" @click="toStore(item)">
    <img :src="item.pic" alt="Course" />
    <div class="item_right">
      <div class="title">{{ item.title }}</div>
      <div class="sales">Sales: {{ item.sales }}</div>
      <div class="price">From {{ item.price }} pick-up free</div>
      <div class="label">
        <div v-for="(i, index) in item.label">{{ i }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
// import router from '../../../router';

export default {
  props: ['item'],
  setup() {
    const router = useRouter();
    const toStore = (item) => {
      router.push({ path: './store', query: { title: item.title } });
    };
    return {
      toStore,
    };
  },
};
</script>
<style lang="less" scoped>
.item:not(:first-child) {
  margin-top: 5px;
}
.item {
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  padding: 5px;

  img {
    width: 45px;
    height: 45px;
    border-radius: 5px;
    margin-right: 5px;
  }

  .item_right {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    .title {
      font-size: 7px;
    }
    .label {
      display: flex;
      div {
        background-color: #ffc40047;
        padding: 2px 5px;
        border-radius: 3px;
      }
      div:not(:first-child) {
        margin-left: 5px;
      }
    }
  }
}
</style>
