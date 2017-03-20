### Min-Admin

#### 基于[dva](https://github.com/dvajs/dva/blob/master/README_zh-CN.md)框架+[antd](https://ant.design/index-cn)的[React](https://github.com/facebook/react)后台模板

### 特性

- 基于react，ant-design，dva，[roadhog](https://github.com/sorrycc/roadhog)，[Mock](https://github.com/nuysoft/Mock)企业级后台管理系统最佳实践
- 基于[Mock](https://github.com/nuysoft/Mock)实现脱离后端独立开发
- 基于[roadhog](https://github.com/sorrycc/roadhog)、[dva-cli](https://github.com/dvajs/dva-cli)，简单的配置与命令生成工具，提高开发效率与体验
- 基于[Antd UI](https://ant.design/index-cn)设计语言，提供后台管理系统基本功能
- 基于dva动态加载 Model 和路由，按需加载
- 浅度响应式设计
- 可以自由配置菜单
- 项目配置文件在src/utils/config.js，可以配置是否需要登录，是否需要验证码，是否需要面包屑，是否需要页脚等功能
- 如需重写antd样式配置，请修改src/theme.js
- 增加两个通用组件，1：可缩小化的Card，2：可点击的表格
- 重写菜单样式，增加几个less变量使得菜单样式可自定义

### 开发及构建
#### 快速开始
1. 克隆项目文件:
> git clone git@github.com:zuiidea/antd-admin.git

2. 安装全局的dva-cli
> npm i dva-cli -g

3. 进入目录安装依赖:
> npm i
 
4. 开发
 > npm start  打开http://localhost:8000
 
### 参考 & 感谢
> Antd-admin：https://github.com/zuiidea/antd-admin

将[Antd-admin](https://github.com/zuiidea/antd-admin)使用atool-build+dora改用0.5.2版本的[roadhog](https://github.com/sorrycc/roadhog)改造了Antd-admin，使之更容易上手
* 特别感谢Antd-Admin作者提供参考，让我可以使用dva进行后台系统的编写


### 备注
我将作者的Dashbord页面，用户列表等都删除了，并且自行改写了一些代码
