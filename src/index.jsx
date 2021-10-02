import React from 'react';
import ReactDOM from 'react-dom';
import { StateProvider } from './components/State';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  App,
} from './components';

ReactDOM.render(
  <StateProvider>
    <App />
  </StateProvider>,
  document.getElementById('root'),
);
