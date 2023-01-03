<template>
  <Header title="Address Manage" />
  <van-address-list
    :list="list"
    default-tag-text="Default"
    @add="onAdd"
    @edit="onEdit"
  />
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue';
import Header from '../../components/Header.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
  components: { Header },
  setup() {
    const store = useStore();
    const router = useRouter();
    let data = reactive({
      list: [],
    });

    //data initialization
    const init = () => {
      data.list = store.state.userAddress.map((item) => {
        return {
          id: item.id,
          name: item.name,
          tel: item.tel,
          address: `${item.addressDetail}${item.county}${item.city}${item.province}`,
          isDefault: !!item.isDefault,
        };
      });
    };

    onMounted(() => {
      init();
    });

    // add address button
    const onAdd = () => {
      router.push({
        path: './addressedit',
        query: {
          type: 'add',
        },
      });
    };
    // edit address button
    const onEdit = (item) => {
      router.push({
        path: './addressedit',
        query: {
          id: item.id,
          type: 'change',
        },
      });
    };

    return {
      ...toRefs(data),
      onAdd,
      onEdit,
    };
  },
};
</script>
<style lang="less" scoped>
/deep/ .van-button {
  font-size: 10px;
  height: 20px;
  background-color: #ffc400;
  border-color: #ffc400;
}
/deep/ .van-button--danger {
  background-color: #ffc400;
  border-color: #ffc400;
}
/deep/ .van-switch--on {
  background-color: #ffc400;
}
/deep/ .van-radio__icon {
  display: none;
}
/deep/ .van-address-item__name {
  font-size: 10px;
}
/deep/ .van-address-item__name {
  padding: 0px;
}
/deep/ .van-address-item__value {
  padding-right: 5px;
}
/deep/ .van-address-item {
  padding: 2px;
}
/deep/ .van-tag--danger {
  background-color: #ffc400;
  width: 31px;
  height: 12px;
  font-size: 10px;
}
</style>
<style>
:root {
  --van-address-list-item-font-size: 8px;
  --van-address-list-edit-icon-size: 10px;
}
</style>
