/** Created by Min on 2017-02-15.  */
import request from '../../utils/request';

export async function getEntry (params) {
  return request('/api/inventory/getEntry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body:  JSON.stringify(params)
  })
}


export async function getEntryDetail (params) {
  return request('/api/inventory/getEntryDetail', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body:  JSON.stringify(params)
  })
}

export async function getWarehList (params) {
  return request('/api/inventory/getWarehList', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body:  JSON.stringify(params)
  })
}
