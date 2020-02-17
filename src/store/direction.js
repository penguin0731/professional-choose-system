import api from '@/api';
import { Message } from 'element-ui';

function formatDirect(data) {
    let newData = data.map(item => {
        return {
            ...item,
            create_time: new Date(item.create_time).format('yyyy-MM-dd hh:mm:ss'),
            update_time: item.update_time ? new Date(item.update_time).format('yyyy-MM-dd hh:mm:ss') : ''
        }
    });
    return newData;
}

export default {
    namespaced: true,
    state: {
        loading: true,
        multipleSelection: [],
        currentPage: 1,
        pageSize: 10,
        count: 0,
        major_id: "",
        directionList: null,
        directForUserList: null
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
            if (!data) {
                return;
            }
            state.directionList = formatDirect(data);
        },
        setDirectForUserList(state, data) {
            if (!data) {
                state.directForUserList = [];
                return;
            }
            state.directForUserList = formatDirect(data);
            // console.log(state.directForUserList);
        }
    },
    actions: {
        async findByPage({ commit }, obj) {
            const result = await api.direction.findByPage(obj);
            commit('setLoading', false);
            commit('setCount', result.count);
            commit('setDirectionList', result.data);
        },
        async addDirection({ state, dispatch }, addForm) {
            const result = await api.direction.addDirection(addForm)
            dispatch('findByPage', { id: state.major_id, page: state.currentPage, pageSize: state.pageSize });
            return result;
        },
        async searchDirections({ commit }, value) {
            const result = await api.direction.searchDirections({ name: value });
            commit('setCount', result.count);
            commit('setDirectionList', result.data);
        },
        async updateDirection({ state, dispatch }, editForm) {
            const result = await api.direction.updateDirection(editForm);
            dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
            return result;
        },
        async findDirectByUser({ commit }, form) {
            const result = await api.direction.findDirectByUser(form);
            commit('setDirectForUserList', result);
        }
    }
}