import api from '@/api';
import { Message } from 'element-ui';
export default {
    namespaced: true,
    state: {
        multipleSelection: [],
        currentPage: 1,
        pageSize: 10,
        count: 0,
        teachList: []
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
        setTeachList(state, data) {
            state.teachList = data;
        }
    },
    actions: {
        async findByPage({ commit }, obj) {
            const result = await api.teacher.findByPage(obj);
            commit('setCount', result.count);
            commit('setTeachList', result.data);
        },
        async addTeachers({ state, dispatch }, teachers) {
            const result = await api.teacher.addTeachers({ teachers })
            dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
            return result;
        },
        async delTeachers({ state, dispatch }, teachers) {
            const result = await api.teacher.delTeachers({ teachers });
            dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
            return result;
        },
        async searchTeachers({ commit }, value) {
            const result = await api.teacher.searchTeachers({ name: value });
            commit('setCount', result.count);
            commit('setTeachList', result.data);
        },
        async updateTeacher({ state, dispatch }, editForm) {
            const result = await api.teacher.updateTeacher(editForm);
            dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
            return result;
        }
    }
}