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
        findByPage({ commit }, obj) {
            api.student.findByPage(obj).then(res => {
                commit('setCount', res.data.count);
                commit('setStuList', res.data.data);
            });
        },
        addStudents({ state, dispatch }, students) {
            api.student.addStudents({ students }).then(res => {
                Message({
                    message: res.data.msg,
                    type: "success",
                    duration: 2000,
                    center: true
                });
                dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
            })
        },
        delStudents({ state, dispatch }, students) {
            api.student.delStudents({ students }).then(res => {
                Message({
                    message: res.data.msg,
                    type: "success",
                    duration: 2000,
                    center: true
                });
                dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
            })
        },
        searchStudents({ commit }, value) {
            api.student.searchStudents({ name: value }).then(res => {
                commit('setCount', res.data.count);
                commit('setStuList', res.data.data);
            })
        },
        updateStudent({ state, dispatch }, editForm) {
            api.student.updateStudent(editForm).then(res => {
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