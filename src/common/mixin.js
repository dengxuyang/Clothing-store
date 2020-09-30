/*混入两个组件都需要的代码*/
import { debounce } from "common/utils.js";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backtop/BackTop";
export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            refresh: null
        }
    },
    mounted() {
        this.refresh = debounce(this.$refs.scroll.imgFinish, 50);
        this.itemImgListener = () => {
            this.refresh();
        }
        this.$nextTick(() => {
            //接收事件总线
            this.$bus.$on("itemImgLoad", this.itemImgListener);
        });
    },
}
export const backTopMixin = {
    components: {
        Scroll,
        BackTop
    },
    data() {
        return {
            showBack: false,
            tabOffsetTop: 0,
            isTabFixed: false,
        }
    },

    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 1000);
        },
        showBackTop(position) {
             //console.log(position);
            this.showBack = -position.y > 1000;
            this.isTabFixed = -position.y > this.tabOffsetTop;
        },
        swiperImgLoad() {
            this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
          },
    },
}