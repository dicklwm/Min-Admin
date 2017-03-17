import fetch from 'dva/fetch';
import { hashHistory } from 'dva/router';

function parseJSON (response) {
  return response.json();
}

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * 检验登陆状态的中间件，如果接口报错代码为9000，则跳转到login
 * 跳转到login后，监听路由的App的model会处理logout的状态
 */
function checkLogin (data) {
  console.log('data.errcode:', data.errcode);
  if (data.errcode===9000) {
    hashHistory.push('login');
  }
  return data;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request (url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => checkLogin(data))
    .then(data => ({ data }))
    .catch(err => ({ err }));
}
