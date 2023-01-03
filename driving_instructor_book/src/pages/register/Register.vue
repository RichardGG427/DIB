<template>
  <div class="register">
    <Header title="Register" />
    <div class="img">DIB</div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="Username"
        placeholder="Username"
        :rules="[{ required: true, message: 'Please type in username' }]"
        autocomplete
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="Password"
        placeholder="Password"
        :rules="[{ required: true, message: 'Please type in password' }]"
        autocomplete
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          color="#ffc400"
        >
          Register
        </van-button>
        <van-button
          round
          block
          type="info"
          color="#ffc400"
          class="register"
          @click="toLogin"
        >
          Login
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Header from '../../components/Header.vue';
import { reactive, toRefs } from 'vue';
import { Toast } from 'vant';
import { useRouter } from 'vue-router';

export default {
  components: {
    Header,
  },
  setup() {
    const router = useRouter();
    let data = reactive({
      username: '',
      password: '',
    });

    // register button
    const register = (value) => {
      Toast('Register Success!');
      localStorage.setItem('userInfo', JSON.stringify(value));
      router.push('./login');
    };

    // submit button
    const onSubmit = (value) => {
      if (localStorage.userInfo) {
        let userInfo = JSON.parse(localStorage.userInfo);
        if (userInfo['username'] === value['username']) {
          Toast('This account already exists');
          return;
        } else {
          register(value);
        }
      } else {
        register(value);
      }
    };

    //go to login
    const toLogin = () => {
      router.push('./login');
    };

    return {
      ...toRefs(data),
      onSubmit,
      toLogin,
    };
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-cell {
  font-size: 10px;
  line-height: 10px;
}
/deep/ .van-button {
  width: 147px;
  height: 25px;
}
.register {
  .img {
    width: 100px;
    height: 100px;
    background-color: #ffc400;
    font-size: 45px;
    line-height: 100px;
    text-align: center;
    border-radius: 20px;
    margin: 20px auto;
  }
  .register {
    margin-top: 5px;
  }
}
</style>
