<template>
  <div class="cart">
    <nav-bar class="cart_nav">
      <div slot="center">购物车({{ reduceCount }})</div>
    </nav-bar>
    <cart-list ></cart-list>
   
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childcomponents/cartList";
import cartBottomBar from "./childcomponents/cartBottomBar";
import { mapGetters } from "vuex";
export default {
  components: {
    NavBar,
    CartList,
    cartBottomBar,
  },
  computed: {
    ...mapGetters(["reduceCount"]),
  },
};
</script>

<style scoped>
.cart_nav {
  background-color: var(--color-tint);
  color: #ffff;
}
.cart {
  height: 100vh;
}
</style>