import { reqDetail, reqAddOrUpdata } from "@/api/index"
import { getUuid } from '@/utils/uuid_token'
const state = {
    detailData: {},
    uuid_token: getUuid()
};
const mutations = {
    REQDETAILS(state, data) {
        state.detailData = data
    },

};
const actions = {
    //请求商品详细数据
    async reqDetails({ commit }, skuid) {
        let result = await reqDetail(skuid)
        if (result.code == 200) {
            commit("REQDETAILS", result.data)
        }
    },

    //给购物车添加或者更型数据
    async addCartOrUpdataCart({ commit }, { skuid, skuNum }) {
        let result = await reqAddOrUpdata(skuid, skuNum) //async返回一个promise对象 根据1promise的状态，判断成功或者失败
        if (result.code == 200) {
            return "ok"
        } else {
            throw "no"
        }
    }
};
const getters = {
    categoryView(state) {
        return state.detailData.categoryView || {} //当属性计算出来时state可能是个没有拿到的值，所以这个返回值会报错，所以在这里或一个{}是一个undefine,不会报错
    },
    skuInfo(state) {
        return state.detailData.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.detailData.spuSaleAttrList || {}
    }

};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}