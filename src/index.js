import dva from 'dva';

import router from './router';
import globalModel from 'models/global';

import './styles/normalize.scss';

const app = dva({
  /** @todo define history */
});

app.model(globalModel);

app.router(router);

app.start('#root');
