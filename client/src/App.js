import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';

import withUser from "./UserProtector";
import HeaderMenu from "./components/HeaderMenu";
import Welcome from "./components/Welcome";
import Movie from "./components/movie/Movie";
import Movies from "./components/movies/Movies";
import Login from "./components/Login";
import Logout from "./components/Logout";
import User from "./components/user/User";
import Footer from "./components/Footer";
import LoadingError from "./components/LoadingError";

const App = () => (
  <div>
    <HeaderMenu />
    <br />
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/welcome" />} />
      <Route exact path="/welcome" component={withUser(Welcome)}/>
      <Route exact path="/movie/create" component={withUser(Movie)}/>
      <Route exact path="/movie/edit/:id" component={withUser(Movie, { private: true })} />
      <Route exact path="/movies" component={
        withUser(Movies, {
          props: {
            showCreatedBy: true,
            showDelete: true,
            showEdit: true,
          },
        })}
      />
      {/* TODO The loginPath prop here is a little hacky, consider a better solution... */}
      <Route exact path="/login" component={withUser(Login, { props: { loginPath: "/login" } })} />
      <Route exact path="/signup" component={withUser(Login, { props: { loginPath: "/login" } })} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/user/:id" component={withUser(User, { private: true })} />
      <Route path="*" render={() =>
        <LoadingError
          error={true}
          errorHeader="404"
          errorMessage="Page Not Found"
        />}
      />
    </Switch>
    <Footer />
    <br />
  </div>
);

export default App;
