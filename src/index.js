import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import store from './store'
import Auth0ProviderWithHistory from "./Auth/auth0-provider-with-history";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";


ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
