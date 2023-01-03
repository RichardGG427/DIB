<template>
  <Header :title="address" />
  <van-address-edit
    :area-list="areaList"
    :address-info="addressInfo"
    show-delete
    show-set-default
    :area-columns-placeholder="['Select', 'Select', 'Select']"
    @save="onSave"
    @delete="onDelete"
    :tel-validator="validator"
  />
</template>

<script>
import { reactive, toRefs, onMounted, computed } from 'vue';
import Header from '../../components/Header.vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Toast } from 'vant';
export default {
  components: { Header },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    let data = reactive({
      areaList: {
        province_list: {
          110000: ' VIC ',
          120000: ' NSW ',
          130000: ' SA ',
          140000: ' QLD ',
          140000: ' TAS ',
          140000: ' WA ',
        },
        city_list: {
          110100: ' Melbourne ',
          110200: ' Wyndham ',
          120100: ' Sydney ',
          120200: ' Dubbo ',
        },
        county_list: {
          110101: ' Centre ',
          110102: ' South Yarra ',
          120102: ' Hawkesbury ',
          130102: ' Frankston ',
        },
      },
      addressInfo: {},
    });

    const address = computed(() => {
      return route.query.type === 'add' ? 'Add new address' : 'Address Edit';
    });

    //data initialization
    const init = () => {
      store.state.userAddress.forEach((item) => {
        if (item.id === Number(route.query.id)) {
          data.addressInfo = item;
        }
      });
    };
    onMounted(() => {
      init();
    });
    // save button
    const onSave = (content) => {
      if (route.query.type === 'add') {
        store.commit('ADDADDRESS', content);
      } else {
        store.commit('CHANGEADDRESS', content);
      }
      Toast('Save Success');
      setTimeout(() => {
        router.back();
      }, 1000);
    };

    // delete button
    const onDelete = (content) => {
      store.commit('DELETEADDRESS', content);
      Toast('Delete Success');
      setTimeout(() => {
        router.back();
      }, 1000);
    };

    //validator test
    const validator = (e) => {
      //   console.log(e);
      //   let myreg1 = /^[1][3,4,5,7,8][0-9]{9}$/;
      //   let myreg2 = /^[2][3,4,5,7,8][0-9]{6}$/;
      //   if (!myreg1.test(e) && !myreg2.test(e)) {
      //     console.log('wrong number');
      //     return false;
      //   } else {
      //     console.log('correct number');
      //     return true;
      //   }
      return true;
    };

    return {
      ...toRefs(data),
      onSave,
      onDelete,
      address,
      validator,
    };
  },
};
</script>
<style>
:root {
  --van-address-edit-button-font-size: 12px;
  --van-address-edit-button-margin-bottom: 3px;
  --van-cell-line-height: 10px;
  --van-cell-icon-size: 10px;
  --van-picker-option-font-size: 8px;
}
</style>
<style lang="less" scoped>
/deep/ .van-button--danger {
  background-color: #ffc400;
  border-color: #ffc400;
}
/deep/ .van-button {
  height: 20px;
}
/deep/ .van-switch--on {
  background-color: #ffc400;
}
/deep/ .van-cell {
  font-size: 10px;
  line-height: 10px;
  height: 40px;
}

/deep/ .van-field__control {
  font-size: 7px;
}
/deep/ .van-field__error-message {
  font-size: 5px;
}
</style>
