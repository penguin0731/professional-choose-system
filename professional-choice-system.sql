/*
 Navicat Premium Data Transfer

 Source Server         : professionalchoice
 Source Server Type    : MySQL
 Source Server Version : 50727
 Source Host           : localhost:3306
 Source Schema         : professional-choice-system

 Target Server Type    : MySQL
 Target Server Version : 50727
 File Encoding         : 65001

 Date: 16/05/2020 22:09:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for choice_task
-- ----------------------------
DROP TABLE IF EXISTS `choice_task`;
CREATE TABLE `choice_task`  (
  `task_id` int(11) NOT NULL AUTO_INCREMENT,
  `grade_id` int(11) NULL DEFAULT NULL COMMENT '对哪个年级发布任务',
  `major_id` int(11) NULL DEFAULT NULL COMMENT '对哪个专业发布任务',
  `start_time` datetime(0) NULL DEFAULT NULL COMMENT '开始时间',
  `end_time` datetime(0) NULL DEFAULT NULL COMMENT '结束时间',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `operation_username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建任务的用户名',
  `delete_flag` int(11) NOT NULL DEFAULT 1 COMMENT '任务是否已删除（0：已删除，1：未删除）',
  `task_state` int(11) NULL DEFAULT NULL COMMENT '任务状态（0：未开始，1：进行中，2：已结束）',
  PRIMARY KEY (`task_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of choice_task
-- ----------------------------
INSERT INTO `choice_task` VALUES (3, 1, 1, '2020-05-15 15:00:12', '2020-05-16 00:00:00', '2020-05-16 15:00:19', '2020-05-16 15:06:36', 'admin', 1, 2);

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department`  (
  `department_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '院系主键',
  `department_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '院系名称',
  `department_state` int(11) NOT NULL DEFAULT 1 COMMENT '院系状态（0：弃用，1：在用）',
  PRIMARY KEY (`department_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES (1, '计算机学院', 1);
INSERT INTO `department` VALUES (2, '商务管理学院', 1);
INSERT INTO `department` VALUES (3, '思沃创新管理学院', 1);
INSERT INTO `department` VALUES (4, '信息管理与工程学院', 1);
INSERT INTO `department` VALUES (5, '数字媒体与设计学院', 1);
INSERT INTO `department` VALUES (6, '外国语学院', 1);
INSERT INTO `department` VALUES (7, '国际教育学院', 1);

-- ----------------------------
-- Table structure for direction
-- ----------------------------
DROP TABLE IF EXISTS `direction`;
CREATE TABLE `direction`  (
  `direction_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '方向主键',
  `direction_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '方向名称',
  `direction_detail` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '方向介绍',
  `major_id` int(11) NULL DEFAULT NULL COMMENT '所属专业',
  `grade_id` int(11) NULL DEFAULT NULL COMMENT '所属年级',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `limit_num` int(11) NULL DEFAULT NULL COMMENT '限选人数',
  `selected_num` int(11) NULL DEFAULT 0 COMMENT '已选人数',
  `operation_username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作的用户名',
  `delete_flag` int(11) NOT NULL DEFAULT 1 COMMENT '方向是否被删除（0：已删除，1：未删除）',
  PRIMARY KEY (`direction_id`) USING BTREE,
  INDEX `major_id`(`major_id`) USING BTREE,
  INDEX `grade_id`(`grade_id`) USING BTREE,
  CONSTRAINT `direction_ibfk_1` FOREIGN KEY (`major_id`) REFERENCES `major` (`major_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `direction_ibfk_2` FOREIGN KEY (`grade_id`) REFERENCES `grade` (`grade_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of direction
-- ----------------------------
INSERT INTO `direction` VALUES (1, '移动应用开发', '培养目标：通过本课程的学习使学生具备Android平台应用开发相关知识、良好的编程习惯和手机应用软件开发的能力，能胜任基于Android平台的手机软件研发等工作任务。\n开设课程：Android开发、ios开发、React Native\n任课老师简介：刘老师\n对应岗位：安卓开发工程师、ios开发工程师、前端开发工程师、后端开发工程师', 1, 1, '2020-01-29 19:27:12', '2020-05-15 15:10:42', 10, 1, 'admin', 1);
INSERT INTO `direction` VALUES (2, '大数据', '培养目标：对自然科学和社会科学等应用领域中大数据的了解，具有较强的专业能力和良好外语运用能力，能胜任数据分析与挖掘算法研究和大数据系统开发的研究型和技术型人才。\n开设课程：python基础、大数据爬虫、大数据应用导论\n任课老师简介：张老师\n对应岗位：大数据分析师、大数据工程师', 1, 1, '2020-01-29 23:31:19', '2020-05-15 21:50:14', 80, 0, 'admin', 1);
INSERT INTO `direction` VALUES (3, '游戏开发', '培养目标：本专业方向面向软件行业游戏开发分支，培养拥护党的基本路线，德、智、体、美等全面发展，掌握软件开发理论知识与技能，能熟练使用国际上主流的游戏引擎开发工具，熟悉游戏软件开发流程，掌握游戏软件开发规范，具备较强的游戏软件开发能力和良好的软件工程素养，在游戏企业从事软件编码和游戏发行企业从事游戏策划等相关工作，并具有一定管理能力和较强创新创业能力的高素质技术技能型专门人才。\n开设课程：程序设计基础、Web游戏编程、移动游戏开发基础、移动游戏开发进阶\n任课老师简介：李老师\n对应岗位：游戏客户端程序员、网页前端游戏程序员、游戏策划人员及运营人员', 1, 1, '2020-01-29 23:32:51', '2020-05-15 21:50:09', 40, 0, 'admin', 1);
INSERT INTO `direction` VALUES (4, '风控安全', '风控安全风控安全风控安全', 2, 1, '2020-01-29 23:39:10', NULL, 100, 0, 'admin', 1);
INSERT INTO `direction` VALUES (5, '软件测试', '培养目标：本专业方向培养学生掌握软件工程相关理论和技术，熟悉主流软件开发平台和软件测试工具与方法，熟悉软件外包服务的业务流程，具备较强的软件开发、软件测试和综合应用能力。同时，积极开展软件在领域和行业的交叉，以及国际化合作，开设不同领域选修课程，定向培养特定领域的软件质量管理与测试人才。\n开设课程：软件测试技术、软件测试自动化、软件质量管理\n任课老师简介：王老师\n对应岗位：软件测试工程师', 1, 1, '2020-05-15 21:45:47', '2020-05-15 21:49:59', 40, 0, 'admin', 1);

-- ----------------------------
-- Table structure for grade
-- ----------------------------
DROP TABLE IF EXISTS `grade`;
CREATE TABLE `grade`  (
  `grade_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '年级主键',
  `grade_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '年级名称',
  `grade_state` int(11) NOT NULL DEFAULT 1 COMMENT '年级状态（0：弃用，1：在用）',
  PRIMARY KEY (`grade_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of grade
-- ----------------------------
INSERT INTO `grade` VALUES (1, '2016级', 1);
INSERT INTO `grade` VALUES (2, '2017级', 1);
INSERT INTO `grade` VALUES (3, '2018级', 1);
INSERT INTO `grade` VALUES (4, '2019级', 1);

-- ----------------------------
-- Table structure for major
-- ----------------------------
DROP TABLE IF EXISTS `major`;
CREATE TABLE `major`  (
  `major_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '专业主键',
  `major_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '专业名称',
  `major_year` int(4) NULL DEFAULT NULL COMMENT '专业学制（3：三年，4：四年）',
  `department_id` int(11) NULL DEFAULT NULL COMMENT '所属院系id',
  `major_detail` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '专业介绍',
  `create_username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建的用户名',
  `delete_flag` int(2) NOT NULL DEFAULT 1 COMMENT '专业是否被删除（0：已删除，1未删除）',
  PRIMARY KEY (`major_id`) USING BTREE,
  INDEX `department_id`(`department_id`) USING BTREE,
  CONSTRAINT `major_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of major
-- ----------------------------
INSERT INTO `major` VALUES (1, '软件工程', 4, 1, '培养目标：结合经济发展对软件人才的需要，以行业为导向，培养富有执行力、竞争力 及较强创新能力的复合型、应用型人才。', 'admin', 1);
INSERT INTO `major` VALUES (2, '网络工程', 4, 1, '培养目标：网络工程专业培养的人才具有扎实的自然科学基础、较好的人文社会科学基础和外语综合能力；能系统地掌握计算机网和通信网技术领域的基本理论、基本知识；掌握各类网络系统的组网、规划、设计、评价的理论、方法与技术；', 'admin', 1);
INSERT INTO `major` VALUES (3, '软件开发', 3, 1, '培养目标：本专业培养理想信念坚定，德、智、体、美、劳全面发展，具有一定的科学文化水平，良好的人文素养、职业道德和创新意识，精益求精的工匠精神，较强的就业能力和可持续发展的能力；掌握本专业知识和技术技能，面向软件和信息技术服务业的计算机软件工程技术人员、计算机程序设计员、计算机软件测试员、人工智能工程技术人员，能够从事软件开发、软件测试、软件技术支持、Web前端开发、人工智能系统开发等工作的复合型技术技能人才。', 'admin', 1);
INSERT INTO `major` VALUES (4, '商务英语', 4, 2, '培养目标：商务英语旨在培养具有扎实的英语基本功、宽阔的国际视野、专门的国际商务知识与技能，掌握经济学、管理学和法学等相关学科的基本知识和理论，具备较强的跨文化交际能力与较高的人文素养，能在国际环境中熟练使用英语从事商务、经贸、管理、金融等工作的复合型、应用型商务英语专业人才。', 'admin', 1);

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '公告主键',
  `message_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '公告标题',
  `message_detail` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '公告内容',
  `release_time` datetime(0) NULL DEFAULT NULL COMMENT '发布时间',
  `message_state` int(1) NOT NULL DEFAULT 1 COMMENT '公告状态（0：下架，1：公示）',
  `message_username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '发布人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of message
-- ----------------------------
INSERT INTO `message` VALUES (1, '关于给予吴文杰等20名学生记过处分的决定', '各学院： 在2018-2019学年第一学期期末考试过程中，吴文杰等16名学生使用小抄；林美婷等4名学生未经允许使用通讯设备，根据《广东东软学院违纪处理办法》和《广东东软学院学生违反考试纪律处', '2020-01-30 14:12:25', 1, 'admin');
INSERT INTO `message` VALUES (2, '关于公布高等数学课程重修教学安排的通知', '各位老师： 大家好！ 根据教学工作安排，《高等数学II（计算机类）》和《高等数学II（经济类）》重修安排在实践学期最后两周，详见课表。请授课教师做好授课安排，请辅导员老师通知学生按时上课', '2020-01-30 14:55:40', 1, 'admin');
INSERT INTO `message` VALUES (3, '关于开设《大学日语》课程的通知', '各系部： 根据学院2018年招生情况，为使高考外语语种为日语的学生顺利完成学业，现学院决定开设《大学日语》课程替代《大学英语》、《英语口语》课程。《大学日语》课程自2018-2019学年第二', '2020-01-30 19:16:19', 1, 'admin');
INSERT INTO `message` VALUES (4, '教育部关于做好2019年普通高校 招生工作的通知', '2019年普通高校招生工作要以习近平新时代中国特色社会主义思想为指引，深入贯彻党的十九大和十九届二中、三中全会精神，深入学习贯彻全国教育大会精神，全面贯彻党的教育方针，落实立德树人根本任务，选拔和培养德智体美劳全面发展的社会主义建设者和接班人。全面落实《国务院关于深化考试招生制度改革的实施意见》，按照稳中求进的工作总基调，进一步推动改革创新，加强规范管理，提升工作精细化水平，确保高校考试招生工作公平公正、规范有序。现就有关工作通知如下。', '2020-01-30 19:17:25', 1, 'admin');

-- ----------------------------
-- Table structure for person
-- ----------------------------
DROP TABLE IF EXISTS `person`;
CREATE TABLE `person`  (
  `login_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '登录账号（学号/工号）',
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登陆密码',
  `classes` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '所在班级',
  `gender` int(2) NULL DEFAULT NULL COMMENT '性别（0为男，1为女）',
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '联系电话',
  `major_id` int(25) NULL DEFAULT NULL COMMENT '所属专业',
  `grade_id` int(11) NULL DEFAULT NULL COMMENT '所在年级',
  `student_status` int(11) NULL DEFAULT NULL COMMENT '学籍状态（0无学籍，1有学籍）',
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `person_status` int(11) NOT NULL DEFAULT 1 COMMENT '角色状态（学生 0：毕业，1：在读，2：休学，3：退学）（教职工0：离职，1：在职）',
  `delete_flag` int(11) NULL DEFAULT 1 COMMENT '是否被删除（0：已删除，1：未删除）',
  `role_id` int(11) NULL DEFAULT NULL COMMENT '角色（1：学生，2：管理员，3：教职工）',
  PRIMARY KEY (`login_id`) USING BTREE,
  INDEX `role_id`(`role_id`) USING BTREE,
  INDEX `person_ibfk_2`(`grade_id`) USING BTREE,
  INDEX `student_ibfk_1`(`major_id`) USING BTREE,
  CONSTRAINT `person_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `person_ibfk_2` FOREIGN KEY (`grade_id`) REFERENCES `grade` (`grade_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`major_id`) REFERENCES `major` (`major_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of person
-- ----------------------------
INSERT INTO `person` VALUES ('16210120601', '小张', 'e10adc3949ba59abbe56e057f20f883e', '1班', 0, '', 1, 1, 1, '', 1, 1, 1);
INSERT INTO `person` VALUES ('16210120602', '小李', 'e10adc3949ba59abbe56e057f20f883e', '1班', 1, '', 1, 1, 1, '', 1, 1, 1);
INSERT INTO `person` VALUES ('16210120628', '小明', 'e10adc3949ba59abbe56e057f20f883e', '1班', 0, '13926806277', 1, 1, 1, NULL, 1, 1, 1);
INSERT INTO `person` VALUES ('16210120629', '陈欣健', 'e10adc3949ba59abbe56e057f20f883e', '1班', 0, '13926806277', 1, 1, 0, NULL, 1, 1, 1);
INSERT INTO `person` VALUES ('16210120630', '小华', 'e10adc3949ba59abbe56e057f20f883e', '1班', 0, '13926806277', 1, 2, 1, '', 1, 1, 1);
INSERT INTO `person` VALUES ('456456', '陈老师', 'e10adc3949ba59abbe56e057f20f883e', NULL, 0, '13926806277', NULL, NULL, NULL, '', 1, 1, 3);
INSERT INTO `person` VALUES ('789789', '刘老师', 'e10adc3949ba59abbe56e057f20f883e', NULL, 1, '13926806277', NULL, NULL, NULL, '', 1, 1, 3);
INSERT INTO `person` VALUES ('admin', 'admin', '21232f297a57a5a743894a0e4a801fc3', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 2);

-- ----------------------------
-- Table structure for resource
-- ----------------------------
DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource`  (
  `resource_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '模块主键',
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '模块名称',
  `resource_type` int(2) NULL DEFAULT NULL COMMENT '模块类型（0：系统，1：表格，2：按钮）',
  `resource_parent_id` int(11) NULL DEFAULT NULL COMMENT '按钮的父级模块id',
  PRIMARY KEY (`resource_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 40 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of resource
-- ----------------------------
INSERT INTO `resource` VALUES (1, '系统', 0, 1);
INSERT INTO `resource` VALUES (2, '学生管理', 1, 1);
INSERT INTO `resource` VALUES (3, '学生添加', 2, 2);
INSERT INTO `resource` VALUES (4, '学生删除', 2, 2);
INSERT INTO `resource` VALUES (5, '学生修改', 2, 2);
INSERT INTO `resource` VALUES (6, '学生导入', 2, 2);
INSERT INTO `resource` VALUES (7, '教职工管理', 1, 1);
INSERT INTO `resource` VALUES (8, '教职工添加', 2, 7);
INSERT INTO `resource` VALUES (9, '教职工删除', 2, 7);
INSERT INTO `resource` VALUES (10, '教职工修改', 2, 7);
INSERT INTO `resource` VALUES (11, '教职工导入', 2, 7);
INSERT INTO `resource` VALUES (12, '专业管理', 1, 1);
INSERT INTO `resource` VALUES (13, '专业添加', 2, 12);
INSERT INTO `resource` VALUES (14, '专业删除', 2, 12);
INSERT INTO `resource` VALUES (15, '专业修改', 2, 12);
INSERT INTO `resource` VALUES (16, '专业导入', 2, 12);
INSERT INTO `resource` VALUES (17, '方向管理', 1, 12);
INSERT INTO `resource` VALUES (18, '方向添加', 2, 17);
INSERT INTO `resource` VALUES (19, '方向删除', 2, 17);
INSERT INTO `resource` VALUES (20, '方向修改', 2, 17);
INSERT INTO `resource` VALUES (21, '方向选报任务管理', 1, 1);
INSERT INTO `resource` VALUES (22, '添加方向选报任务', 2, 21);
INSERT INTO `resource` VALUES (23, '删除方向选报任务', 2, 21);
INSERT INTO `resource` VALUES (24, '修改方向选报任务', 2, 21);
INSERT INTO `resource` VALUES (25, '年级管理', 1, 1);
INSERT INTO `resource` VALUES (26, '年级添加', 2, 25);
INSERT INTO `resource` VALUES (27, '年级修改', 2, 25);
INSERT INTO `resource` VALUES (28, '院系管理', 1, 1);
INSERT INTO `resource` VALUES (29, '院系添加', 2, 28);
INSERT INTO `resource` VALUES (30, '院系修改', 2, 28);
INSERT INTO `resource` VALUES (31, '角色管理', 1, 1);
INSERT INTO `resource` VALUES (32, '角色添加', 2, 31);
INSERT INTO `resource` VALUES (33, '角色修改', 2, 31);
INSERT INTO `resource` VALUES (34, '公告管理', 1, 1);
INSERT INTO `resource` VALUES (35, '公告添加', 2, 34);
INSERT INTO `resource` VALUES (36, '公告删除', 2, 34);
INSERT INTO `resource` VALUES (37, '公告修改', 2, 34);
INSERT INTO `resource` VALUES (38, '选报方向', 1, 1);
INSERT INTO `resource` VALUES (39, '选报详情', 1, 21);

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `role_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色主键',
  `role_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色名称',
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, '学生');
INSERT INTO `role` VALUES (2, '管理员');
INSERT INTO `role` VALUES (3, '辅导员');
INSERT INTO `role` VALUES (4, '专业负责人');

-- ----------------------------
-- Table structure for role_resource
-- ----------------------------
DROP TABLE IF EXISTS `role_resource`;
CREATE TABLE `role_resource`  (
  `role_id` int(11) NOT NULL COMMENT '角色主键',
  `resource_id` int(11) NOT NULL COMMENT '模块主键',
  PRIMARY KEY (`role_id`, `resource_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_resource
-- ----------------------------
INSERT INTO `role_resource` VALUES (1, 12);
INSERT INTO `role_resource` VALUES (1, 17);
INSERT INTO `role_resource` VALUES (1, 38);
INSERT INTO `role_resource` VALUES (2, 2);
INSERT INTO `role_resource` VALUES (2, 3);
INSERT INTO `role_resource` VALUES (2, 4);
INSERT INTO `role_resource` VALUES (2, 5);
INSERT INTO `role_resource` VALUES (2, 6);
INSERT INTO `role_resource` VALUES (2, 7);
INSERT INTO `role_resource` VALUES (2, 8);
INSERT INTO `role_resource` VALUES (2, 9);
INSERT INTO `role_resource` VALUES (2, 10);
INSERT INTO `role_resource` VALUES (2, 11);
INSERT INTO `role_resource` VALUES (2, 12);
INSERT INTO `role_resource` VALUES (2, 13);
INSERT INTO `role_resource` VALUES (2, 14);
INSERT INTO `role_resource` VALUES (2, 15);
INSERT INTO `role_resource` VALUES (2, 16);
INSERT INTO `role_resource` VALUES (2, 17);
INSERT INTO `role_resource` VALUES (2, 18);
INSERT INTO `role_resource` VALUES (2, 19);
INSERT INTO `role_resource` VALUES (2, 20);
INSERT INTO `role_resource` VALUES (2, 21);
INSERT INTO `role_resource` VALUES (2, 22);
INSERT INTO `role_resource` VALUES (2, 23);
INSERT INTO `role_resource` VALUES (2, 24);
INSERT INTO `role_resource` VALUES (2, 25);
INSERT INTO `role_resource` VALUES (2, 26);
INSERT INTO `role_resource` VALUES (2, 27);
INSERT INTO `role_resource` VALUES (2, 28);
INSERT INTO `role_resource` VALUES (2, 29);
INSERT INTO `role_resource` VALUES (2, 30);
INSERT INTO `role_resource` VALUES (2, 31);
INSERT INTO `role_resource` VALUES (2, 32);
INSERT INTO `role_resource` VALUES (2, 33);
INSERT INTO `role_resource` VALUES (2, 34);
INSERT INTO `role_resource` VALUES (2, 35);
INSERT INTO `role_resource` VALUES (2, 36);
INSERT INTO `role_resource` VALUES (2, 37);
INSERT INTO `role_resource` VALUES (2, 39);
INSERT INTO `role_resource` VALUES (3, 2);
INSERT INTO `role_resource` VALUES (3, 6);
INSERT INTO `role_resource` VALUES (3, 21);
INSERT INTO `role_resource` VALUES (3, 34);
INSERT INTO `role_resource` VALUES (3, 39);
INSERT INTO `role_resource` VALUES (4, 2);
INSERT INTO `role_resource` VALUES (4, 6);
INSERT INTO `role_resource` VALUES (4, 12);
INSERT INTO `role_resource` VALUES (4, 13);
INSERT INTO `role_resource` VALUES (4, 14);
INSERT INTO `role_resource` VALUES (4, 15);
INSERT INTO `role_resource` VALUES (4, 16);
INSERT INTO `role_resource` VALUES (4, 17);
INSERT INTO `role_resource` VALUES (4, 18);
INSERT INTO `role_resource` VALUES (4, 19);
INSERT INTO `role_resource` VALUES (4, 20);
INSERT INTO `role_resource` VALUES (4, 34);

-- ----------------------------
-- Table structure for task_selected
-- ----------------------------
DROP TABLE IF EXISTS `task_selected`;
CREATE TABLE `task_selected`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NULL DEFAULT NULL COMMENT '选报任务id',
  `login_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '学生学号',
  `selected_time` datetime(0) NULL DEFAULT NULL COMMENT '选择时间',
  `direction_id` int(11) NULL DEFAULT NULL COMMENT '选择的方向id',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `selected_ibfk_2`(`login_id`) USING BTREE,
  INDEX `selected_ibfk_3`(`direction_id`) USING BTREE,
  INDEX `selected_ibfk_1`(`task_id`) USING BTREE,
  CONSTRAINT `selected_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `choice_task` (`task_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `selected_ibfk_2` FOREIGN KEY (`login_id`) REFERENCES `person` (`login_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `selected_ibfk_3` FOREIGN KEY (`direction_id`) REFERENCES `direction` (`direction_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of task_selected
-- ----------------------------
INSERT INTO `task_selected` VALUES (3, 3, '16210120629', '2020-05-16 15:01:52', 1);

SET FOREIGN_KEY_CHECKS = 1;
