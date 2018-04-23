import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { withApollo, compose } from "react-apollo";

import utils from "../utils";

class Logout extends PureComponent {
  constructor(props) {
    super(props);
    try {
      utils.removeToken();
      props.client.resetStore();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.message);
      // Well, shouldn't have been logged in, either!
    }
  }

  render() {
    return (
      <Redirect
        to="/"
      />
    );
  }
}

export default compose(
  withRouter,
  withApollo,
)(Logout);
