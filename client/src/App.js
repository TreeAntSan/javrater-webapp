import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';

import HeaderMenu from "./components/HeaderMenu";
import Welcome from "./components/Welcome";
import GridWindow from "./components/GridWindow";
import Movies from "./components/Movies";
import Footer from "./components/Footer";

const App = () => (
  <div>
    <HeaderMenu />
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/welcome" />} />
      <Route exact path="/welcome" component={Welcome} />
      <Route exact path="/create" component={GridWindow} />
      <Route exact path="/movies" component={Movies} />
    </Switch>
    <Footer />
  </div>
);

export default App;
