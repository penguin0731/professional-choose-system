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
    findByPage(params) {
        return axios.get(url.findByPage, { params });
    },
    findShowMes(params) {
        return axios.get(url.findShowMes, { params });
    },
    addMessage(params) {
        const data = qs.stringify(params);
        return axios({
            url: url.addMessage,
            method: 'post',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data
        });
    },
    searchMessages(params) {
        return axios.get(url.searchMessages, { params });
    },
    updateMessage(params) {
        const data = qs.stringify(params);
        return axios({
            url: url.updateMessage,
            method: 'post',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data
        });
    }
}

export default message;