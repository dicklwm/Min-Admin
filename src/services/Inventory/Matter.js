/** Created by Min on 2017-01-24.  */
import request from '../../utils/request';

export async function saveItemList (params) {
  return request('/api/inventory/saveItemList', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body:  JSON.stringify(params)
  })
}

export async function deleteItemList (params) {
  return request('/api/inventory/deleteItemList', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  })
}

export async function getItemList (params) {
  return request('/api/inventory/getItemList', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  })
}

export async function getItemType () {
  return request('/api/inventory/getItemType', {
    method: 'GET',
  })
}

export async function getAllMain () {
  return request('/api/inventory/getAllMain', {
    method: 'GET',
  })
}
