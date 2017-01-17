import * as appServices from '../services/app';
import config from '../utils/config';

export default {
  namespace: 'app',
  state: {
    login: !config.needLogin,
    menuPopoverVisible: false,
    siderFold: localStorage.getItem('antdAdminSiderFold')==='true',
    darkTheme: localStorage.getItem('antdAdminDarkTheme')!=='false',
    isNavbar: document.body.clientWidth < 769,
    user: {
      name: 'guest'
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
        login: false
      }
    },

    handleSwitchSider (state) {
      localStorage.setItem('antdAdminSiderFold', !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold
      }
    },

    handleChangeTheme (state) {
      localStorage.setItem('antdAdminDarkTheme', !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme
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
    handleSwitchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible
      }
    }
  },
  effects: {
    *login ({ payload }, { call, put }) {
      console.log(payload);
      const data = yield call(appServices.login, payload);
      if (data.data.success) {
        yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              name: payload.userName
            }
          }
        })
      } else {
        yield put({
          type: 'loginFail'
        })
      }
    },

    *logout ({ payload }, { call, put }) {
      const data = yield call(appServices.logout, payload);
      console.log(data);
      if (data.data.success) {
        yield put({
          type: 'logoutSuccess'
        })
      }
    },

    *switchSider ({}, { put }) {
      yield put({
        type: 'handleSwitchSider'
      })
    },
    *changeTheme ({}, { put }) {
      yield put({
        type: 'handleChangeTheme'
      })
    },
    *changeNavbar ({}, { put }) {
      if (document.body.clientWidth < 769) {
        yield put({ type: 'showNavbar' })
      } else {
        yield put({ type: 'hideNavbar' })
      }
    },
    *switchMenuPopver ({}, { put }) {
      yield put({
        type: 'handleSwitchMenuPopver'
      })
    }
  },
  subscriptions: {
    setup({ dispatch }){
      window.onresize = () => dispatch({ type: 'changeNavbar' })

    }
  },
};
