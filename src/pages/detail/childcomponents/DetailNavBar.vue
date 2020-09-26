<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="$router.back()">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="index"
          class="title_item"
          @click="titleItemClick(index)"
          :class="{ actived: index === currentIndex }"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleItemClick(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
  text-align: center;
}
.title_item {
  flex: 1;
}
.actived {
  color: var(--color-high-text);
}
.back img {
  margin-top: 10px;
}
</style>