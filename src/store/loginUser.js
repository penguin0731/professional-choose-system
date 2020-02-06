export default {
    namespaced: true,
    state: {
        user: null
    },
    getter: {},
    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        // queryLoginUser({ commit }, form) {
        //     api.loginUser.queryLoginUser(form).then(res => {
        //         commit('setUser', res.data[0]);
        //         const user = JSON.stringify(res.data[0]);
        //         Vue.$cookies.set('loginUser', user, 24 * 60 * 60);
        //     })
        // }
    }
}