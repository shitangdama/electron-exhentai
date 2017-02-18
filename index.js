import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'mobx-react';


// 1provider
import Auth from './stores/Auth';
import PicStore from './stores/PicStore';
// 2 route
import AppRoutes from './routes/index';

const AuthStore = new Auth();
const picStore = new PicStore();
const stores = { AuthStore, picStore };

const app = document.createElement('div');
document.body.appendChild(app);
render(
  <Provider {...stores}>
    <AppRoutes />
  </Provider>
  , app);
