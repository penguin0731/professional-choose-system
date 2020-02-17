import api from '@/api';
import { Message } from 'element-ui';
export default {
    namespaced: true,
    state: {
        currentPage: 1,
        pageSize: 10,
        count: 0,
        messageList: null,
        showMesList: null
    },
    getter: {},
    mutations: {
        setPage(state, page) {
            state.page = page;
        },
        setPageSize(state, pageSize) {
            state.pageSize = pageSize;
        },
        setCount(state, count) {
            state.count = count;
        },
        setMessageList(state, data) {
            const newData = data.map(item => {
                return {
                    ...item,
                    release_time: new Date(item.release_time).format('yyyy-MM-dd hh:mm:ss')
                }
            })
            state.messageList = newData;
        },
        setShowMesList(state, data) {
            const newData = data.map(item => {
                return {
                    ...item,
                    time: `【${new Date(item.release_time).format('yyyy-MM-dd')}】`
                }
            })
            state.showMesList = newData;
        }
    },
    actions: {
        async findByPage({ commit }, obj) {
            const result = await api.message.findByPage(obj);
            commit('setCount', result.count);
            commit('setMessageList', result.data);
        },
        async findShowMes({ commit }, obj) {
            const result = await api.message.findShowMes(obj);
            commit('setShowMesList', result.data);
        },
        async addMessage({ state, dispatch }, addForm) {
            const result = await api.message.addMessage(addForm);
            dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
            return result;
        },
        async searchMessages({ commit }, value) {
            const result = await api.message.searchMessages({ name: value })
            commit('setCount', res.data.count);
            commit('setMessageList', result.data);
        },
        async updateMessage({ state, dispatch }, editForm) {
            const result = await api.message.updateMessage(editForm)
            dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
            dispatch('findShowMes', { page: 1, pageSize: 4 });
            return result;
        }
    }
}