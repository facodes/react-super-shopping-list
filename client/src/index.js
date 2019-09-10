import React from 'react';
import ReactDOM from 'react-dom';

// redux and react redux
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

// react router dom
import { BrowserRouter as Router, } from 'react-router-dom' 

import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootswatch/dist/darkly/bootstrap.min.css';

// put any middleware inside the array
const middleWare = [thunk];

// my store
const store = createStore(rootReducer, compose(
  applyMiddleware(...middleWare),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App /> 
    </Router>
  </Provider>, document.getElementById('root'));

serviceWorker.unregister();
