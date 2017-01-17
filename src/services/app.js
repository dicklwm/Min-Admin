/** Created by Min on 2017-01-14.  */
import request from '../utils/request';

export async function login (params) {
  return request('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({userName:"minlee",password:"2"})
  })
}

export async function logout (params) {
  return request('/api/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
}

export async function userInfo (params) {
  return request('/api/userInfo', {
    method: 'get',
    body: params
  })
}
