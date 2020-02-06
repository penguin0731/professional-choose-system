import axios from 'axios';
import qs from 'qs';
const url = {
    findByPage: '/api/role/findByPage',
    findTeach: '/api/role/findTeach',
    addRole: '/api/role/addRole',
    searchRoles: '/api/role/searchRoles',
    updateRole: '/api/role/updateRole'
}
const role = {
    findByPage(params) {
        return axios.get(url.findByPage, { params });
    },
    findTeach() {
        return axios.get(url.findTeach);
    },
    addRole(params) {
        const data = qs.stringify(params);
        return axios({
            url: url.addRole,
            method: 'post',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data
        });
    },
    searchRoles(params) {
        return axios.get(url.searchRoles, { params });
    },
    updateRole(params) {
        const data = qs.stringify(params);
        return axios({
            url: url.updateRole,
            method: 'post',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data
        });
    }
}

export default role;