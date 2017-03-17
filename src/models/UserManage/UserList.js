import * as UserListService from '../../services/UserManage/UserList';
import { notification } from 'antd';

export default {
  namespace: 'UserManage/UserList',
  state: {
    self: 0,
    activeFriends: 0,
    account: [],
    allFriends: [],
    friends: [],
    allMessages: [],
    messages: [],
    friendInfo: {
      friend: {},
      self: {}
    },
    searchFriends: "",
    searchMessage: "",
    searchMessageDate: undefined,
  },
  reducers: {
    getMessageReducer(state, action){
      return {
        ...state,
        allMessages: action.payload.data.message,
        messages: action.payload.data.message,
        searchMessage: "",
      }
    },
    getWxInfoReducer(state, action){
      return {
        ...state,
        account: action.payload.data.account,
        allFriends: Object.values(Object.values(action.payload.data.account)[0].friends),
        friends: Object.values(Object.values(action.payload.data.account)[0].friends),
        searchFriends: "",
        searchMessage: "",
        searchMessageDate: undefined,
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
        searchMessage: "",
        searchMessageDate: undefined,
      }
    },

    searchFriends(state, action){
      console.log(action.payload);
      return {
        ...state,
        searchFriends: action.payload,
        friends: state.allFriends.filter(item => item.nickname.toLocaleLowerCase().match(action.payload)),
      }
    },

    searchMessages(state, action){
      return {
        ...state,
        searchMessage: action.payload,
        messages: state.allMessages.filter(item => item.message.match(action.payload)),
        searchMessageDate: null,
      }
    },

    searchMessagesDate(state, action){

      let messages = [];
      const searchDate = action.payload && new Date(action.payload.format('YYYY-MM-DD 00:00:00'));
      if (action.payload===null) {
        messages = state.allMessages;
      } else {
        messages = state.allMessages.filter(item => {
          const date = new Date(item.create_at) - searchDate;

          // return date <= 86400000 && date >= 0

          return date >= 0

        });
      }
      return {
        ...state,
        searchMessageDate: action.payload,
        messages: messages,
      }
    }

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
      if (res.data.errcode!==1) {
        yield put({
          type: 'getWxInfoReducer',
          payload: res.data
        })
      } else {
        notification.info({ description: res.data.msg, message: "提示" });
      }
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
