<template>
  <div class="detail">
    <detail-nav-bar ref="detailNavBar" @titleItemClick="titleItemClick" />
    <scroll
      class="coutent"
      ref="scroll"
      :probe-type="3"
      @hideBackTop="hideBackTop"
    >
      <detail-swiper ref="base" :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-image-info
        :detail-info="detailInfo"
        @detailImgLoad="detailImgLoad"
      ></detail-image-info>
      <detail-params-info
        ref="params"
        :param-info="itemParams"
      ></detail-params-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="goods" :goods="recommend"></goods-list>
    </scroll>

    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top
      @click.native="backClick"
      class="back_top"
      v-show="showBack"
    ></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childcomponents/DetailNavBar";
import DetailSwiper from "./childcomponents/DetailSwiper";
import DetailBaseInfo from "./childcomponents/DetailBaseInfo";
import DetailShopInfo from "./childcomponents/DetailShopInfo";
import DetailImageInfo from "./childcomponents/DetailImageInfo";
import DetailParamsInfo from "./childcomponents/DetailParamsInfo";
import DetailCommentInfo from "./childcomponents/DetailCommentInfo";
import DetailBottomBar from "./childcomponents/DetailBottomBar";

import GoodsList from "components/content/goods/GoodsList";
import { getDetail, Goods, getRecommend } from "network/detail";
import { itemListenerMixin, backTopMixin } from "common/mixin.js";
import { debounce } from "common/utils.js";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImageInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goodsInfo: {},
      shopInfo: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {},
      recommend: [],
      scrollPositionYs: [],
      getThemeY: null,
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  created() {
    this.getThemeY = debounce(() => {
      this.scrollPositionYs = [];
      this.scrollPositionYs.push(this.$refs.base.$el.offsetTop);
      this.scrollPositionYs.push(this.$refs.params.$el.offsetTop);
      this.scrollPositionYs.push(this.$refs.comment.$el.offsetTop);
      this.scrollPositionYs.push(this.$refs.goods.$el.offsetTop);
      this.scrollPositionYs.push(Number.MAX_VALUE);
    }, 100);
    this.iid = this.$route.query.iid;
    getDetail(this.iid)
      .then((result) => {
        const data = result.result;
        this.topImages = data.itemInfo.topImages;
        this.goodsInfo = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        this.shopInfo = data.shopInfo;
        this.detailInfo = data.detailInfo;
        this.itemParams = data.itemParams;
        if (data.rate.crate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
      })
      .catch((err) => {});
    getRecommend()
      .then((result) => {
        this.recommend = result.data.list;
      })
      .catch((err) => {});
  },
  mounted() {},
  updated() {},
  methods: {
    detailImgLoad() {
      this.refresh();
      this.getThemeY();
    },
    titleItemClick(index) {
      this.$refs.scroll.scrollTo(0, -this.scrollPositionYs[index] + 44, 500);
    },
    //
    hideBackTop(position) {
      this.showBackTop(position);
      let findex = 0;
      findex = this.scrollPositionYs.findIndex((value, index, arr) => {
        return arr[index + 1] >= -position.y;
      });
      this.$refs.detailNavBar.currentIndex = findex;
    },
    addToCart() {
      const product = {};
      product.topImages = this.topImages[0];
      product.title = this.goodsInfo.title;
      product.desc = this.goodsInfo.desc;
      product.price = this.goodsInfo.realPrice;
      product.iid = this.iid;
      //this.$store.commit("addCart",product)
      this.$store
        .dispatch("addCart", product)
        .then((result) => {
         this.$Toast.showToast(result)
        })
        .catch((err) => {});
    },
  },
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
};
</script>

<style scoped>
.detail {
  height: 100vh;
  background-color: #fff;
  position: relative;
  z-index: 1;
}
.coutent {
  height: calc(100% - 102px);
  background-color: #fff;
  overflow: hidden;
}
</style>