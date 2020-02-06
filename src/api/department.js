import axios from 'axios';
import qs from 'qs';
const url = {
    findByPage: '/api/department/findByPage',
    addDepartment: '/api/department/addDepartment',
    searchDepartments: '/api/department/searchDepartments',
    updateDepartment: '/api/department/updateDepartment'
}
const department = {
    findByPage(params) {
        return axios.get(url.findByPage, { params });
    },
    addDepartment(params) {
        const data = qs.stringify(params);
        return axios({
            url: url.addDepartment,
            method: 'post',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data
        });
    },
    searchDepartments(params) {
        return axios.get(url.searchDepartments, { params });
    },
    updateDepartment(params) {
        const data = qs.stringify(params);
        return axios({
            url: url.updateDepartment,
            method: 'post',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data
        });
    }
}

export default department;