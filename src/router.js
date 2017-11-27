import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import cloneDeep from 'lodash/cloneDeep';

import getNavData from 'app/nav';
import { getPlainNode } from 'utils/common';

function getRouteData(navData, path) {
  if (!navData.some(item => item.layout === path) ||
    !(navData.filter(item => item.layout === path)[0].children)) {
    return null;
  }
  const route = cloneDeep(navData.filter(item => item.layout === path)[0]);
  const nodeList = getPlainNode(route.children);
  return nodeList;
}

function getLayout(navData, path) {
  if (!navData.some(item => item.layout === path) ||
    !(navData.filter(item => item.layout === path)[0].children)) {
    return null;
  }
  const route = navData.filter(item => item.layout === path)[0];
  return {
    component: route.component,
    layout: route.layout,
    name: route.name,
    path: route.path,
  };
}

function RouterConfig({ history, app }) {
  const navData = getNavData(app);
  const UserLayout = getLayout(navData, 'user').component;
  const BasicLayout = getLayout(navData, 'basic').component;

  const passProps = (path) => ({
    app,
    getRouteData,
    navData: getRouteData(navData, path),
  });

  return (
    <Router history={ history }>
      <Switch>
        <Route path="/user" render={ (props) => <UserLayout {...props} {...passProps('user')} /> } />
        <Route path="/" render={ (props) => <BasicLayout {...props} {...passProps('basic')} /> } />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
