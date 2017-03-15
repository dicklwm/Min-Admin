/** Created by Min on 2017/3/15.  */
import request from '../../utils/request';
import {parseParam} from '../../utils/func';

export async function getMessage (params) {
  document.cookie = 'PHPSESSID=nqgod42tdocn20a71i2aaunp14'
  return request('/api/weixin_friends/message', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: parseParam(params),
  })
}

export async function getWxInfo (params) {
  return request('/api/weixin_friends/wx_info', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body:  parseParam(params),
  })
}

export async function getFriendInfo (params) {
  return request('/api/weixin_friends/friend_info', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: parseParam(params),
  })
}
