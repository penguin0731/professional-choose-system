import axios from 'axios';
const url = {
    findByPage: '/api/taskDetail/findByPage'
}
const taskDetail = {
    async findByPage(params) {
        const result = await axios.get(url.findByPage, { params });
        return result.data;
    }
}

export default taskDetail;