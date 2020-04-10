import Vue from 'vue'
import Vuex from 'vuex'
import tabs from './tabs'
import student from './student'
import teacher from './teacher'
import major from './major'
import direction from './direction'
import task from './proTask'
import taskDetail from './taskDetail'
import taskSelected from './taskSelected'
import grade from './grade'
import department from './department'
import role from './role'
import message from './message'
import loginUser from './loginUser'

Vue.use(Vuex)

export default new Vuex.Store({
  // 在生产模式时开启严格模式
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    tabs,
    student,
    teacher,
    major,
    direction,
    task,
    taskDetail,
    taskSelected,
    grade,
    department,
    role,
    message,
    loginUser
  }
})
