import axios from 'axios';
import qs from 'qs';

const loginUser = {
    async queryUserByLoginId(params) {
        const data = qs.stringify(params);
        const result = await axios({
            url: '/api/login',
            method: 'post',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data
        });
        return result.data;
    },
    async queryUserMsg(params) {
        const data = qs.stringify(params);
        const result = await axios({
            url: '/api/login/queryUser',
            method: 'post',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data
        });
        return result.data;
    },
    async changePwd(params) {
        const data = qs.stringify(params);
        const result = await axios({
            url: '/api/login/changePwd',
            method: 'post',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data
        });
        return result.data;
    }
}

export default loginUser;
