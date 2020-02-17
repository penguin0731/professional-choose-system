import axios from 'axios';
const url = {
    findTaskByUser: '/api/taskSelected/findTaskByUser',
    selectedDirect: '/api/taskSelected/selectedDirect',
    updateSelectedNum: '/api/taskSelected/updateSelectedNum'
}

const taskSelected = {
    async findTaskByUser(params) {
        const data = JSON.stringify(params);
        const result = await axios({
            url: url.findTaskByUser,
            method: 'post',
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            },
            data
        });
        return result.data;
    },
    async selectedDirect(params) {
        const data = JSON.stringify(params);
        const result = await axios({
            url: url.selectedDirect,
            method: 'post',
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            },
            data
        });
        return result.data;
    },
    async updateSelectedNum(params) {
        const data = JSON.stringify(params);
        const result = await axios({
            url: url.updateSelectedNum,
            method: 'post',
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            },
            data
        });
        return result.data;
    }
}

export default taskSelected;