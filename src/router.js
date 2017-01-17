import React from 'react';
import { Router } from 'dva/router';

function RouterConfig ({ history, app }) {

  const routes = [
    {
      path: '/',
      name: 'app',
      getComponent(nextState, cb){
        require.ensure([], require => {
          cb(null,require('./routes/App'))
        });
      },
    },
  ];

  return (
    <Router history={history} routes={routes} />
  );
}

export default RouterConfig;
