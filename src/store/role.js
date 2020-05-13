import api from '@/api';

function jsonToTree(list) {
    let idObj = {};
    let treeList = [];
    for (let i = 0; i < list.length; i++) {
        // list[i] = {...list[i], label: list[i].name};
        // delete list[i].name;
        const item = list[i];
        idObj[item.resource_id] = item;
    }
    for (let j = 0; j < list.length; j++) {
        const item = list[j];
        const itemParent = idObj[item.resource_parent_id];
        if(itemParent) {
            if(itemParent.hasOwnProperty('children')) {
                itemParent.children.push(item);
            }else {
                itemParent.children = [];
                itemParent.children.push(item);
            }
        }else {
            treeList.push(item);
        }
    }
    return treeList;
}

export default {
    namespaced: true,
    state: {
        currentPage: 1,
        pageSize: 10,
        count: 0,
        roleList: null,//角色列表
        teachRoleList: null,//教职工角色列表
        moduleList: null,//模块列表
        checkedList: null,//默认选中的模块列表
        showModuleList: null//登录用户能操作的模块
    },
    getter: {},
    mutations: {
        setPage(state, page) {
            state.page = page;
        },
        setPageSize(state, pageSize) {
            state.pageSize = pageSize;
        },
        setCount(state, count) {
            state.count = count;
        },
        setRoleList(state, data) {
            state.roleList = data;
        },
        setTeachRoleList(state, data) {
            state.teachRoleList = data;
        },
        setModuleList(state, data) {
            state.moduleList = jsonToTree(data);
        },
        setCheckedList(state, data) {
            const newData = data.map(item => item.resource_id);
            state.checkedList = newData;
        },
        setShowModuleList(state, data) {
            state.showModuleList = jsonToTree(data);
        }
    },
    actions: {
        async findByPage({ commit }, obj) {
            const result = await api.role.findByPage(obj);
            commit('setCount', result.count);
            commit('setRoleList', result.data);
        },
        async findTeach({ commit }) {
            const result = await api.role.findTeach();
            commit('setTeachRoleList', result.data);
        },
        async addRole({ state, dispatch }, addFrom) {
            const result = await api.role.addRole(addFrom);
            dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
            return result;
        },
        async searchRoles({ commit }, value) {
            const result = await api.role.searchRoles({ name: value });
            commit('setCount', result.count);
            commit('setRoleList', result.data);
        },
        async updateRole({ state, dispatch }, editForm) {
            const result = await api.role.updateRole(editForm);
            dispatch('findByPage', { page: state.currentPage, pageSize: state.pageSize });
            return result;
        },
        async findModule({ commit }) {
            const result = await api.role.findModule();
            commit('setModuleList', result);
        },
        async findCheckedModule({ commit }, role_id) {
            const result = await api.role.findCheckedModule({ role_id });
            commit('setCheckedList', result);
        },
        async dispatchPower({ }, role_resources) {
            const result = await api.role.dispatchPower({ role_resources });
            return result;
        },
        async findLoginUserModule({ commit }, role_id) {
            const result = await api.role.findCheckedModule({ role_id })
            commit('setShowModuleList', result);
        }
    }
}