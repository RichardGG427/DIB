<template>
  <div class="home">
    <div class="content">
      <!-- header -->
      <div class="header">
        <div class="text">Course</div>
        <div class="location">
          <van-icon name="location" />
          <span>Melbourne Centre</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <!-- main content -->
      <div class="main">
        <div class="main_bg">
          <div class="search">
            <input type="text" />
            <div class="search_text">Search</div>
          </div>
          <div class="classify">
            <div class="big_classify">
              <div v-for="(i, index) in homeData.big_classify" :key="index">
                <img :src="i.iconsrc" class="icon" />
                {{ i.name }}
              </div>
            </div>
            <div class="small_classify">
              <div v-for="(i, index) in homeData.small_classify" :key="index">
                <img :src="i.iconsrc" class="icon" />
                {{ i.name }}
              </div>
            </div>
          </div>
        </div>
        <van-tabs class="van_tabs" color="#ffc400">
          <van-tab
            v-for="(i, index) in homeData.content_nav_list"
            :title="i.tab"
          >
            <Store :store_list="i.data" />
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Footer from '../../components/Footer.vue';
import { onMounted, reactive, toRefs } from 'vue';
import Store from './components/Store.vue';
import { getHomeData } from '../../request/api';

// import { makeRequiredProp } from 'vant/lib/utils';
export default {
  components: {
    Footer,
    Store,

  },
  setup() {
    let data = reactive({
      homeData: {},
    });

    // data request
    const getHome = async () => {
      const res = await getHomeData();
      if (res.status === 200 && res.data.code === 0) {
        data.homeData = res.data.data;
      }
    };

    onMounted(() => {
      getHome();
    });

    return {
      ...toRefs(data),
    };
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-tabs__wrap {
  border-radius: 5px;
  width: 100%;
}
/deep/ .van-tab__text--ellipsis {
  font-size: 7px;
}

.van_tabs {
  width: 140px;
  margin-left: -10px;
}
.home {
  display: flex;
  flex-flow: column;
  height: 100%;
  font-size: 6px;
  .content {
    flex: 1;
    overflow-y: auto;

    .main {
      margin-top: -30px;
      .van_tabs {
        padding: 0 20px 10px;
      }
      .main_bg {
        background-image: linear-gradient(#fff, #f5f5f5);
        padding: 5px 10px 0 5px;
        border-radius: 10px 10px 0 0;
        position: relative;
        .classify {
          padding: 20px 0;
          .small_classify {
            display: flex;
            flex-wrap: wrap;
            margin-top: 10px;
            div {
              display: flex;
              justify-content: center;
              flex-flow: column;
              align-items: center;
              width: 20%;
            }

            .icon {
              width: 15px;
              height: 15px;
              margin: 5px;
            }
          }
          .big_classify {
            display: flex;
            div {
              flex: 1;
              display: flex;
              justify-content: center;
              flex-flow: column;
              align-items: center;
              .icon {
                width: 20px;
                height: 20px;
                margin-bottom: 5px;
              }
            }
          }
        }
        .search {
          position: relative;
          .search_text {
            position: absolute;
            background-color: #ffc400;
            right: -6px;
            top: 0px;
            width: 50px;
            height: 17px;
            border-radius: 10px;
            text-align: center;
            line-height: 16px;
            font-size: 10px;
          }
          input {
            width: 100%;
            border: 1px solid #ffc400;
            border-radius: 10px;
            height: 15px;
          }
        }
      }
    }
    .header {
      background-image: linear-gradient(#ffc400, #fff);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 10px 40px 10px;
      .text {
        font-size: 10px;
        font-weight: 600;
      }
      .location {
        span {
          margin: 0 5px;
        }
        font-size: 7px;
      }
    }
  }
}
</style>
