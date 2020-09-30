<template>
  <div class="cart_bottom_bar">
    <div class="check_content">
      <check-button
        class="check_button"
        @click.native="checkClick"
        :isCheck="seleceAll"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="totalprice">合计：￥{{ totalPrice }}</div>
    <div class="calculate" @click="calcCount">去计算({{ count }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkbutton/CheckButton";
export default {
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preV, item) => {
          return preV + item.price * item.count;
        }, 0);
    },
    count() {
      return this.$store.state.cartList.filter((item) => {
        return item.checked;
      }).length;
    },
    seleceAll() {
      //   return !(this.$store.state.cartList.filter((item) => {
      //     return !item.checked;
      //   }).length);
      if (!this.$store.state.cartList.length) {
        return false;
      }
      return !this.$store.state.cartList.find((item) => !item.checked);
    },
  },
  methods: {
    checkClick() {
      if (this.seleceAll) {
        this.$store.state.cartList.forEach((item) => {
          item.checked = false;
        });
      } else {
        this.$store.state.cartList.forEach((item) => {
          item.checked = true;
        });
      }
    },
    calcCount(){
      if(!this.seleceAll){
        this.$Toast.showToast("请选择商品",1000)
      }
    }
  },
};
</script>

<style scoped>
.cart_bottom_bar {
  background-color: #eee;
  height: 40px;
  display: flex;
  line-height: 40px;
}
.check_button {
  line-height: 20px;
}
.check_content {
  display: flex;
  align-items: center;
  width: 60px;
}
.totalprice {
  flex: 1;
}
.calculate {
  text-align: center;
  background-color: var(--color-tint);
  width: 90px;
  color: #fff;
}
</style>