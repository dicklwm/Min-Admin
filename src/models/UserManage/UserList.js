import * as UserListService from '../../services/UserManage/UserList';

export default {
  namespace: 'UserManage/UserList',
  state: {
    keyword: "",
    self: 0,
    activeFriends: 0,
    account: [],
    friends: [],
    messages: [],
    friendInfo: {
      friend: {},
      self: {}
    },
  },
  reducers: {
    getMessageReducer(state, action){
      return {
        ...state,
        messages: action.payload.data.message,
      }
    },
    getWxInfoReducer(state, action){
      return {
        ...state,
        account: action.payload.data.account,
        friends: Object.values(Object.values(action.payload.data.account)[0].friends),
      }
    },
    getFriendInfoReducer(state, action){
      return {
        ...state,
        friendInfo: action.payload.data,
      }
    },

    changeFriend(state, action){
      return {
        ...state,
        activeFriends: action.payload.friends_wx,
      }
    },
  },
  effects: {

    *getMessage({ payload }, { put, call }){
      const res = yield call(UserListService.getMessage, payload);
      yield put({
        type: 'getMessageReducer',
        payload: res.data
      })
    },
    *getWxInfo({ payload }, { call, put }){
      const res = yield call(UserListService.getWxInfo, payload);
      yield put({
        type: 'getWxInfoReducer',
        payload: res.data
      })
    },

    *getFriendInfo({ payload }, { call, put }){
      const res = yield call(UserListService.getFriendInfo, payload);
      yield put({
        type: 'getFriendInfoReducer',
        payload: res.data
      })
    },
    *changeFriend({ payload }, { put }){
      yield put({
        type: 'getMessage',
        payload: payload,
      })
      yield put({
        type: 'getFriendInfo',
        payload: payload,
      })
    }

  },
  subscriptions: {},
};
