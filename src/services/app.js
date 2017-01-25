/** Created by Min on 2017-01-14.  */
import request from '../utils/request';

export async function login (params) {
  return request('/api/login/API_login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  })
}

export async function logout (params) {
  return request('/api/LoginComp/API_logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  })
}
