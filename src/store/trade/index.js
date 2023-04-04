import { findUserAddressList, tradeList } from "@/api/index"
const state = {
    userAddress: [],
    tradeList: {}
};
const mutations = {
    FINDUSERADDRESS(state, data) {
        state.userAddress = data
    },
    TRADELIST(state, data) {
        state.tradeList = data

    }
};
const actions = {
    async findUserAddressList({ commit }) {
        let res = await findUserAddressList()
        if (res.code == 200) {

            commit("FINDUSERADDRESS", res.data)
        } else {
            console.log(res.code)
        }
    },
    async tradeList({ commit }) {

        let res = await tradeList()
        if (res.code == 200) {
            commit("TRADELIST", res.data)
        } else {
            console.log(res.code)
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