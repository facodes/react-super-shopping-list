import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// redux and react redux
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// Styled components theme
import { ThemeProvider } from 'styled-components';
import theme from './utils/theme';
import GlobalStyles from './utils/globals';

import App from './App';

// put any middleware inside the array
const middleWare = [thunk];

// my store
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleWare),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <App />
        <GlobalStyles />
      </Router>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
