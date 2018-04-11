import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';

import HeaderMenu from "./components/HeaderMenu";
import Welcome from "./components/Welcome";
import GridWindow from "./components/GridWindow";
import Movies from "./components/Movies";
import Login from "./components/Login";
import Footer from "./components/Footer";

const App = () => (
  <div>
    <HeaderMenu />
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/welcome" />} />
      <Route exact path="/welcome" component={Welcome} />
      <Route exact path="/create" component={GridWindow} />
      <Route exact path="/movies" component={Movies} />
      {/* TODO The loginPath prop here is a little hacky, consider a better solution... */}
      <Route exact path="/login" render={(props) => <Login loginPath={"/login"} {...props} />} />
      <Route exact path="/signup" render={(props) => <Login loginPath={"/login"} {...props} />} />
    </Switch>
    <Footer />
  </div>
);

export default App;
