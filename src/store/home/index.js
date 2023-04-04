import { reqBanner, reqCategoryList, reqFloor } from "@/api";

const state = {
    categoryList: [],
    bannerList: [],
    floorList: []
};
const mutations = {
    CATEGORYLIST(state, data) {
        state.categoryList = data
    },
    REQBANNER(state, data) {
        state.bannerList = data
    },
    REQFLOOR(state, data) {
        state.floorList = data
    }
};
const actions = {
    async categoryList({ commit }) {
        // console.log("adklj")
        let result = await reqCategoryList()
        if (result.code == 200)
            commit("CATEGORYLIST", result.data)

    },
    async banner({ commit }) {
        let result = await reqBanner()
        if (result.code == 200) {
            commit("REQBANNER", result.data)
                // console.log(result.data)
        }
    },
    async reqFloor({ commit }) {
        let result = await reqFloor();
        if (result.code == 200) {
            commit('REQFLOOR', result.data)
        }
    }
};
const getters = {};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}