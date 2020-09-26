<template>
  <div id="home">
    <nav-bar class="home_nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      @tabClick="tabClick"
      :titles="titles"
      ref="tabcontrol1"
      v-show="isTabFixed"
      class="topTab"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @hideBackTop="hideBackTop"
      @pullingUp="pullingUp"
    >
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        @tabClick="tabClick"
        :titles="titles"
        ref="tabcontrol2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top
      @click.native="backClick"
      class="back_top"
      v-show="showBack"
    ></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import HomeSwiper from "./childcomponents/HomeSwiper";
import RecommendView from "./childcomponents/RecommendView";
import FeatureView from "./childcomponents/FeatureView";

import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backtop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";

import { debounce } from "common/utils.js";
export default {
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精品"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      showBack: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.imgFinish, 50);
    this.$nextTick(() => {
      //接收事件总线
      this.$bus.$on("itemImgLoad", () => {
        refresh();
      });
    });
  },
  activated() {
    this.$refs.scroll.imgFinish();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },
  methods: {
    //获取商品轮播图等信息
    getHomeMultidata() {
      getHomeMultidata()
        .then((res) => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
        .catch((err) => {});
    },
    //获取商品信息
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page)
        .then((res) => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          // if (this.goods[type].page > 1) {
          //   this.$refs.scroll.imgFinish();
          // }
        })
        .catch((err) => {});
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabcontrol1.active = index;
      this.$refs.tabcontrol2.active = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },
    hideBackTop(position) {
      // console.log(position);
      this.showBack = -position.y > 1000;
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    pullingUp() {
      this.getHomeGoods(this.currentType);
    },
    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  /* position: relative; */
}
.home_nav {
  background-color: var(--color-tint);
  color: #ffff;
}

.content {
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.topTab {
  position: relative;
  z-index: 10;
}
/* .content {
  height: calc(100% - 49px);
  overflow: hidden;
} */
</style>