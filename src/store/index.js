import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        cartList: []
    },
    mutations: {
        addCounter(state, payload) {
            payload.count += 1;
        },
        addToCart(state, payload) {

            state.cartList.push(payload);
        }
    },
    actions: {
        //context 上下文
        addCart(context, payload) {
            return new Promise((resolve, reject) => {
                let oldProduct = context.state.cartList.find(item => item.iid == payload.iid)
                if (oldProduct) {
                    context.commit('addCounter', oldProduct)
                    resolve("商品+1")
                } else {
                    payload.count = 1;
                    payload.checked = true;
                    context.commit('addToCart', payload)
                    resolve('添加商品成功')
                }
            })

        }
    },
    getters: {
        reduceCount(state) {
            return state.cartList.length
        },
        cartList(state) {
            return state.cartList
        }
    }
})

export default store