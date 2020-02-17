const student = require("../router/student"),
      teacher = require("../router/teacher"),
      major = require('../router/major'),
      direction = require('../router/direction'),
      task = require('../router/professionalTask'),
      taskSelected = require('../router/taskSelected'),
      grade = require('../router/grade'),
      department = require('../router/department'),
      role = require('../router/role'),
      message = require('../router/message'),
      login = require('../router/login'),
      exportExcel = require('../router/exportExcel');


module.exports = function (app) {
  // 当请求地址以/api/student开头时，交给路由 student 处理
  app.use("/api/student", student);
  app.use("/api/teacher", teacher);
  app.use("/api/major", major);
  app.use("/api/direction", direction);
  app.use("/api/task", task);
  app.use("/api/taskSelected", taskSelected);
  app.use("/api/grade", grade);
  app.use("/api/department", department);
  app.use("/api/role", role);
  app.use("/api/message", message);
  app.use("/api/login", login);
  app.use("/api/export", exportExcel);
};

