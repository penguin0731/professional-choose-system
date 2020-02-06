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
    findByPage(params) {
        return axios.get(url.findByPage, { params });
    },
    addTeachers(params) {
        const data = JSON.stringify(params);
        return axios({
            url: url.addTeachers,
            method: 'post',
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            },
            data
        });
    },
    delTeachers(params) {
        const data = JSON.stringify(params);
        return axios({
            url: url.delTeachers,
            method: 'delete',
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            },
            data
        });
    },
    searchTeachers(params) {
        return axios.get(url.searchTeachers, { params });
    },
    updateTeacher(params) {
        const data = qs.stringify(params);
        return axios({
            url: url.updateTeacher,
            method: 'post',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data
        });
    }
}

export default teacher;