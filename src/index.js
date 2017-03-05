import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';

import injectTapEventPlugin from 'react-tap-event-plugin';


import './assets/css/main.css';

import Auth from './stores/Auth';
import PicStore from './stores/PicStore';

import { App } from './routes/index';

injectTapEventPlugin();

const AuthStore = new Auth();
const picStore = new PicStore();


const stores = { AuthStore, picStore };

const app = document.createElement('div');
// const script = document.createElement('script');
// script.text = "require('../renderer.js')";
document.body.appendChild(app);
// document.body.appendChild(script);
render(
  <Provider {...stores}>
    <App />
  </Provider>
  , app);


// if (module.hot) {
//   module.hot.accept('./routes/index', () => {
//     const NextRoutes = require('./routes/index');
//
//     render(
//       <AppContainer>
//         <Provider {...stores}>
//           <NextRoutes />
//         </Provider>
//       </AppContainer>
//       , app);
//   });
// }
