import { reqSearch } from "@/api";

const state = {
    searchList: {}

};
const mutations = {
    REQSEARCH(state, data) {
        state.searchList = data
    }
};
const actions = {
    async reqSearchs({ commit }, params = {}) {

        let result = await reqSearch(params);
        if (result.code == 200) {
            commit('REQSEARCH', result.data)
               
        }
    }
};
const getters = {
    goodsList(state) {
        return state.searchList.goodsList || [];
    },
    tradeMarkList(state) {
        return state.searchList.trademarkList || [];
    },
    attrsList(state) {
        return state.searchList.attrsList || [];
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}