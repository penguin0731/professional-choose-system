import api from '@/api';

function formatSelector(data) {
    let newData = data.map(item => {
        return {
            ...item,
            selected_time: item.selected_time ? new Date(item.selected_time).format('yyyy-MM-dd hh:mm:ss') : ''
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
        task_id: "",
        taskDetailList: null
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
        setTaskId(state, id) {
            state.task_id = id;
        },
        setTaskDetailList(state, data) {
            state.taskDetailList = data;
        }
    },
    actions: {
        async findByPage({ commit }, obj) {
            const result = await api.taskDetail.findByPage(obj);
            console.log(result);
            commit('setLoading', false);
            commit('setCount', result.count);
            commit('setTaskDetailList', result.data);
        },
        async searchSelector({ commit }, value) {
            const result = await api.taskDetail.searchSelector({ name: value });
            commit('setCount', result.count);
            commit('setTaskDetailList', result.data);
        }
    }
}