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
        findByPage({ commit }, obj) {
            api.teacher.findByPage(obj).then(res => {
                commit('setCount', res.data.count);
                commit('setTeachList', res.data.data);
            });
        },
        addTeachers({ state, dispatch }, teachers) {
            api.teacher.addTeachers({ teachers }).then(res => {
                Message({
                    message: res.data.msg,
                    type: "success",
                    duration: 2000,
                    center: true
                });
                dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
            })
        },
        delTeachers({ state, dispatch }, teachers) {
            api.teacher.delTeachers({ teachers }).then(res => {
                Message({
                    message: res.data.msg,
                    type: "success",
                    duration: 2000,
                    center: true
                });
                dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
            })
        },
        searchTeachers({ commit }, value) {
            api.teacher.searchTeachers({ name: value }).then(res => {
                commit('setCount', res.data.count);
                commit('setTeachList', res.data.data);
            })
        },
        updateTeacher({ state, dispatch }, editForm) {
            api.teacher.updateTeacher(editForm).then(res => {
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