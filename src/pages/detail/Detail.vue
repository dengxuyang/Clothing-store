<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages="topImages"></detail-swiper>
  </div>
</template>

<script>
import DetailNavBar from "./childcomponents/DetailNavBar";
import DetailSwiper from "./childcomponents/DetailSwiper";
import { getDetail } from "network/detail";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
  },
  data() {
    return {
      iid: null,
      topImages: [],
    };
  },
  created() {
    this.iid = this.$route.query.iid;
    getDetail(this.iid)
      .then((result) => {
        this.topImages = result.result.itemInfo.topImages;
        //console.log(this.topImages);
      })
      .catch((err) => {});
  },
};
</script>

<style scoped>
</style>