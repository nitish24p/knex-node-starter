require('babel-polyfill')
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes.js';
import { createNewStore } from './store/mainStore.js';

import './styles/main.scss';

export default class MainContainer extends React.Component {
  constructor() {
    super();
    this.myStore = createNewStore(window.__INITIAL_STATE__);
    this.state = this.myStore.getState();
  }

  componentDidMount() {

  }

  render() {
    const history = browserHistory;
    syncHistoryWithStore(history, this.myStore);
    return (
      <div>
        <Provider store={this.myStore}>
          <div>
            <Router history={history}>
              { routes }
            </Router>
          </div>
        </Provider>
      </div>
    );
  }
}

if (typeof window !== 'undefined') {
  ReactDOM.render(
    <MainContainer />,
    document.getElementById('mainContainer')
  );
}