/** Created by Min on 2017-01-14.  */
import request from '../utils/request';
import { parseParam } from '../utils/func';

export async function login (params) {
  return request('/api/auth/login', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: parseParam(params)
  })
}

export async function logout () {
  return request('/api/auth/logout', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
}
