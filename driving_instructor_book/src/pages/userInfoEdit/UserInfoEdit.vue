<template>
  <div class="userEdit">
    <Header title="Userinfo Edit" />
    <div class="input-item">
      <van-field v-model="nickName" label="Username" placeholder="Username" />
      <van-field v-model="introduceSign" label="Intro" placeholder="Intro" />
      <van-field v-model="password" label="Password" placeholder="Password" />
    </div>
    <van-button
      type="primary"
      round
      color="#ffc400"
      class="save-btn"
      block
      @click="save"
    >
      Save
    </van-button>
    <van-button
      type="primary"
      round
      color="#ffc400"
      class="save-btn"
      block
      @click="logout"
      >Logout</van-button
    >
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import Header from '../../components/Header.vue';
import { Toast } from 'vant';
import { useRouter } from 'vue-router';
export default {
  components: { Header },
  setup() {
    const router = useRouter();
    let data = reactive({
      nickName: '',
      password: '',
      introduceSign: 'Seek Light',
    });
    const logout = () => {
      localStorage.removeItem('isLogin');
      Toast('Logout Success!');
      router.push('/login');
    };
    // save button
    const save = () => {
      if (data.nickName && data.password) {
        const userInfo = JSON.parse(localStorage.userInfo);
        const newUserInfo = {
          username: data.nickName || userInfo['username'],
          password: data.password || userInfo['password'],
        };
        localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
        Toast('Edit success!');
        router.push('/mine');
      } else {
        Toast('Please Edit');
      }
    };

    return {
      ...toRefs(data),
      save,
      logout,
    };
  },
};
</script>
<style lang="less" scoped>
/deep/ .van-button--danger {
  background-color: #ffc400;
  border-color: #ffc400;
}
/deep/ .van-cell {
  height: 40px;
}
/deep/ .van-field__label {
  font-size: 10px;
}
/deep/ .van-field__control {
  font-size: 10px;
}
/deep/ .van-button {
  height: 20px;
}
.save-btn {
  width: 80%;
  margin: 10px auto;
}
</style>
