import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import store from './store/configureStore';
import { Provider as ReduxProvider} from 'react-redux';

ReactDOM.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  document.getElementById('root')
);

