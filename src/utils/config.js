//导入logo图
import logo from '../assets/Images/Min.jpg';
import login_bg from '../assets/Images/login_bg.jpg';

module.exports = {
  name: 'Min-Admin',
  footerText: 'Ant Design Admin 版权所有 © 2017 Made By Min ',
  logoSrc: logo,
  logoText: 'Min-Admin',
  //登陆配置
  loginConfig: {
    needLogin: true, //是否需要登录模块
    needCaptcha: false, //是否需要验证码
    CaptchaAddress: "", //验证码地址
    needRegister: false, //是否需要注册按钮
    logoBackground: login_bg, //logo的背景图
  },
  defaultSelectMenu: 'home',
  needBread: true,
  needFooter: true,
}
