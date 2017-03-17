//导入logo图
import logo from '../assets/Images/logo.png';
import login_bg from '../assets/Images/login_bg.jpg';

module.exports = {
  name: '竹石管理系统',
  prefix: 'ZSAdmin',
  footerText: 'Ant Design Admin 版权所有 © 2017 Made By ZS ',
  logoSrc: logo,
  logoText: '竹石管理系统',
  //登陆配置
  loginConfig: {
    needLogin: true,
    needCaptcha: true,
    CaptchaAddress: "http://localhost:8000/zhushi/captcha.html",
    needRegister: false, //是否需要注册按钮
    logoBackground: login_bg,
  },
  defaultSelectMenu: 'home',
  needBread: true,
  needFooter: true,
  // v3Address:"http://www.mitarl.com:8080",
}
