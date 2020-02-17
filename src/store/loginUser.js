import api from '@/api';
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
        async queryUserByLoginId({}, form) {
            const result = await api.loginUser.queryUserByLoginId(form);
            return result;
        },
        async queryUserMsg({commit}, form) {
            const result = await api.loginUser.queryUserMsg(form);
            commit('setUser', result[0]);
        },
        async changePwd({}, form) {
            const result = await api.loginUser.changePwd(form);
            return result;
        }
    }
}