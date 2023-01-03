<template>
  <div class="me">
    <Header title="Mine" />
    <div class="content">
      <div class="user-info">
        <div class="info">
          <img src="../../assets/mine.png" />
          <div class="user-desc">
            <span>Name：{{ name }}</span>
            <span class="name">What's Up：{{ describe }}</span>
          </div>
        </div>
      </div>
      <ul class="user-list">
        <li class="van-hairline--bottom" @click="togo('./order')">
          <span>My Order</span>
          <van-icon name="arrow" />
        </li>
        <li class="van-hairline--bottom" @click="togo('./address')">
          <span>Address Manage</span>
          <van-icon name="arrow" />
        </li>
        <li class="van-hairline--bottom" @click="togo('./userinfoedit')">
          <span>Account Manage</span>
          <van-icon name="arrow" />
        </li>
      </ul>
    </div>
    <Footer />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import Footer from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import { useRouter } from 'vue-router';
export default {
  components: {
    Footer,
    Header,
  },
  setup() {
    const router = useRouter();
    let userInfo = reactive({
      name: 'Richard',
      describe: 'Seek Light',
    });

    //路由跳转
    const togo = (path) => {
      router.push(path);
    };
    return {
      togo,
      ...toRefs(userInfo),
    };
  },
};
</script>

<style lang="less" scoped>
.me {
  height: 100%;
  display: flex;
  flex-flow: column;
  .content {
    flex: 1;
    overflow-y: auto;
    .user-info {
      width: 94%;
      margin: 5px;
      height: 80px;
      background: linear-gradient(90deg, #ffc400, #c7c351);
      box-shadow: 0 2px 5px #ffc400;
      border-radius: 6px;
      .info {
        position: relative;
        display: flex;
        width: 100%;
        height: 100%;
        padding: 15px 10px;
        box-sizing: border-box;
        img {
          border-radius: 50%;
          margin-top: 4px;
          width: 30px;
          height: 35px;
        }
        .user-desc {
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          line-height: 20px;
          font-size: 5px;
          color: #fff;
          justify-content: space-between;
          span {
            color: #fff;
            font-size: 8px;
            padding: 2px 0;
          }
        }
        .account-setting {
          position: absolute;
          top: 50px;
          right: 10px;
          font-size: 7px;
          color: #fff;
          .van-icon-setting-o {
            font-size: 8px;
            vertical-align: -3px;
            margin-right: 4px;
          }
        }
      }
    }
    .user-list {
      padding: 0 10px;
      margin-top: 20px;
      background-color: #fff;
      li {
        height: 20px;
        line-height: 20px;
        display: flex;
        justify-content: space-between;
        font-size: 7px;
        .van-icon-arrow {
          margin-top: 6px;
        }
      }
    }
  }
}
</style>
