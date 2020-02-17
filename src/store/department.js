import api from '@/api';
import { Message } from 'element-ui';
export default {
    namespaced: true,
    state: {
        loading: true,
        currentPage: 1,
        pageSize: 10,
        count: 0,
        deptList: []
    },
    getter: {},
    mutations: {
        setLoading(state, boolean) {
            state.loading = boolean;
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
        setDeptList(state, data) {
            state.deptList = data;
        }
    },
    actions: {
        async findByPage({ commit }, obj) {
            const result = await api.department.findByPage(obj);
            commit('setLoading', false);
            commit('setCount', result.count);
            commit('setDeptList', result.data);
        },
        async addDept({ state, dispatch }, addFrom) {
            const result = await api.department.addDepartment(addFrom)
            dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
            return result;
        },
        async searchDept({ commit }, value) {
            const result = await api.department.searchDepartments({ name: value });
            commit('setCount', result.count);
            commit('setDeptList', result.data);
        },
        async updateDept({ state, dispatch }, editForm) {
            const result = await api.department.updateDepartment(editForm);
            dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
            return result;
        }
    }
}