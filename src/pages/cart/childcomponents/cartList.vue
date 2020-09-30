<template>
  <div class="cart_list">
    <scroll class="coutent" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        v-show="cartList.length"
        :key="index"
        :item-info="item"
      ></cart-list-item>
     <div v-show="!cartList.length" class="noproduct">购物车中暂无商品</div>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "components/common/scroll/Scroll";
import cartListItem from "./cartListItem";
export default {
  components: {
    Scroll,
    cartListItem,
  },
  data() {
    return {
      // cartList: this.$store.state.cartList,
    };
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    this.$refs.scroll.imgFinish();
  },
};
</script>

<style scoped>
.cart_list {
  height: calc(100% - 44px - 49px - 40px);
}
.coutent {
  height: 100%;
  overflow: hidden;
}
.noproduct{
  text-align: center;
  color: lightgray;
  margin-top: 50%;
}
</style>