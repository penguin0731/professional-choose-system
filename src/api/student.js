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
    async findByPage(params) {
        const result = await axios.get(url.findByPage, { params });
        return result.data;
    },
    async addStudents(params) {
        const data = JSON.stringify(params);
        const result = await  axios({
            url: url.addStudents,
            method: 'post',
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            },
            data
        });
        return result.data;
    },
    async delStudents(params) {
        const data = JSON.stringify(params);
        const result = await  axios({
            url: url.delStudents,
            method: 'delete',
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            },
            data
        });
        return result.data;
    },
    async searchStudents(params) {
        const result = await axios.get(url.searchStudents, { params });
        return result.data;
    },
    async updateStudent(params) {
        const data = qs.stringify(params);
        const result = await  axios({
            url: url.updateStudent,
            method: 'post',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data
        });
        return result.data;
    }
}

export default student;