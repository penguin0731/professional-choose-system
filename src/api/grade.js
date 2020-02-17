import axios from 'axios';
import qs from 'qs';
const url = {
    findByPage: '/api/grade/findByPage',
    addGrade: '/api/grade/addGrade',
    searchGrades: '/api/grade/searchGrades',
    updateGrade: '/api/grade/updateGrade'
}
const grade = {
    async findByPage(params) {
        const result = await axios.get(url.findByPage, { params });
        return result.data;
    },
    async addGrade(params) {
        const data = qs.stringify(params);
        const result = await axios({
            url: url.addGrade,
            method: 'post',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data
        });
        return result.data;
    },
    async searchGrades(params) {
        const result = await axios.get(url.searchGrades, { params });
        return result.data;
    },
    async updateGrade(params) {
        const data = qs.stringify(params);
        const result = await axios({
            url: url.updateGrade,
            method: 'post',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data
        });
        return result.data;
    }
}

export default grade;