import api from '@/api';
import { Message } from 'element-ui';
export default {
    namespaced: true,
    state: {
        loading: true,
        multipleSelection: [],
        currentPage: 1,
        pageSize: 10,
        count: 0,
        major_id: "",
        directionList: null
    },
    getter: {},
    mutations: {
        setLoading(state, boolean) {
            state.loading = boolean;
        },
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
        setMajorId(state, id) {
            state.major_id = id;
        },
        setDirectionList(state, data) {
            if(!data) {
                state.directionList = [];
                return;
            }
            const newData = data.map(item => {
                return {
                    ...item,
                    create_time: new Date(item.create_time).format('yyyy-MM-dd hh:mm:ss'),
                    update_time: item.update_time ? new Date(item.update_time).format('yyyy-MM-dd hh:mm:ss') : ''
                }
            });
            state.directionList = newData;
        }
    },
    actions: {
        findByPage({ commit }, obj) {
            api.direction.findByPage(obj).then(res => {
                setTimeout(() => {
                    commit('setLoading', false);
                }, 1000);
                commit('setCount', res.data.count);
                commit('setDirectionList', res.data.data);
            });
        },
        addDirection({ state, dispatch }, addForm) {
            api.direction.addDirection(addForm).then(res => {
                Message({
                    message: res.data.msg,
                    type: "success",
                    duration: 2000,
                    center: true
                });
                dispatch('findByPage', { id: state.major_id, page: state.currentPage, pageSize: state.pageSize });
            });
        },
        searchDirections({ commit }, value) {
            api.direction.searchDirections({ name: value }).then(res => {
                commit('setCount', res.data.count);
                commit('setDirectionList', res.data.data);
            })
        },
        updateDirection({ state, dispatch }, editForm) {
            api.direction.updateDirection(editForm).then(res => {
                Message({
                    message: res.data.msg,
                    type: "success",
                    duration: 2000,
                    center: true
                });
                dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
            })
        }
    }
}