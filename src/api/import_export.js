import axios from 'axios';

const url = {
    exportStudent: '/api/export/exportStudent',
    exportTeacher: '/api/export/exportTeacher',
    exportMajor: '/api/export/exportMajor'
}

const data = {
    exportStudent(isDefaul) {
        // window.open(`${url.exportStudent}?isDefault=${isDefaul}`);
        // return axios.get(`/api/export/exportStudent?isDefault=${isDefaul}`);
    },
    exportTeacher(isDefaul) {
        // window.open(`${url.exportTeacher}?isDefault=${isDefaul}`);
    },
    exportMajor(isDefaul) {
        // window.open(`${url.exportMajor}?isDefault=${isDefaul}`);
    },
}

export default data;