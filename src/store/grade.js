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
        findByPage({ commit }, obj) {
            api.grade.findByPage(obj).then(res => {
                commit('setCount', res.data.count);
                commit('setGradeList', res.data.data);
            });
        },
        addGrade({ state, dispatch }, addForm) {
            console.log(addForm);
            api.grade.addGrade(addForm).then(res => {
                Message({
                    message: res.data.msg,
                    type: "success",
                    duration: 2000,
                    center: true
                });
                dispatch('findByPage', {page: state.currentPage, pageSize: state.pageSize});
            });
        },
        searchGrades({ commit }, value) {
            api.grade.searchGrades({ name: value }).then(res => {
                commit('setCount', res.data.count);
                commit('setGradeList', res.data.data);
            })
        },
        updateGrade({ state, dispatch }, editForm) {
            api.grade.updateGrade(editForm).then(res => {
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