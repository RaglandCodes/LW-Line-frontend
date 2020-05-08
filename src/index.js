import React from 'react';
import ReactDOM from 'react-dom';
import { ContextProvider } from './Context';
import { DeviceContextProvider } from './Context/DeviceContext.js';
import { BrowserRouter as Router, Route, useLocation } from 'react-router-dom';

import App from './App';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ContextProvider>
    <DeviceContextProvider>
      <App style={{ backgroundColor: 'yellow' }} />
    </DeviceContextProvider>
  </ContextProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
