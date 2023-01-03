<template>
  <div class="footer">
    <div class="item">
      <router-link to="/home" class="nav_item" active-class="nav_color"
        ><van-icon name="wap-home-o" size="30" />Home</router-link
      >
    </div>
    <div class="item">
      <router-link to="/cart" class="nav_item" active-class="nav_color"
        ><van-icon name="cart-o" size="30" />Cart</router-link
      >
    </div>
    <div class="item">
      <router-link to="/order" class="nav_item" active-class="nav_color"
        ><van-icon name="bill-o" size="30" />Order</router-link
      >
    </div>
    <div class="item">
      <router-link to="/mine" class="nav_item" active-class="nav_color"
        ><van-icon name="user-o" size="30" />My DIB</router-link
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="less" scoped>
.footer {
  display: flex;
  font-size: 7px;
  background-color: #fff;
  border-top: 0.5px solid #eee;
  .item {
    flex: 1;
    display: flex;
    justify-content: center;
    .nav_color {
      color: #ffc400;
    }

    .nav_item {
      display: flex;
      flex-flow: column;
      align-items: center;
    }
  }
}
</style>
