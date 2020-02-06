import axios from 'axios';
import qs from 'qs';

const login = {
    queryLoginUser(params) {
        const data = qs.stringify(params);
        return axios({
            url: '/api/login',
            method: 'post',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data
        });
    }
}

export default login;
