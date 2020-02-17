import axios from 'axios';
import qs from 'qs';
const url = {
    findByPage: '/api/message/findByPage',
    findShowMes: '/api/message/findShowMes',
    addMessage: '/api/message/addMessage',
    searchMessages: '/api/message/searchMessages',
    updateMessage: '/api/message/updateMessage'
}
const message = {
    async findByPage(params) {
        const result = await axios.get(url.findByPage, { params });
        return result.data;
    },
    async findShowMes(params) {
        const result = await axios.get(url.findShowMes, { params });
        return result.data;
    },
    async addMessage(params) {
        const data = qs.stringify(params);
        const result = await axios({
            url: url.addMessage,
            method: 'post',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data
        });
        return result.data;
    },
    async searchMessages(params) {
        const result = await axios.get(url.searchMessages, { params });
        return result.data;
    },
    async updateMessage(params) {
        const data = qs.stringify(params);
        const result = await axios({
            url: url.updateMessage,
            method: 'post',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data
        });
        return result.data;
    }
}

export default message;