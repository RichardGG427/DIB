<template>
  <div class="content_item">
    <div class="left">
      <van-checkbox
        :name="item.id"
        v-if="showCheckbox"
        checked-color="#ffc400"
      />
      <img :src="item.pic" />
      <div class="text">
        <div class="title">{{ item.title }}</div>
        <van-icon
          name="add-o"
          v-if="item.add && showAdd"
          @click="addClick(item.id)"
        />
        <van-stepper
          v-model="item.num"
          v-else
          :min="1"
          :name="item.id"
          @change="onChange"
        />
      </div>
    </div>
    <div class="price">${{ item.price }}/h</div>
  </div>
</template>

<script>
export default {
  props: ['item', 'showAdd', 'addClick', 'onChange', 'showCheckbox'],
};
</script>
<style lang="less" scoped>
.content_item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  .price {
    font-size: 6px;
    font-weight: 300;
  }
  .left {
    display: flex;
    align-items: center;
    flex: 1;
    img {
      margin-left: 1px;
      width: 40px;
      height: 40px;
      margin-right: 2px;
      border-radius: 5px;
    }
    .text {
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      height: 100%;
      position: relative;
      flex: 1;
      .title {
        font-size: 6px;
        margin-right: 2px;
      }
      .van-icon {
        color: red;
        font-size: 10px;
        position: absolute;
        right: 4px;
        bottom: 4px;
      }
      /deep/ .van-stepper__minus,
      /deep/ .van-stepper__plus {
        width: 6px;
        height: 7px;
      }
      /deep/ .van-stepper__input {
        width: 6px;
        height: 7px;
        font-size: 6px;
      }
    }
  }
}
</style>
