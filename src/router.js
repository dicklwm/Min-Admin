import React from 'react';
import { Router } from 'dva/router';

function RouterConfig ({ history, app }) {

  /**
   * 优化生成路由
   * @param name
   * @returns {{path: *, name: *, getComponent: (function(*, *))}}
   */
  function makeRoute (name, needModel = false) {
    //正则匹配
    var url = name.replace(/\b(\w)|\s(\w)/g, first => first.toUpperCase());
    return {
      path: name,
      name: name,
      getComponent(nextState, cb){
        require.ensure([], require => {
          if (needModel && !app._models.some(val => (val.namespace===name)))
            app.model(require('./models/' + url))

          cb(null, require('./routes/' + url));
        });
      }
    }
  }

  const routes = [
    {
      path: '/',
      name: 'app',
      getComponent(nextState, cb){
        require.ensure([], require => {
          cb(null, require('./routes/App'));
        });
      },
      indexRoute: {
        name: 'home',
        getComponent(nextState, cb){
          require.ensure([], require => {
            cb(null, require('./routes/Home'));
          });
        }
      },
      childRoutes: [

        makeRoute('home'),

        makeRoute('inventory/matter',true),

        makeRoute('workflow/definition'),
      ],
    },
  ];

  return (
    <Router history={history} routes={routes}/>
  );
}

export default RouterConfig;
