import api from '@/api';
import { Message } from 'element-ui';
export default {
    namespaced: true,
    state: {
        multipleSelection: [],
        currentPage: 1,
        pageSize: 10,
        count: 0,
        stuList: []
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
        setStuList(state, data) {
            state.stuList = data;
        }
    },
    actions: {
        async findByPage({ commit }, obj) {
            const result = await api.student.findByPage(obj);
            commit('setCount', result.count);
            commit('setStuList', result.data);
        },
        async addStudents({ state, dispatch }, students) {
            const result = await api.student.addStudents({ students });
            dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
            return result;
        },
        async delStudents({ state, dispatch }, students) {
            const result = await api.student.delStudents({ students });
            dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
            return result;
        },
        async searchStudents({ commit }, value) {
            const result = await api.student.searchStudents({ name: value });
            commit('setCount', result.count);
            commit('setStuList', result.data);
        },
        async updateStudent({ state, dispatch }, editForm) {
            const result = await api.student.updateStudent(editForm);
            dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
            return result;
        }
    }
}