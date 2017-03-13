import React from 'react';
import { connect } from 'dva';
import Index from '../components/layout/Index';
import Login from '../components/Login/Login';
import '../components/layout/common.less';


function App ({ children, location, dispatch, loading, app }) {
  const { login, user, siderFold, darkTheme, isNavbar, menuPopoverVisible } = app

  const headerProps = {
    user,
    siderFold,
    location,
    isNavbar,
    menuPopoverVisible,
    switchMenuPopover () {
      dispatch({ type: 'app/switchMenuPopver' })
    },
    logout () {
      dispatch({
        type: 'app/logout',
        payload: {
          accountId: app.user.accountId,
          accountId: app.user.accountName
        }
      })
    },
    switchSider () {
      dispatch({ type: 'app/switchSider' })
    }
  }

  const siderProps = {
    siderFold,
    darkTheme,
    location,
    changeTheme () {
      dispatch({ type: 'app/changeTheme' })
    }
  }

  return (
    <div>
      {
        login ?
          <Index
            headerProps={headerProps}
            siderProps={siderProps}
            siderFold={siderFold}
            isNavbar={isNavbar}
            children={children}
            location={location}
          />
          :
          <Login
            loading={loading}
            onOk={
              (data) => {
                dispatch({ type: 'app/login', payload: data })
              }}
          />
      }
    </div>
  );
}

function mapStateToProps (state) {
  return {
    app: state.app,
    loading: state.loading.models.app,
  };
}

export default connect(mapStateToProps)(App);
