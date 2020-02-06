import api from '@/api';
import { Message } from 'element-ui';
export default {
    namespaced: true,
    state: {
        currentPage: 1,
        pageSize: 10,
        count: 0,
        roleList: null,
        teachRoleList: null
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
        setRoleList(state, data) {
            state.roleList = data;
        },
        setTeachRoleList(state, data) {
            state.teachRoleList = data;
        }
    },
    actions: {
        findByPage({ commit }, obj) {
            api.role.findByPage(obj).then(res => {
                commit('setCount', res.data.count);
                commit('setRoleList', res.data.data);
            });
        },
        findTeach({ commit }) {
            api.role.findTeach().then(res => {
                commit('setTeachRoleList', res.data.data);
            });
        },
        addRole({ state, dispatch }, addFrom) {
            api.role.addRole(addFrom).then(res => {
                Message({
                    message: res.data.msg,
                    type: "success",
                    duration: 2000,
                    center: true
                });
                dispatch('findByPage', {page: state.currentPage, pageSize: state.pageSize});
            })
        },
        searchRoles({ commit }, value) {
            api.role.searchRoles({ name: value }).then(res => {
                commit('setCount', res.data.count);
                commit('setRoleList', res.data.data);
            })
        },
        updateRole({ state, dispatch }, editForm) {
            api.role.updateRole(editForm).then(res => {
                Message({
                    message: res.data.msg,
                    type: "success",
                    duration: 2000,
                    center: true
                });
                dispatch('findByPage', {page: state.currentPage, pageSize: state.pageSize});
            })
        }
    }
}