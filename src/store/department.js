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
        findByPage({ commit }, obj) {
            api.department.findByPage(obj).then(res => {
                setTimeout(() => {
                    commit('setLoading', false);
                }, 1000);
                commit('setCount', res.data.count);
                commit('setDeptList', res.data.data);
            });
        },
        addDept({ state, dispatch }, addFrom) {
            api.department.addDepartment(addFrom).then(res => {
                Message({
                    message: res.data.msg,
                    type: "success",
                    duration: 2000,
                    center: true
                });
                dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
            })
        },
        searchDept({ commit }, value) {
            api.department.searchDepartments({ name: value }).then(res => {
                commit('setCount', res.data.count);
                commit('setDeptList', res.data.data);
            })
        },
        updateDept({ state, dispatch }, editForm) {
            api.department.updateDepartment(editForm).then(res => {
                Message({
                    message: res.data.msg,
                    type: "success",
                    duration: 2000,
                    center: true
                });
                dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
            });

        }
    }
}