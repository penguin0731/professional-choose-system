import api from '@/api';
import { Message } from 'element-ui';
export default {
    namespaced: true,
    state: {
        multipleSelection: [],
        currentPage: 1,
        pageSize: 10,
        count: 0,
        majorList: null
    },
    getter: {},
    mutations: {
        setSelection(state, val) {
            state.multipleSelection = val;
        },
        setPage(state, page) {
            state.page = page;
        },
        setPageSize(state, pageSize) {
            state.pageSize = pageSize;
        },
        setCount(state, count) {
            state.count = count;
        },
        setMajorList(state, data) {
            state.majorList = data;
        }
    },
    actions: {
        findByPage({ commit }, obj) {
            api.major.findByPage(obj).then(res => {
                commit('setCount', res.data.count);
                commit('setMajorList', res.data.data);
            });
        },
        addMajors({ state, dispatch }, majors) {
            api.major.addMajors({ majors }).then(res => {
                Message({
                    message: res.data.msg,
                    type: "success",
                    duration: 2000,
                    center: true
                });
                dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
            });
        },
        searchMajors({ commit }, value) {
            api.major.searchMajors({ name: value }).then(res => {
                commit('setCount', res.data.count);
                commit('setMajorList', res.data.data);
            })
        },
        updateMajor({ state, dispatch }, editForm) {
            api.major.updateMajor(editForm).then(res => {
                Message({
                    message: res.data.msg,
                    type: "success",
                    duration: 2000,
                    center: true
                });
                dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
            })
        }
    }
}