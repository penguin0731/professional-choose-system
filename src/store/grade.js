import api from '@/api';
import { Message } from 'element-ui';
export default {
    namespaced: true,
    state: {
        currentPage: 1,
        pageSize: 10,
        count: 0,
        gradeList: null
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
        setGradeList(state, data) {
            state.gradeList = data;
        }
    },
    actions: {
        async findByPage({ commit }, obj) {
            const result = await api.grade.findByPage(obj);
            commit('setCount', result.count);
            commit('setGradeList', result.data);
        },
        async addGrade({ state, dispatch }, addForm) {
            const result = await api.grade.addGrade(addForm);
            dispatch('findByPage', {page: state.currentPage, pageSize: state.pageSize});
            return result;
        },
        async searchGrades({ commit }, value) {
            const result = await api.grade.searchGrades({ name: value });
            commit('setCount', result.count);
            commit('setGradeList', result.data);
        },
        async updateGrade({ state, dispatch }, editForm) {
            const result = await api.grade.updateGrade(editForm);
            dispatch('findByPage', {page: state.currentPage, pageSize: state.pageSize});
            return result;
        }
    }
}