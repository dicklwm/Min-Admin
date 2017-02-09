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

  },
  reducers: {
    saveData(state, action){
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

    deleteDataReducer(state,action){
      let ItemList = state.ItemList;
      ItemList.splice(ItemList.findIndex(item=>item.id===action.payload),1);
      return{
        ...state,
        ItemList: ItemList,
      }
    },

  },
  effects: {
    *saveValue({ payload }, { call, put, select }){

      const { dataIndex, id, value }=payload;
      let ItemList = yield select(state => state['Inventory/Matter'].ItemList);
      let newObj = { ItemList: ItemList.filter(item => item.id===id) };
      newObj.ItemList[0][dataIndex] = value;
      const res = yield call(MatterService.saveItemList, newObj);
      if (res.data.success) {
        yield put({
          type: 'saveData',
          payload: res.data.data,
        })
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
      }
    },

    *fetch({ payload }, { call, put }){
      const res = yield call(MatterService.getItemList, payload);
      if (res.data.success) {
        yield put({
          type: 'fetchData',
          payload: res.data.data,
        })
      }
    },

    *changePage({ payload }, { call, put }){
      const res = yield call(MatterService.getItemList, payload);
      if (res.data.success) {
        yield put({
          type: 'fetchData',
          payload: res.data.data,
        })
      }
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

    *newData({ payload }, { call, put }){
      const res = yield call(MatterService.saveItemList, payload);
      if (res.data.success) {
        yield put({
          type: 'newDataReducer',
          payload: res.data.data,
        })
      } else {
        message.error(res.data.msg);
      }
    }

  },
  subscriptions: {
    setup({ dispatch, history }){
      history.listen(({ pathname }) => {
          if (pathname==='/inventory/matter') {
            dispatch({
              type: 'fetch',
              payload: {}
            });
            dispatch({ type: 'fetchMaintenance' });
          }
        }
      )
    }
  },
};
