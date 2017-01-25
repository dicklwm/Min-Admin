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
    key: 'navigation',
    name: '测试导航',
    icon: 'setting',
    child: [
      {
        key: 'navigation1',
        name: '二级导航1'
      },
      {
        key: 'navigation2',
        name: '二级导航2',
        child: [
          {
            key: 'navigation21',
            name: '三级导航1'
          },
          {
            key: 'navigation22',
            name: '三级导航2'
          }
        ]
      }
    ]
  }
]
