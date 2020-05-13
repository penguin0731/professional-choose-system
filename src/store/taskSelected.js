import api from '@/api';

function formatSelectedTasks(data) {
    let newData;
    let selected = data.selected;
    let length = selected.length;
    if (length != 0) {
        newData = data.tasks.map(item => {
            for (let i = 0; i < length; i++) {
                if (selected[i].task_id == item.task_id) {
                    return {
                        ...item,
                        id: selected[i].id,
                        start_time: new Date(item.start_time).format('yyyy-MM-dd hh:mm:ss'),
                        end_time: new Date(item.end_time).format('yyyy-MM-dd hh:mm:ss'),
                        direction_id: selected[i].direction_id,
                        direction_name: selected[i].direction_name,
                        selected_time: new Date(selected[i].selected_time).format('yyyy-MM-dd hh:mm:ss')
                    }
                } else {
                    return {
                        ...item,
                        start_time: new Date(item.start_time).format('yyyy-MM-dd hh:mm:ss'),
                        end_time: new Date(item.end_time).format('yyyy-MM-dd hh:mm:ss'),
                        id: '',
                        direction_id: '',
                        direction_name: '',
                        selected_time: ''
                    }
                }
            }
        });
    } else {
        newData = data.tasks.map(item => {
            return {
                ...item,
                start_time: new Date(item.start_time).format('yyyy-MM-dd hh:mm:ss'),
                end_time: new Date(item.end_time).format('yyyy-MM-dd hh:mm:ss'),
                id: '',
                direction_id: '',
                direction_name: '',
                selected_time: ''
            }
        });
    }
    return newData;
}

export default {
    namespaced: true,
    state: {
        taskList: []
    },
    getter: {},
    mutations: {
        setTaskListByUser(state, data) {
            state.taskList = formatSelectedTasks(data);
        }
    },
    actions: {
        async findTaskByUser({ commit }, form) {
            const res = await api.taskSelected.findTaskByUser(form);
            commit('setTaskListByUser', res);
        },
        async selectedDirect({ dispatch }, form) {
            const res = await api.taskSelected.selectedDirect(form);
            const { grade_id, major_id, login_id } = this.state.loginUser.user;
            dispatch('findTaskByUser', { grade_id, major_id, login_id });
            return res;
        },
        async updateSelectedNum({ dispatch }, arr) {
            await api.taskSelected.updateSelectedNum(arr);
            const { grade_id, major_id } = this.state.loginUser.user;
            dispatch('direction/findDirectByUser', { grade_id, major_id }, {root: true});
        }
    }
}