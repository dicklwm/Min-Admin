import * as appServices from '../services/app';
import config from '../utils/config';
import { notification } from 'antd';

export default {
  namespace: 'app',
  state: {
    login: !config.needLogin,
    menuPopoverVisible: false,
    siderFold: localStorage.getItem('antdAdminSiderFold')==='true',
    isNavbar: document.body.clientWidth < 769,
    user: {
      accountId: 'guest',
      accountName: 'guest',
    },
  },
  effects: {
    *login ({ payload }, { call, put }) {
      const res = yield call(appServices.login, payload);
      const data = res.data;
      if (data.success) {
        yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              accountId: data.data.accountId,
              accountName: data.data.accountName,
            }
          }
        })
      } else {
        notification.error({ message: '账号密码有误！', description: res.data.msg });
      }
    },

    *logout ({ payload }, { call, put }) {
      const res = yield call(appServices.logout, payload);
      console.log(res);
      if (res.data.success) {
        yield put({
          type: 'logoutSuccess'
        })
      }
    },

    *changeNavbar ({}, { put }) {
      if (document.body.clientWidth < 769) {
        yield put({ type: 'showNavbar' })
      } else {
        yield put({ type: 'hideNavbar' })
      }
    },
  },
  reducers: {
    loginSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
        login: true,
      }
    },
    loginFail (state) {
      return {
        ...state,
        login: false,
      }
    },
    logoutSuccess (state) {
      return {
        ...state,
        login: false,
        user: {
          accountId: 'guest',
          accountName: 'guest',
        }
      }
    },

    switchSider (state) {
      localStorage.setItem('antdAdminSiderFold', !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold
      }
    },

    showNavbar (state) {
      return {
        ...state,
        isNavbar: true
      }
    },
    hideNavbar (state) {
      return {
        ...state,
        isNavbar: false
      }
    },
    switchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible
      }
    }
  },
  subscriptions: {
    setup({ dispatch }){
      window.onresize = () => dispatch({ type: 'changeNavbar' })

    }
  },
};
