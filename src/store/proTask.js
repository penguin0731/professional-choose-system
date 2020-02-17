import api from '@/api';
import { Message } from 'element-ui';

export default {
    namespaced: true,
    state: {
        multipleSelection: [],
        currentPage: 1,
        pageSize: 10,
        count: 0,
        taskList: []
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
        setTaskList(state, data) {
            const newData = data.map(item => {
                return {
                    ...item,
                    start_time: new Date(item.start_time).format('yyyy-MM-dd hh:mm:ss'),
                    end_time: new Date(item.end_time).format('yyyy-MM-dd hh:mm:ss'),
                    create_time: new Date(item.create_time).format('yyyy-MM-dd hh:mm:ss'),
                    update_time: item.update_time ? new Date(item.update_time).format('yyyy-MM-dd hh:mm:ss') : '',
                }
            });
            state.taskList = newData;
        }
    },
    actions: {
        async findByPage({ commit }, obj) {
            const result = await api.task.findByPage(obj);
            commit('setCount', result.count);
            commit('setTaskList', result.data);
        },
        async addTask({ state, dispatch }, task) {
            const result = await api.task.addTask(task);
            dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
            return result;
        },
        async delTasks({ state, dispatch }, tasks) {
            const result = await api.task.delTasks({ tasks });
            dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
            return result;
        },
        async updateTask({ state, dispatch }, editForm) {
            const result = await api.task.updateTask(editForm);
            dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
            const { grade_id, major_id, login_id } = this.state.loginUser.user;
            dispatch('taskSelected/findTaskByUser', { grade_id, major_id, login_id }, {root: true});
            return result;
        }
    }
}