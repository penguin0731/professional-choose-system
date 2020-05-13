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
    async findByPage(params) {
        const result = await axios.get(url.findByPage, { params });
        return result.data;
    },
    async addMajors(params) {
        const data = JSON.stringify(params);
        const result = await axios({
            url: url.addMajors,
            method: 'post',
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            },
            data
        });
        return result.data;
    },
    async delMajors(params) {
        const data = JSON.stringify(params);
        const result = await axios({
            url: url.delMajors,
            method: 'delete',
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            },
            data
        });
        return result.data;
    },
    async searchMajors(params) {
        const result = await axios.get(url.searchMajors, { params });
        return result.data;
    },
    async updateMajor(params) {
        const data = JSON.stringify(params);
        const result = await axios({
            url: url.updateMajor,
            method: 'post',
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            },
            data
        });
        return result.data;
    }
}

export default major;