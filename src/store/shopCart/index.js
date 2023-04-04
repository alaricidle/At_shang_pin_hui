import { reqShopCart, deleteCart, checkCart } from "@/api/index"
import { getUuid } from "@/utils/uuid_token"
const state = {
    shopCartData: [],

};
const mutations = {
    SHOPCART(state, data) {
        state.shopCartData = data
    }
};
const actions = {
    //请求购物车数据
    async shopCarts({ commit }) {
        let res = await reqShopCart()
        if (res.code == 200) {
            commit("SHOPCART", res.data)

        }
    },
    // 删除商品接口
    async deleteCar({ commit }, id) {
        let res = await deleteCart(id)
        if (res.code == 200) {
            return "ok"
        } else {
            return Promise.reject("no")
        }
    },
    // 改变商品勾选状态
    async checkCarts({ commit }, { skuId, isChecked }) {
        let res = await checkCart(skuId, isChecked)
        if (res.code == 200) {
            return "ok"
        } else {
            return Promise.reject("no")
        }
    },
    //删除选中的商品
    async delAllCheckCart({ dispatch, getters }) {
        let promises = [],
            promise
        getters.cartList.forEach((value, index, array) => {
            value.isChecked == 1 ? dispatch("deleteCar", value.skuId) : ""
            promises.push(promise)

        })
        return Promise.all(promises)
    },
    //选中所有的商品
    async AllCheckCart({ dispatch, getters }, isChecked) {
        let promiseAll = [],
            promise
        getters.cartList.forEach((value, index, array) => {
            console.log(value.skuId, isChecked)
            dispatch("checkCarts", { skuId: value.skuId, isChecked })
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    },

};
const getters = {
    cartList(state) {
        if (state.shopCartData[0]) {
            return state.shopCartData[0].cartInfoList
        }
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}