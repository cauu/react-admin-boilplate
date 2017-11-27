import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`models/${m}.js`)),
  component,
});

export default (app) => [
  {
    component: dynamicWrapper(app, [], () => import('layouts/basic')),
    layout: 'basic',
    children: [
      {
        name: '看板',
        icon: 'dashboard',
        path: 'dashboard',
        component: dynamicWrapper(app, [], () => import('pages/basic/dashboard'))
      }
    ]
  },
  {
    component: dynamicWrapper(app, [], () => import('layouts/user')),
    layout: 'user',
    children: [
      {
        name: '用户',
        icon: 'user',
        path: 'user',
        children: [
          {
            name: '登陆',
            path: 'login',
            component: dynamicWrapper(app, [], () => import('pages/user/login'))
          }
        ]
      }
    ]
  }
];