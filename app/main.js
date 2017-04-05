import React from 'react';
import {Provider} from 'react-redux';

import store from 'store';
import App from 'components/App';

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>, 
  document.body
);
