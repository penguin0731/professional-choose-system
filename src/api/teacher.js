import axios from 'axios';
import qs from 'qs';
const url = {
    findByPage: '/api/teacher/findByPage',
    addTeachers: '/api/teacher/addTeachers',
    delTeachers: '/api/teacher/delTeachers',
    searchTeachers: '/api/teacher/searchTeachers',
    updateTeacher: '/api/teacher/updateTeacher'
}
const teacher = {
    async findByPage(params) {
        const result = await axios.get(url.findByPage, { params });
        return result.data;
    },
    async addTeachers(params) {
        const data = JSON.stringify(params);
        const result = await axios({
            url: url.addTeachers,
            method: 'post',
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            },
            data
        });
        return result.data;
    },
    async delTeachers(params) {
        const data = JSON.stringify(params);
        const result = await axios({
            url: url.delTeachers,
            method: 'delete',
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            },
            data
        });
        return result.data;
    },
    async searchTeachers(params) {
        const result = await axios.get(url.searchTeachers, { params });
        return result.data;
    },
    async updateTeacher(params) {
        const data = qs.stringify(params);
        const result = await axios({
            url: url.updateTeacher,
            method: 'post',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data
        });
        return result.data;
    }
}

export default teacher;