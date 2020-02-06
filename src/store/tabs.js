export default {
    namespaced: true,
    state: {
        editableTabsValue: "myMain",
        editableTabs: [
            {
                label: "首页",
                name: "myMain",
                content: "首页内容",
            },
        ],
        tabIndex: 1
    },
    getters: {},
    mutations: {
        changeEditableTabsValue(state, item) {
            state.editableTabsValue = item.name;
        },
        setTab(state, obj) {
            if (obj.label == '修改密码') return;
            for (let i = 0; i < state.editableTabs.length; i++) {
                if (state.editableTabs[i].name == obj.index) {
                    state.editableTabsValue = obj.index;
                    return false;
                }
            }
            state.editableTabs.push({
                label: obj.label,
                name: obj.name,
                content: obj.name,
                close: 'closable'
            });
            state.editableTabsValue = obj.index;
            state.tabIndex += 1;
        },
        removeTab(state, targetName) {
            let tabs = state.editableTabs;
            let activeName = state.editableTabsValue;
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.name;
                        }
                    }
                });
            }
            state.editableTabsValue = activeName;
            state.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
    },
    actions: {}
}