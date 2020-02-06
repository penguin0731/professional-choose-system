var Mock = require('mockjs');
var data = Mock.mock({
    'data|1-10': [
        {
            'sNo': '16210120629',
            'name|1': Mock.mock('@cname'),
            'sex|+1': [0, 1],
            'phone': '12345678912'
        }
    ]
})
console.log(data);