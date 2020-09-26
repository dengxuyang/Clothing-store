<template>
  <div class="detail_swiper">
    <swiper>
      <swiper-item
        class="swiper_item"
        v-for="(item, index) in topImages"
        :key="index"
      >
        <img :src="item" />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      defualt() {
        return [];
      },
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.swiper_item {
  height: 300px;
}
</style>