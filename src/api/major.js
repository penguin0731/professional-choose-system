import axios from 'axios';
import qs from 'qs';
const url = {
    findByPage: '/api/major/findByPage',
    addMajors: '/api/major/addMajors',
    delMajors: '/api/major/delMajors',
    searchMajors: '/api/major/searchMajors',
    updateMajor: '/api/major/updateMajor'
}
const major = {
    findByPage(params) {
        return axios.get(url.findByPage, { params });
    },
    addMajors(params) {
        const data = JSON.stringify(params);
        return axios({
            url: url.addMajors,
            method: 'post',
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            },
            data
        });
    },
    delMajors(params) {
        const data = JSON.stringify(params);
        return axios({
            url: url.delMajors,
            method: 'delete',
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            },
            data
        });
    },
    searchMajors(params) {
        return axios.get(url.searchMajors, { params });
    },
    updateMajor(params) {
        const data = qs.stringify(params);
        return axios({
            url: url.updateMajor,
            method: 'post',
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            },
            data
        });
    }
}

export default major;