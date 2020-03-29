import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.css"
import './css/index.css';

import "jquery/dist/jquery.js"
import "popper.js/dist/umd/popper.js"
import "bootstrap/dist/js/bootstrap.js"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
