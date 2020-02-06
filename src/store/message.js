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
        findByPage({ commit }, obj) {
            api.message.findByPage(obj).then(res => {
                commit('setCount', res.data.count);
                commit('setMessageList', res.data.data);
            });
        },
        findShowMes({ commit }, obj) {
            api.message.findShowMes(obj).then(res => {
                commit('setShowMesList', res.data.data);
            })
        },
        addMessage({ state, dispatch }, addForm) {
            console.log(addForm);
            api.message.addMessage(addForm).then(res => {
                Message({
                    message: res.data.msg,
                    type: "success",
                    duration: 2000,
                    center: true
                });
                dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
            });
        },
        searchMessages({ commit }, value) {
            api.message.searchMessages({ name: value }).then(res => {
                commit('setCount', res.data.count);
                commit('setMessageList', res.data.data);
            })
        },
        updateMessage({ state, dispatch }, editForm) {
            api.message.updateMessage(editForm).then(res => {
                Message({
                    message: res.data.msg,
                    type: "success",
                    duration: 2000,
                    center: true
                });
                dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
                dispatch('findShowMes', { page: 1, pageSize: 4 });
            })
        }
    }
}