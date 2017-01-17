import Watch from 'watchjs';
import config from './config';

export default function mockStorage (name, defaultValue) {
  //定义本地存储的key
  let key = config.prefix + name;
  //判断是否存在输入的key
  if(localStorage.getItem(key)){
    //直接从本地存储中获取
    global[key] = JSON.parse(localStorage.getItem(key));
  }else{
    //修改本地存储
    global[key] = defaultValue;
    localStorage.setItem(key, JSON.stringify(global[key]));
  }
  //使用插件watchJs监控全局变量中的变量，如果变化了就重新设置
  Watch.watch(global[key], function () {
    localStorage.setItem(key, JSON.stringify(global[key]));
  })
  return key;
}
