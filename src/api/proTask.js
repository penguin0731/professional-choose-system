import axios from 'axios';
import qs from 'qs';
const url = {
    findByPage: '/api/task/findByPage',
    addTask: '/api/task/addTask',
    delTasks: '/api/task/delTasks',
    updateTask: '/api/task/updateTask',
    findTaskByUser: '/api/task/findTaskByUser',
    selectedTask: '/api/task/selectedTask'
}
const task = {
    async findByPage(params) {
        const result = await axios.get(url.findByPage, { params });
        return result.data;
    },
    async addTask(params) {
        const data = JSON.stringify(params);
        const result = await axios({
            url: url.addTask,
            method: 'post',
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            },
            data
        });
        return result.data;
    },
    async delTasks(params) {
        const data = JSON.stringify(params);
        const result = await axios({
            url: url.delTasks,
            method: 'delete',
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            },
            data
        });
        return result.data;
    },
    async updateTask(params) {
        const data = JSON.stringify(params);
        const result = await axios({
            url: url.updateTask,
            method: 'post',
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            },
            data
        });
        return result.data;
    },
    
}

export default task;