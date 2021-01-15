import React from 'react'
import { Router, Switch, Route } from "react-router-dom";
import Login from "../components/login/login";
import history from '../routes/history';
import User from '../components/users/users'


function App() {
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/Users">
            <User />
          </Route>
          {/* <Route path="/Users" component={User} /> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
