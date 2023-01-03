<template>
  <div class="login">
    <Header title="Login" />
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
          Login
        </van-button>
        <van-button
          round
          block
          type="info"
          color="#ffc400"
          class="register"
          @click="toRegister"
        >
          Create an account
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import Header from '../../components/Header.vue';
import { useRouter } from 'vue-router';
import { Toast } from 'vant';

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
    // submit button
    const onSubmit = (value) => {
      if (!localStorage.userInfo) {
        Toast('This account does not exist');
        return;
      } else {
        let userInfo = JSON.parse(localStorage.userInfo);
        if (userInfo['username'] === value['username']) {
          if (userInfo['password'] === value['password']) {
            Toast('Login success!');
            localStorage.setItem('isLogin', '1');
            router.push('./home');
          } else {
            Toast('Password incorrect');
          }
        } else {
          Toast("That's not a match");
        }
      }
    };

    //go to register
    const toRegister = () => {
      router.push('./register');
    };

    return {
      ...toRefs(data),
      onSubmit,
      toRegister,
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

.login {
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
<style>
:root {
  --van-toast-font-size: 10px;
}
</style>
