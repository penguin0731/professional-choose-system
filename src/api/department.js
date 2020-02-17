import axios from 'axios';
import qs from 'qs';
const url = {
    findByPage: '/api/department/findByPage',
    addDepartment: '/api/department/addDepartment',
    searchDepartments: '/api/department/searchDepartments',
    updateDepartment: '/api/department/updateDepartment'
}
const department = {
    async findByPage(params) {
        const result = await axios.get(url.findByPage, { params });
        return result.data;
    },
    async addDepartment(params) {
        const data = qs.stringify(params);
        const result = await axios({
            url: url.addDepartment,
            method: 'post',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data
        });
        return result.data;
    },
    async searchDepartments(params) {
        const result = await axios.get(url.searchDepartments, { params });
        return result.data;
    },
    async updateDepartment(params) {
        const data = qs.stringify(params);
        const result = await axios({
            url: url.updateDepartment,
            method: 'post',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data
        });
        return result.data;
    }
}

export default department;