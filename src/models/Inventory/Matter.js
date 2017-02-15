import * as MatterService from '../../services/Inventory/Matter';
import { message } from 'antd';

export default {
  namespace: 'Inventory/Matter',
  state: {
    ItemList: [],
    pagination: {
      current: 1,
      total: 0,
      pageSize: 10,
    },
    ItemType: [],
    ProductFactory: [],
    BrandType: [],
    ItemClass: [],
    query: [{
      ITEM: null,
      ITEM_DESC: null,
      ITEM_TYPE: null,
      BRAND: null,
      ProductFactory: null,
      SQEC: null,
      SUPPLIER: null,
    }],

  },
  reducers: {
    saveDataReducer(state, action){
      const newItemList = state.ItemList.map(item => {
        let newItem = action.payload.ItemList.find(newItem => newItem.id===item.id);
        if (newItem)
          return newItem;
        else
          return item;
      })
      return {
        ...state,
        ItemList: newItemList
      }
    },

    fetchData(state, action){
      return {
        ...state,
        ItemList: action.payload.ItemList,
        pagination: { ...state.pagination, total: action.payload.total },
      }
    },

    changePage(state, action){
      const { current, pageSize } = action.payload;
      return {
        ...state,
        pagination: { ...state.pagination, current: current, pageSize: pageSize },
      }
    },

    mainData(state, action){
      return {
        ...state,
        ItemType: action.payload.ItemType,
        BrandType: action.payload.BrandType,
        ItemClass: action.payload.ItemClass,
        ProductFactory: action.payload.ProductFactory,
      }
    },

    newDataReducer(state, action){
      let ItemList = state.ItemList;
      ItemList.unshift(...action.payload.ItemList);
      return {
        ...state,
        ItemList: ItemList,
      }
    },

    deleteDataReducer(state, action){
      let ItemList = state.ItemList;
      ItemList.splice(ItemList.findIndex(item => item.id===action.payload), 1);
      return {
        ...state,
        ItemList: ItemList,
      }
    },

    queryData(state, action){
      return {
        ...state,
        query: action.payload.query
      }
    },
    clearQuery(state){
      return {
        ...state,
        query: [{
          ITEM: null,
          ITEM_DESC: null,
          ITEM_TYPE: null,
          BRAND: null,
          ProductFactory: null,
          SQEC: null,
          SUPPLIER: null,
        }],
      }
    },
    closeQuery(state, action){
      let query = state.query;
      query[0][action.payload] = null;
      return {
        ...state,
        query: query
      }
    },

  },
  effects: {

    *saveData({ payload, method }, { call, put }){
      const res = yield call(MatterService.saveItemList, payload);
      if (res.data.success) {
        if (method==='update') {
          yield put({
            type: 'saveDataReducer',
            payload: res.data.data,
          })
        } else {
          yield put({
            type: 'newDataReducer',
            payload: res.data.data,
          })
        }
        message.success('保存成功');
      } else {
        message.error(res.data.msg);
      }
    },

    *deleteData({ payload }, { call, put }){
      const res = yield call(MatterService.deleteItemList, payload);
      console.log(res);
      if (res.data.success) {
        yield put({
          type: 'deleteDataReducer',
          payload: payload.id,
        })
        message.success('删除成功');
      }
    },

    *fetch({}, { select, call, put }){
      const pagination = yield select(state => state['Inventory/Matter'].pagination);
      const query = yield select(state => state['Inventory/Matter'].query);
      const res = yield call(MatterService.getItemList, { ...pagination, query });
      if (res.data.success) {
        yield put({
          type: 'fetchData',
          payload: res.data.data,
        })
      }
    },

    *queryData({}, { put }){
      yield put({ type: 'fetch' });
    },
    *changePage({}, { put }){
      yield put({ type: 'fetch' });
    },
    *clearQuery({}, { put }){
      yield put({ type: 'fetch' });
    },
    *closeQuery({}, { put }){
      yield put({ type: 'fetch' });
    },

    *fetchMaintenance({}, { call, put }){
      const res = yield call(MatterService.getAllMain);
      if (res.data.success) {
        yield put({
          type: 'mainData',
          payload: res.data.data,
        })
      }
    },

  },
  subscriptions: {
    setup({ dispatch, history }){
      history.listen(({ pathname }) => {
          if (pathname==='/inventory/matter') {
            dispatch({
              type: 'fetch',
            });
            dispatch({ type: 'fetchMaintenance' });
          }
        }
      )
    }
  },
};
