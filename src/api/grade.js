import axios from 'axios';
import qs from 'qs';
const url = {
    findByPage: '/api/grade/findByPage',
    addGrade: '/api/grade/addGrade',
    searchGrades: '/api/grade/searchGrades',
    updateGrade: '/api/grade/updateGrade'
}
const grade = {
    findByPage(params) {
        return axios.get(url.findByPage, { params });
    },
    addGrade(params) {
        const data = qs.stringify(params);
        return axios({
            url: url.addGrade,
            method: 'post',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data
        });
    },
    searchGrades(params) {
        return axios.get(url.searchGrades, { params });
    },
    updateGrade(params) {
        const data = qs.stringify(params);
        return axios({
            url: url.updateGrade,
            method: 'post',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data
        });
    }
}

export default grade;