import axios from 'axios';
import qs from 'qs';
const url = {
    findByPage: '/api/direction/findByPage',
    addDirection: '/api/direction/addDirection',
    delDirections: '/api/direction/delDirections',
    searchDirections: '/api/direction/searchDirections',
    updateDirection: '/api/direction/updateDirection'
}
const direction = {
    findByPage(params) {
        return axios.get(url.findByPage, { params });
    },
    addDirection(params) {
        const data = JSON.stringify(params);
        return axios({
            url: url.addDirection,
            method: 'post',
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            },
            data
        });
    },
    delDirections(params) {
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
    searchDirections(params) {
        return axios.get(url.searchDirections, { params });
    },
    updateDirection(params) {
        const data = qs.stringify(params);
        return axios({
            url: url.updateDirection,
            method: 'post',
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            },
            data
        });
    }
}

export default direction;