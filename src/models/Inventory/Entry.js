import * as EntryService from '../../services/Inventory/Entry';

export default {
  namespace: 'Inventory/Entry',
  state: {
    IinventH: [],
    IinventHDetail: {},
    IinventD: [],
    WarehList: [],
    pagination: {
      current: 1,
      total: 0,
      pageSize: 10,
    },
    query: [{
      BILL_NO: null,
      WRITER: null,
      RELATIVE_BILL: null,
      Date: [null, null],
      StartDate: null,
      EndDate: null,
      AUDIT_STATUS: null,
    }],
  },
  effects: {
    *fetchH({}, { select, call, put }){
      const pagination = yield select(state => state['Inventory/Entry'].pagination);
      const query = yield select(state => state['Inventory/Entry'].query);
      const res = yield call(EntryService.getEntry, { ...pagination, query });
      if (res.data.success) {
        yield put({
          type: 'fetchData',
          payload: res.data.data,
        })
      }
    },

    *RowClick({ payload }, { call, put }){
      const res = yield call(EntryService.getEntryDetail, { id: payload });
      if (res.data.success) {
        yield put({
          type: 'fetchDetail',
          payload: res.data.data,
        })
      }
    },

    *fetchWarehList({}, { call, put }){
      const res = yield call(EntryService.getWarehList, {});
      if (res.data.success) {
        yield put({
          type: 'fetchWarehListData',
          payload: res.data.data,
        })
      }
    },

    *changePage({}, { put }){
      yield put({ type: 'fetchH' });
    },
    *queryData({}, { put }){
      yield put({ type: 'fetchH' });
    },
    *clearQuery({}, { put }){
      yield put({ type: 'fetchH' });
    },

  },
  reducers: {
    fetchData(state, action){
      return {
        ...state,
        IinventH: action.payload.IinventH,
        pagination: { ...state.pagination, total: action.payload.total },
      }
    },
    fetchDetail(state, action){
      return {
        ...state,
        IinventD: action.payload.IinventD,
      }
    },

    fetchWarehListData(state, action){
      return {
        ...state,
        WarehList: action.payload.WarehList,
      }
    },

    changePage(state, action){
      const { current, pageSize } = action.payload;
      return {
        ...state,
        pagination: { ...state.pagination, current: current, pageSize: pageSize },
      }
    },
    RowClick(state, action){
      return {
        ...state,
        IinventHDetail: state.IinventH.find(item => item.id===action.payload)
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
          BILL_NO: null,
          WRITER: null,
          Date: [null, null],
          RELATIVE_BILL: null,
          StartDate: null,
          EndDate: null,
          AUDIT_STATUS: null,
        }],
      }
    },

  },
  subscriptions: {
    setup({ dispatch, history }){
      history.listen(({ pathname }) => {
          if (pathname==='/inventory/entry') {
            dispatch({
              type: 'fetchH',
            });
            dispatch({
              type: 'fetchWarehList'
            });
          }
        }
      )
    }
  },
};
