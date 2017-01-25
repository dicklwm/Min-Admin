import * as MatterService from '../../services/Inventory/Matter';

export default {
  namespace: 'Inventory/Matter',
  state: {
    ItemList: [],
    pagination: {
      current: 1,
      total: 0,
      pageSize: 10,
    },
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
    }

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
    *delete({ payload }, { call, put }){

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

  },
  subscriptions: {
    setup({ dispatch, history }){
      history.listen(({ pathname }) => {
          if (pathname==='/inventory/matter') {
            dispatch({
              type: 'fetch',
              payload: {}
            })
          }
        }
      )
    }
  },
};
