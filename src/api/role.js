import axios from 'axios';
import qs from 'qs';
const url = {
    findByPage: '/api/role/findByPage',
    findTeach: '/api/role/findTeach',
    addRole: '/api/role/addRole',
    searchRoles: '/api/role/searchRoles',
    updateRole: '/api/role/updateRole',
    findMoudle: '/api/role/findModule',
    findCheckedModule: '/api/role/findCheckedModule',
    dispatchPower: '/api/role/dispatchPower'
}
const role = {
    async findByPage(params) {
        const result = await axios.get(url.findByPage, { params });
        return result.data;
    },
    async findTeach() {
        const result = await axios.get(url.findTeach);
        return result.data;
    },
    async addRole(params) {
        const data = qs.stringify(params);
        const result = await axios({
            url: url.addRole,
            method: 'post',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data
        });
        return result.data;
    },
    async searchRoles(params) {
        const result = await axios.get(url.searchRoles, { params });
        return result.data;
    },
    async updateRole(params) {
        const data = qs.stringify(params);
        const result = await axios({
            url: url.updateRole,
            method: 'post',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data
        });
        return result.data;
    },
    async findModule() {
        const result = await axios.get(url.findMoudle);
        return result.data;
    },
    async findCheckedModule(params) {
        const result = await axios.get(url.findCheckedModule, { params });
        return result.data;
    },
    async dispatchPower(params) {
        const data = JSON.stringify(params);
        const result = await axios({
            url: url.dispatchPower,
            method: 'post',
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            },
            data
        });
        return result.data;
    }
}

export default role;