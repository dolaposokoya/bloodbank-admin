import React from 'react'
import { Router, Switch, Route } from "react-router";
import Login from "../components/login/login";
import history from '../routes/history';
import User from '../components/users/users'


function App() {
  // const history = useHistory();
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact={true} path={"/users"} component={User} />
          {/* <User />
          </Route> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
