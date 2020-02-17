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
        async findByPage({ commit }, obj) {
            const result = await api.major.findByPage(obj);
            commit('setCount', result.count);
            commit('setMajorList', result.data);
        },
        async addMajors({ state, dispatch }, majors) {
            const result = await api.major.addMajors({ majors });
            dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
            return result;
        },
        async searchMajors({ commit }, value) {
            const result = await api.major.searchMajors({ name: value });
            commit('setCount', result.count);
            commit('setMajorList', result.data);
        },
        async updateMajor({ state, dispatch }, editForm) {
            const result = await api.major.updateMajor(editForm);
            dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
            return result;
        }
    }
}