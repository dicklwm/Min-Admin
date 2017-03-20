module.exports = [
  {
    key: 'home',
    name: '主页',
    icon: 'home'
  },
  {
    key: 'test1',
    name: '测试',
    icon: 'setting',
    child: [
      {
        key: "test2",
        name: '测试导航1'
      },
      {
        key: "test3",
        name: '测试导航2',
        child: [
          {
            key: "test3",
            name: '测试导航3'
          },
        ],
      }
    ]
  }
]
