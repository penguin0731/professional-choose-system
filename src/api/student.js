import axios from 'axios';
import qs from 'qs';
const url = {
    findByPage: '/api/student/findByPage',
    addStudents: '/api/student/addStudents',
    delStudents: '/api/student/delStudents',
    searchStudents: '/api/student/searchStudents',
    updateStudent: '/api/student/updateStudent'
}
const student = {
    findByPage(params) {
        return axios.get(url.findByPage, { params });
    },
    addStudents(params) {
        const data = JSON.stringify(params);
        return axios({
            url: url.addStudents,
            method: 'post',
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            },
            data
        });
    },
    delStudents(params) {
        const data = JSON.stringify(params);
        return axios({
            url: url.delStudents,
            method: 'delete',
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            },
            data
        });
    },
    searchStudents(params) {
        return axios.get(url.searchStudents, { params });
    },
    updateStudent(params) {
        const data = qs.stringify(params);
        return axios({
            url: url.updateStudent,
            method: 'post',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data
        });
    }
}

export default student;