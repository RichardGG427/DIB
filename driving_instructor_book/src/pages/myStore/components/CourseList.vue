<template>
  <div class="course_list" v-if="index === 0">
    <van-tree-select
      height="88vw"
      :items="items"
      :main-active-index.sync="active"
      @click-nav="navClick"
    >
      <template #content>
        <div v-for="(i, index) in subItem" class="item_bg">
          <CourseAdd
            :item="i"
            :showAdd="true"
            :addClick="addClick"
            :onChange="onChange"
          />
        </div>
      </template>
    </van-tree-select>
  </div>
  <div v-else>{{ courseData.content }}</div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import CourseAdd from '../../../components/CourseAdd.vue';

export default {
  props: ['index', 'courseData'],
  components: {
    CourseAdd,
  },
  setup(props) {
    let data = reactive({
      active: 0,
      items: [],
      subItem: [],
    });

    //data initialization
    const init = () => {
      let newList = [];
      props.courseData?.items?.map((i, index) => {
        newList.push({ text: i.text });
        if (data.active === index) {
          data.subItem = i.children;
        }
      });
      data.items = newList;
    };
    init();

    //click left nav menu
    const navClick = (i) => {
      data.active = i;
      init();
    };

    //switch stepper
    const addClick = (i) => {
      data.subItem.forEach((item) => {
        if (item.id === i) {
          item.add = false;
          item.num += 1;
        }
      });
    };

    //stepper add active event
    const onChange = (value, detail) => {
      data.subItem.forEach((item) => {
        if (item.id === detail.name) {
          item.num = value;
        }
      });
    };

    return {
      ...toRefs(data),
      navClick,
      addClick,
      onChange,
    };
  },
};
</script>
<style lang="less" scoped>
.course_list {
  margin-top: 20px;
  .item_bg {
    padding: 10px;
  }
}

/deep/ .van-sidebar-item__text {
  font-size: 7px;
}
/deep/ .van-tree-select__item--active {
  color: #ffc400;
}
/deep/ .van-sidebar-item--select::before {
  background-color: #ffc400;
}
</style>
