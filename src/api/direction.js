import axios from 'axios';
import qs from 'qs';
const url = {
    findByPage: '/api/direction/findByPage',
    addDirection: '/api/direction/addDirection',
    delDirections: '/api/direction/delDirections',
    searchDirections: '/api/direction/searchDirections',
    updateDirection: '/api/direction/updateDirection',
    findDirectByUser: '/api/direction/findDirectByUser'
}
const direction = {
    async findByPage(params) {
        const result = await axios.get(url.findByPage, { params });
        return result.data;
    },
    async addDirection(params) {
        const data = JSON.stringify(params);
        const result = await axios({
            url: url.addDirection,
            method: 'post',
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            },
            data
        });
        return result.data;
    },
    async delDirections(params) {
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
    async searchDirections(params) {
        const result = await axios.get(url.searchDirections, { params });
        return result.data;
    },
    async updateDirection(params) {
        const data = qs.stringify(params);
        const result = await axios({
            url: url.updateDirection,
            method: 'post',
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            },
            data
        });
        return result.data;
    },
    async findDirectByUser(params) {
        const data = JSON.stringify(params);
        const result = await axios({
            url: url.findDirectByUser,
            method: 'post',
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            },
            data
        });
        return result.data;
    }
}

export default direction;