module.exports = [
  {
    key: 'home',
    name: '主页',
    icon: 'home'
  },
  {
    key: 'inventory',
    name: '库存管理',
    icon: 'inbox',
    clickable: false,
    child: [
      {
        key: 'matter',
        name: '物料主文件'
      },
      {
        key: 'entry',
        name: '入库单'
      },
    ]
  },
  {
    key: 'workflow',
    name: '流程管理',
    icon: 'book',
    clickable: false,
    child: [
      {
        key: 'definition',
        name: '流程定义'
      },
    ]
  },

  {
    key: 'userManage',
    name: '用户管理',
    icon: 'user',
    child: [
      {
        key: "SectorList",
        name: '部门列表'
      },
      {
        key: "UserList",
        name: '用户列表',
      }
    ]
  }
]
